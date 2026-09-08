/**
 * Genera public/sitemap.xml y public/robots.txt a partir del contenido real
 * (categorías y artículos). Ejecuta: bun run scripts/generate-sitemap.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { articles } from "../src/web/content/articles";
import { categories } from "../src/web/content/categories";
import { SITE } from "../src/web/lib/site";
import { AUTHOR } from "../src/web/lib/author";

const BASE = SITE.url.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

type Url = { loc: string; lastmod?: string; changefreq: string; priority: string };

const urls: Url[] = [
  { loc: "/", changefreq: "daily", priority: "1.0", lastmod: today },
  { loc: "/articulos", changefreq: "daily", priority: "0.9", lastmod: today },
  { loc: "/sobre-nosotros", changefreq: "yearly", priority: "0.3" },
  { loc: `/autor/${AUTHOR.slug}`, changefreq: "monthly", priority: "0.5" },
  { loc: "/politica-editorial", changefreq: "yearly", priority: "0.4" },
  { loc: "/como-ganamos-dinero", changefreq: "yearly", priority: "0.4" },
  { loc: "/contacto", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacidad", changefreq: "yearly", priority: "0.2" },
  { loc: "/terminos", changefreq: "yearly", priority: "0.2" },
];

for (const c of categories) {
  urls.push({
    loc: `/categoria/${c.slug}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: today,
  });
}

for (const a of articles) {
  urls.push({
    loc: `/articulo/${a.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: a.date,
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`;

const publicDir = join(import.meta.dir, "..", "public");
writeFileSync(join(publicDir, "sitemap.xml"), xml, "utf8");
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");

// llms.txt: índice legible por máquinas para asistentes de IA. Lighthouse lo
// audita en "navegación agéntica" y es el formato que esperan los rastreadores
// de LLM. Se genera del mismo contenido que el sitemap para no desincronizarse.
const llms = `# ${SITE.name}

> ${SITE.description}

Guías de educación financiera en español para la comunidad hispana e inmigrante
en Estados Unidos: seguros, banca, crédito, préstamos e impuestos. Explicamos
qué se puede hacer con ITIN, pasaporte o matrícula consular, sin exigir número
de Seguro Social. Contenido informativo, no asesoramiento profesional.

${categories
  .map(
    (c) => `## ${c.name}

${c.description}

${articles
  .filter((a) => a.category === c.slug)
  .map((a) => `- [${a.title}](${BASE}/articulo/${a.slug}): ${a.description}`)
  .join("\n")}`,
  )
  .join("\n\n")}

## Sobre el sitio

- [Sobre nosotros](${BASE}/sobre-nosotros): quiénes somos y a quién servimos.
- [Política editorial](${BASE}/politica-editorial): cómo investigamos y verificamos.
- [Cómo ganamos dinero](${BASE}/como-ganamos-dinero): nuestro modelo de negocio.
- [Contacto](${BASE}/contacto): correcciones y sugerencias de tema.
`;
writeFileSync(join(publicDir, "llms.txt"), llms, "utf8");

console.log(
  `Generado sitemap.xml con ${urls.length} URLs (${categories.length} categorías, ${articles.length} artículos) y robots.txt`,
);
