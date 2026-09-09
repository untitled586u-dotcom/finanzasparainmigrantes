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
  if (categorySlug === "seguros") return articles.filter((a) => a.category === "seguro-de-auto" || a.category === "seguros");
  if (categorySlug === "remesas") {
    return articles.filter((a) => {
      const text = `${a.title} ${a.description} ${a.keywords.join(" ")}`.toLowerCase();
      return a.category === "banca" && /(enviar dinero|remesa|méxico|mexico|guatemala|honduras|el salvador|venezuela|colombia|ecuador|república dominicana|latinoamérica|latinoamerica)/i.test(text);
    });
  }
  return articles.filter((a) => a.category === categorySlug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sourceTerms = new Set(article.keywords.map((k) => k.toLowerCase()));
  const title = article.title.toLowerCase();
  const score = (candidate: Article) => {
    if (candidate.slug === article.slug) return -1;
    const sameCategory = candidate.category === article.category ? 2 : 0;
    const keywordOverlap = candidate.keywords.reduce((n, keyword) => n + (sourceTerms.has(keyword.toLowerCase()) ? 3 : 0), 0);
    const titleOverlap = candidate.keywords.reduce((n, keyword) => {
      const words = keyword.toLowerCase().split(/[^a-záéíóúüñ0-9]+/).filter((w) => w.length > 4);
      return n + (words.some((w) => title.includes(w)) ? 1 : 0);
    }, 0);
    return sameCategory + keywordOverlap + titleOverlap;
  };
  return articles
    .filter((a) => a.slug !== article.slug)
    .map((a, index) => ({ a, score: score(a), index }))
    .sort((x, y) => y.score - x.score || x.index - y.index)
    .slice(0, limit)
    .map(({ a }) => a);
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
