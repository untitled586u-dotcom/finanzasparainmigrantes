import { ArrowRight, FileText, Landmark, ShieldCheck, CreditCard, Car, Receipt, HandCoins } from "lucide-react";
import { Link } from "wouter";
import { useSeo } from "../hooks/use-seo";
import { ArticleCard } from "../components/article-card";
import { getFeaturedArticles } from "../content/articles";

const topicCards = [
  { title: "Seguro de auto", description: "Compara coberturas, requisitos y opciones para inmigrantes.", href: "/categoria/seguros", icon: Car, tone: "text-[#0B9A78] bg-[#EAF8F2]" },
  { title: "Crédito", description: "Construye crédito y mejora tu puntaje aunque empieces desde cero.", href: "/categoria/credito", icon: CreditCard, tone: "text-[#1264A3] bg-[#F1F8FD]" },
  { title: "Bancos", description: "Abre cuentas, entiende requisitos y organiza tus primeros pasos.", href: "/categoria/banca", icon: Landmark, tone: "text-[#1264A3] bg-[#F1F8FD]" },
  { title: "Préstamos", description: "Opciones para carro, casa y préstamos personales con ITIN.", href: "/categoria/prestamos", icon: HandCoins, tone: "text-[#F28C28] bg-[#FFF5E9]" },
  { title: "Impuestos e ITIN", description: "Entiende el ITIN, tus taxes y los trámites más importantes.", href: "/categoria/impuestos", icon: Receipt, tone: "text-[#7A4DD8] bg-[#F4EEFF]" },
  { title: "Más guías", description: "Remesas, documentos y recursos para seguir avanzando.", href: "/articulos", icon: ShieldCheck, tone: "text-[#E44736] bg-[#FFF0EE]" },
];

const pathSteps = [
  ["01", "Consigue tus documentos", "ITIN · matrícula consular", FileText],
  ["02", "Abre tu primera cuenta", "Bancos · cuentas sin SSN", Landmark],
  ["03", "Construye crédito", "Tarjetas · puntaje · reportes", CreditCard],
  ["04", "Protege tu dinero", "Seguro · impuestos · remesas", ShieldCheck],
] as const;

