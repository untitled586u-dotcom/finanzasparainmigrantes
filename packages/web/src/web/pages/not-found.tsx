import { Link } from "wouter";
import { Compass } from "lucide-react";
import { useSeo } from "../hooks/use-seo";

export default function NotFound() {
  useSeo({ title: "Página no encontrada" });
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-28 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold text-foreground">Página no encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        Puede que el enlace esté roto o que la página ya no exista. Vuelve al inicio o
        explora nuestras guías.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Ir al inicio
        </Link>
        <Link to="/articulos" className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold">
          Ver guías
        </Link>
      </div>
    </div>
  );
}
