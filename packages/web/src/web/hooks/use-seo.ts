import { useEffect } from "react";
import { SITE } from "../lib/site";

export interface SeoOptions {
  title: string;
  description?: string;
  /** Path relativo, ej. "/articulo/mi-slug". Genera la URL canónica. */
  path?: string;
  /** URL absoluta de la imagen para Open Graph / Twitter. */
  image?: string;
  /** Tipo Open Graph, "website" por defecto o "article". */
  type?: "website" | "article";
  keywords?: string[];
  /** Objetos JSON-LD (schema.org) a inyectar en el <head>. */
  jsonLd?: Record<string, unknown>[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ID = "page-jsonld";

/**
 * Durante el pre-render (build) no existe `document`: en ese caso `useSeo` no
 * puede tocar el <head>, así que guarda aquí las opciones para que el script de
 * pre-render genere las etiquetas. Así el HTML estático y el SPA comparten
 * exactamente la misma fuente de verdad y no pueden desincronizarse.
 */
export const seoCollector: { current: SeoOptions | null } = { current: null };

export const isPrerender = typeof document === "undefined";

/**
 * Añade el nombre del sitio al título solo si el resultado sigue cabiendo en la
 * SERP (60 caracteres). Con títulos largos el sufijo se descarta en lugar de
 * empujar las palabras clave fuera del recorte de Google.
 */
export function resolveFullTitle(title: string): string {
  if (title.includes(SITE.name)) return title;
  const withSuffix = `${title} | ${SITE.name}`;
  return withSuffix.length <= 60 ? withSuffix : title;
}

/** Gestiona title, meta (description/OG/Twitter), canonical y JSON-LD de cada página. */
export function useSeo({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  jsonLd,
}: SeoOptions) {
  if (isPrerender) {
    seoCollector.current = { title, description, path, image, type, keywords, jsonLd };
  }

  useEffect(() => {
    const fullTitle = resolveFullTitle(title);
    document.title = fullTitle;

    const desc = description ?? SITE.description;
    const url = path ? `${SITE.url}${path}` : SITE.url;
    const img = image ?? SITE.ogImage;

    setMeta("name", "description", desc);
    if (keywords && keywords.length) {
      setMeta("name", "keywords", keywords.join(", "));
    }

    // Open Graph
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:locale", "es_US");
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", img);

    // Canonical
    setLink("canonical", url);

    // JSON-LD estructurado por página
    const existing = document.getElementById(JSONLD_ID);
    if (existing) existing.remove();
    if (jsonLd && jsonLd.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSONLD_ID;
      script.textContent = JSON.stringify(
        jsonLd.length === 1 ? jsonLd[0] : jsonLd,
      );
      document.head.appendChild(script);
    }

    window.scrollTo(0, 0);
  }, [title, description, path, image, type, keywords, jsonLd]);
}
