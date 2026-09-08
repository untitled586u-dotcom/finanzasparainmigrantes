import { Link } from "wouter";
import type { Article } from "../content/types";
import { getCategory } from "../content/categories";
import { formatDate, formatDateShort } from "../lib/site";

/**
 * `headingLevel` evita que la jerarquía de encabezados salte niveles: en las
 * páginas donde la rejilla de tarjetas cuelga directamente del H1 (listado y
 * categoría) los títulos deben ser H2, mientras que cuando van dentro de una
 * sección con su propio H2 (portada, autor, artículos relacionados) el H3 es el
 * nivel correcto.
 */
export function ArticleCard({
  article,
  featured = false,
  headingLevel = 3,
}: {
  article: Article;
  featured?: boolean;
  headingLevel?: 2 | 3;
}) {
  const category = getCategory(article.category);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link
      to={`/articulo/${article.slug}`}
      data-cat={article.category}
      className="group flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_20px_36px_-18px_rgba(16,35,61,0.22)]"
    >
      <div className={`art-visual ${featured ? "h-28" : "h-24"}`}>
        <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-[rgba(10,25,48,0.85)] px-2.5 py-1 text-[0.68rem] font-bold text-white">
          {category?.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Heading
          className={`font-display font-bold leading-[1.35] text-foreground ${
            featured ? "text-xl" : "text-[1.02rem]"
          }`}
        >
          {article.title}
        </Heading>
        <p className="line-clamp-3 flex-1 text-[0.85rem] leading-relaxed text-muted-foreground">
          {article.description}
        </p>
        <div className="mt-1 flex gap-3 border-t border-dashed border-border pt-2.5 font-mono text-[0.72rem] text-muted-foreground">
          <span>{article.readMinutes} min</span>
          <span>{formatDateShort(article.date)}</span>
        </div>
      </div>
    </Link>
  );
}

/** Fila compacta para listados largos («Lo más reciente», categoría, /articulos). */
export function ArticleRow({
  article,
  headingLevel = 3,
}: {
  article: Article;
  headingLevel?: 2 | 3;
}) {
  const category = getCategory(article.category);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link
      to={`/articulo/${article.slug}`}
      data-cat={article.category}
      className="grid items-center gap-2 border-b border-border px-1.5 py-4 transition-colors hover:bg-card md:grid-cols-[118px_1fr_auto] md:gap-5"
    >
      <span className="font-mono text-[0.7rem] font-semibold tracking-wide text-[var(--cat-accent)] uppercase">
        {category?.short ?? category?.name}
      </span>
      <div>
        <Heading className="font-display text-[0.97rem] font-bold text-foreground">
          {article.title}
        </Heading>
        <p className="mt-1 line-clamp-2 text-[0.8rem] text-muted-foreground">
          {article.description}
        </p>
      </div>
      <span className="font-mono text-[0.72rem] whitespace-nowrap text-muted-foreground">
        {article.readMinutes} min · {formatDate(article.date)}
      </span>
    </Link>
  );
}
