/**
 * Aislamiento del `import.meta.glob` de Vite.
 *
 * Este módulo solo lo importa `bodies.ts` de forma dinámica y únicamente en el
 * navegador. Al estar separado, el script de pre-render (que corre en Bun, sin
 * el transform de Vite) nunca lo evalúa y por tanto no falla.
 */
export const bodies = import.meta.glob<{ default: string }>("./bodies/*.ts");
