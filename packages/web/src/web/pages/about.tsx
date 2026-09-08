import { Link } from "wouter";
import { ShieldCheck, Target, Users, HeartHandshake } from "lucide-react";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";

const values = [
  {
    icon: Target,
    title: "Claridad ante todo",
    text: "Traducimos el complicado mundo financiero de EE.UU. a un lenguaje simple, sin tecnicismos ni letra chiquita.",
  },
  {
    icon: Users,
    title: "Hecho para inmigrantes",
    text: "Escribimos pensando en quien empieza de cero: sin SSN, sin historial y con muchas preguntas.",
  },
  {
    icon: ShieldCheck,
    title: "Información honesta",
    text: "No vendemos productos financieros. Te explicamos las opciones para que tú decidas con confianza.",
  },
  {
    icon: HeartHandshake,
    title: "Siempre gratis",
    text: "Creemos que la educación financiera debe estar al alcance de toda la comunidad hispana.",
  },
];

export default function AboutPage() {
  useSeo({
    title: "Sobre nosotros",
    description: `Conoce la misión de ${SITE.name}: educación financiera clara y gratuita para la comunidad hispana en EE.UU.`,
    path: "/sobre-nosotros",
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">Sobre nosotros</span>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground">
        Finanzas sin barreras para la comunidad hispana
      </h1>
      <div className="prose-article mt-6 max-w-none">
        <p>
          {SITE.name} nació de una idea simple: llegar a Estados Unidos ya es
          bastante difícil como para además perderse en un sistema financiero
          confuso y en otro idioma. Miles de hispanos pagan de más en seguros,
          pierden dinero en remesas o se quedan sin crédito solo por falta de
          información clara.
        </p>
        <p>
          Nuestra misión es cerrar esa brecha. Creamos guías prácticas, en
          español y fáciles de entender, sobre cómo asegurar tu carro, construir
          crédito desde cero, conseguir préstamos y manejar tu banca aunque no
          tengas número de Seguro Social.
        </p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold text-foreground md:text-3xl">
        En qué creemos
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <v.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-secondary/50 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold">¿Listo para empezar?</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Explora nuestras guías y da el primer paso hacia una vida financiera más sólida en EE.UU.
        </p>
        <Link
          to="/articulos"
          className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ver todas las guías
        </Link>
      </div>
    </div>
  );
}
