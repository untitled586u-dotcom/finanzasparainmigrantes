import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { EmailAddress, MailLink } from "../components/mail-link";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";

export default function ContactPage() {
  useSeo({
    title: "Contacto",
    description: `Escríbenos con tus dudas, sugerencias de tema o correcciones sobre nuestras guías. ${SITE.name} lee todos los mensajes.`,
    path: "/contacto",
  });

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject || "Consulta desde la web",
  )}&body=${encodeURIComponent(`${message}\n\n— ${name}`)}`;

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <span className="text-sm font-semibold uppercase tracking-widest text-primary">
        Contacto
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">
        Hablemos
      </h1>
      <p className="mt-3 text-muted-foreground">
        ¿Tienes una duda, una sugerencia de tema o encontraste un error en una
        guía? Escríbenos. Leemos todos los mensajes, aunque no siempre podamos
        responder de inmediato.
      </p>

      <MailLink className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50">
        <Mail className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-muted-foreground">Escríbenos a</span>
        <span className="font-medium text-foreground">
          <EmailAddress />
        </span>
      </MailLink>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            aria-label="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
          <input
            required
            aria-label="Asunto del mensaje"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Asunto"
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <textarea
          required
          aria-label="Tu mensaje"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="¿En qué te podemos ayudar?"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Abrir en mi correo <Send className="h-4 w-4" />
        </button>
        <p className="text-xs text-muted-foreground">
          Al enviar se abrirá tu aplicación de correo con el mensaje ya
          redactado. No guardamos tus datos en este sitio.
        </p>
      </form>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Sobre qué te podemos ayudar
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Somos un medio de educación financiera en español y nuestra especialidad
          es explicar cómo funcionan en Estados Unidos los productos que más
          preguntas generan entre la comunidad hispana e inmigrante: cuentas
          bancarias que se abren con pasaporte o matrícula consular, seguros de
          auto y de vida sin número de Seguro Social, préstamos personales con
          ITIN, el proceso para construir historial de crédito desde cero y la
          declaración de impuestos cuando trabajas por tu cuenta o recibes un
          1099. Si tu duda cae dentro de esos temas, escríbenos: muchas de
          nuestras guías nacieron de una pregunta que nos llegó por correo.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          También nos interesa saber qué te falta. Si buscaste información sobre
          un trámite concreto —renovar el ITIN, conseguir una hipoteca sin
          historial, entender por qué te negaron una tarjeta, comparar
          aseguradoras en tu estado— y no encontraste nada claro en español,
          cuéntanoslo. Tomamos nota de cada sugerencia y priorizamos los temas
          que más se repiten a la hora de decidir qué publicamos.
        </p>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Correcciones y transparencia
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Las reglas cambian: los requisitos de un banco, los límites del IRS o
          los mínimos de cobertura de un estado pueden ser distintos al año
          siguiente. Si detectas un dato desactualizado o incorrecto en una guía,
          indícanos el enlace del artículo y, si puedes, la fuente oficial.
          Verificamos, corregimos y dejamos constancia de la actualización con su
          fecha. Puedes leer cómo trabajamos en nuestra{" "}
          <a className="text-primary underline" href="/politica-editorial">
            política editorial
          </a>{" "}
          y cómo se financia el sitio en{" "}
          <a className="text-primary underline" href="/como-ganamos-dinero">
            cómo ganamos dinero
          </a>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Un aviso importante: no somos abogados de inmigración, agentes de
          seguros, prestamistas ni preparadores de impuestos, y no podemos
          revisar tu caso personal, tramitar una solicitud ni recomendarte un
          producto concreto por correo. Lo que publicamos es información general
          para que llegues informado a esa conversación con la institución que
          corresponda. Tampoco pedimos ni queremos recibir números de Seguro
          Social, ITIN, datos bancarios ni copias de documentos: si un mensaje
          los incluye, lo eliminamos.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Para propuestas de colaboración, correcciones de prensa o consultas de
          medios, usa el mismo correo indicando el motivo en el asunto.
          Respondemos en el orden en que llegan los mensajes, normalmente dentro
          de unos días hábiles.
        </p>
      </section>
    </div>
  );
}
