import { Link } from "wouter";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { categories } from "../content/categories";
import { articles, getFeaturedArticles } from "../content/articles";
import { CategoryIcon } from "../components/category-icon";
import { ArticleCard, ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";
import { SITE } from "../lib/site";

const TRUST = ["100% en español", "Pensado para inmigrantes", "Información gratuita"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      <span className="h-0.5 w-6 bg-[var(--marigold-deep)]" aria-hidden="true" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(180deg,#fff_0%,#f6f7f5_100%)] py-12 md:py-16 lg:py-[72px]">
      <div className="pointer-events-none absolute -top-28 -right-24 h-72 w-72 rounded-full bg-[var(--marigold)]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 -left-28 h-64 w-64 rounded-full bg-[var(--teal)]/8 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 px-5 md:px-7 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-mono text-[0.68rem] font-medium tracking-[0.1em] text-muted-foreground shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" aria-hidden="true" />
            FINANZAS CLARAS PARA EMPEZAR EN EE.UU.
          </span>
          <h1 className="max-w-[780px] font-display text-[2.45rem] leading-[1.04] font-bold tracking-[-0.035em] text-foreground sm:text-[3rem] md:text-[3.65rem]">
            Tu dinero y tus seguros,
            <span className="relative ml-2 inline-block text-[var(--marigold-deep)]">
              explicados claro.
              <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-[var(--marigold)]/35" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-6 max-w-[54ch] text-[1.06rem] leading-7 text-muted-foreground md:text-[1.12rem]">
            Guías prácticas para construir crédito, abrir una cuenta, conseguir un seguro, financiar un carro y entender tus impuestos en Estados Unidos.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/articulos" className="group inline-flex items-center gap-2 rounded-xl bg-[var(--navy-deep)] px-5 py-3.5 text-[0.92rem] font-bold text-white shadow-[0_10px_24px_-12px_rgba(10,25,48,.55)] transition-transform hover:-translate-y-0.5">
              Explorar guías <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/categoria/credito" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3.5 text-[0.92rem] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/40">
              Empezar por el crédito
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.8rem] font-semibold text-muted-foreground">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--teal)]">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-[310px] w-full max-w-[440px] lg:h-[390px]" aria-hidden="true">
          <div className="absolute top-3 left-3 w-[245px] -rotate-6 rounded-2xl border border-border bg-white p-5 shadow-[0_22px_50px_-20px_rgba(16,35,61,.28)] md:left-7 md:w-[275px]">
            <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase"><span>Crédito</span><span>ITIN → SSN</span></div>
            <div className="mt-3 font-display text-[2rem] font-bold">720</div>
            <div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-2 w-[72%] rounded-full bg-[var(--teal)]" /></div>
            <div className="mt-3 text-[0.76rem] font-medium text-muted-foreground">Historial consolidado ✓</div>
          </div>
          <div className="absolute top-[92px] right-0 z-10 w-[235px] rotate-3 rounded-2xl border border-border border-t-4 border-t-[var(--marigold)] bg-white p-5 shadow-[0_22px_50px_-20px_rgba(16,35,61,.28)] md:w-[265px]">
            <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase"><span>Seguro auto</span><span>Guía 2026</span></div>
            <div className="mt-3 font-display text-[1.65rem] font-bold">Compara</div>
            <div className="mt-2 text-[0.76rem] leading-5 text-muted-foreground">Coberturas, requisitos y precios explicados sin letra pequeña.</div>
          </div>
          <div className="absolute bottom-1 left-7 z-20 w-[250px] -rotate-2 rounded-2xl border border-border border-t-4 border-t-[var(--blue)] bg-white p-5 shadow-[0_22px_50px_-20px_rgba(16,35,61,.28)] md:left-14 md:w-[285px]">
            <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase"><span>Tu ruta</span><span>04 pasos</span></div>
            <div className="mt-3 font-display text-[1.45rem] font-bold">Cuenta → Crédito</div>
            <div className="mt-2 text-[0.76rem] text-muted-foreground">Documentos · banca · crédito · protección</div>
          </div>
          <div className="absolute right-2 bottom-5 z-30 flex h-[70px] w-[70px] rotate-6 items-center justify-center rounded-full bg-[var(--navy-deep)] text-center font-mono text-[0.56rem] font-medium leading-tight text-white shadow-xl md:right-0">GUÍAS<br />ACTUALIZADAS<br />2026</div>
        </div>
      </div>
    </section>
  );
}

