import type { ComponentPropsWithoutRef } from "react";
import { Lightbulb, TriangleAlert } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Slugs de encabezados                                                        */
/* -------------------------------------------------------------------------- */

/** Convierte «¿Cuánto cuesta el SR-22?» en «cuanto-cuesta-el-sr-22». */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface TocEntry {
  id: string;
  text: string;
}

/**
 * Índice del artículo. Se saca de los `## ` del markdown en lugar del DOM para
 * que también exista en el HTML pre-renderizado (y por tanto para Google).
 */
export function tocFromMarkdown(body: string): TocEntry[] {
  const out: TocEntry[] = [];
  const seen = new Set<string>();
  for (const line of body.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[1].replace(/[*_`]/g, "");
    let id = slugifyHeading(text);
    while (seen.has(id)) id += "-2";
    seen.add(id);
    out.push({ id, text });
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/* Preguntas frecuentes                                                        */
/* -------------------------------------------------------------------------- */

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * Extrae la sección `## Preguntas frecuentes`, escrita como pares
 * `**pregunta**` + párrafo de respuesta, para generar el schema FAQPage.
 */
export function faqFromMarkdown(body: string): FaqEntry[] {
  const start = body.search(/^##\s+Preguntas frecuentes\s*$/m);
  if (start === -1) return [];
  const rest = body.slice(start).split("\n").slice(1).join("\n");
  const end = rest.search(/^##\s+/m);
  const block = end === -1 ? rest : rest.slice(0, end);

  const out: FaqEntry[] = [];
  const re = /^\*\*(.+?)\*\*\s*\n([\s\S]*?)(?=\n\s*\n|$)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const question = m[1].trim();
    const answer = m[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) out.push({ question, answer });
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/* Plugin remark del artículo                                                  */
/* -------------------------------------------------------------------------- */

type MdNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: MdNode[];
  data?: { hProperties?: Record<string, unknown> };
};

function nodeText(node: MdNode): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(nodeText).join("");
}

const CALLOUTS: Record<string, { cls: string; title: string }> = {
  TIP: { cls: "callout-tip", title: "Dato clave" },
  NOTE: { cls: "callout-tip", title: "Dato clave" },
  DATO: { cls: "callout-tip", title: "Dato clave" },
  AVISO: { cls: "callout-warn", title: "Ojo con esto" },
  WARNING: { cls: "callout-warn", title: "Ojo con esto" },
};

/**
 * Tres transformaciones sobre el markdown de los artículos:
 *
 * 1. `id` slugificado en cada `##`/`###` para que el índice lateral tenga anclas.
 * 2. Alertas estilo GitHub (`> [!TIP]`, `> [!AVISO]`) → bloques `.callout`.
 * 3. Un párrafo con `{.steps}` justo antes de una lista ordenada la convierte en
 *    la lista de pasos numerados del diseño.
 */
export function remarkArticle() {
  return (tree: MdNode) => {
    const seen = new Set<string>();

    const walk = (parent: MdNode) => {
      const kids = parent.children;
      if (!kids) return;

      for (let i = kids.length - 1; i >= 0; i--) {
        const node = kids[i];
        if (!node) continue;

        // 3. {.steps}
        const next = kids[i + 1];
        if (
          node.type === "paragraph" &&
          nodeText(node).trim() === "{.steps}" &&
          next?.type === "list"
        ) {
          next.data = next.data ?? {};
          next.data.hProperties = { ...next.data.hProperties, className: "steps" };
          kids.splice(i, 1);
          continue;
        }

        // 2. callouts
        if (node.type === "blockquote") {
          const first = node.children?.[0];
          const raw = first ? nodeText(first) : "";
          const m = /^\[!\s*([A-ZÁÉÍÓÚÑ]+)\s*\]\s*/i.exec(raw);
          const key = m?.[1]?.toUpperCase();
          const conf = key ? CALLOUTS[key] : undefined;
          if (conf && first) {
            // Borra el marcador del primer nodo de texto.
            const strip = (n: MdNode): boolean => {
              if (typeof n.value === "string") {
                n.value = n.value.replace(/^\[!\s*[A-ZÁÉÍÓÚÑ]+\s*\]\s*\n?/i, "");
                return true;
              }
              for (const c of n.children ?? []) if (strip(c)) return true;
              return false;
            };
            strip(first);
            node.data = node.data ?? {};
            node.data.hProperties = {
              ...node.data.hProperties,
              className: `callout ${conf.cls}`,
              "data-callout-title": conf.title,
            };
          }
        }

        // 1. ids de encabezados
        if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
          let id = slugifyHeading(nodeText(node));
          while (seen.has(id)) id += "-2";
          seen.add(id);
          node.data = node.data ?? {};
          node.data.hProperties = { ...node.data.hProperties, id };
        }

        walk(node);
      }
    };

    walk(tree);
  };
}

/* -------------------------------------------------------------------------- */
/* Componentes                                                                 */
/* -------------------------------------------------------------------------- */

type BqProps = ComponentPropsWithoutRef<"blockquote"> & {
  "data-callout-title"?: string;
};

/**
 * Los callouts salen del plugin como `blockquote.callout`; aquí se les pone el
 * icono y el título, que no se pueden expresar en markdown.
 */
function Blockquote({ className, children, ...rest }: BqProps) {
  const title = rest["data-callout-title"];
  if (!className?.includes("callout")) {
    return <blockquote className={className}>{children}</blockquote>;
  }
  const warn = className.includes("callout-warn");
  const Icon = warn ? TriangleAlert : Lightbulb;
  return (
    <div className={className}>
      <Icon className="h-5 w-5" aria-hidden="true" />
      <div>
        {title && <span className="callout-title">{title}</span>}
        {children}
      </div>
    </div>
  );
}

/**
 * Los enlaces externos abren en pestaña nueva con `noopener`; siguen siendo
 * follow a propósito (fuentes oficiales, señal de E-E-A-T en YMYL).
 * Los internos se quedan tal cual.
 */
function Anchor({ href, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const external = !!href && /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {children}
    </a>
  );
}

export const articleComponents = {
  blockquote: Blockquote,
  a: Anchor,
};
