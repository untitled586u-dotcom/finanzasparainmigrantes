import { ArrowRight, FileText, Landmark, ShieldCheck, CreditCard } from "lucide-react";
import { Link } from "wouter";
import { useSeo } from "../hooks/use-seo";
import { ArticleCard } from "../components/article-card";
import { CategoryIcon } from "../components/category-icon";
import { categories } from "../content/categories";
import { getFeaturedArticles } from "../content/articles";

export default function HomePage() {
  const featured = getFeaturedArticles(4);
  useSeo({
    title: "Finanzas Para Inmigrantes: finanzas y seguros en EE.UU.",
    description: "Guías prácticas en español para inmigrantes en EE.UU.: crédito, bancos, seguros, préstamos, remesas, impuestos e ITIN.",
    path: "/",
  });

  return <main className="bg-white text-[#123B63]">
    <section className="overflow-hidden bg-[#F1F8FD]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-9 sm:px-5 sm:py-11 md:gap-10 md:px-7 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div>
          <div className="mb-3 flex items-center gap-3 font-mono text-[0.64rem] font-bold tracking-[0.12em] text-[#1264A3] sm:mb-4 sm:text-[0.68rem]"><span className="h-0.5 w-6 bg-[#F28C28]"/> TU PUNTO DE PARTIDA FINANCIERO EN EE.UU.</div>
          <h1 className="max-w-[680px] font-display text-[2.3rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[2.65rem] md:text-[4rem]">Tus finanzas en EE.UU., explicadas claro.</h1>
          <p className="mt-4 max-w-[610px] text-[1rem] leading-6 text-[#52657A] sm:mt-5 sm:text-[1.05rem] sm:leading-7">Guías prácticas para construir crédito, conseguir seguro, abrir cuentas y manejar tus impuestos, aunque estés empezando desde cero.</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3"><Link href="/articulos" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#F28C28] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5">Explorar guías <ArrowRight className="h-4 w-4"/></Link><Link href="/categoria/credito" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#B9CBD9] bg-white px-5 py-3 text-sm font-bold text-[#123B63] hover:border-[#1264A3]">Empezar por crédito</Link></div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#52657A] sm:mt-7 sm:gap-x-6"><span>✓ 100% en español</span><span>✓ Enfocado en inmigrantes</span><span>✓ Información gratuita</span></div>
        </div>
        <div className="relative mx-auto h-[270px] w-full max-w-[500px] sm:h-[320px] lg:h-[340px]" aria-label="Ejemplo visual del camino financiero">
          <div className="absolute inset-5 rounded-[2rem] bg-gradient-to-br from-[#D7EDF9] via-white to-[#E5F5EF] shadow-inner sm:inset-8 sm:rounded-[2.5rem]"/>
          <div className="absolute left-4 top-7 rounded-2xl bg-white p-3 shadow-lg sm:left-8 sm:top-10 sm:p-4"><div className="text-[9px] font-bold tracking-widest text-[#718196] sm:text-[10px]">SCORE</div><div className="mt-1 font-display text-2xl font-bold text-[#0B9A78] sm:text-3xl">720</div></div>
          <div className="absolute right-2 top-14 rounded-2xl bg-white p-3 shadow-lg sm:right-5 sm:top-20 sm:p-4"><div className="text-[9px] font-bold tracking-widest text-[#718196] sm:text-[10px]">DOCUMENTOS</div><div className="mt-1 text-sm font-bold text-[#1264A3] sm:text-base">ITIN → SSN</div></div>
          <div className="absolute bottom-8 left-6 rounded-2xl bg-[#123B63] px-4 py-3 text-white shadow-xl sm:bottom-12 sm:left-14 sm:px-5 sm:py-4"><div className="text-[9px] font-bold tracking-widest text-white/60 sm:text-[10px]">TU CAMINO</div><div className="mt-1 font-display text-base font-bold sm:text-lg">Construye. Protege. Avanza.</div></div>
          <div className="absolute bottom-1 right-2 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#F28C28] text-center text-[9px] font-black leading-3 tracking-wider text-white shadow-lg sm:bottom-6 sm:right-7 sm:h-24 sm:w-24 sm:text-[10px]">GUÍA<br/>VERIFICADA<br/>2026</div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 sm:py-12 md:px-7 md:py-16">
      <div className="mb-6 sm:mb-7"><div className="mb-2 font-mono text-[0.64rem] font-bold tracking-[0.12em] text-[#1264A3] sm:text-[0.68rem]">QUÉ NECESITAS RESOLVER</div><h2 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">Explora por tema</h2></div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">{categories.slice(0, 6).map((category) => <Link key={category.slug} href={`/categoria/${category.slug}`} className="group rounded-2xl border border-[#DCE6EE] bg-white p-4 transition hover:-translate-y-1 hover:border-[#AFC8D8] hover:shadow-md sm:p-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F8FD] text-[#1264A3]"><CategoryIcon name={category.icon} className="h-5 w-5"/></span><h3 className="mt-3 font-display text-lg font-bold sm:mt-4 sm:text-xl">{category.short}</h3><p className="mt-2 text-sm leading-5 text-[#617388]">{category.description}</p><span className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-bold text-[#1264A3] sm:mt-4">Explorar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span></Link>)}</div>
    </section>

    <section className="bg-[#EAF8F2]"><div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 sm:py-12 md:px-7 md:py-14"><div className="grid gap-7 lg:grid-cols-[.8fr_1.7fr] lg:items-center"><div><div className="mb-2 font-mono text-[0.64em] font-bold tracking-[0.12em] text-[#0B9A78] sm:text-[0.68em]">EMPIEZA AQUÍ</div><h2 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">Tu camino financiero en EE.UU.</h2><Link href="/articulos" className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#1264A3] sm:mt-4">Ver guía completa <ArrowRight className="h-4 w-4"/></Link></div><div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">{[["01","Consigue tus documentos",FileText],["02","Abre tu primera cuenta",Landmark],["03","Construye crédito",CreditCard],["04","Protege tu dinero",ShieldCheck]].map(([num,label,Icon])=><div key={String(num)}><span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1264A3] shadow-sm sm:h-12 sm:w-12">{Icon && <Icon className="h-5 w-5"/>}</span><div className="mt-2 font-mono text-[0.62rem] font-bold text-[#718196] sm:mt-3 sm:text-[0.65rem]">{num}</div><div className="mt-1 text-sm font-bold leading-5">{label}</div></div>)}</div></div></div></section>

    <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 sm:py-12 md:px-7 md:py-16"><div className="mb-6 flex items-end justify-between gap-4 sm:mb-7"><div><div className="mb-2 font-mono text-[0.64rem] font-bold tracking-[0.12em] text-[#1264A3] sm:text-[0.68rem]">GUÍAS DESTACADAS</div><h2 className="font-display text-2xl font-bold sm:text-3xl">Lo más leído</h2></div><Link href="/articulos" className="hidden items-center gap-1 text-sm font-bold text-[#1264A3] sm:flex">Ver todas <ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{featured.map((article) => <ArticleCard key={article.slug} article={article} headingLevel={3}/>)}</div></section>

    <section className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-5 sm:pb-14 md:px-7"><div className="flex flex-col gap-4 rounded-2xl bg-[#F1F8FD] p-5 sm:gap-5 sm:p-7 md:flex-row md:items-center md:justify-between"><div><div className="font-mono text-[0.64rem] font-bold tracking-[0.12em] text-[#1264A3] sm:text-[0.68rem]">RECURSOS</div><h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">¿Necesitas seguir avanzando?</h2><p className="mt-1 text-sm text-[#617388]">Explora todas las guías y encuentra el siguiente paso para tu situación.</p></div><Link href="/articulos" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#123B63] px-5 py-3 text-sm font-bold text-white">Ver todas las guías <ArrowRight className="h-4 w-4"/></Link></div></section>
  </main>;
}
