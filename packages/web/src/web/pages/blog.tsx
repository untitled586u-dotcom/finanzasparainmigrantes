import { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { articles } from "../content/articles";
import { categories } from "../content/categories";
import { ArticleCard, ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";

export default function BlogPage() {
  useSeo({ title: "Guías de finanzas y seguros para inmigrantes", description: "Explora guías en español sobre crédito, bancos, seguros, préstamos, impuestos e ITIN para hispanos e inmigrantes en EE.UU.", path: "/articulos" });
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todos");
  const counts = useMemo(() => articles.reduce<Record<string, number>>((m, a) => ({ ...m, [a.category]: (m[a.category] ?? 0) + 1 }), {}), []);
  const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return articles.filter(a => (cat === "todos" || a.category === cat) && (!q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.keywords.some(k => k.toLowerCase().includes(q)))); }, [query, cat]);
  const featured = filtered.slice(0, 4);
  const remaining = filtered.slice(4);
  const chip = (active: boolean) => `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold whitespace-nowrap transition-colors ${active ? "bg-[#123B63] text-white" : "border border-[#D8E3EC] bg-white text-[#52657A] hover:border-[#1264A3] hover:text-[#123B63]"}`;
  return <div className="bg-white">
    <header className="bg-[#F1F8FD] border-b border-[#E1ECF4]">
      <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-7 md:py-12">
        <div className="mb-3 flex items-center gap-3 font-mono text-[0.68rem] font-bold tracking-[0.14em] text-[#1264A3] uppercase"><span className="h-0.5 w-6 bg-[#F28C28]"/> BIBLIOTECA FINANCIERA</div>
        <h1 className="max-w-[760px] font-display text-[2.1rem] leading-[1.08] font-bold tracking-[-0.035em] text-[#123B63] md:text-[3rem]">Guías claras para manejar tu dinero en EE.UU.</h1>
        <p className="mt-4 max-w-[680px] text-[0.98rem] leading-6 text-[#52657A]">Encuentra respuestas prácticas sobre crédito, bancos, seguros, préstamos, impuestos e ITIN, pensadas para hispanos e inmigrantes.</p>
      </div>
    </header>
    <div className="mx-auto max-w-[1180px] px-5 md:px-7">
      <div className="sticky top-[58px] z-30 -mx-2 mt-5 rounded-2xl border border-[#DCE6EE] bg-white/95 p-3 shadow-sm backdrop-blur-md md:mx-0 md:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718196]"/><input type="search" aria-label="Buscar guías" value={query} onChange={e => setQuery(e.target.value)} placeholder="¿Qué estás buscando?" className="w-full rounded-xl border border-[#D8E3EC] bg-white py-3 pl-10 pr-4 text-sm text-[#123B63] outline-none focus:border-[#1264A3] focus:ring-2 focus:ring-[#1264A3]/10"/></div>
          <div className="flex gap-2 overflow-x-auto pb-1"><button onClick={() => setCat("todos")} className={chip(cat === "todos")}>Todos <span className="font-mono text-[0.68rem] opacity-70">{articles.length}</span></button>{categories.map(c => <button key={c.slug} onClick={() => setCat(c.slug)} data-cat={c.slug} className={chip(cat === c.slug)}>{c.name === "Banca y Documentos" ? "Bancos" : c.name}<span className="font-mono text-[0.68rem] opacity-70">{counts[c.slug] ?? 0}</span></button>)}</div>
        </div>
      </div>
      <div className="py-6"><AdSlot variant="leaderboard"/></div>
      {filtered.length ? <>
        <section className="py-7 md:py-9"><div className="mb-6 flex items-end justify-between"><div><div className="mb-2 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> {query || cat !== "todos" ? "RESULTADOS" : "EMPIEZA AQUÍ"}</div><h2 className="font-display text-2xl font-bold text-[#123B63] md:text-[2rem]">{query || cat !== "todos" ? `${filtered.length} ${filtered.length === 1 ? "guía encontrada" : "guías encontradas"}` : "Lo más útil para empezar"}</h2></div></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{featured.map(a => <ArticleCard key={a.slug} article={a} headingLevel={2} featured/>)}</div></section>
        {remaining.length > 0 && <section className="pb-16 pt-4"><div className="mb-5 flex items-center gap-3"><div><div className="mb-1 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> TODAS LAS GUÍAS</div><h2 className="font-display text-xl font-bold text-[#123B63]">Más artículos</h2></div><span className="rounded-full bg-[#EEF6FB] px-2.5 py-1 font-mono text-[0.68rem] text-[#1264A3]">{remaining.length}</span></div><div className="border-t border-[#DCE6EE]">{remaining.map(a => <ArticleRow key={a.slug} article={a} headingLevel={3}/>)}</div></section>}
      </> : <div className="py-20 text-center"><p className="font-display text-xl font-bold text-[#123B63]">No encontramos esa guía.</p><p className="mt-2 text-sm text-[#647689]">Prueba con otra palabra o cambia de categoría.</p><button onClick={() => {setQuery("");setCat("todos")}} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F28C28] px-4 py-2.5 text-sm font-bold text-white">Ver todas <ArrowRight className="h-4 w-4"/></button></div>}
    </div>
  </div>;
}
