import type { Article } from "./types";
import { segurosArticles } from "./articles-seguros";
import { creditoArticles } from "./articles-credito";
import { prestamosArticles } from "./articles-prestamos";
import { bancaArticles } from "./articles-banca";
import { impuestosArticles } from "./articles-impuestos";

export const articles: Article[] = [
  ...segurosArticles,
  ...creditoArticles,
  ...prestamosArticles,
  ...bancaArticles,
  ...impuestosArticles,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category === categorySlug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sameCategory = articles.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  );
  const others = articles.filter(
    (a) => a.category !== article.category && a.slug !== article.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedArticles(limit = 3): Article[] {
  return articles.slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
