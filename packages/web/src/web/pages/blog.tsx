import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { articles } from "../content/articles";
import { categories } from "../content/categories";
import { ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";

export default function BlogPage() {
  useSeo({
    title: "Todas las guías de finanzas y seguros",
    description:
      "Explora todas nuestras guías en español sobre seguro de auto, crédito, préstamos y banca para hispanos e inmigrantes en EE.UU.",
    path: "/articulos",
  });

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("todos");

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of articles) map[a.category] = (map[a.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = cat === "todos" || a.category === cat;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);

  const chip = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.83rem] font-semibold transition-colors ${
      active
        ? "bg-foreground text-background"
        : "border border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
    }`;

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-7">
      <div className="mb-2.5 flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.1em] text-muted-foreground uppercase">
        <span className="h-0.5 w-5 bg-[var(--marigold-deep)]" aria-hidden="true" />
        Biblioteca completa
      </div>
      <h1 className="font-display text-[2rem] font-bold text-foreground md:text-[2.6rem]">
        Todas las guías
      </h1>
      <p className="mt-3 max-w-[60ch] text-[1.05rem] text-muted-foreground">
        {articles.length} artículos para ayudarte a manejar tu dinero, tus seguros y tus
        trámites en Estados Unidos.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Buscar guías por título o palabra clave"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar guías..."
            className="w-full rounded-[10px] border border-border bg-card py-2.5 pr-4 pl-10 text-sm outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCat("todos")} className={chip(cat === "todos")}>
            Todos
            <span className="font-mono text-[0.7rem] opacity-70">{articles.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              data-cat={c.slug}
              className={chip(cat === c.slug)}
            >
              <span
                className="h-2 w-2 rounded-full bg-[var(--cat-accent)]"
                aria-hidden="true"
              />
              {c.name}
              <span className="font-mono text-[0.7rem] opacity-70">{counts[c.slug] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <AdSlot variant="leaderboard" />
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 flex flex-col border-t border-border">
          {filtered.map((a) => (
            <ArticleRow key={a.slug} article={a} headingLevel={2} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted-foreground">
          No encontramos guías para «{query}». Prueba con otra búsqueda.
        </p>
      )}
    </div>
  );
}
