import { useMemo } from "react";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { articleComponents, remarkArticle } from "../lib/markdown";
import { categories, getCategory } from "../content/categories";
import { getCategoryIntro } from "../content/category-intros";
import { getArticlesByCategory } from "../content/articles";
import { CategoryIcon } from "../components/category-icon";
import { ArticleCard, ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";
import { formatDateShort, SITE } from "../lib/site";
import NotFound from "./not-found";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategory(slug);
  const list = category ? getArticlesByCategory(slug) : [];
  const jsonLd = useMemo(() => { if (!category) return undefined; const url = `${SITE.url}/categoria/${category.slug}`; return [{"@context":"https://schema.org","@type":"CollectionPage",name:category.name,description:category.description,url,inLanguage:"es",isPartOf:{"@type":"WebSite",name:SITE.name,url:SITE.url}},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:SITE.url},{"@type":"ListItem",position:2,name:category.name,item:url}]}] as Record<string,unknown>[]; }, [category]);
  useSeo({ title: category ? `${category.name} para hispanos en EE.UU.` : "Categoría", description: category?.description, path: category ? `/categoria/${category.slug}` : "/", jsonLd });
  if (!category) return <NotFound />;
  const intro = getCategoryIntro(category.slug);
  const [lead, ...rest] = list;
  const avgRead = list.length ? Math.round(list.reduce((n,a)=>n+a.readMinutes,0)/list.length) : 0;
  const lastUpdate = list.reduce((max,a)=>a.date>max?a.date:max,"0000-00-00");
  const relatedHubs = categories.filter((c) => c.slug !== category.slug).slice(0, 3);
  return <div data-cat={category.slug} className="bg-white">
    <header className="bg-[#F1F8FD] border-b border-[#E1ECF4]"><div className="mx-auto max-w-[1180px] px-5 py-7 md:px-7 md:py-9">
      <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-[0.74rem] font-medium text-[#718196]"><Link to="/" className="hover:text-[#1264A3]">Inicio</Link><span>/</span><span className="font-semibold text-[#123B63]">{category.name}</span></nav>
      <div className="flex flex-col gap-5 md:flex-row md:items-center"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[var(--cat-accent)]" style={{background:"color-mix(in srgb, var(--cat-accent) 13%, white)"}}><CategoryIcon name={category.icon} className="h-7 w-7"/></span><div><div className="mb-2 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> EXPLORA POR TEMA</div><h1 className="font-display text-[2.15rem] leading-[1.08] font-bold tracking-[-0.03em] text-[#123B63] md:text-[2.8rem]">{category.name}</h1><p className="mt-3 max-w-[760px] text-[0.98rem] leading-6 text-[#52657A]">{category.description}</p></div></div>
      <dl className="mt-7 flex flex-wrap gap-7 border-t border-[#D8E7F0] pt-5">{[["Guías",String(list.length)],["Lectura media",`${avgRead} min`],["Actualizado",formatDateShort(lastUpdate)]].map(([label,value])=><div key={label}><dt className="font-mono text-[0.65rem] tracking-[0.08em] text-[#718196] uppercase">{label}</dt><dd className="mt-0.5 font-display text-base font-bold text-[#123B63]">{value}</dd></div>)}</dl>
    </div></header>
    <div className="mx-auto max-w-[1180px] px-5 md:px-7">
      <div className="py-6"><AdSlot variant="leaderboard"/></div>
      {lead && <section className="py-5"><div className="mb-5 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> GUÍA DESTACADA</div><ArticleCard article={lead} headingLevel={2} featured/></section>}
      {rest.length > 0 && <section className="pb-14 pt-9"><div className="mb-5 flex items-end justify-between"><div><div className="mb-2 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> TODAS LAS GUÍAS</div><h2 className="font-display text-2xl font-bold text-[#123B63]">Más sobre {category.short.toLowerCase()}</h2></div></div><div className="border-t border-[#DCE6EE]">{rest.map(a=><ArticleRow key={a.slug} article={a} headingLevel={3}/>)}</div></section>}
      {intro && <section className="border-t border-[#DCE6EE] bg-[#FBFDFF] py-10 pb-16"><div className="grid gap-8 lg:grid-cols-[1fr_300px]"><div><div className="mb-3 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> GUÍA DEL TEMA</div><h2 className="mb-5 font-display text-2xl font-bold text-[#123B63]">Qué necesitas saber sobre {category.short.toLowerCase()} en EE.UU.</h2><div className="article-body max-w-[760px]"><ReactMarkdown remarkPlugins={[remarkGfm,remarkArticle]} components={articleComponents}>{intro}</ReactMarkdown></div></div><aside className="hidden rounded-2xl bg-[#EAF8F2] p-6 lg:block"><h2 className="font-display text-base font-bold text-[#123B63]">Empieza por lo básico</h2><p className="mt-2 text-sm leading-5 text-[#52657A]">Lee una guía, sigue los pasos y vuelve a este hub para continuar con el siguiente tema.</p></aside></div></section>}
      <section className="border-t border-[#DCE6EE] py-10 pb-16">
        <div className="mb-5 flex items-center gap-3 font-mono text-[0.67rem] font-bold tracking-[0.13em] text-[#1264A3] uppercase"><span className="h-0.5 w-5 bg-[#F28C28]"/> SIGUIENTE PASO</div>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedHubs.map((hub) => <Link key={hub.slug} href={`/categoria/${hub.slug}`} className="group rounded-2xl border border-[#DCE6EE] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#A9CDE5] hover:shadow-[0_8px_24px_rgba(18,59,99,0.08)]"><div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F8FD] text-[#1264A3]"><CategoryIcon name={hub.icon} className="h-5 w-5"/></div><h2 className="font-display text-base font-bold text-[#123B63] group-hover:text-[#1264A3]">{hub.name}</h2><p className="mt-2 text-sm leading-5 text-[#64768A]">{hub.description}</p><span className="mt-3 inline-block text-sm font-semibold text-[#1264A3]">Explorar →</span></Link>)}
        </div>
      </section>
    </div>
  </div>;
}
