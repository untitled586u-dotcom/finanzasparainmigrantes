import { Link } from "wouter";
import { ArrowRight, Check, Car, CreditCard, Landmark, HandCoins, Receipt, BookOpen, ShieldCheck, FileText, Search } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { categories } from "../content/categories";
import { getFeaturedArticles } from "../content/articles";
import { ArticleCard } from "../components/article-card";
import { SITE } from "../lib/site";

const TRUST = ["100% en español", "Enfocado en inmigrantes", "Información gratuita"];
const categoryIcons: Record<string, typeof Car> = {
  "seguro-de-auto": Car,
  credito: CreditCard,
  banca: Landmark,
  prestamos: HandCoins,
  impuestos: Receipt,
};
const categoryTone: Record<string, string> = {
  "seguro-de-auto": "bg-[#DDF5EE] text-[#008E72]",
  credito: "bg-[#E4F0FF] text-[#1666D3]",
  banca: "bg-[#DDEBFF] text-[#125DBE]",
  prestamos: "bg-[#FFF0CF] text-[#E59A00]",
  impuestos: "bg-[#EFE2FF] text-[#7740C5]",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 flex items-center gap-2 font-mono text-[0.66rem] font-bold tracking-[0.13em] text-[#47617D] uppercase"><span className="h-[2px] w-5 bg-[#FF7A1A]" />{children}</div>;
}

function HeroVisual() {
  return <div className="relative h-[350px] w-full overflow-hidden rounded-[0_0_0_0] bg-[#DCEFFA] sm:h-[390px] lg:h-[420px]" aria-label="Ilustración financiera con Nueva York">
    <div className="absolute -left-16 top-16 h-52 w-52 rounded-full bg-[#1AA47B] opacity-80" />
    <div className="absolute left-24 top-14 h-40 w-40 rounded-full bg-[#FFB51B]" />
    <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#C7E5F3] to-transparent" />
    <div className="absolute right-[-4%] top-0 h-full w-[68%] bg-[linear-gradient(160deg,#EAF7FC_0%,#B8D8E8_55%,#8CB9CD_100%)]" />
    <div className="absolute right-[12%] top-[12%] h-[76%] w-[30%] rounded-[45%_45%_0_0] bg-[#A9C9D7] opacity-75" />
    <div className="absolute right-[27%] top-[20%] h-[64%] w-[24%] rounded-[45%_45%_12%_12%] bg-[#173E61] opacity-90" />
    <div className="absolute right-[19%] bottom-[5%] h-[55%] w-[35%] rounded-[48%_48%_0_0] bg-[#234B68]" />
    <div className="absolute right-[14%] bottom-[0] h-[72%] w-[48%] rounded-[48%_48%_0_0] bg-[#E6B899] opacity-90" />
    <div className="absolute right-[9%] bottom-[0] h-[68%] w-[28%] rounded-t-[40%] bg-[#1B4B6E] opacity-95" />
    <div className="absolute right-[3%] bottom-0 h-[58%] w-[27%] rotate-[-8deg] rounded-[10%] bg-[#F3F6F8] shadow-xl" />
    <div className="absolute right-[9%] bottom-[19%] h-[3px] w-[22%] rotate-[-8deg] bg-[#B6C8D4]" />
    <div className="absolute left-[4%] top-[15%] z-10 w-[126px] rotate-[-6deg] rounded-xl bg-white p-4 shadow-[0_18px_32px_-14px_rgba(18,59,99,.45)]"><div className="font-mono text-[8px] font-bold text-[#5A6F84]">SCORE</div><div className="mt-1 text-3xl font-extrabold text-[#102E54]">720</div><div className="mt-2 h-2 rounded-full bg-gradient-to-r from-[#0B9A78] via-[#FFB51B] to-[#EF4A3A]" /></div>
    <div className="absolute left-[27%] top-[31%] z-20 w-[132px] rotate-[4deg] rounded-xl bg-white p-4 shadow-[0_18px_32px_-14px_rgba(18,59,99,.45)]"><div className="text-[11px] font-bold text-[#125DBE]">ITIN → SSN</div><div className="mt-1 text-[9px] text-[#6B7F93]">Historial financiero</div></div>
    <div className="absolute left-[20%] bottom-[18%] z-30 w-[180px] rotate-[-2deg] rounded-xl bg-white p-4 shadow-[0_20px_36px_-15px_rgba(18,59,99,.48)]"><div className="flex items-center gap-2 text-sm font-extrabold text-[#123B63]"><Car className="h-5 w-5 text-[#1264A3]" />Seguro de auto</div><div className="mt-2 h-2 w-4/5 rounded-full bg-[#E7EEF4]" /><div className="mt-2 h-2 w-3/5 rounded-full bg-[#EEF3F7]" /></div>
    <div className="absolute right-5 bottom-5 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-[#102E54] text-center font-mono text-[8px] font-bold leading-tight text-white shadow-lg">GUÍA<br />VERIFICADA<br />2026</div>
  </div>;
}

function Hero() {
  return <section className="overflow-hidden bg-[linear-gradient(115deg,#F3FAFF_0%,#FFFFFF_62%,#EAF7FC_100%)]">
    <div className="mx-auto grid max-w-[1180px] items-stretch lg:grid-cols-[1.02fr_.98fr]">
      <div className="px-5 py-12 sm:px-7 sm:py-16 lg:flex lg:flex-col lg:justify-center lg:py-[58px]">
        <Eyebrow>TU PUNTO DE PARTIDA FINANCIERO EN EE.UU.</Eyebrow>
        <h1 className="max-w-[640px] font-display text-[2.7rem] leading-[1.04] font-extrabold tracking-[-0.045em] text-[#102E54] sm:text-[3.35rem]">Tus finanzas en EE.UU.,<br />explicadas claro.</h1>
        <p className="mt-5 max-w-[520px] text-[1rem] leading-6 text-[#506780] sm:text-[1.04rem] sm:leading-7">Guías prácticas para construir crédito, conseguir seguro, abrir cuentas y manejar tus impuestos, aunque estés empezando desde cero.</p>
        <div className="mt-6 flex flex-wrap gap-3"><Link to="/articulos" className="inline-flex items-center gap-2 rounded-lg bg-[#FF6F1E] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_24px_-15px_rgba(255,111,30,.9)] hover:bg-[#E95D0E]">Explorar guías <ArrowRight className="h-4 w-4" /></Link><Link to="/categoria/credito" className="inline-flex items-center gap-2 rounded-lg border border-[#54718D] bg-white px-5 py-3.5 text-sm font-extrabold text-[#173B61]">Empezar por crédito</Link></div>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">{TRUST.map(t => <li key={t} className="flex items-center gap-2 text-xs font-semibold text-[#52677D]"><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#119875]"><Check className="h-3 w-3 text-white" strokeWidth={3} /></span>{t}</li>)}</ul>
      </div>
      <HeroVisual />
    </div>
  </section>;
}

function TopicCard({ slug, name, description }: { slug: string; name: string; description: string }) {
  const Icon = categoryIcons[slug] ?? BookOpen;
  return <Link to={`/categoria/${slug}`} className="group rounded-xl border border-[#D7E1EA] bg-white p-4.5 shadow-[0_4px_18px_-15px_rgba(16,46,84,.35)] transition hover:-translate-y-0.5 hover:shadow-lg"><span className={`flex h-12 w-12 items-center justify-center rounded-xl ${categoryTone[slug] ?? "bg-[#EEF4F9] text-[#1264A3]"}`}><Icon className="h-6 w-6" /></span><h3 className="mt-3 font-display text-[1rem] font-extrabold text-[#123B63]">{name}</h3><p className="mt-1.5 line-clamp-2 text-[11px] leading-4.5 text-[#61758A]">{description}</p><span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#007D68] group-hover:gap-2">Explorar <ArrowRight className="h-3.5 w-3.5" /></span></Link>;
}

function FinancialPath() {
  const steps = [
    ["01", "Consigue tus documentos", "ITIN · Matrícula consular · Identificación", FileText],
    ["02", "Abre tu primera cuenta", "Bancos · Cuentas · Remesas", Landmark],
    ["03", "Construye crédito", "Secured cards · Score · Historial", CreditCard],
    ["04", "Protege tu dinero", "Seguro · Préstamos · Impuestos", ShieldCheck],
  ] as const;
  return <section className="mx-auto max-w-[1180px] px-5 py-5 sm:px-7 sm:py-7"><div className="rounded-2xl bg-[#EDF9F5] p-6 sm:p-8"><div className="grid gap-7 lg:grid-cols-[.8fr_1.6fr] lg:items-center"><div className="border-b border-[#CDE7DF] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8"><Eyebrow>EMPIEZA AQUÍ</Eyebrow><h2 className="font-display text-[1.8rem] leading-tight font-extrabold text-[#102E54]">Tu camino financiero<br />en EE.UU.</h2><p className="mt-3 max-w-[280px] text-sm leading-5.5 text-[#536C7F]">Sigue estos 4 pasos y construye una base financiera sólida, paso a paso.</p><Link to="/articulos" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#008F73] px-5 py-3 text-xs font-extrabold text-white">Ver guía completa <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-5 sm:grid-cols-4">{steps.map(([n,title,desc,Icon], i) => <div key={n} className="relative text-center">{i < 3 && <span className="absolute right-[-12px] top-8 hidden text-xl text-[#008F73] sm:block">→</span>}<div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D8F2EA] text-[#008F73]"><span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#008F73] font-mono text-[10px] font-bold text-white">{n}</span><Icon className="h-7 w-7" /></div><h3 className="mx-auto mt-3 max-w-[150px] font-display text-xs font-extrabold leading-4 text-[#123B63]">{title}</h3><p className="mt-2 text-[9px] leading-3.5 text-[#5D7388]">{desc}</p></div>)}</div></div></div></section>;
}

function Index() {
  useSeo({ title: `${SITE.name} — Dinero y seguros en español`, description: "Guías claras en español sobre crédito, bancos, seguros, préstamos, impuestos e ITIN para hispanos e inmigrantes en Estados Unidos.", path: "/" });
  const featured = getFeaturedArticles(4);
  return <>
    <Hero />
    <section className="mx-auto max-w-[1180px] px-5 py-7 sm:px-7 sm:py-9"><div className="mb-5 flex items-end justify-between gap-4"><div><Eyebrow>QUÉ NECESITAS RESOLVER</Eyebrow><h2 className="font-display text-[1.8rem] font-extrabold text-[#102E54]">Explora por tema</h2></div><Link to="/articulos" className="hidden items-center gap-1 text-xs font-bold text-[#006ED6] sm:inline-flex">Ver todas las guías <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.map(c => <TopicCard key={c.slug} slug={c.slug} name={c.name === "Banca y Documentos" ? "Bancos" : c.name} description={c.description} />)}<TopicCard slug="mas-guias" name="Más guías" description="Documentos, mejores tarjetas, trámites y mucho más." /></div></section>
    <FinancialPath />
    <section className="mx-auto max-w-[1180px] px-5 py-8 sm:px-7 sm:py-10"><div className="mb-5 flex items-end justify-between gap-4"><div><Eyebrow>GUÍAS DESTACADAS</Eyebrow><h2 className="font-display text-[1.8rem] font-extrabold text-[#102E54]">Lo más leído</h2></div><Link to="/articulos" className="inline-flex items-center gap-1 text-xs font-bold text-[#006ED6]">Ver todas las guías <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{featured.map(a => <ArticleCard key={a.slug} article={a} />)}</div></section>
    <section className="mx-auto max-w-[1180px] px-5 pb-10 sm:px-7"><div className="flex flex-col gap-4 rounded-xl bg-[#EFF8FE] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCEEFF] text-[#1264A3]"><ShieldCheck className="h-6 w-6" /></span><div><h2 className="font-display text-sm font-extrabold text-[#123B63]">¿Necesitas ayuda personalizada?</h2><p className="mt-1 max-w-[600px] text-[11px] leading-4 text-[#5E748A]">Nuestras guías te dan el camino, pero también puedes encontrar asesoría financiera y contable especializada para inmigrantes.</p></div></div><Link to="/contacto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#1264A3] bg-white px-5 py-3 text-[11px] font-bold text-[#123B63]">Ver recursos y contactos <ArrowRight className="h-3.5 w-3.5" /></Link></div></section>
  </>;
}

export default Index;
