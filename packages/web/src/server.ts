// Deploy-compat entrypoint: the platform's release pipeline bundles
// packages/web/src/server.ts as the production server.
//
// Este servidor añade resolución de "directory index" sobre el comportamiento
// básico: el build pre-renderiza cada ruta a `dist/<ruta>/index.html`, así que
// una petición a `/articulo/mi-slug` debe servir ese HTML estático (con su
// title, canonical, H1 y contenido reales) en lugar del shell del SPA.
import app from "./api";
import { resolveLegacyRedirect } from "./legacy-redirects";

const port = Number(process.env.PORT ?? 3000);
const distDir = `${import.meta.dir}/../dist`;
const indexPath = `${distDir}/index.html`;

function safePath(pathname: string) {
  return decodeURIComponent(pathname)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replaceAll("..", "");
}

/**
 * Los assets de `dist/assets` llevan hash en el nombre, así que se pueden
 * cachear indefinidamente. El HTML pre-renderizado no lleva hash: se revalida
 * en cada visita para que al republicar contenido se vea al instante.
 */
function cacheControl(path: string, isHtml: boolean) {
  if (isHtml) return "public, max-age=0, must-revalidate";
  if (path.includes("/assets/")) return "public, max-age=31536000, immutable";
  // Las fuentes auto-alojadas vienen de una versión fija de @fontsource, así que
  // su contenido no cambia: cachearlas un día obligaba a revalidarlas
  // constantemente (PageSpeed reclamaba 33 KiB por visita repetida). Si algún día
  // se cambia una fuente, hay que renombrar el fichero.
  if (path.includes("/fonts/")) return "public, max-age=31536000, immutable";
  return "public, max-age=86400";
}

/**
 * Servir variantes pre-comprimidas (.br/.gz) NO funciona en producción: el
 * despliegue corre detrás de un proxy (fly.io) que descomprime la respuesta pero
 * conserva el Content-Length del fichero comprimido, así que el cliente recibía
 * el HTML cortado en seco (8,5 kB de 44 kB: sin <h1> ni </body>).
 *
 * El proxy ya aplica gzip por su cuenta, así que aquí se sirve siempre el
 * fichero original y se deja la compresión en la capa que sabe hacerla bien.
 */
async function serveFile(path: string, contentType: string | undefined) {
  const file = Bun.file(path);
  if (!(await file.exists())) return null;

  const headers: Record<string, string> = {
    "Cache-Control": cacheControl(path, Boolean(contentType)),
    Vary: "Accept-Encoding",
  };
  if (contentType) headers["Content-Type"] = contentType;

  return new Response(file, { headers });
}

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      return app.fetch(request);
    }

    // Redirección a HTTPS. El apex no pasa por el proxy de la zona de Cloudflare
    // del dominio, así que su ajuste "Always Use HTTPS" nunca se aplica y http://
    // devolvía 200, duplicando cada URL del sitio en http y https.
    //
    // Dos detalles que se comprobaron volcando las cabeceras reales que llegan
    // aquí desde producción:
    //   - `x-forwarded-proto` siempre vale "https" (el edge habla con el origen
    //     por TLS), así que no sirve. Quien conserva el esquema del visitante es
    //     la cabecera `cf-visitor` de Cloudflare.
    //   - El `Host` es el interno (…fly.dev), de modo que hay que reconstruir la
    //     URL con `x-forwarded-host` o la redirección saca al visitante del
    //     dominio público.
    const visitorScheme = /"scheme"\s*:\s*"http"/.test(
      request.headers.get("cf-visitor") ?? "",
    );
    const publicHost = request.headers.get("x-forwarded-host");
    if (visitorScheme && publicHost) {
      const target = new URL(url.pathname + url.search, `https://${publicHost}`);
      return Response.redirect(target.toString(), 301);
    }

    const clean = safePath(url.pathname);
    const html = "text/html; charset=utf-8";

    // Raíz
    if (!clean) {
      const root = await serveFile(indexPath, html);
      if (root) return root;
    } else {
      // 1. Fichero estático exacto (assets, sitemap.xml, robots.txt, imágenes...)
      const exact = await serveFile(`${distDir}/${clean}`, undefined);
      if (exact) return exact;

      // 2. Ruta pre-renderizada: /articulo/mi-slug -> dist/articulo/mi-slug/index.html
      const dirIndex = await serveFile(`${distDir}/${clean}/index.html`, html);
      if (dirIndex) return dirIndex;
    }

    // 3. Redirección 301 de una URL del sitio de WordPress que ocupó antes este
    // dominio. Se comprueba después de los ficheros reales, así que nunca puede
    // tapar una ruta existente: solo actúa sobre lo que si no daría 404.
    const legacy = resolveLegacyRedirect(url.pathname);
    if (legacy) {
      const base = publicHost ? `https://${publicHost}` : url.origin;
      return Response.redirect(new URL(legacy, base).toString(), 301);
    }

    // 4. Fallback SPA (404): se sirve el shell pero marcado como noindex y sin
    // canonical, para no señalar la portada como versión canónica de una URL
    // que no existe.
    const shell = Bun.file(indexPath);
    if (await shell.exists()) {
      const body = (await shell.text())
        .replace(/<link rel="canonical"[^>]*>/i, "")
        .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="noindex, follow" />');
      return new Response(body, { status: 404, headers: { "Content-Type": html } });
    }

    return new Response("Build output not found. Run `bun run build` first.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  },
});

console.log(`Web server listening on http://localhost:${server.port}`);
