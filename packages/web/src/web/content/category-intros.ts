/**
 * Texto introductorio propio de cada página de categoría.
 *
 * Las páginas de listado no tenían contenido propio más allá del título y la
 * `description`, así que Google las rastreaba y no las indexaba. Estos bloques
 * (~300 palabras) les dan contenido único y reparten enlaces internos hacia las
 * guías más importantes de cada sección.
 *
 * Markdown: se renderiza con los mismos componentes que el cuerpo del artículo.
 */
export const CATEGORY_INTROS: Record<string, string> = {
  "seguro-de-auto": `El seguro de auto es, para la mayoría de las familias inmigrantes, el primer producto financiero serio que contratan en Estados Unidos. Y casi siempre se contrata con prisa: hay que registrar el carro, hay que ir a trabajar, y el agente que atiende en español ofrece "lo que pide la ley" sin explicar qué cubre y qué no.

Esa prisa cuesta dinero. Entre la cotización más cara y la más barata para el mismo conductor suele haber entre un 40 % y un 60 % de diferencia, y muchas pólizas mínimas dejan al asegurado personalmente responsable de decenas de miles de dólares en un accidente serio. Aquí explicamos las dos cosas: cómo pagar menos y cómo no quedarte desprotegido.

En esta sección encontrarás lo que ninguna aseguradora explica en su publicidad. Cómo conseguir una póliza [sin licencia americana](/articulo/seguro-de-auto-sin-licencia-americana), qué hacer cuando el formulario [pide un SSN y tú tienes ITIN](/articulo/seguro-de-auto-con-itin), y qué compañías aceptan la [matrícula consular](/articulo/seguro-de-auto-con-matricula-consular) como identificación. También la comparación que más dinero ahorra: [cobertura mínima frente a cobertura completa](/articulo/cobertura-minima-vs-completa), con números reales en lugar de generalidades.

Los mínimos legales, las multas y los requisitos de licencia cambian de un estado a otro, y a veces son opuestos: hay estados que emiten licencia sin importar el estatus migratorio y otros que no. Por eso publicamos guías estado por estado, con las cifras oficiales del departamento de seguros o del DMV correspondiente y los precios de 2026 de varias fuentes independientes, no de una sola.

Y para cuando algo va mal: qué es un [SR-22 y cómo funciona](/articulo/que-es-sr22-como-funciona), y qué hacer paso a paso si tienes un [accidente sin seguro](/articulo/que-hacer-accidente-sin-seguro). Todo verificado con fuentes oficiales y actualizado para 2026.`,

  credito: `El crédito es el sistema nervioso de las finanzas en Estados Unidos. Determina si te aprueban un carro, cuánto pagas de interés, si un casero te renta un apartamento y hasta cuánto te cuesta el seguro en la mayoría de los estados. Y es un sistema que no existe en muchos países de origen, así que hay que aprenderlo desde cero, normalmente cuando ya lo necesitas.

La buena noticia es que el historial de crédito no tiene nada que ver con el estatus migratorio. Se construye con un ITIN, con un pasaporte y con constancia. La mala es que se destruye rápido: un solo pago atrasado más de 30 días puede costar entre 60 y 100 puntos y quedarse en el reporte durante siete años.

En esta sección explicamos el camino completo. Cómo [construir crédito desde cero](/articulo/construir-credito-desde-cero-inmigrantes) cuando ninguna institución tiene datos tuyos, qué [tarjetas aprueban sin historial](/articulo/tarjetas-credito-sin-historial) y cuáles [aceptan ITIN en lugar de SSN](/articulo/tarjeta-credito-con-itin), con nombres concretos de bancos y credit unions.

También lo que casi nadie explica bien: [qué se considera un buen puntaje](/articulo/que-es-buen-puntaje-credito) y cuál es el promedio real del país, cómo [subir el puntaje rápido](/articulo/mejorar-puntaje-credito-rapido) sin caer en los "trucos" que cobran cientos de dólares por nada, y cómo [leer tu reporte de crédito gratis](/articulo/reporte-de-credito-gratis-como-leerlo) para detectar errores, que son más frecuentes de lo que parece.

Y cuando el problema ya está encima: qué hacer con una [deuda en cobranza](/articulo/deuda-en-cobranza-que-hacer), qué derechos te da la ley federal frente a un cobrador y qué NO debes decirle por teléfono. Con los modelos de puntuación que están entrando en vigor en 2026, incluidos los que ya cuentan el pago de la renta y los servicios.`,

  prestamos: `Pedir prestado en Estados Unidos siendo inmigrante tiene una trampa doble: por un lado, muchas instituciones grandes exigen SSN e historial de crédito; por otro, el hueco que dejan lo llenan prestamistas que cobran intereses de tres cifras a quien no tiene alternativa. Entre esos dos extremos hay bastante más terreno del que la gente cree, y esta sección se dedica a explicarlo.

Existen bancos, credit unions y prestamistas que trabajan con ITIN, que aceptan cartas de empleo o estados de cuenta en lugar de historial tradicional, y que ofrecen tasas normales. No se anuncian en la radio, pero existen, y los nombres concretos están en las guías.

Aquí encontrarás qué [opciones reales de préstamo hay para indocumentados](/articulo/prestamos-para-indocumentados), cómo [comprar un carro con ITIN](/articulo/comprar-carro-con-itin), qué esperar cuando quieres [financiar un vehículo sin historial](/articulo/financiar-carro-sin-historial), y qué te van a pedir si buscas un [préstamo personal con mal crédito](/articulo/prestamos-personales-mal-credito).

En vivienda cubrimos el tema completo: qué implica [comprar casa con ITIN](/articulo/comprar-casa-con-itin) y qué [bancos prestan hipotecas a personas con ITIN](/articulo/hipoteca-con-itin-bancos-que-prestan), con los requisitos habituales de enganche, reservas y documentación de ingresos. Es perfectamente posible, y decenas de miles de familias lo hacen cada año.

Y una advertencia que repetimos sin cansarnos: los [préstamos de día de pago](/articulo/prestamos-de-dia-de-pago-payday-loans) son la forma más rápida de convertir una emergencia de 300 dólares en una deuda de 1.500. Antes de firmar uno, mira las alternativas que enumeramos en esa guía.

Todas las cifras y requisitos se verifican con fuentes oficiales o con la información pública de las propias instituciones, y se revisan cuando cambian las condiciones del mercado.`,

  banca: `Abrir una cuenta bancaria es el primer paso para dejar de perder dinero. Cobrar cheques en un check cashing, comprar money orders y guardar efectivo en casa cuesta entre un 3 % y un 10 % de cada ingreso, y ese dinero no vuelve. Sin embargo, mucha gente evita el banco por una idea equivocada: que hace falta número de Seguro Social.

No hace falta. La ley federal antilavado exige que el banco te identifique, no que seas ciudadano ni residente: el propio programa de identificación del cliente acepta expresamente el ITIN o un pasaporte extranjero. Otra cosa es que el empleado de la sucursal lo sepa, y de ahí viene la mayoría de los rechazos.

En esta sección explicamos el proceso completo: cómo [abrir una cuenta bancaria sin SSN](/articulo/abrir-cuenta-bancaria-sin-ssn) y qué hacer si te dicen que no, cómo [usar la matrícula consular para abrir cuenta](/articulo/abrir-cuenta-con-matricula-consular) y qué [bancos la aceptan, sucursal por sucursal](/articulo/bancos-que-aceptan-matricula-consular). También comparamos [los mejores bancos para hispanos](/articulo/mejores-bancos-para-hispanos) por comisiones, atención en español y requisitos de identificación.

Aclaramos además una confusión que sale caro: [la diferencia entre SSN e ITIN](/articulo/diferencia-ssn-itin), qué puedes hacer con cada uno y qué no. Y cubrimos los trámites que van pegados a la vida financiera, como [sacar la licencia de conducir](/articulo/sacar-licencia-conducir) según el estado donde vivas.

Las remesas tienen su propio espacio, porque es donde más dinero se pierde por desinformación: comparamos comisiones y tipos de cambio reales de las plataformas más usadas para enviar dinero a México, Centroamérica, Colombia y el resto de la región, y explicamos qué envíos quedan afectados por el nuevo impuesto federal de 2026 y cuáles están exentos.`,

  impuestos: `Declarar impuestos siendo inmigrante genera dos miedos: el de hacerlo mal y el de que la información llegue a inmigración. El segundo miedo, además, hace que muchas familias dejen sobre la mesa miles de dólares en devoluciones y créditos a los que sí tenían derecho.

La realidad legal es más tranquilizadora de lo que se cree. El IRS es una agencia de recaudación, la ley federal protege la confidencialidad de la información tributaria, y el ITIN existe precisamente para que quien no tiene SSN pueda cumplir con sus obligaciones fiscales. Además, un historial de declaraciones es uno de los documentos que más peso tiene en trámites migratorios, de crédito y de vivienda.

En esta sección explicamos todo el ciclo. Cómo [sacar el ITIN paso a paso con el formulario W-7](/articulo/como-sacar-itin-paso-a-paso-w7), qué documentos acepta el IRS y por qué las copias notariadas no sirven; cómo [renovar un ITIN vencido](/articulo/renovar-itin-vencido) antes de que te retrase la devolución; y por qué, punto por punto, [es seguro declarar impuestos con ITIN](/articulo/es-seguro-declarar-impuestos-con-itin).

Luego, la parte práctica: cómo [declarar impuestos con ITIN en 2026](/articulo/como-declarar-impuestos-con-itin-2026) sin pagar de más a un preparador, qué pasa con el [Crédito Tributario por Hijos cuando tienes ITIN](/articulo/credito-por-hijos-itin-2026), y qué debes saber si trabajas por tu cuenta y recibes formularios 1099, incluidos los pagos trimestrales estimados y las deducciones que sí puedes tomar.

También cubrimos el cambio que más afecta al bolsillo este año: el [nuevo impuesto federal del 1 % a las remesas](/articulo/impuesto-remesas-1-por-ciento-2026), a qué envíos aplica exactamente y cómo evitarlo legalmente eligiendo la forma de pago correcta.

Todas las cifras, plazos y formularios se verifican directamente con el IRS y se actualizan cada temporada fiscal.`,
};

export function getCategoryIntro(slug: string): string | undefined {
  return CATEGORY_INTROS[slug];
}
