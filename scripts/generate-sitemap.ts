import { mkdir, writeFile } from "node:fs/promises";
import { articles } from "../packages/web/src/web/content/articles";
import { categories } from "../packages/web/src/web/content/categories";

const SITE = "https://finanzasparainmigrantes.com";
const OUTPUT_DIR = "packages/web/public";

const staticPages = [
  ["/", "2026-09-07", "daily", "1.0"],
  ["/articulos", "2026-09-07", "daily", "0.9"],
  ["/sobre-nosotros", undefined, "yearly", "0.3"],
  ["/autor/redaccion", undefined, "monthly", "0.5"],
  ["/politica-editorial", undefined, "yearly", "0.4"],
  ["/como-ganamos-dinero", undefined, "yearly", "0.4"],
  ["/contacto", undefined, "yearly", "0.3"],
  ["/privacidad", undefined, "yearly", "0.2"],
  ["/terminos", undefined, "yearly", "0.2"],
] as const;

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const urlEntry = (path: string, lastmod: string | undefined, changefreq: string, priority: string) =>
  [
    "  <url>",
    `    <loc>${escapeXml(`${SITE}${path}`)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");

const hubEntries = categories.map((category) =>
  urlEntry(`/categoria/${category.slug}`, "2026-09-10", "weekly", "0.9"),
);

const articleEntries = articles.map((article) =>
  urlEntry(`/articulo/${article.slug}`, article.date, "monthly", "0.7"),
);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticPages.map(([path, lastmod, changefreq, priority]) => urlEntry(path, lastmod, changefreq, priority)),
  ...hubEntries,
  ...articleEntries,
  "</urlset>",
  "",
].join("\n");

const hubsSitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...categories.map((category) => urlEntry(`/categoria/${category.slug}`, undefined, "weekly", "0.9")),
  "</urlset>",
  "",
].join("\n");

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(`${OUTPUT_DIR}/sitemap.xml`, sitemap, "utf8");
await writeFile(`${OUTPUT_DIR}/sitemap-hubs.xml`, hubsSitemap, "utf8");

console.log(`Sitemap generado: ${categories.length} hubs + ${articles.length} artículos.`);
