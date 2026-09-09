import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { getArticle, getRelatedArticles, getArticleHubSlug } from "../content/articles";
import { loadArticleBody, getPreloadedBody } from "../content/bodies";
import { getCategory } from "../content/categories";
import { AdSlot } from "../components/ad-slot";
import { AuthorBox } from "../components/author-byline";
import { AUTHOR } from "../lib/author";
import { formatDate, formatDateShort, SITE } from "../lib/site";
import { articleComponents, faqFromMarkdown, remarkArticle, tocFromMarkdown } from "../lib/markdown";
import NotFound from "./not-found";

const md = (content:string) => <ReactMarkdown remarkPlugins={[remarkGfm,remarkArticle]} components={articleComponents}>{content}</ReactMarkdown>;
const INITIALS = AUTHOR.isBrand ? "FI" : AUTHOR.name.slice(0,2).toUpperCase();

export default function ArticlePage() {
  const {slug} = useParams<{slug:string}>();
  const article = getArticle(slug);
  const category = article ? getCategory(article.category) : undefined;
  const [body,setBody] = useState<string|null>(()=>getPreloadedBody(slug));
  useEffect(()=>{let active=true; const pre=getPreloadedBody(slug); setBody(pre); if(!slug||pre)return; loadArticleBody(slug).then(text=>{if(active)setBody(text)}); return()=>{active=false}},[slug]);
  const toc=useMemo(()=>body?tocFromMarkdown(body):[],[body]);
  const faq=useMemo(()=>body?faqFromMarkdown(body):[],[body]);
  const jsonLd=useMemo(()=>{if(!article)return undefined; const url=`${SITE.url}/articulo/${article.slug}`; const graph:Record<string,unknown>[]=[{"@context":"https://schema.org","@type":"Article",headline:article.title,description:article.description,datePublished:article.date,dateModified:article.date,inLanguage:"es",keywords:article.keywords.join(", "),image:SITE.ogImage,mainEntityOfPage:{"@type":"WebPage","@id":url},author:{"@type":AUTHOR.isBrand?"Organization":"Person",name:AUTHOR.isBrand?SITE.name:AUTHOR.name,url:`${SITE.url}/autor/${AUTHOR.slug}`},publisher:{"@type":"Organization",name:SITE.name,url:SITE.url,logo:{"@type":"ImageObject",url:`${SITE.url}/icon-512.png`}},articleSection:category?.name},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Inicio",item:SITE.url},...(category?[{"@type":"ListItem",position:2,name:category.name,item:`${SITE.url}/categoria/${category.slug}`}]:[]),{"@type":"ListItem",position:category?3:2,name:article.title,item:url}]}]; if(faq.length)graph.push({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))}); return graph},[article,category,faq]);
  useSeo({title:article?(article.seoTitle??article.title):"Artículo",description:article?.description,path:article?`/articulo/${article.slug}`:"/",type:"article",keywords:article?.keywords,jsonLd});
  if(!article)return <NotFound/>;
  const related=getRelatedArticles(article,4);
  const hubSlug=getArticleHubSlug(article);
  const hubCategory=getCategory(hubSlug);
  const hubHref=hubCategory ? `/categoria/${hubCategory.slug}` : "/articulos";
  const sections=(body??"").split(/\n(?=## )/); const splitAt=Math.min(2,Math.max(1,Math.floor(sections.length/2))); const firstHalf=sections.slice(0,splitAt).join("\n"); const secondHalf=sections.slice(splitAt).join("\n");
  return <div data-cat={article.category} className="bg-white">
    <header className="border-b border-[#E1ECF4] bg-[#F1F8FD]"><div className="mx-auto max-w-[1180px] px-5 py-6 md:px-7 md:py-8">
      <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-2 text-[0.73rem] text-[#718196]"><Link to="/" className="hover:text-[#1264A3]">Inicio</Link><span>/</span>{category&&<><Link to={hubHref} className="hover:text-[#1264A3]">{hubCategory?.name ?? category.name}</Link><span>/</span></>}<span className="font-semibold text-[#123B63]">{article.title}</span></nav>
      <div className="max-w-[900px]"><Link to={hubHref} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold text-[#1264A3] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-[var(--cat-accent)]"/>{hubCategory?.name ?? category?.name}</Link><h1 className="font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.035em] text-[#123B63] md:text-[3.15rem]">{article.title}</h1><p className="mt-4 max-w-[760px] text-[1rem] leading-6 text-[#52657A] md:text-[1.05rem]">{article.description}</p><div className="mt-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123B63] text-xs font-bold text-white">{INITIALS}</span><div className="text-[0.78rem] text-[#52657A]"><Link to={`/autor/${AUTHOR.slug}`} className="font-bold text-[#123B63]">{AUTHOR.isBrand?`Redacción de ${SITE.name}`:AUTHOR.name}</Link><div className="mt-0.5">{article.readMinutes} min de lectura · Actualizado {formatDateShort(article.date)}</div></div></div></div>
    </div></header>
    <div className="mx-auto max-w-[1180px] px-5 md:px-7"><div className="py-6"><AdSlot variant="leaderboard"/></div>
      <div className="grid items-start gap-10 pb-16 lg:grid-cols-[1fr_300px] lg:gap-14">
        <article><div className="art-visual mb-8 h-[190px] rounded-3xl md:h-[300px]"><span className="absolute bottom-5 left-5 rounded-lg bg-[#123B63]/80 px-3 py-2 text-[0.72rem] font-semibold text-white">{category?.name} · {formatDate(article.date)}</span></div>{body===null?<div className="space-y-3"><div className="h-4 rounded bg-[#EEF3F7]"/><div className="h-4 w-11/12 rounded bg-[#EEF3F7]"/><div className="h-4 w-10/12 rounded bg-[#EEF3F7]"/></div>:<div className="prose-article max-w-[760px]">{md(firstHalf)}</div>}{secondHalf&&<><div className="mt-8 max-w-[760px] rounded-2xl border border-[#DCE6EE] bg-[#F7FBFE] p-4 md:p-5"><div className="text-[0.66rem] font-bold tracking-[0.12em] text-[#1264A3] uppercase">RUTA FINANCIERA</div><p className="mt-1 text-sm leading-5 text-[#52657A]">Esta guía forma parte de <Link to={hubHref} className="font-bold text-[#1264A3] hover:underline">{hubCategory?.name ?? "nuestras guías financieras"}</Link>. Desde ahí puedes comparar esta información con otras guías y continuar con el siguiente paso.</p></div><div className="my-8 max-w-[760px]"><AdSlot variant="in-article" label="Publicidad"/></div><div className="prose-article max-w-[760px]">{md(secondHalf)}</div></>}</article>
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">{toc.length>2&&<nav aria-label="Contenido del artículo" className="rounded-2xl border border-[#DCE6EE] bg-white p-5 shadow-sm"><h2 className="mb-3 font-display text-base font-bold text-[#123B63]">En esta guía</h2><ul className="flex flex-col gap-2.5">{toc.map(t=><li key={t.id}><a href={`#${t.id}`} className="toc-link">{t.text}</a></li>)}</ul></nav>}{related.length>0&&<section className="rounded-2xl border border-[#DCE6EE] bg-white p-5 shadow-sm"><h2 className="mb-3 font-display text-base font-bold text-[#123B63]">Sigue leyendo</h2><div>{related.map(a=><Link key={a.slug} to={`/articulo/${a.slug}`} data-cat={a.category} className="flex gap-3 border-b border-[#E6EDF3] py-3 last:border-0"><span className="h-11 w-11 shrink-0 rounded-lg bg-[var(--cat-accent)]"/><span><span className="block text-[0.8rem] font-bold leading-[1.35] text-[#123B63]">{a.title}</span><span className="mt-1 block text-[0.67rem] text-[#718196]">{a.readMinutes} min · {formatDateShort(a.date)}</span></span></Link>)}</div></section>}<AdSlot variant="rectangle" label="Publicidad"/></aside>
      </div>
    </div>
  </div>;
}
