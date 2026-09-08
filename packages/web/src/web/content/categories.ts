import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "seguro-de-auto",
    name: "Seguro de Auto",
    short: "Seguros",
    description:
      "Cómo asegurar tu carro en EE.UU. aunque no tengas licencia americana, SSN o historial. Compara, ahorra y evita multas.",
    icon: "car",
  },
  {
    slug: "credito",
    name: "Crédito",
    short: "Crédito",
    description:
      "Construye y mejora tu puntaje de crédito desde cero. Tarjetas para inmigrantes, reportes de crédito y trucos que sí funcionan.",
    icon: "credit-card",
  },
  {
    slug: "prestamos",
    name: "Préstamos",
    short: "Préstamos",
    description:
      "Financia tu carro, tu casa o una emergencia. Opciones reales de préstamos con ITIN, sin historial o con mal crédito.",
    icon: "hand-coins",
  },
  {
    slug: "banca",
    name: "Banca y Documentos",
    short: "Banca",
    description:
      "Abre cuentas, envía remesas y maneja tus trámites financieros en EE.UU. sin complicaciones, con ITIN, pasaporte o matrícula consular.",
    icon: "landmark",
  },
  {
    slug: "impuestos",
    name: "Impuestos e ITIN",
    short: "Impuestos",
    description:
      "Saca tu ITIN, declara tus taxes y entiende los cambios de 2026: Crédito por Hijos, el nuevo impuesto a las remesas y más, explicado claro.",
    icon: "receipt",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
