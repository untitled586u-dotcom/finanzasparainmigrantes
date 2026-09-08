export interface Category {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string; // lucide icon name key handled in UI
}

export interface Article {
  slug: string;
  title: string;
  /** Título para el <title> / SERP cuando `title` supera los ~60 caracteres. */
  seoTitle?: string;
  description: string;
  category: string; // category slug
  readMinutes: number;
  date: string; // ISO date
  keywords: string[];
}
