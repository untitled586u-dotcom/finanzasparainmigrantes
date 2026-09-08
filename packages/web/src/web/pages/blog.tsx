import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { articles } from "../content/articles";
import { categories } from "../content/categories";
import { ArticleCard, ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";

export default function BlogPage() {
  useSeo({
    title: "Guías de finanzas y seguros para inmigrantes",
    description: "Explora guías en español sobre crédito, bancos, seguros, préstamos, impuestos e ITIN para hispanos e inmigrantes en EE.UU.",
    path: "/articulos",
  });

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("todos");
  const counts = useMemo(() => articles.reduce<Record<string, number>>((m, a) => ({ ...m, [a.category]: (m[a.category] ?? 0) + 1 }), {}), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = cat === "todos" || a.category === cat;
      const matchesQuery = !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, cat]);
  const featured = filtered.slice(0, 3);
  const remaining = filtered.slice(3);
  const chip = (active: boolean) => `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] font-semibold transition-colors ${active ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`;

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-9 md:px-7 md:py-12">
      <header className="relative overflow-hidden rounded-3xl bg-[var(--navy-deep)] px-6 py-9 text-white md:px-10 md:py-11">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--marigold)]/15 blur-3xl" />
        <div className="relative max-w-[700px]">
          <div className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-[var(--marigold)] uppercase"><span className="h-0.5 w-6 bg-[var(--marigold)]" /> Biblioteca financiera</div>
          <h1 className="font-display text-[2.1rem] font-bold leading-tight md:text-[2.8rem]">Guías claras para manejar tu dinero en EE.UU.</h1>
          <p className="mt-3 max-w-[60ch] text-[0.98rem] leading-6 text-white/65">{articles.length} guías prácticas sobre crédito, banca, seguros, préstamos, impuestos e ITIN.</p>
        </div>
      </header>

      <div className="sticky top-[70px] z-30 -mx-2 mt-7 rounded-2xl border border-border bg-background/95 p-3 shadow-sm backdrop-blur-md md:-mx-0 md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" aria-label="Buscar guías por título o palabra clave" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="¿Qué estás buscando?" className="w-full rounded-xl border border-border bg-card py-3 pr-4 pl-10 text-sm outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => setCat("todos")} className={chip(cat === "todos")}>Todos <span className="font-mono text-[0.68rem] opacity-70">{articles.length}</span></button>
            {categories.map((c) => <button key={c.slug} onClick={() => setCat(c.slug)} data-cat={c.slug} className={chip(cat === c.slug)}><span className="h-2 w-2 shrink-0 rounded-full bg-[var(--cat-accent)]" />{c.name}<span className="font-mono text-[0.68rem] opacity-70">{counts[c.slug] ?? 0}</span></button>)}
          </div>
        </div>
      </div>

      <div className="mt-7"><AdSlot variant="leaderboard" /></div>

      {filtered.length > 0 ? <>
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4"><div><p className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">{query || cat !== "todos" ? "Resultados" : "Para empezar"}</p><h2 className="mt-1 font-display text-xl font-bold md:text-2xl">{filtered.length} {filtered.length === 1 ? "guía" : "guías"}</h2></div></div>
          <div className="grid gap-5 md:grid-cols-3">{featured.map((a) => <ArticleCard key={a.slug} article={a} headingLevel={2} featured />)}</div>
        </section>
        {remaining.length > 0 && <section className="mt-12 pb-14"><div className="mb-5 flex items-center gap-3"><h2 className="font-display text-xl font-bold">Todas las guías</h2><span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-[0.68rem]">{remaining.length}</span></div><div className="flex flex-col border-t border-border">{remaining.map((a) => <ArticleRow key={a.slug} article={a} headingLevel={3} />)}</div></section>}
      </> : <div className="py-20 text-center"><p className="font-display text-xl font-bold">No encontramos esa guía.</p><p className="mt-2 text-sm text-muted-foreground">Prueba con otra palabra o cambia de categoría.</p><button onClick={() => { setQuery(""); setCat("todos"); }} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-background">Ver todas <ArrowRight className="h-4 w-4" /></button></div>}
    </div>
  );
}
