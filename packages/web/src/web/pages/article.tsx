import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { getArticle, getRelatedArticles } from "../content/articles";
import { loadArticleBody, getPreloadedBody } from "../content/bodies";
import { getCategory } from "../content/categories";
import { AdSlot } from "../components/ad-slot";
import { AuthorBox } from "../components/author-byline";
import { AUTHOR } from "../lib/author";
import { formatDate, formatDateShort, SITE } from "../lib/site";
import {
  articleComponents,
  faqFromMarkdown,
  remarkArticle,
  tocFromMarkdown,
} from "../lib/markdown";
import NotFound from "./not-found";

const md = (content: string) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkArticle]}
    components={articleComponents}
  >
    {content}
  </ReactMarkdown>
);

/** Iniciales para el avatar de la firma. */
const INITIALS = AUTHOR.isBrand ? "FI" : AUTHOR.name.slice(0, 2).toUpperCase();

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug);
  const category = article ? getCategory(article.category) : undefined;

  // El markdown se descarga bajo demanda (no viaja en el bundle inicial).
  // En el pre-render ya está disponible de forma síncrona, así que el HTML
  // estático incluye el artículo completo en lugar del esqueleto de carga.
  const [body, setBody] = useState<string | null>(() => getPreloadedBody(slug));
  useEffect(() => {
    let active = true;
    const preloaded = getPreloadedBody(slug);
    setBody(preloaded);
    if (!slug || preloaded) return;
    loadArticleBody(slug).then((text) => {
      if (active) setBody(text);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const toc = useMemo(() => (body ? tocFromMarkdown(body) : []), [body]);
  const faq = useMemo(() => (body ? faqFromMarkdown(body) : []), [body]);

  const jsonLd = useMemo(() => {
    if (!article) return undefined;
    const url = `${SITE.url}/articulo/${article.slug}`;
    const graph: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: "es",
        keywords: article.keywords.join(", "),
        image: SITE.ogImage,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: {
          "@type": AUTHOR.isBrand ? "Organization" : "Person",
          name: AUTHOR.isBrand ? SITE.name : AUTHOR.name,
          url: `${SITE.url}/autor/${AUTHOR.slug}`,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png` },
        },
        articleSection: category?.name,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
          ...(category
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category.name,
                  item: `${SITE.url}/categoria/${category.slug}`,
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: category ? 3 : 2,
            name: article.title,
            item: url,
          },
        ],
      },
    ];

    if (faq.length > 0) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    return graph;
  }, [article, category, faq]);

  useSeo({
    title: article ? (article.seoTitle ?? article.title) : "Artículo",
    description: article?.description,
    path: article ? `/articulo/${article.slug}` : "/",
    type: "article",
    keywords: article?.keywords,
    jsonLd,
  });

  if (!article) return <NotFound />;

  const related = getRelatedArticles(article, 4);

  // Divide el contenido en secciones (##) para insertar un anuncio a mitad.
  const sections = (body ?? "").split(/\n(?=## )/);
  const splitAt = Math.min(2, Math.max(1, Math.floor(sections.length / 2)));
  const firstHalf = sections.slice(0, splitAt).join("\n");
  const secondHalf = sections.slice(splitAt).join("\n");

  return (
    <div data-cat={article.category} className="mx-auto max-w-[1180px] px-5 md:px-7">
      <nav
        aria-label="Ruta de navegación"
        className="flex flex-wrap items-center gap-2 py-4 font-mono text-[0.75rem] text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <span className="opacity-50" aria-hidden="true">/</span>
        {category && (
          <>
            <Link to={`/categoria/${category.slug}`} className="hover:text-foreground">
              {category.name}
            </Link>
            <span className="opacity-50" aria-hidden="true">/</span>
          </>
        )}
        <span className="font-semibold text-foreground">{article.title}</span>
      </nav>

      <header className="max-w-[820px] pt-2.5 pb-8">
        {category && (
          <Link
            to={`/categoria/${category.slug}`}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.76rem] font-bold text-[var(--cat-accent)]"
            style={{ background: "color-mix(in srgb, var(--cat-accent) 15%, white)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--cat-accent)]" aria-hidden="true" />
            {category.name}
          </Link>
        )}
        <h1 className="font-display text-[1.9rem] leading-[1.16] font-bold text-foreground md:text-[2.7rem]">
          {article.title}
        </h1>
        <p className="mt-4 max-w-[70ch] text-[1.08rem] text-muted-foreground">
          {article.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3.5">
          <Link
            to={`/autor/${AUTHOR.slug}`}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[var(--navy-deep)] font-display text-[0.85rem] font-bold text-white"
            aria-hidden="true"
          >
            {INITIALS}
          </Link>
          <div className="text-[0.85rem]">
            <Link to={`/autor/${AUTHOR.slug}`} className="font-bold hover:underline">
              {AUTHOR.isBrand ? `Redacción de ${SITE.name}` : AUTHOR.name}
            </Link>
            <div className="mt-0.5 font-mono text-[0.74rem] text-muted-foreground">
              {article.readMinutes} min de lectura · Actualizado {formatDateShort(article.date)}
            </div>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-10 pb-16 lg:grid-cols-[1fr_300px] lg:gap-14">
        <article>
          <div className="art-visual mb-9 h-[160px] rounded-[var(--radius)] md:h-[220px]">
            <span className="absolute bottom-5 left-6 z-10 rounded-[10px] bg-[rgba(10,25,48,0.55)] px-3.5 py-2 font-mono text-[0.78rem] text-white backdrop-blur-[3px]">
              {category?.name} · {formatDate(article.date)}
            </span>
          </div>

          {body === null ? (
            <div className="space-y-3" aria-busy="true">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
              <div className="h-4 w-10/12 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-9/12 animate-pulse rounded bg-muted" />
            </div>
          ) : (
            <div className="prose-article max-w-[760px]">{md(firstHalf)}</div>
          )}

          {secondHalf && (
            <>
              <div className="my-8 max-w-[760px]">
                <AdSlot variant="in-article" label="Publicidad" />
              </div>
              <div className="prose-article max-w-[760px]">{md(secondHalf)}</div>
            </>
          )}

          <div className="mt-11 flex max-w-[760px] flex-wrap justify-between gap-3 border-t border-border pt-6 font-mono text-[0.75rem] text-muted-foreground">
            <span>Publicado el {formatDate(article.date)}</span>
            <span>{category?.name}</span>
          </div>

          <div className="max-w-[760px]">
            <AuthorBox />
          </div>
        </article>

        {/* Barra lateral: índice, relacionados y anuncio. Sticky en escritorio. */}
        <aside className="flex flex-col gap-7 lg:sticky lg:top-24">
          {toc.length > 2 && (
            <nav
              aria-label="Contenido del artículo"
              className="rounded-[var(--radius)] border border-border bg-card p-5"
            >
              <h2 className="mb-3.5 font-display text-[0.95rem] font-bold">En esta guía</h2>
              <ul className="flex flex-col gap-2.5">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="toc-link">{t.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {related.length > 0 && (
            <section className="rounded-[var(--radius)] border border-border bg-card p-5">
              <h2 className="mb-3.5 font-display text-[0.95rem] font-bold">Sigue leyendo</h2>
              <div className="flex flex-col">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/articulo/${a.slug}`}
                    data-cat={a.category}
                    className="flex gap-3 border-b border-border py-2.5 last:border-b-0 last:pb-0"
                  >
                    <span
                      className="h-11 w-11 shrink-0 rounded-lg bg-[var(--cat-accent)]"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[0.83rem] leading-[1.35] font-bold text-foreground">
                        {a.title}
                      </span>
                      <span className="mt-1 block font-mono text-[0.68rem] text-muted-foreground">
                        {a.readMinutes} min · {formatDateShort(a.date)}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AdSlot variant="rectangle" label="Publicidad" />
        </aside>
      </div>
    </div>
  );
}
