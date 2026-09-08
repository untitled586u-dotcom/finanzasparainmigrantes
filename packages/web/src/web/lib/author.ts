/**
 * Identidad editorial del sitio.
 *
 * Modelo actual: identidad de MARCA, no de persona. El contenido se atribuye a
 * la redacción del sitio, que declara abiertamente su método y sus fuentes.
 * No se afirma experiencia personal ni credenciales que no existan.
 *
 * Si en el futuro una persona real da la cara, cambia `isBrand` a false y
 * rellena name, role, photo, bio y links con sus datos verdaderos: el JSON-LD
 * pasará automáticamente de Organization a Person.
 */
export const AUTHOR = {
  /** true = la autoría es de la marca; false = persona real identificada. */
  isBrand: true,

  slug: "redaccion",
  name: "Redacción de Finanzas Para Inmigrantes",

  /** Nombre corto para firmas en línea. */
  shortName: "la Redacción",

  role: "Investigación y edición de contenido",

  /** Con isBrand=true se usa la marca, no una foto de persona. */
  photo: "/icon-512.png",

  short:
    "Equipo editorial que investiga y redacta guías de finanzas y seguros para la comunidad hispana en EE.UU., contrastando cada dato con fuentes oficiales.",

  bio: [
    "Finanzas Para Inmigrantes es un proyecto editorial independiente, no una asesoría ni una agencia. Nuestro trabajo consiste en tomar información que existe repartida en documentos oficiales, casi siempre en inglés y escrita en lenguaje técnico, y convertirla en guías que se entiendan en español a la primera lectura.",
    "No firmamos con el nombre de un profesional con licencia porque no lo somos, y preferimos decirlo antes que insinuar lo contrario. Lo que sí garantizamos es el método: cada cifra, requisito o plazo que publicamos sale de la fuente primaria —el IRS, el CFPB, los Departamentos de Seguros estatales o los términos publicados por la propia entidad— y queda enlazada para que puedas comprobarla tú mismo.",
    "Cuando un tema depende de la situación particular de cada persona, o exige el criterio de un contador, un abogado de inmigración o un agente con licencia, lo decimos con claridad en el propio artículo en lugar de improvisar una respuesta que podría costarte dinero.",
  ],

  links: [] as { label: string; url: string }[],
};

/** Fuentes oficiales que se citan de forma recurrente en el sitio. */
export const SOURCES = [
  { name: "IRS (Servicio de Impuestos Internos)", url: "https://www.irs.gov/es" },
  {
    name: "CFPB (Oficina de Protección Financiera del Consumidor)",
    url: "https://www.consumerfinance.gov/es/",
  },
  { name: "USA.gov en español", url: "https://www.usa.gov/es" },
  {
    name: "NAIC (Asociación Nacional de Comisionados de Seguros)",
    url: "https://content.naic.org/",
  },
  { name: "Administración del Seguro Social", url: "https://www.ssa.gov/es/" },
];
