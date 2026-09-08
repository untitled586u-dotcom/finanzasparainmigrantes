// La regla `mobile-layout-keeps-template-providers` de konsistent exige que
// `app/_layout.tsx` importe desde `../components/ErrorBoundary`, mientras que la
// plantilla entrega el componente en `__ErrorBoundary.tsx` (fichero gestionado,
// intocable). Este re-export cubre esa diferencia sin duplicar ni modificar
// código gestionado: la implementación sigue siendo una sola.
export { ErrorBoundary } from "./__ErrorBoundary";
