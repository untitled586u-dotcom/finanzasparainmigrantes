/**
 * Carga diferida del cuerpo markdown de cada artículo.
 *
 * Los metadatos (título, descripción, keywords) sí viajan en el bundle inicial
 * porque los necesitan la home, el listado y las categorías. El markdown
 * completo se descarga solo cuando el lector abre ese artículo concreto.
 *
 * El `import.meta.glob` vive en un módulo aparte (`bodies-glob.ts`) que se
 * importa de forma dinámica: así este módulo se puede evaluar también fuera de
 * Vite (script de pre-render ejecutado por Bun), donde `import.meta.glob` no
 * existe.
 */

/** Cuerpos inyectados por el pre-render para que el primer render ya los tenga. */
const preloaded = new Map<string, string>();

/** Solo lo usa scripts/prerender.tsx antes de renderizar cada artículo. */
export function preloadArticleBody(slug: string, markdown: string): void {
  preloaded.set(slug, markdown);
}

/**
 * Devuelve el cuerpo si ya está disponible de forma sincrónica.
 *
 * Durante el build lo sirve el Map que rellena el pre-render. En el navegador
 * lo lee del `<script id="article-body">` que ese mismo pre-render incrustó en
 * el HTML, para que la hidratación genere el mismo árbol que el HTML estático y
 * no haya salto de layout. Si el usuario navega por el SPA a otro artículo, ese
 * script ya no corresponde al slug pedido y se cae a la carga asíncrona.
 */
export function getPreloadedBody(slug: string | undefined): string | null {
  if (!slug) return null;

  const cached = preloaded.get(slug);
  if (cached) return cached;

  if (typeof document !== "undefined") {
    const el = document.getElementById("article-body");
    if (el?.dataset.slug === slug && el.textContent) {
      const markdown = JSON.parse(el.textContent) as string;
      preloaded.set(slug, markdown);
      return markdown;
    }
  }

  return null;
}

export async function loadArticleBody(slug: string): Promise<string | null> {
  const cached = preloaded.get(slug);
  if (cached) return cached;

  const { bodies } = await import("./bodies-glob");
  const loader = bodies[`./bodies/${slug}.ts`];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
