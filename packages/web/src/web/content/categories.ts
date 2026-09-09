import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "credito",
    name: "Crédito en EE.UU. para inmigrantes",
    short: "Crédito",
    description: "Construye y mejora tu crédito desde cero, incluso si empezaste con ITIN o sin historial. Tarjetas, puntaje, reportes, cobranza y más.",
    icon: "credit-card",
  },
  {
    slug: "seguros",
    name: "Seguros para inmigrantes",
    short: "Seguros",
    description: "Entiende seguro de auto, salud, vida y hogar/renta en EE.UU., con guías prácticas para inmigrantes y requisitos por estado.",
    icon: "shield-check",
  },
  {
    slug: "banca",
    name: "Banca y documentos",
    short: "Banca",
    description: "Abre cuentas, entiende SSN e ITIN, usa matrícula consular y organiza tus primeros pasos financieros en EE.UU.",
    icon: "landmark",
  },
  {
    slug: "remesas",
    name: "Remesas",
    short: "Remesas",
    description: "Compara y entiende cómo enviar dinero desde EE.UU. a México, Centroamérica, Sudamérica y el Caribe.",
    icon: "send",
  },
  {
    slug: "prestamos",
    name: "Préstamos",
    short: "Préstamos",
    description: "Opciones para carro, casa, préstamos personales e hipotecas con ITIN, sin historial o con mal crédito.",
    icon: "hand-coins",
  },
  {
    slug: "impuestos",
    name: "Impuestos e ITIN",
    short: "Impuestos",
    description: "Saca o renueva tu ITIN, declara tus taxes y entiende W-7, 1099, Schedule C y créditos fiscales.",
    icon: "receipt",
  },
];

const legacyAuto: Category = {
  slug: "seguro-de-auto",
  name: "Seguro de Auto",
  short: "Seguros",
  description: "Guías sobre seguro de auto para inmigrantes, incluyendo ITIN, matrícula consular, licencia y requisitos estatales.",
  icon: "car",
};

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug) ?? (slug === "seguro-de-auto" ? legacyAuto : undefined);
}
