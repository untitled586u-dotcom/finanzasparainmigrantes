import { Link } from "wouter";
import { Check } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { categories } from "../content/categories";
import { articles, getFeaturedArticles } from "../content/articles";
import { CategoryIcon } from "../components/category-icon";
import { ArticleCard, ArticleRow } from "../components/article-card";
import { AdSlot } from "../components/ad-slot";
import { SITE } from "../lib/site";

const TRUST = ["100% en español", "Enfocado en inmigrantes", "Información gratuita"];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.1em] text-muted-foreground uppercase">
      <span className="h-0.5 w-5 bg-[var(--marigold-deep)]" aria-hidden="true" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden py-14 md:py-[76px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-7 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-full border-[1.5px] border-foreground px-3.5 py-1.5 font-mono text-[0.72rem] font-medium tracking-wide">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--teal)]" aria-hidden="true" />
            SIN SSN · CON ITIN · EN ESPAÑOL
          </span>
          <h1 className="font-display text-[2.3rem] leading-[1.06] font-bold tracking-[-0.01em] text-foreground md:text-[3.4rem]">
            Tu dinero y tus seguros,{" "}
            <span className="text-[var(--marigold-deep)] underline decoration-[var(--marigold)] decoration-[6px] underline-offset-4">
              explicados claro
            </span>{" "}
            para hispanos en EE.UU.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.08rem] text-muted-foreground">
            Guías prácticas para asegurar tu carro, construir crédito desde cero,
            conseguir préstamos y manejar tu banca aunque apenas estés empezando en
            Estados Unidos. Gratis y sin letra chiquita.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/articulos"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--marigold)] px-6 py-3.5 text-[0.94rem] font-bold text-[var(--navy-deep)] transition-transform hover:-translate-y-0.5"
            >
              Explorar guías <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/categoria/credito"
              className="inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-border px-6 py-3.5 text-[0.94rem] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground"
            >
              Empezar por el crédito
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.85rem] font-semibold text-muted-foreground">
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--teal)]">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Tarjetas «documento» apiladas: refuerzan que el sitio va de trámites reales. */}
        <div className="relative order-first h-[320px] lg:order-none lg:h-[400px]" aria-hidden="true">
          <div className="absolute top-2.5 left-4 w-[250px] -rotate-6 rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_-14px_rgba(16,35,61,0.18)] md:left-10 md:w-[280px]">
            <div className="flex justify-between font-mono text-[0.66rem] tracking-[0.08em] text-muted-foreground uppercase">
              <span>Score</span><span>ITIN → SSN</span>
            </div>
            <div className="mt-3.5 font-display text-[1.7rem] font-bold">720</div>
            <div className="mt-4 h-2 rounded-md bg-secondary">
              <div className="h-2 w-[72%] rounded-md bg-[var(--teal)]" />
            </div>
            <div className="mt-4 text-[0.78rem] text-muted-foreground">Historial consolidado ✓</div>
          </div>
          <div className="absolute top-16 right-0 z-2 w-[240px] rotate-5 rounded-2xl border border-border border-t-4 border-t-[var(--marigold)] bg-card p-5 shadow-[0_16px_40px_-14px_rgba(16,35,61,0.18)] md:w-[265px]">
            <div className="flex justify-between font-mono text-[0.66rem] tracking-[0.08em] text-muted-foreground uppercase">
              <span>Seguro auto</span><span>SR-22</span>
            </div>
            <div className="mt-3.5 font-display text-[1.7rem] font-bold">
              $89<span className="text-[0.9rem] font-medium">/mes</span>
            </div>
            <div className="mt-4 text-[0.78rem] text-muted-foreground">
              Cobertura completa, sin licencia americana
            </div>
          </div>
          <div className="absolute bottom-0 left-8 z-3 w-[250px] -rotate-2 rounded-2xl border border-border border-t-4 border-t-[var(--blue)] bg-card p-5 shadow-[0_16px_40px_-14px_rgba(16,35,61,0.18)] md:left-[70px] md:w-[280px]">
            <div className="flex justify-between font-mono text-[0.66rem] tracking-[0.08em] text-muted-foreground uppercase">
              <span>Remesa</span><span>México</span>
            </div>
            <div className="mt-3.5 font-display text-[1.7rem] font-bold">0% comisión oculta</div>
            <div className="mt-4 text-[0.78rem] text-muted-foreground">Comparado hoy · 3 apps</div>
          </div>
          <div className="absolute right-4 bottom-6 z-4 flex h-[74px] w-[74px] rotate-6 items-center justify-center rounded-full bg-[var(--navy-deep)] p-1.5 text-center font-mono text-[0.58rem] leading-tight text-white shadow-[0_12px_26px_-8px_rgba(10,25,48,0.5)] md:right-6">
            GUÍA VERIFICADA 2026
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  useSeo({
    title: `${SITE.name} — Dinero y seguros en español`,
    description: SITE.description,
    path: "/",
  });
  const featured = getFeaturedArticles(3);
  const recent = articles.slice(3, 9);

  return (
    <>
      <Hero />

      {/* Categorías */}
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-7">
        <div className="mb-9 max-w-[640px]">
          <Eyebrow>Empieza por aquí</Eyebrow>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-[2rem]">
            ¿Qué necesitas resolver hoy?
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/categoria/${c.slug}`}
              data-cat={c.slug}
              className="group relative overflow-hidden rounded-[var(--radius)] border border-border bg-card px-4.5 py-5.5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_34px_-16px_rgba(16,35,61,0.22)]"
            >
              <span
                className="absolute inset-x-0 top-0 h-[5px] bg-[var(--cat-accent)]"
                aria-hidden="true"
              />
              <span
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] text-[var(--cat-accent)]"
                style={{ background: "color-mix(in srgb, var(--cat-accent) 16%, white)" }}
              >
                <CategoryIcon name={c.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-[0.98rem] font-bold text-foreground">{c.name}</h3>
              <p className="mt-2 line-clamp-3 text-[0.82rem] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <span className="mt-3.5 flex items-center gap-1.5 text-[0.78rem] font-bold text-[var(--cat-accent)]">
                Ver guías <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-5 md:px-7">
        <AdSlot variant="leaderboard" />
      </div>

      {/* Destacados */}
      <section className="mx-auto max-w-[1180px] px-5 py-14 md:px-7">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Lo mejor del sitio</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-[2rem]">
              Guías destacadas
            </h2>
          </div>
          <Link
            to="/articulos"
            className="rounded-[10px] border-[1.5px] border-border px-4.5 py-2.5 text-[0.9rem] font-bold transition-colors hover:border-foreground"
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Recientes */}
      <section className="mx-auto max-w-[1180px] px-5 pb-10 md:px-7">
        <div className="mb-9 max-w-[640px]">
          <Eyebrow>Recién publicado</Eyebrow>
          <h2 className="font-display text-2xl font-bold text-foreground md:text-[2rem]">
            Lo más reciente
          </h2>
        </div>
        <div className="flex flex-col border-t border-border">
          {recent.map((a) => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-5 pb-12 md:px-7">
        <AdSlot variant="leaderboard" />
      </div>
    </>
  );
}

export default Index;
