import { Link } from "wouter";
import { Megaphone, Link2, Ban } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";
import { AUTHOR } from "../lib/author";

const sources = [
  {
    icon: Megaphone,
    title: "Publicidad",
    text: "Mostramos anuncios gráficos servidos por redes publicitarias como Google AdSense. Ganamos una pequeña cantidad cuando se muestran o cuando alguien hace clic. Nosotros no elegimos qué anuncio concreto ves: lo decide la red en función de tus intereses.",
    note: "Todos los anuncios van etiquetados como «Publicidad» y separados del texto.",
  },
  {
    icon: Link2,
    title: "Enlaces de afiliado",
    text: "Algunos enlaces a bancos, aseguradoras o servicios de envío de dinero son de afiliado: si contratas a través de ellos, la empresa nos paga una comisión. A ti no te cuesta ni un dólar más, y el precio que pagas es exactamente el mismo.",
    note: "Cuando un artículo contenga enlaces de afiliado, lo indicaremos de forma visible.",
  },
];

const never = [
  "Cobrar por aparecer en un artículo o por subir puestos en una comparativa.",
  "Recomendar un producto peor solo porque nos pague más comisión.",
  "Retirar una crítica honesta a cambio de dinero.",
  "Vender tus datos personales a terceros.",
  "Cobrarte a ti por leer el contenido: todas las guías son y seguirán siendo gratuitas.",
];

export default function HowWeMakeMoneyPage() {
  useSeo({
    title: "Cómo ganamos dinero",
    description: `Explicamos con transparencia cómo se financia ${SITE.name}: publicidad y enlaces de afiliado, y qué no haremos nunca por dinero.`,
    path: "/como-ganamos-dinero",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Cómo ganamos dinero",
        description: `Modelo de financiación y divulgación de afiliados de ${SITE.name}.`,
        url: `${SITE.url}/como-ganamos-dinero`,
        inLanguage: "es",
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      },
    ],
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
        Transparencia
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground">
        Cómo ganamos dinero
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
        Leer {SITE.name} es gratis y siempre lo será. Pero mantener el sitio
        cuesta dinero y tiempo, así que aquí te explicamos con total claridad de
        dónde sale ese dinero. Creemos que tienes derecho a saberlo antes de
        confiar en lo que te contamos.
      </p>

      <div className="mt-12 space-y-5">
        {sources.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            <p className="mt-3 border-l-2 border-accent pl-4 text-sm text-muted-foreground">
              {s.note}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Lo que el dinero nunca cambia
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Nuestra recomendación no está en venta. En concreto, no vamos a:
        </p>
        <ul className="mt-5 space-y-3">
          {never.map((n) => (
            <li key={n} className="flex gap-3 text-muted-foreground">
              <Ban className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="leading-relaxed">{n}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-2xl bg-secondary/50 p-7">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Divulgación de afiliados
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {SITE.name} puede recibir una compensación de las empresas mencionadas
          en este sitio cuando el lector contrata un producto a través de
          nuestros enlaces. Esta compensación puede influir en qué productos
          aparecen y en qué orden, pero nunca en lo que decimos sobre ellos.
          Ninguna de las empresas mencionadas revisa ni aprueba nuestro
          contenido antes de publicarlo. Esta divulgación se hace en
          cumplimiento de las directrices de la Comisión Federal de Comercio
          (FTC) de Estados Unidos.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-border p-7">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Publicidad y cookies
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Los proveedores de publicidad, incluido Google, pueden usar cookies
          para mostrar anuncios basados en tus visitas anteriores a este y a
          otros sitios web. Puedes desactivar la publicidad personalizada desde
          la{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener nofollow"
            className="text-primary underline underline-offset-4"
          >
            Configuración de anuncios de Google
          </a>
          . Encontrarás más detalle en nuestra{" "}
          <Link
            to="/privacidad"
            className="text-primary underline underline-offset-4"
          >
            política de privacidad
          </Link>
          .
        </p>
      </section>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          to="/politica-editorial"
          className="rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <span className="block font-semibold">Política editorial</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Cómo investigamos y revisamos cada guía.
          </span>
        </Link>
        <Link
          to={`/autor/${AUTHOR.slug}`}
          className="rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <span className="block font-semibold">Quién escribe</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            La persona detrás del sitio.
          </span>
        </Link>
      </div>
    </div>
  );
}