export default function HomePage() {
  const featured = getFeaturedArticles(4);
  useSeo({
    title: "Finanzas Para Inmigrantes: finanzas y seguros en EE.UU.",
    description: "Guías prácticas en español para inmigrantes en EE.UU.: crédito, bancos, seguros, préstamos, remesas, impuestos e ITIN.",
    path: "/",
  });

  return (
    <main className="bg-white text-[#123B63]">
      <section className="overflow-hidden bg-[#F1F8FD]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-7 px-4 py-7 sm:px-5 sm:py-9 md:gap-10 md:px-7 md:py-12 lg:grid-cols-[1fr_1fr] lg:py-14">
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-[0.61rem] font-bold tracking-[0.11em] text-[#1264A3] sm:mb-4 sm:text-[0.66rem]"><span className="h-0.5 w-6 bg-[#F28C28]" /> TU PUNTO DE PARTIDA FINANCIERO EN EE.UU.</div>
            <h1 className="max-w-[620px] font-display text-[2.15rem] font-bold leading-[1.03] tracking-[-0.035em] sm:text-[2.55rem] md:text-[3.55rem]">Tus finanzas en EE.UU., explicadas claro.</h1>
            <p className="mt-4 max-w-[575px] text-[0.96rem] leading-6 text-[#52657A] sm:text-[1rem] sm:leading-7">Guías prácticas para construir crédito, conseguir seguro, abrir cuentas y manejar tus impuestos, aunque estés empezando desde cero.</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3"><Link href="/articulos" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#F28C28] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5">Explorar guías <ArrowRight className="h-4 w-4" /></Link><Link href="/categoria/credito" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#B9CBD9] bg-white px-5 py-2.5 text-sm font-bold text-[#123B63] hover:border-[#1264A3]">Empezar por crédito</Link></div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.69rem] font-semibold text-[#52657A] sm:mt-6 sm:gap-x-6"><span>✓ 100% en español</span><span>✓ Enfocado en inmigrantes</span><span>✓ Información gratuita</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[540px] lg:pl-3">
            <img src="/images/home-hero.webp" alt="Mujer hispana en Nueva York junto a tarjetas sobre crédito, ITIN y seguro de auto" className="block w-full rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(18,59,99,.14)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-5 sm:py-10 md:px-7 md:py-12">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6"><div><div className="mb-1.5 font-mono text-[0.61rem] font-bold tracking-[0.11em] text-[#1264A3] sm:text-[0.66rem]">QUÉ NECESITAS RESOLVER</div><h2 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">Explora por tema</h2></div><Link href="/articulos" className="hidden items-center gap-1 text-[0.7rem] font-bold text-[#1264A3] sm:flex">Ver todas las guías <ArrowRight className="h-3.5 w-3.5" /></Link></div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {topicCards.map(({ title, description, href, icon: Icon, tone }) => <Link key={title} href={href} className="group rounded-xl border border-[#DCE6EE] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#AFC8D8] hover:shadow-md"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span><h3 className="mt-3 font-display text-[1.05rem] font-bold sm:mt-3.5 sm:text-lg">{title}</h3><p className="mt-1.5 text-[0.72rem] leading-5 text-[#617388]">{description}</p><span className="mt-2.5 inline-flex items-center gap-1 text-[0.7rem] font-bold text-[#1264A3]">Explorar <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></Link>)}
        </div>
      </section>

      <section className="bg-[#EAF8F2]"><div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-5 sm:py-9 md:px-7 md:py-10"><div className="grid gap-7 lg:grid-cols-[.85fr_1.7fr] lg:items-center"><div><div className="mb-1.5 font-mono text-[0.61rem] font-bold tracking-[0.11em] text-[#0B9A78] sm:text-[0.66rem]">EMPIEZA AQUÍ</div><h2 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">Tu camino financiero en EE.UU.</h2><p className="mt-2 max-w-[330px] text-[0.75rem] leading-5 text-[#617388]">Cuatro pasos para ordenar tus finanzas y construir una base segura.</p><Link href="/articulos" className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#0B9A78] px-4 py-2 text-[0.7rem] font-bold text-white">Ver guía completa <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">{pathSteps.map(([num, label, detail, Icon]) => <div key={num}><span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1264A3] shadow-sm sm:h-12 sm:w-12"><Icon className="h-5 w-5" /></span><div className="mt-2 font-mono text-[0.58rem] font-bold text-[#718196] sm:mt-2.5">{num}</div><div className="mt-1 text-[0.78rem] font-bold leading-5">{label}</div><div className="mt-1 text-[0.62rem] leading-4 text-[#617388]">{detail}</div></div>)}</div></div></div></section>

      <section className="mx-auto max-w-[1180px] px-4 py-8 sm:px-5 sm:py-10 md:px-7 md:py-12"><div className="mb-5 flex items-end justify-between gap-4 sm:mb-6"><div><div className="mb-1.5 font-mono text-[0.61rem] font-bold tracking-[0.11em] text-[#1264A3] sm:text-[0.66rem]">GUÍAS DESTACADAS</div><h2 className="font-display text-2xl font-bold sm:text-3xl">Lo más leído</h2></div><Link href="/articulos" className="hidden items-center gap-1 text-[0.7rem] font-bold text-[#1264A3] sm:flex">Ver todas las guías <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{featured.map((article) => <ArticleCard key={article.slug} article={article} headingLevel={3} />)}</div></section>

      <section className="mx-auto max-w-[1180px] px-4 pb-8 sm:px-5 sm:pb-10 md:px-7"><div className="flex flex-col gap-4 rounded-xl bg-[#F1F8FD] p-5 sm:gap-5 sm:p-6 md:flex-row md:items-center md:justify-between"><div><div className="font-mono text-[0.61rem] font-bold tracking-[0.11em] text-[#1264A3] sm:text-[0.66rem]">RECURSOS</div><h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">¿Necesitas ayuda personalizada?</h2><p className="mt-1 text-[0.72rem] text-[#617388]">Encuentra recursos y contactos útiles para tu siguiente paso.</p></div><Link href="/articulos" className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#B9CBD9] bg-white px-4 py-2.5 text-[0.7rem] font-bold text-[#123B63]">Ver recursos y contactos <ArrowRight className="h-3.5 w-3.5" /></Link></div></section>
    </main>
  );
}
