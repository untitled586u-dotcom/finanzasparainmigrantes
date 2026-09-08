import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";

const content = `
Tu privacidad es importante para nosotros. Esta Política de Privacidad explica qué
información recopilamos, cómo la usamos y qué opciones tienes cuando visitas
${SITE.name} (el "Sitio").

## Información que recopilamos

- **Información de uso**: páginas que visitas, tiempo en el sitio, tipo de dispositivo
  y navegador, recopilada mediante herramientas de analítica.
- **Cookies y tecnologías similares**: pequeños archivos que se guardan en tu
  dispositivo para mejorar tu experiencia y mostrar publicidad relevante.
- **Información que nos das voluntariamente**: por ejemplo, si nos escribes por el
  formulario de contacto (nombre y correo).

## Publicidad y cookies de terceros

Este Sitio utiliza **Google AdSense** para mostrar anuncios. Google y sus socios
usan cookies (incluida la cookie DART) para mostrar anuncios basados en tus visitas
a este y otros sitios web.

- Google, como proveedor externo, utiliza cookies para publicar anuncios.
- Puedes desactivar la publicidad personalizada visitando la
  **Configuración de anuncios de Google** (adssettings.google.com).
- También puedes gestionar cookies de terceros en
  **www.aboutads.info** o **youronlinechoices.eu**.

Los proveedores externos, incluido Google, pueden usar identificadores de cookies
para procesar datos conforme a sus propias políticas de privacidad.

## Cómo usamos tu información

- Para operar y mejorar el contenido del Sitio.
- Para analizar el tráfico y entender qué temas son más útiles.
- Para mostrar anuncios que ayudan a mantener el Sitio gratuito.
- Para responder a tus mensajes de contacto.

## Tus opciones

- Puedes **configurar tu navegador** para rechazar cookies, aunque algunas funciones
  podrían no operar correctamente.
- Puedes **optar por no recibir publicidad personalizada** en la configuración de
  anuncios de Google.

## Enlaces a otros sitios

El Sitio puede contener enlaces a sitios externos. No somos responsables de las
prácticas de privacidad de esos sitios; te recomendamos leer sus políticas.

## Menores de edad

Este Sitio no está dirigido a menores de 13 años y no recopilamos intencionalmente
información de menores.

## Cambios a esta política

Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos cualquier
cambio en esta página con su fecha de actualización.

## Contacto

Si tienes preguntas sobre esta política, escríbenos desde nuestra [página de contacto](/contacto).
`;

export default function PrivacyPage() {
  useSeo({
    title: "Política de Privacidad",
    description: `Cómo ${SITE.name} recopila, usa y protege tu información, incluido el uso de Google AdSense y cookies.`,
    path: "/privacidad",
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold text-foreground">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <div className="prose-article mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
