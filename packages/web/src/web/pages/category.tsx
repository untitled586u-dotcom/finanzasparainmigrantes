import { useMemo } from "react";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { articleComponents, remarkArticle } from "../lib/markdown";
import { getCategory } from "../content/categories";
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

  const jsonLd = useMemo(() => {
    if (!category) return undefined;
    const url = `${SITE.url}/categoria/${category.slug}`;
    return [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.name,
        description: category.description,
        url,
        inLanguage: "es",
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
          { "@type": "ListItem", position: 2, name: category.name, item: url },
        ],
      },
    ] as Record<string, unknown>[];
  }, [category]);

  useSeo({
    title: category ? `${category.name} para hispanos en EE.UU.` : "Categoría",
    description: category?.description,
    path: category ? `/categoria/${category.slug}` : "/",
    jsonLd,
  });

  if (!category) return <NotFound />;

  const intro = getCategoryIntro(category.slug);
  const [lead, ...rest] = list;
  const avgRead = list.length
    ? Math.round(list.reduce((n, a) => n + a.readMinutes, 0) / list.length)
    : 0;
  const lastUpdate = list.reduce((max, a) => (a.date > max ? a.date : max), "0000-00-00");

  const stats = [
    { label: "Guías", value: String(list.length) },
    { label: "Lectura media", value: `${avgRead} min` },
    { label: "Actualizado", value: formatDateShort(lastUpdate) },
  ];

  return (
    <div data-cat={category.slug} className="mx-auto max-w-[1180px] px-5 md:px-7">
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center gap-2 py-4 font-mono text-[0.75rem] text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <span className="opacity-50" aria-hidden="true">/</span>
        <span className="font-semibold text-foreground">{category.name}</span>
      </nav>

      <header className="flex flex-col gap-6 border-b border-border pb-9 md:flex-row md:items-start md:gap-7">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--radius)] text-[var(--cat-accent)]"
          style={{ background: "color-mix(in srgb, var(--cat-accent) 15%, white)" }}
        >
          <CategoryIcon name={category.icon} className="h-8 w-8" />
        </span>
        <div className="flex-1">
          <h1 className="font-display text-[2rem] leading-tight font-bold text-foreground md:text-[2.6rem]">
            {category.name}
          </h1>
          <p className="mt-3 max-w-[70ch] text-[1.05rem] text-muted-foreground">
            {category.description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-[0.68rem] tracking-[0.08em] text-muted-foreground uppercase">
                  {s.label}
                </dt>
                <dd className="mt-0.5 font-display text-[1.05rem] font-bold text-foreground">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {lead && (
        <section className="pt-9">
          <ArticleCard article={lead} headingLevel={2} featured />
        </section>
      )}

      <div className="pt-9">
        <AdSlot variant="leaderboard" />
      </div>

      {rest.length > 0 && (
        <section className="pt-9 pb-16">
          <h2 className="mb-5 font-display text-xl font-bold text-foreground">
            Todas las guías de {category.short.toLowerCase()}
          </h2>
          <div className="flex flex-col border-t border-border">
            {rest.map((a) => (
              <ArticleRow key={a.slug} article={a} headingLevel={3} />
            ))}
          </div>
        </section>
      )}

      {intro && (
        <section className="border-t border-border pt-9 pb-16">
          <h2 className="mb-5 font-display text-xl font-bold text-foreground">
            Qué necesitas saber sobre {category.short.toLowerCase()} en EE.UU.
          </h2>
          <div className="article-body max-w-[72ch]">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkArticle]} components={articleComponents}>
              {intro}
            </ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
}
