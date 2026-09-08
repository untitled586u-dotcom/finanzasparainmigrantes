export const SITE = {
  name: "Finanzas Para Inmigrantes",
  domain: "FinanzasParaInmigrantes.com",
  url: "https://finanzasparainmigrantes.com",
  ogImage: "https://finanzasparainmigrantes.com/og-image.png",
  tagline: "Dinero y seguros explicados en español, para la comunidad hispana en EE.UU.",
  description:
    "Guías claras y prácticas de finanzas y seguros para hispanos e inmigrantes en Estados Unidos: seguro de auto, crédito, préstamos y banca sin SSN o con ITIN.",
  email: "contacto@finanzasparainmigrantes.com",
};

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Fecha corta para metadatos de tarjetas: «16 ago 2026». */
export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d
    .toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
    .replace(".", "");
}
