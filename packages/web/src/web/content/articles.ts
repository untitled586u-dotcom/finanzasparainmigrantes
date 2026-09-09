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

const REMITTANCE_RE = /(enviar dinero|remesa|méxico|mexico|guatemala|honduras|el salvador|venezuela|colombia|ecuador|república dominicana|latinoamérica|latinoamerica)/i;

/** Returns the SEO hub that should receive the article's contextual links. */
export function getArticleHubSlug(article: Article): string {
  if (article.category === "seguro-de-auto" || article.category === "seguros") return "seguros";
  if (article.category === "banca" && REMITTANCE_RE.test(`${article.title} ${article.description} ${article.keywords.join(" ")}`)) return "remesas";
  if (["credito", "banca", "prestamos", "impuestos"].includes(article.category)) return article.category;
  return "articulos";
}

const STOP_WORDS = new Set(["para", "como", "cómo", "desde", "entre", "sobre", "tiene", "tener", "cuando", "donde", "quien", "qué", "esta", "este", "with", "your", "from", "that", "this"]);

function normalizeTerms(values: string[]): Set<string> {
  return new Set(
    values
      .join(" ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !STOP_WORDS.has(word)),
  );
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const sourceTerms = normalizeTerms([article.title, article.description, ...article.keywords]);
  const sourceKeywords = new Set(article.keywords.map((k) => k.toLowerCase()));
  const score = (candidate: Article) => {
    if (candidate.slug === article.slug) return -1;
    const candidateTerms = normalizeTerms([candidate.title, candidate.description, ...candidate.keywords]);
    let overlap = 0;
    for (const term of sourceTerms) if (candidateTerms.has(term)) overlap += 1;
    const keywordOverlap = candidate.keywords.reduce((n, keyword) => n + (sourceKeywords.has(keyword.toLowerCase()) ? 4 : 0), 0);
    const sameCategory = candidate.category === article.category ? 2 : 0;
    const sameHubFamily = (article.category === "seguro-de-auto" && candidate.category === "seguros") || (article.category === "seguros" && candidate.category === "seguro-de-auto") ? 2 : 0;
    const titlePhrase = article.title.toLowerCase().split(/[^a-záéíóúüñ0-9]+/).filter((w) => w.length > 4 && !STOP_WORDS.has(w)).some((word) => candidate.title.toLowerCase().includes(word)) ? 1 : 0;
    return overlap + keywordOverlap + sameCategory + sameHubFamily + titlePhrase;
  };
  return articles
    .filter((a) => a.slug !== article.slug)
    .map((a, index) => ({ a, score: score(a), index }))
    .sort((x, y) => y.score - x.score || x.index - y.index)
    .filter(({ score }) => score > 0)
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
