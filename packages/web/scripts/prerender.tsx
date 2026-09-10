/**
 * Pre-render estático (SSG) de todas las rutas públicas.
 *
 * Se ejecuta después de `vite build`: toma el `dist/index.html` generado por
 * Vite (con los hashes correctos de JS/CSS) y, para cada ruta, escribe un
 * `dist/<ruta>/index.html` que ya contiene el HTML completo de la página y sus
 * etiquetas <head> propias.
 *
 * Motivo: sin esto el sitio es un SPA puro y cualquier rastreador que no
 * ejecute JavaScript (Bing, AdSense, previsualizaciones de redes, auditorías
 * SEO) ve las 50 URLs con el mismo <title>, el mismo canonical apuntando a la
 * portada y cero palabras de contenido.
 *
 * Ejecuta: bun run scripts/prerender.tsx
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { renderToReadableStream } from "react-dom/server.browser";
import { Router } from "wouter";
import App from "../src/web/app";
import { articles } from "../src/web/content/articles";
import { categories } from "../src/web/content/categories";
import { preloadArticleBody, getPreloadedBody } from "../src/web/content/bodies";
import { seoCollector, resolveFullTitle, type SeoOptions } from "../src/web/hooks/use-seo";
import { SITE } from "../src/web/lib/site";
import { AUTHOR } from "../src/web/lib/author";

const distDir = join(import.meta.dir, "..", "dist");
const template = readFileSync(join(distDir, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const APP_MARKER = "<!--app-->";

if (!SEO_BLOCK.test(template)) {
  throw new Error("dist/index.html no contiene el bloque <!--seo-->...<!--/seo-->");
}
if (!template.includes(APP_MARKER)) {
  throw new Error("dist/index.html no contiene el marcador <!--app-->");
}

/** El grafo Organization + WebSite se repite en todas las páginas. */
const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/icon-512.png`,
      description:
        "Educación financiera clara y gratuita en español para la comunidad hispana e inmigrante en Estados Unidos.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: `${SITE.url}/`,
      inLanguage: "es",
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE.url}/articulos?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

function escapeAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Evita que un `</script>` dentro del JSON cierre la etiqueta antes de tiempo. */
function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function buildHead(seo: SeoOptions, routePath: string): string {
  const fullTitle = resolveFullTitle(seo.title);
  const description = seo.description ?? SITE.description;
  const canonical = `${SITE.url}${seo.path ?? routePath}`;
  const image = seo.image ?? SITE.ogImage;
  const type = seo.type ?? "website";

  const tags = [
    `<title>${escapeText(fullTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
  ];

  if (seo.keywords?.length) {
    tags.push(`<meta name="keywords" content="${escapeAttr(seo.keywords.join(", "))}" />`);
  }

  tags.push(
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:locale" content="es_US" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `<script type="application/ld+json">${escapeJsonLd(siteGraph)}</script>`,
  );

  if (seo.jsonLd?.length) {
    const payload = seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd;
    tags.push(
      `<script type="application/ld+json" id="page-jsonld">${escapeJsonLd(payload)}</script>`,
    );
  }

  return tags.map((t) => `\t\t${t}`).join("\n");
}

/**
 * Incrusta el markdown del artículo en el propio HTML.
 *
 * Sin esto el HTML estático trae el artículo completo, pero al hidratar el
 * navegador no tiene el cuerpo (el Map de `preloaded` solo se rellena en el
 * build), así que React colapsaba el contenido hasta que llegaba el chunk
 * asíncrono: el pie de página saltaba ~1.000 px y el CLS subía a 0.124.
 * Con el cuerpo en línea la hidratación produce exactamente el mismo árbol.
 */
function bodyScript(routePath: string): string {
  const slug = routePath.startsWith("/articulo/") ? routePath.slice("/articulo/".length) : null;
  if (!slug) return "";
  const markdown = getPreloadedBody(slug);
  if (!markdown) return "";
  return `\n\t\t<script id="article-body" type="application/json" data-slug="${escapeAttr(
    slug,
  )}">${escapeJsonLd(markdown)}</script>`;
}

async function renderRoute(routePath: string): Promise<string> {
  seoCollector.current = null;

  const stream = await renderToReadableStream(
    <Router ssrPath={routePath}>
      <App />
    </Router>,
  );
  await stream.allReady;
  const markup = await new Response(stream).text();

  const seo = seoCollector.current;
  if (!seo) {
    throw new Error(`La ruta ${routePath} no llamó a useSeo(); no se puede generar su <head>`);
  }

  return template
    .replace(
      SEO_BLOCK,
      `<!--seo-->\n${buildHead(seo, routePath)}${bodyScript(routePath)}\n\t\t<!--/seo-->`,
    )
    .replace(APP_MARKER, markup);
}

function outputPath(routePath: string): string {
  return routePath === "/"
    ? join(distDir, "index.html")
    : join(distDir, routePath.replace(/^\//, ""), "index.html");
}

const routes = [
  "/",
  "/articulos",
  "/sobre-nosotros",
  `/autor/${AUTHOR.slug}`,
  "/politica-editorial",
  "/como-ganamos-dinero",
  "/contacto",
  "/privacidad",
  "/terminos",
  ...categories.map((c) => `/categoria/${c.slug}`),
  ...articles.map((a) => `/articulo/${a.slug}`),
];

/**
 * Lee todos los cuerpos sin depender de que Bun pueda interpretar cada .ts.
 * Algunos artículos históricos son Markdown puro guardado con extensión .ts;
 * esos archivos no pueden importarse directamente durante el pre-render.
 *
 * Los módulos modernos con `export default` siguen usando import dinámico para
 * respetar exactamente su valor exportado. Los históricos se leen como texto
 * y se conservan byte por byte, incluyendo su Markdown e internal links.
 */
async function loadArticleBodyForSsg(slug: string): Promise<string> {
  const filename = join(import.meta.dir, "../src/web/content/bodies", `${slug}.ts`);
  const source = readFileSync(filename, "utf8");

  if (/^\s*export\s+default\b/m.test(source)) {
    const mod = (await import(`../src/web/content/bodies/${slug}.ts`)) as {
      default?: string;
    };
    if (typeof mod.default !== "string") {
      throw new Error(`El cuerpo del artículo ${slug} no exporta un string default válido`);
    }
    return mod.default;
  }

  return source;
}

// El cuerpo markdown se carga por adelantado para que el primer render (el que
// acaba en el HTML estático) ya incluya el artículo completo.
for (const article of articles) {
  const markdown = await loadArticleBodyForSsg(article.slug);
  if (!markdown) throw new Error(`Falta el cuerpo del artículo ${article.slug}`);
  preloadArticleBody(article.slug, markdown);
}

let written = 0;
for (const routePath of routes) {
  const html = await renderRoute(routePath);
  const target = outputPath(routePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
  written++;
}

console.log(`Pre-render: ${written} rutas escritas en dist/`);

// React deja timers pendientes del scheduler tras renderToReadableStream, así
// que el bucle de eventos no se vacía y el proceso quedaría vivo para siempre,
// colgando el `&&` del script `build`. El trabajo ya está escrito en disco:
// salimos de forma explícita.
process.exit(0);
