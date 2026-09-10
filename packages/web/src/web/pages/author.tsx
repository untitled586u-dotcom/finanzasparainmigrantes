import { Link } from "wouter";
import { Mail, BookOpen, ShieldCheck } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";
import { AUTHOR } from "../lib/author";
import { articles } from "../content/articles";
import { ArticleCard } from "../components/article-card";
import { LogoMark } from "../components/logo";
import { EmailAddress, MailLink } from "../components/mail-link";

export default function AuthorPage() {
  const url = `${SITE.url}/autor/${AUTHOR.slug}`;

  useSeo({
    title: "La Redacción de Finanzas Para Inmigrantes",
    description: AUTHOR.short,
    path: `/autor/${AUTHOR.slug}`,
    jsonLd: [
      AUTHOR.isBrand
        ? {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.name,
            description: AUTHOR.short,
            url,
            logo: {
              "@type": "ImageObject",
              url: `${SITE.url}/icon-512.png`,
            },
            ...(AUTHOR.links.length
              ? { sameAs: AUTHOR.links.map((l) => l.url) }
              : {}),
          }
        : {
            "@context": "https://schema.org",
            "@type": "Person",
            name: AUTHOR.name,
            jobTitle: AUTHOR.role,
            description: AUTHOR.short,
            url,
            image: `${SITE.url}${AUTHOR.photo}`,
            worksFor: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
            },
            ...(AUTHOR.links.length
              ? { sameAs: AUTHOR.links.map((l) => l.url) }
              : {}),
          },
    ],
  });

  const latest = articles.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {AUTHOR.isBrand ? (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-border bg-primary/10">
            <LogoMark className="h-16 w-16" />
          </div>
        ) : (
          <img
            src={AUTHOR.photo}
            alt={AUTHOR.name}
            width={112}
            height={112}
            loading="eager"
            className="h-28 w-28 shrink-0 rounded-2xl border border-border bg-secondary object-cover"
          />
        )}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {AUTHOR.isBrand ? "Quién está detrás" : "Quién escribe"}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground">
            {AUTHOR.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{AUTHOR.role}</p>
        </div>
      </div>

      <div className="prose-article mt-8 max-w-none">
        {AUTHOR.bio.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Fuentes y enfoque editorial
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Investigamos cada guía con información pública y fuentes primarias cuando están disponibles. Para temas financieros, fiscales y de seguros priorizamos organismos oficiales, reguladores, contratos y condiciones publicadas por las entidades correspondientes.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              No presentamos el contenido como asesoría legal, fiscal o financiera personalizada. Cuando una situación depende del estado, del estatus migratorio o de circunstancias individuales, lo indicamos y recomendamos verificar los requisitos aplicables.
            </p>
          </div>
        </div>
      </section>

      {AUTHOR.links.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-3">
          {AUTHOR.links.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                rel="me noopener"
                target="_blank"
                className="rounded-xl border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/politica-editorial"
          className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>
            <span className="block font-semibold">Cómo trabajamos</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Nuestro proceso editorial y las fuentes que usamos.
            </span>
          </span>
        </Link>
        <MailLink className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>
            <span className="block font-semibold">
              {AUTHOR.isBrand ? "Escríbenos" : "Escríbeme"}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              <EmailAddress />
            </span>
          </span>
        </MailLink>
      </div>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Últimas guías
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
