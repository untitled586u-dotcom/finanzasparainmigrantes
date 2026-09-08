import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSeo } from "../hooks/use-seo";
import { SITE } from "../lib/site";

const content = `
Al usar ${SITE.name} (el "Sitio") aceptas los siguientes términos. Léelos con atención.

## 1. Solo información educativa

Todo el contenido del Sitio tiene fines **informativos y educativos**. **No constituye
asesoría financiera, legal, fiscal, migratoria ni de seguros.** Cada situación es
distinta; antes de tomar decisiones consulta a un profesional con licencia.

## 2. Sin relación profesional

Leer nuestro contenido no crea una relación de asesor-cliente. No somos asesores
financieros, abogados ni agentes de seguros, y no te representamos.

## 3. Exactitud de la información

Nos esforzamos por ofrecer información correcta y actualizada, pero las leyes,
tasas, productos y requisitos cambian con frecuencia y varían por estado. No
garantizamos que todo el contenido esté siempre completo o vigente.

## 4. No estamos afiliados al gobierno

${SITE.name} es un sitio independiente. **No estamos afiliados, respaldados ni
asociados con ninguna agencia gubernamental**, banco, aseguradora ni con el IRS.

## 5. Enlaces y menciones de terceros

Podemos mencionar o enlazar productos, bancos o servicios de terceros con fines
informativos. No respaldamos ni garantizamos esos productos, y no somos responsables
de tu experiencia con ellos. Verifica siempre los términos directamente con el proveedor.

## 6. Publicidad

El Sitio se financia mediante publicidad, incluida la de Google AdSense. Los anuncios
que ves los seleccionan terceros y no reflejan nuestro respaldo a esos productos.

## 7. Propiedad intelectual

El contenido original del Sitio (textos, diseño y marca) es propiedad de ${SITE.name}
y no puede reproducirse sin autorización.

## 8. Limitación de responsabilidad

Usas el Sitio bajo tu propio riesgo. En la medida permitida por la ley, no somos
responsables de pérdidas o daños derivados de decisiones que tomes con base en su
contenido.

## 9. Cambios

Podemos actualizar estos términos en cualquier momento. El uso continuo del Sitio
implica la aceptación de los cambios.

## 10. Contacto

Para cualquier duda sobre estos términos, escríbenos desde nuestra [página de contacto](/contacto).
`;

export default function TermsPage() {
  useSeo({
    title: "Términos y Aviso Legal",
    description: `Términos de uso y aviso legal de ${SITE.name}. Contenido educativo, no asesoría profesional.`,
    path: "/terminos",
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-display text-4xl font-semibold text-foreground">Términos y Aviso Legal</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Última actualización: {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
      </p>
      <div className="prose-article mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
