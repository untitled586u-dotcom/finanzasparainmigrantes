/**
 * Redirecciones 301 del sitio anterior que vivió en este dominio.
 *
 * El dominio alojó un blog de WordPress ("Finanzas para inmigrantes") entre
 * diciembre de 2017 y septiembre de 2023, con el mismo tema que este sitio.
 * Caducó, pasó unas semanas aparcado y se volvió a registrar en agosto de 2026.
 *
 * Se comprobó antes de escribir esto:
 *   - El contenido antiguo era legítimo: ni spam, ni hackeo, ni enlaces
 *     salientes raros en las capturas de Wayback de 2023.
 *   - Search Console no reporta acciones manuales ni problemas de seguridad.
 *
 * Semrush ve 231 backlinks desde 131 dominios apuntando a esas URLs viejas.
 * Todas devolvían 404, así que esa autoridad se estaba tirando a la basura.
 * Un 301 hacia el artículo equivalente la recupera; donde no hay equivalente
 * razonable, se manda a la categoría o al índice de artículos.
 *
 * Las claves van sin barra final y en minúsculas: `normalizeLegacyPath()` se
 * encarga de normalizar lo que llegue.
 */
const ARTICLE = (slug: string) => `/articulo/${slug}`;
const CATEGORY = (slug: string) => `/categoria/${slug}`;

export const LEGACY_REDIRECTS: Record<string, string> = {
  // --- Entradas del blog antiguo -> artículo equivalente ---------------------
  "/construye-tu-credito-o-mejora-tu-puntaje-con-estos-sencillos-pasos": ARTICLE(
    "construir-credito-desde-cero-inmigrantes",
  ),
  "/conoce-la-mejor-manera-salir-deuda-tarjeta-credito": ARTICLE("deuda-en-cobranza-que-hacer"),
  "/cuando-es-necesario-tener-un-seguro-de-vida": ARTICLE("seguro-de-vida-para-hispanos"),
  "/car-lease": ARTICLE("comprar-carro-con-itin"),
  "/si-quiero-conducir-uber-o-lyft-que-me-conviene-mas-comprar-rentar-o-un-lease":
    ARTICLE("financiar-carro-sin-historial"),
  "/no-puedes-seguir-pagando-tu-credito-hipotecario-conoce-tus-opciones": ARTICLE(
    "hipoteca-con-itin-bancos-que-prestan",
  ),
  "/pensando-comprar-vivienda-lo-debes-saber": ARTICLE("comprar-casa-con-itin"),
  "/pueden-esperar-los-latinos-la-reforma-tributaria-aprobada-estados-unidos": ARTICLE(
    "como-declarar-impuestos-con-itin-2026",
  ),
  "/tienes-plazo-17-abril-abrir-una-ira-ahorrar-miles-impuestos": ARTICLE(
    "como-declarar-impuestos-con-itin-2026",
  ),
  "/las-ventajas-de-abrir-una-cuenta-corriente-en-los-estados-unidos": ARTICLE(
    "abrir-cuenta-bancaria-sin-ssn",
  ),
  "/cuenta-hsa": ARTICLE("seguro-de-salud-para-inmigrantes"),
  // Sin equivalente directo: finanzas personales genéricas. Van al índice o a la
  // categoría más cercana en vez de forzar un destino que no encaja.
  "/aplicaciones-manejo-finanzas-personales": CATEGORY("banca"),
  "/todos-debemos-fondo-emergencia": CATEGORY("banca"),
  "/los-8-pasos-para-conseguir-la-libertad-financiera": "/articulos",
  "/consejos-financieros-para-afrontar-la-crisis-del-coronavirus": "/articulos",
  "/manipulacion-financiera-cuando-un-adulto-mayor-es-enganado-por-alguien-de-confianza":
    "/articulos",
  "/que-hacer-frente-a-la-volatilidad-de-los-mercados-algunos-consejos-prudentes-para-proteger-tus-inversiones":
    "/articulos",
  "/ya-esta-aqui-la-segunda-edicion-del-libro-finanzas-personales-para-inmigrantes": "/",

  // --- Estructura de WordPress ----------------------------------------------
  "/blog": "/articulos",
  "/category/finanzaspersonales": "/articulos",

  // --- Tags -> categoría más cercana ----------------------------------------
  "/tag/credit-score": CATEGORY("credito"),
  "/tag/credito": CATEGORY("credito"),
  "/tag/tarjeta-de-credito": CATEGORY("credito"),
  "/tag/deuda-de-tarjeta-de-credito": CATEGORY("credito"),
  "/tag/deudas": CATEGORY("credito"),
  "/tag/credito-para-vehiculo": CATEGORY("prestamos"),
  "/tag/car-loan": CATEGORY("prestamos"),
  "/tag/car-lease": ARTICLE("comprar-carro-con-itin"),
  "/tag/leasing-de-vehiculo": ARTICLE("comprar-carro-con-itin"),
  "/tag/alquiler-de-auto": ARTICLE("comprar-carro-con-itin"),
  "/tag/compra-de-vehiculo": ARTICLE("comprar-carro-con-itin"),
  "/tag/impuestos-de-auto": CATEGORY("seguro-de-auto"),
  "/tag/deducible": CATEGORY("seguro-de-auto"),
  "/tag/seguro-de-salud": ARTICLE("seguro-de-salud-para-inmigrantes"),
  "/tag/obamacare": ARTICLE("seguro-de-salud-para-inmigrantes"),
  "/tag/hsa": ARTICLE("seguro-de-salud-para-inmigrantes"),
  "/tag/health-savings-account": ARTICLE("seguro-de-salud-para-inmigrantes"),
  "/tag/cuentas-de-ahorro-para-la-salud": ARTICLE("seguro-de-salud-para-inmigrantes"),
  "/tag/impuestos": CATEGORY("impuestos"),
  "/tag/impuestos-2018": CATEGORY("impuestos"),
  "/tag/impuestos-usa": CATEGORY("impuestos"),
  "/tag/impuestos-federales": CATEGORY("impuestos"),
  "/tag/ahorro-en-impuestos": CATEGORY("impuestos"),
  "/tag/beneficios-fiscales": CATEGORY("impuestos"),
  "/tag/deducciones-de-impuestos": CATEGORY("impuestos"),
  "/tag/reforma-tributaria": CATEGORY("impuestos"),
  "/tag/fintech": CATEGORY("banca"),
  "/tag/aplicaciones-para-finanzas-personales": CATEGORY("banca"),
  "/tag/fondo-de-emergencia": CATEGORY("banca"),
  "/tag/presupuesto": CATEGORY("banca"),
  "/tag/economia-familiar": CATEGORY("banca"),
  "/tag/ahorro-para-el-retiro": "/articulos",
  "/tag/cuentas-de-ahorro-para-el-retiro": "/articulos",
  "/tag/fondos-de-retiro": "/articulos",
  "/tag/retiro": "/articulos",
  "/tag/ira": "/articulos",
  "/tag/educacion-financiera": "/articulos",
  "/tag/finanzas-personales": "/articulos",
  "/tag/finanzas-para-latinos": "/articulos",
  "/tag/libertad-financiera": "/articulos",
  "/tag/metas-financieras": "/articulos",
  "/tag/planeacion-financiera": "/articulos",
  "/tag/salud-financiera": "/articulos",
  "/tag/exito": "/articulos",
  "/tag/volatilidad": "/articulos",

  // --- Fusiones y divisiones internas ---------------------------------------
  // La guía única de Centroamérica se dividió en una página por país (agosto de
  // 2026): cada keyword tiene volumen propio y la página combinada no rankeaba
  // para ninguna. Guatemala es el destino porque es el corredor más grande.
  "/articulo/enviar-dinero-guatemala-honduras-el-salvador": ARTICLE("enviar-dinero-guatemala"),
};

