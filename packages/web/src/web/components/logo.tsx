import { useId } from "react";

interface LogoMarkProps {
  className?: string;
  /** Color del tejado/casa. Por defecto usa currentColor. */
  houseColor?: string;
  /** Color de la moneda. */
  coinColor?: string;
  /** Color del anillo y el símbolo dentro de la moneda. */
  ringColor?: string;
}

/**
 * Marca de FinanzasParaInmigrantes: tejado (echar raíces) + moneda (dinero).
 * SVG vectorial, nítido a cualquier tamaño.
 */
export function LogoMark({
  className = "h-9 w-9",
  houseColor = "currentColor",
  coinColor = "#E6B455",
  ringColor = "var(--primary)",
}: LogoMarkProps) {
  // El logo se renderiza varias veces por página (cabecera, pie): useId evita
  // ids duplicados en el <title> del SVG.
  const titleId = useId();
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-labelledby={titleId}
    >
      <title id={titleId}>Finanzas Para Inmigrantes</title>
      {/* Tejado */}
      <path
        d="M7.5 22.5 24 9l16.5 13.5"
        stroke={houseColor}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Muros */}
      <path
        d="M12 26v13h24V26"
        stroke={houseColor}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Moneda */}
      <circle
        cx="24"
        cy="31.5"
        r="6.4"
        fill={coinColor}
        stroke={ringColor}
        strokeWidth="2.4"
      />
      <path d="M24 27.3v8.4" stroke={ringColor} strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M26.2 29.1a2.1 2.1 0 0 0-2.1-1.3h-.5a1.85 1.85 0 0 0 0 3.7h1.1a1.85 1.85 0 0 1 0 3.7h-.5a2.1 2.1 0 0 1-2.1-1.3"
        stroke={ringColor}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Logo completo: marca dentro de un contenedor de color + wordmark opcional. */
export function Logo({
  size = "md",
  showTagline = true,
  onDark = false,
}: {
  size?: "sm" | "md";
  showTagline?: boolean;
  /** Variante para el pie de página, sobre el azul marino oscuro. */
  onDark?: boolean;
}) {
  const box = size === "sm" ? "h-8 w-8" : "h-[34px] w-[34px]";
  const mark = size === "sm" ? "h-5 w-5" : "h-[22px] w-[22px]";
  const text = size === "sm" ? "text-base" : "text-[1.05rem]";

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex ${box} shrink-0 items-center justify-center rounded-[9px] text-white`}
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--marigold), var(--coral))",
        }}
      >
        <LogoMark className={mark} houseColor="currentColor" coinColor="#FFF3DB" ringColor="#7A2E12" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display ${text} font-bold ${onDark ? "text-white" : "text-foreground"}`}
        >
          Finanzas Para Inmigrantes
        </span>
        {showTagline && (
          <span className="mt-1 hidden font-mono text-[10px] tracking-wide text-muted-foreground sm:block">
            Dinero y seguros en español · EE.UU.
          </span>
        )}
      </span>
    </span>
  );
}
