import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "../content/types";
import { getCategory } from "../content/categories";
import { formatDate, formatDateShort } from "../lib/site";

export function ArticleCard({ article, featured = false, headingLevel = 3 }: { article: Article; featured?: boolean; headingLevel?: 2 | 3 }) {
  const category = getCategory(article.category);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link to={`/articulo/${article.slug}`} data-cat={article.category} className="article-card group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_24px_42px_-20px_rgba(16,35,61,.28)]">
      <div className={`art-visual ${featured ? "h-32" : "h-28"}`}>
        <span className="absolute top-3.5 left-3.5 z-10 max-w-[calc(100%-5rem)] truncate rounded-full bg-[rgba(10,25,48,.88)] px-2.5 py-1 font-mono text-[0.64rem] font-medium tracking-wide text-white">{category?.short ?? category?.name}</span>
        <span className="absolute right-3.5 bottom-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--navy-deep)] shadow-sm transition-transform group-hover:rotate-6"><ArrowUpRight className="h-4 w-4" /></span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Heading className={`font-display font-bold leading-[1.25] tracking-[-0.015em] text-foreground ${featured ? "text-[1.18rem]" : "text-[1.02rem]"}`}>{article.title}</Heading>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.84rem] leading-5.5 text-muted-foreground">{article.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3 font-mono text-[0.67rem] text-muted-foreground"><span>{article.readMinutes} min · {formatDateShort(article.date)}</span><span className="font-bold text-foreground">Leer guía →</span></div>
      </div>
    </Link>
  );
}

export function ArticleRow({ article, headingLevel = 3 }: { article: Article; headingLevel?: 2 | 3 }) {
  const category = getCategory(article.category);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link to={`/articulo/${article.slug}`} data-cat={article.category} className="group grid items-center gap-3 border-b border-border px-1.5 py-4.5 transition-all hover:bg-card md:grid-cols-[120px_1fr_auto] md:gap-6 md:px-3">
      <span className="font-mono text-[0.68rem] font-semibold tracking-wide text-[var(--cat-accent)] uppercase">{category?.short ?? category?.name}</span>
      <div><Heading className="font-display text-[0.98rem] font-bold leading-snug text-foreground group-hover:text-[var(--cat-accent)]">{article.title}</Heading><p className="mt-1 line-clamp-2 text-[0.79rem] leading-5 text-muted-foreground">{article.description}</p></div>
      <span className="font-mono text-[0.68rem] whitespace-nowrap text-muted-foreground">{article.readMinutes} min · {formatDate(article.date)}</span>
    </Link>
  );
}
