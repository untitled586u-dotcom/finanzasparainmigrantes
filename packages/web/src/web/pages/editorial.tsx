import { Link } from "wouter";
import { EmailAddress, MailLink } from "../components/mail-link";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";
import { AUTHOR, SOURCES } from "../lib/author";

const steps = [
  {
    n: "01",
    title: "Elegimos el tema por las preguntas reales de la comunidad",
    text: "Partimos de las dudas que la gente busca de verdad en Google y plantea en grupos y foros de comunidades hispanas: cómo asegurar un carro sin licencia americana, si es seguro declarar con ITIN, qué banco abre cuenta sin SSN.",
  },
  {
    n: "02",
    title: "Nos documentamos en fuentes oficiales",
    text: "Cada dato verificable —requisitos, cifras, plazos, formularios— se contrasta con la fuente primaria: el IRS, el CFPB, los Departamentos de Seguros de cada estado o los términos publicados por la propia entidad. Nunca copiamos de otros blogs.",
  },
  {
    n: "03",
    title: "Escribimos en español claro, no en traducción literal",
    text: "Evitamos el calco del inglés y la jerga financiera. Si un término técnico es inevitable (como escrow o deductible), lo explicamos la primera vez que aparece y damos su equivalente en español.",
  },
  {
    n: "04",
    title: "Revisamos antes de publicar",
    text: "Comprobamos cifras, enlaces y que la guía no prometa nada que no pueda cumplir. Si un tema requiere la valoración de un profesional con licencia, lo decimos abiertamente en lugar de improvisar una respuesta.",
  },
  {
    n: "05",
    title: "Actualizamos cuando la realidad cambia",
    text: "Las reglas fiscales y migratorias cambian cada año. Revisamos las guías sensibles al calendario —impuestos, créditos, remesas— al menos una vez por temporada, y la fecha visible en cada artículo refleja su última revisión.",
  },
];

const promises = [
  {
    title: "No vendemos productos financieros",
    text: "No somos banco, aseguradora, prestamista ni agencia. No tramitamos tu ITIN ni gestionamos tu declaración.",
  },
  {
    title: "No aceptamos pagos por cobertura favorable",
    text: "Ninguna empresa puede pagar para aparecer en un artículo, subir en una comparativa ni para que retiremos una crítica.",
  },
  {
    title: "Separamos la publicidad del contenido",
    text: "Los anuncios están siempre etiquetados y visualmente separados del texto. Quien escribe no decide qué se anuncia.",
  },
  {
    title: "Corregimos los errores a la vista",
    text: "Si nos equivocamos, corregimos el artículo y dejamos constancia del cambio. No borramos el error en silencio.",
  },
  {
    title: "No pedimos datos sensibles",
    text: "Nunca te pediremos tu número de ITIN, de Seguro Social ni datos bancarios. Desconfía de quien lo haga en nuestro nombre.",
  },
  {
    title: "Esto es información, no asesoría",
    text: "Nuestro contenido es educativo y de carácter general. No sustituye a un contador, abogado o agente con licencia que conozca tu caso.",
  },
];

export default function EditorialPage() {
  useSeo({
    title: "Política editorial",
    description: `Cómo investigamos, escribimos y actualizamos el contenido de ${SITE.name}: nuestras fuentes, nuestro proceso y nuestros compromisos.`,
    path: "/politica-editorial",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Política editorial",
        description: `Proceso editorial, fuentes y compromisos de ${SITE.name}.`,
        url: `${SITE.url}/politica-editorial`,
        inLanguage: "es",
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      },
    ],
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
        Política editorial
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground">
        Cómo hacemos nuestro contenido
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        Hablamos de dinero, de impuestos y de estatus migratorio: temas donde un
        dato mal dado puede costarte caro. Por eso explicamos abiertamente cómo
        trabajamos, para que puedas juzgar por ti mismo si merecemos tu
        confianza.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Nuestro proceso, paso a paso
        </h2>
        <ol className="mt-6 space-y-6">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-5">
              <span className="font-display text-lg font-semibold text-primary/60">
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Nuestros compromisos
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {promises.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Fuentes que consultamos
        </h2>
        <p className="mt-3 text-muted-foreground">
          Estas son las fuentes oficiales que usamos de forma habitual. Te
          animamos a verificar en ellas cualquier dato importante antes de tomar
          una decisión.
        </p>
        <ul className="mt-5 space-y-2.5">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener nofollow"
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          ¿Ves un error?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Escríbenos a{" "}
          <MailLink className="text-primary underline underline-offset-4">
            <EmailAddress />
          </MailLink>{" "}
          indicando el artículo y el dato que crees incorrecto. Revisamos todos
          los avisos y, si el error es nuestro, lo corregimos y lo hacemos
          constar.
        </p>
      </section>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          to={`/autor/${AUTHOR.slug}`}
          className="rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <span className="block font-semibold">Quién escribe</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Conoce a la persona detrás de las guías.
          </span>
        </Link>
        <Link
          to="/como-ganamos-dinero"
          className="rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <span className="block font-semibold">Cómo ganamos dinero</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Nuestro modelo de negocio, sin rodeos.
          </span>
        </Link>
      </div>
    </div>
  );
}