function FinancialPath() {
  const steps = [
    ["01", "Consigue tus documentos", "ITIN, licencia, matrícula consular y lo que necesitas para empezar."],
    ["02", "Abre tu primera cuenta", "Compara opciones de banca y aprende qué documentos aceptan."],
    ["03", "Construye crédito", "Empieza desde cero y aprende a proteger tu puntaje."],
    ["04", "Protege tu dinero", "Seguro, préstamos e impuestos explicados en español."],
  ];
  return (
    <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-7 md:py-16">
      <div className="rounded-3xl bg-[var(--navy-deep)] p-6 text-white md:p-9">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div>
            <Eyebrow>Tu camino financiero</Eyebrow>
            <h2 className="font-display text-2xl font-bold md:text-[2rem]">De empezar de cero a tomar el control.</h2>
            <p className="mt-3 max-w-[42ch] text-sm leading-6 text-white/65">No tienes que aprenderlo todo de golpe. Empieza por el paso que necesitas hoy.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {steps.map(([num, title, text]) => (
              <div key={num} className="bg-white/[.045] p-5 transition-colors hover:bg-white/[.08]">
                <div className="font-mono text-xs text-[var(--marigold)]">{num}</div>
                <h3 className="mt-2 font-display text-base font-bold">{title}</h3>
                <p className="mt-2 text-[0.78rem] leading-5 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  useSeo({
    title: `${SITE.name} — Dinero y seguros en español`,
    description: "Guías claras en español sobre crédito, bancos, seguros, préstamos, impuestos e ITIN para hispanos e inmigrantes en Estados Unidos.",
    path: "/",
  });
  const featured = getFeaturedArticles(3);
  const recent = articles.slice(3, 9);

  return (
    <>
      <Hero />
      <FinancialPath />
      <section className="mx-auto max-w-[1180px] px-5 pb-12 md:px-7 md:pb-14">
        <div className="mb-8 max-w-[640px]"><Eyebrow>Empieza por aquí</Eyebrow><h2 className="font-display text-2xl font-bold md:text-[2rem]">¿Qué necesitas resolver hoy?</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} to={`/categoria/${c.slug}`} data-cat={c.slug} className="group relative overflow-hidden rounded-2xl border border-border bg-card px-4 py-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_34px_-16px_rgba(16,35,61,.22)]">
              <span className="absolute inset-x-0 top-0 h-1 bg-[var(--cat-accent)]" aria-hidden="true" />
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cat-accent)]/10 text-[var(--cat-accent)]"><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-[0.98rem] font-bold">{c.name}</h3>
              <p className="mt-2 line-clamp-3 text-[0.8rem] leading-5 text-muted-foreground">{c.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[0.76rem] font-bold text-[var(--cat-accent)]">Ver guías <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-[1180px] px-5 md:px-7"><AdSlot variant="leaderboard" /></div>
      <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-7 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><Eyebrow>Lo mejor del sitio</Eyebrow><h2 className="font-display text-2xl font-bold md:text-[2rem]">Guías destacadas</h2></div><Link to="/articulos" className="inline-flex items-center gap-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold hover:border-foreground/40">Ver todas <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-5 md:grid-cols-3">{featured.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
      </section>
      <section className="mx-auto max-w-[1180px] px-5 pb-12 md:px-7 md:pb-14">
        <div className="mb-8"><Eyebrow>Recién publicado</Eyebrow><h2 className="font-display text-2xl font-bold md:text-[2rem]">Lo más reciente</h2></div>
        <div className="flex flex-col border-t border-border">{recent.map((a) => <ArticleRow key={a.slug} article={a} />)}</div>
      </section>
      <div className="mx-auto max-w-[1180px] px-5 pb-12 md:px-7"><AdSlot variant="leaderboard" /></div>
    </>
  );
}

export default Index;
