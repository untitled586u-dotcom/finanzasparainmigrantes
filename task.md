# Estado del trabajo SEO — finanzasparainmigrantes.com

Actualizado: 2026-09-07

## Reglas fijas
- Mínimos: 2.000+ palabras en seguros y préstamos; 1.200+ en el resto.
- Cero keywords duplicadas en todo el sitio.
- 7 FAQ en negritas (pregunta y respuesta en líneas distintas) + 1 bloque `{.steps}` por artículo.
- `seoTitle` ≤60 chars, `description` 70–160.
- Build: `bunx vite build` en tmux con log en `/tmp/prNN.log`. Último: `pr34` (EXIT=0, 72 rutas).

## Tandas cerradas y verificadas en producción
1. Remesas (9 artículos, 1.219–1.584)
2. Crédito/ITIN/vida (5 artículos, 1.556–2.315)
3. Seguros por estado: FL, CA, TX, NY (2.203–2.474)
4. Préstamos: 7 artículos (2.037–2.609), categoría al 100 %
5. Seguros críticos: 4 artículos (2.077–2.552)
6. Seguros estados restantes: 8 artículos (2.073–3.044)
7. Impuestos: 5 artículos (1.843–2.232)

## Tanda 8 — banca y crédito (ENTREGADA, pendiente de republicar)
| Slug | Antes | Ahora |
|---|---|---|
| construir-credito-desde-cero-inmigrantes | 551 | 2.360 |
| tarjetas-credito-sin-historial | 447 | 2.185 |
| mejores-bancos-para-hispanos | 405 | 1.979 |
| diferencia-ssn-itin | 492 | 1.935 |
| bancos-que-aceptan-matricula-consular | 1.115 | 1.756 |
| sacar-licencia-conducir | 438 | 1.694 |

Todos con faq=7 y steps=1 verificados en `dist/`.
Metadatos actualizados: `date: 2026-09-05`, `readMinutes` 11–14, `seoTitle` añadido a los 4 que no lo tenían,
+2 keywords por artículo. Título y description de `diferencia-ssn-itin` reescritos (se le quitó la sección
de "cómo sacar el ITIN" para no canibalizar `como-sacar-itin-paso-a-paso-w7`).

Verificaciones: tsc EXIT=0 · lint 0 errores · keywords duplicadas=0 (289 únicas, 58 artículos) ·
72 rutas / 72 canonicals / 0 problemas · enlaces rotos=0 · huérfanos=0 · build EXIT=0.

### Siguiente paso inmediato
El usuario republica → verificar los 6 slugs en producción con curl (200, faq=7, steps=1) →
pedir reindexación en Search Console.

## Estado global de longitudes
Tras la tanda 8 **no queda ningún artículo por debajo de 1.200 palabras**. El artículo más corto
del sitio es `pasar-historial-credito-itin-a-ssn` con 1.209.

## Deuda pendiente
1. **robots.txt de Cloudflare** — el origen ya sirve el correcto (81 bytes, con línea Sitemap),
   pero producción devuelve el gestionado por Cloudflare (1.835 bytes, sin Sitemap, con Disallow
   para GPTBot/ClaudeBot/CCBot). Arreglo: dashboard → AI Crawl Control → robots.txt → desactivar
   "Manage robots.txt"; luego Caching → Purge Everything. **Resolver antes de pedir AdSense.**
2. Bing → Sitemaps: borrar la entrada duplicada de `www`.
3. Search Console: solicitar indexación de las URLs reescritas (~10/día).
4. Preguntas del usuario sin contestar: compra de enlaces en "getalink", plan de enlazado interno,
   veredicto final del CSV de backlinks.
5. No solicitar AdSense hasta 15–20 artículos indexados y 3–4 semanas de estabilidad.

## Tanda 9 — propuesta
Ya no hay artículos delgados. Frentes posibles:
(a) contestar la deuda de preguntas SEO (enlaces, enlazado interno, backlinks);
(b) crear artículos nuevos para keywords de alto CPC sin cubrir (seguros $54,91 / préstamos $44,28).
