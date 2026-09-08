import { Link } from "wouter";
import { ArrowRight, Check, Car, CreditCard, Landmark, HandCoins, Receipt, BookOpen, ShieldCheck } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { categories } from "../content/categories";
import { articles, getFeaturedArticles } from "../content/articles";
import { ArticleCard } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";
import { SITE } from "../lib/site";

const TRUST = ["100% en español", "Enfocado en inmigrantes", "Información gratuita"];
const icons: Record<string, typeof Car> = { car: Car, "credit-card": CreditCard, landmark: Landmark, "hand-coins": HandCoins, receipt: Receipt };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 font-mono text-[0.68rem] font-bold tracking-[0.14em] text-[#1264A3] uppercase">{children}</div>;
}

function Hero() {
  return <section className="overflow-hidden bg-[linear-gradient(135deg,#F3FAFF_0%,#fff_58%,#FFF9F0_100%)]">
    <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-5 py-12 md:px-7 md:py-16 lg:grid-cols-[1fr_.92fr] lg:py-[72px]">
      <div>
        <Eyebrow>TU PUNTO DE PARTIDA FINANCIERO EN EE.UU.</Eyebrow>
        <h1 className="max-w-[720px] font-display text-[2.65rem] leading-[1.03] font-bold tracking-[-0.04em] text-[#123B63] sm:text-[3.25rem] md:text-[3.8rem]">Tus finanzas en EE.UU., <span className="text-[#1264A3]">explicadas claro.</span></h1>
        <p className="mt-5 max-w-[55ch] text-[1.02rem] leading-7 text-[#52657A]">Guías prácticas para construir crédito, conseguir seguro, abrir cuentas y manejar tus impuestos, aunque estés empezando desde cero.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/articulos" className="group inline-flex items-center gap-2 rounded-xl bg-[#F28C28] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(242,140,40,.8)] hover:bg-[#DF7615]">Explorar guías <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          <Link to="/categoria/credito" className="inline-flex items-center rounded-xl border-2 border-[#1264A3]/20 bg-white px-5 py-3 text-sm font-bold text-[#123B63] hover:border-[#1264A3]/50">Empezar por crédito</Link>
        </div>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">{TRUST.map(t => <li key={t} className="flex items-center gap-2 text-xs font-semibold text-[#52657A]"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#27A66F]"><Check className="h-3 w-3 text-white" strokeWidth={3}/></span>{t}</li>)}</ul>
      </div>
      <div className="relative mx-auto h-[320px] w-full max-w-[470px] lg:h-[390px]" aria-hidden="true">
        <div className="absolute inset-5 rounded-[2rem] bg-[#DDEFFC] rotate-2"/>
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,#B9DDF3,#EEF8FD)] shadow-[0_28px_70px_-28px_rgba(18,59,99,.35)]">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#F7B731]/70"/>
          <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#27A66F]/15"/>
          <div className="absolute left-5 top-5 rounded-xl bg-white/90 px-4 py-3 shadow-lg"><div className="font-mono text-[9px] font-bold text-[#52657A]">SCORE</div><div className="font-display text-3xl font-bold text-[#123B63]">720</div></div>
          <div className="absolute right-5 top-20 rounded-xl bg-white/95 px-4 py-3 shadow-lg"><div className="font-mono text-[9px] font-bold text-[#1264A3]">ITIN → SSN</div><div className="mt-1 text-xs font-semibold text-[#52657A]">Historial financiero</div></div>
          <div className="absolute bottom-16 left-8 rounded-xl bg-white/95 px-4 py-3 shadow-lg"><div className="font-mono text-[9px] font-bold text-[#E65A4F]">SEGURO DE AUTO</div><div className="mt-1 text-xs font-semibold text-[#52657A]">Cobertura · requisitos · precio</div></div>
          <div className="absolute bottom-4 right-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#123B63] text-center font-mono text-[8px] font-bold leading-tight text-white">GUÍA<br/>VERIFICADA<br/>2026</div>
        </div>
      </div>
    </div>
  </section>;
}

function FinancialPath() {
  const steps = [["01","Consigue tus documentos"],["02","Abre tu primera cuenta"],["03","Construye crédito"],["04","Protege tu dinero"]];
  return <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-7 md:py-14"><div className="rounded-3xl bg-[#EAF8F2] p-6 md:p-9"><div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><Eyebrow>EMPIEZA AQUÍ</Eyebrow><h2 className="font-display text-2xl font-bold text-[#123B63] md:text-[2rem]">Tu camino financiero en EE.UU.</h2><p className="mt-3 max-w-[40ch] text-sm leading-6 text-[#52657A]">Un paso a la vez. Aprende qué necesitas primero y qué viene después.</p><Link to="/articulos" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1264A3]">Ver guía completa <ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-3 sm:grid-cols-2">{steps.map(([n,t])=><div key={n} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#27A66F] font-mono text-xs font-bold text-[#27A66F]">{n}</span><span className="font-display text-sm font-bold text-[#123B63]">{t}</span></div>)}</div></div></div></section>;
}

function Index() {
  useSeo({ title: `${SITE.name} — Dinero y seguros en español`, description: "Guías claras en español sobre crédito, bancos, seguros, préstamos, impuestos e ITIN para hispanos e inmigrantes en Estados Unidos.", path: "/" });
  const featured = getFeaturedArticles(4);
  return <>
    <Hero />
    <section className="mx-auto max-w-[1180px] px-5 py-11 md:px-7 md:py-14"><div className="mb-7"><Eyebrow>QUÉ NECESITAS RESOLVER</Eyebrow><h2 className="font-display text-2xl font-bold text-[#123B63] md:text-[2rem]">Explora por tema</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map(c=>{const Icon=icons[c.icon]||BookOpen; return <Link key={c.slug} to={`/categoria/${c.slug}`} className="group rounded-2xl border border-[#DCE6EE] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FB] text-[#1264A3]"><Icon className="h-5 w-5"/></span><h3 className="mt-4 font-display text-base font-bold text-[#123B63]">{c.name}</h3><p className="mt-2 line-clamp-3 text-xs leading-5 text-[#647689]">{c.description}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1264A3]">Explorar <ArrowRight className="h-3.5 w-3.5"/></span></Link>})}<Link to="/articulos" className="group rounded-2xl border border-dashed border-[#B9CBD8] bg-[#F8FBFD] p-5 transition-all hover:-translate-y-1"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#F28C28]"><BookOpen className="h-5 w-5"/></span><h3 className="mt-4 font-display text-base font-bold text-[#123B63]">Más guías</h3><p className="mt-2 text-xs leading-5 text-[#647689]">Descubre todos los artículos y encuentra respuestas a tus preguntas.</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#F28C28]">Ver todas <ArrowRight className="h-3.5 w-3.5"/></span></Link></div></section>
    <section className="mx-auto max-w-[1180px] px-5 pb-12 md:px-7"><AdSlot variant="leaderboard"/></section>
    <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-7 md:py-14"><div className="mb-7 flex items-end justify-between gap-4"><div><Eyebrow>GUÍAS DESTACADAS</Eyebrow><h2 className="font-display text-2xl font-bold text-[#123B63] md:text-[2rem]">Lo más leído</h2></div><Link to="/articulos" className="inline-flex items-center gap-1 text-sm font-bold text-[#1264A3]">Ver todas <ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{featured.map(a=><ArticleCard key={a.slug} article={a}/>)}</div></section>
    <section className="mx-auto max-w-[1180px] px-5 pb-14 md:px-7"><div className="rounded-2xl border border-[#CFE4F3] bg-[#F1F9FE] p-6 md:flex md:items-center md:justify-between md:p-7"><div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1264A3]"><ShieldCheck className="h-5 w-5"/></span><div><Eyebrow>RECURSOS</Eyebrow><h2 className="font-display text-lg font-bold text-[#123B63]">¿Necesitas ayuda personalizada?</h2><p className="mt-1 text-sm text-[#647689]">Encuentra recursos y contactos oficiales para dar el siguiente paso.</p></div></div><Link to="/contacto" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#1264A3] px-5 py-3 text-sm font-bold text-white md:mt-0">Ver recursos y contactos <ArrowRight className="h-4 w-4"/></Link></div></section>
  </>;
}
export default Index;
