import { Link } from "wouter";
import { AUTHOR } from "../lib/author";
import { LogoMark } from "./logo";

/** Avatar de la firma: marca si la autoría es editorial, foto si es persona. */
function Avatar({ size }: { size: "sm" | "lg" }) {
  const box = size === "sm" ? "h-6 w-6 rounded-md" : "h-14 w-14 rounded-xl";
  const mark = size === "sm" ? "h-3.5 w-3.5" : "h-8 w-8";

  if (AUTHOR.isBrand) {
    return (
      <span
        className={`flex ${box} shrink-0 items-center justify-center bg-primary text-primary-foreground`}
        aria-hidden="true"
      >
        <LogoMark className={mark} houseColor="currentColor" />
      </span>
    );
  }

  return (
    <img
      src={AUTHOR.photo}
      alt={AUTHOR.name}
      width={size === "sm" ? 24 : 56}
      height={size === "sm" ? 24 : 56}
      loading="lazy"
      className={`${box} shrink-0 border border-border bg-secondary object-cover`}
    />
  );
}

/** Firma compacta bajo el título del artículo. */
export function AuthorInline() {
  return (
    <Link
      to={`/autor/${AUTHOR.slug}`}
      className="flex items-center gap-2 hover:text-primary"
    >
      <Avatar size="sm" />
      <span>
        Por{" "}
        <span className="font-medium text-foreground">
          {AUTHOR.isBrand ? AUTHOR.shortName : AUTHOR.name}
        </span>
      </span>
    </Link>
  );
}

/** Bloque editorial al final del artículo (señal E-E-A-T para Google). */
export function AuthorBox() {
  return (
    <aside className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Avatar size="lg" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {AUTHOR.isBrand ? "Sobre esta guía" : "Escrito por"}
          </p>
          <Link
            to={`/autor/${AUTHOR.slug}`}
            className="mt-1 block font-display text-lg font-semibold text-foreground hover:text-primary"
          >
            {AUTHOR.name}
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {AUTHOR.isBrand
              ? "Redactada a partir de fuentes oficiales y revisada antes de publicarse. No somos asesores con licencia: si tu caso es particular, consulta a un profesional."
              : AUTHOR.short}
          </p>
          <p className="mt-3 text-sm">
            <Link
              to="/politica-editorial"
              className="text-primary underline underline-offset-4"
            >
              Cómo verificamos nuestro contenido
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