/**
 * Normaliza una ruta entrante al formato de las claves del mapa: minúsculas,
 * sin barra final y sin los sufijos que añadía WordPress.
 *
 * WordPress publicaba variantes de cada URL que también acumularon enlaces:
 *   - `/lo-que-sea/feed/`      (RSS de la entrada)
 *   - `/tag/lo-que-sea/page/2/` (paginación)
 *   - `/amp/`                  (versión AMP)
 * Todas se resuelven al destino de la URL base en vez de dar 404.
 */
export function normalizeLegacyPath(pathname: string): string {
  let p = pathname.toLowerCase().replace(/\/+$/, "");
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/(feed|amp|embed)$/, "");
  p = p.replace(/\/page\/\d+$/, "");
  return p || "/";
}

/**
 * Devuelve el destino del 301 para una ruta antigua, o null si no aplica.
 *
 * Los archivos por fecha (`/2018/01/`, `/2018/01/15/mi-post/`) se mandan en
 * bloque al índice de artículos: eran cientos de combinaciones y no tiene
 * sentido enumerarlas.
 */
export function resolveLegacyRedirect(pathname: string): string | null {
  const p = normalizeLegacyPath(pathname);
  const mapped = LEGACY_REDIRECTS[p];
  if (mapped) return mapped;
  if (/^\/(19|20)\d{2}(\/\d{1,2})*(\/.+)?$/.test(p)) return "/articulos";
  return null;
}
