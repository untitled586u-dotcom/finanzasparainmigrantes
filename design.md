# FinanzasParaInmigrantes — Design

Blog editorial en español para hispanos e inmigrantes en EE.UU. Guías prácticas y confiables sobre seguro de auto, crédito, préstamos y banca sin SSN/ITIN. Web only. Visual: editorial, confiable, cálido y humano — nada de "fintech frío". Optimizado para lectura larga y densidad de anuncios AdSense sin sentirse spam.

## Brand & Colors

Verde esmeralda profundo (dinero, crecimiento, confianza) + acento ámbar dorado + fondo crema cálido. Evitamos el azul corporativo genérico.

| Token | Valor | Uso |
|-------|-------|-----|
| primary | oklch(0.42 0.09 160) ≈ #1B6B4B verde esmeralda | Botones, enlaces, marca |
| primary-foreground | #FFFFFF | Texto sobre verde |
| accent | oklch(0.78 0.14 75) ≈ #E0A93B ámbar dorado | Destacados, badges, CTA secundaria |
| background | oklch(0.985 0.008 95) ≈ #FBFAF6 crema | Fondo de página |
| card | #FFFFFF | Tarjetas, superficies |
| foreground | oklch(0.22 0.02 150) ≈ #1E2822 casi negro verdoso | Texto principal |
| muted-foreground | oklch(0.5 0.02 150) ≈ #6B7A72 | Texto secundario, fechas |
| border | oklch(0.9 0.01 120) ≈ #E6E4DC | Líneas finas |

## Typography

- **Display / titulares**: Fraunces (serif editorial, transmite confianza y autoridad).
- **Body / UI**: Poppins.
- Cargadas por Google Fonts en `index.html`. Jerarquía por tamaño/peso, line-height generoso para lectura.

## Pages

- **Home** (`pages/index.tsx`) — hero con propuesta de valor, categorías, artículos destacados y recientes, slot de anuncio.
- **Categoría** (`pages/category.tsx`, `/categoria/:slug`) — listado de artículos por tema.
- **Artículo** (`pages/article.tsx`, `/articulo/:slug`) — cuerpo largo en markdown (prose), tabla de contenidos implícita, anuncios in-article, artículos relacionados.
- **Blog / Todos** (`pages/blog.tsx`, `/articulos`) — todos los artículos.
- **Sobre** (`/sobre-nosotros`), **Contacto** (`/contacto`), **Política de Privacidad** (`/privacidad`), **Términos** (`/terminos`), **Aviso legal** — requeridos para aprobación AdSense.
- **404** (`pages/not-found.tsx`).

## Componentes clave

- `Layout` (header con nav + búsqueda de categorías, footer con enlaces legales).
- `ArticleCard`, `CategoryPill`, `AdSlot` (placeholder de AdSense listo para pegar el código real).
- `Seo` helper para title/description/OG por página.

## Contenido

~20 artículos long-form en español, tono claro y práctico, orientados a búsquedas long-tail de alto CPC (seguros, préstamos, crédito, banca para inmigrantes). Almacenados como módulo de datos TS en `src/web/content/articles.ts`.

## AdSense

- Slots `AdSlot` colocados en: header del home, entre tarjetas, dentro de artículos (después del primer bloque y a mitad), y sidebar/final.
- Placeholder visible en dev; el usuario pega su `ca-pub-XXXX` y crea los slots reales tras aprobación. Script de AdSense se inserta en `index.html` (comentado hasta tener publisher ID).
