import { useId } from "react";

interface LogoMarkProps { className?: string; }

/** Marca: hogar + crecimiento financiero + identidad USA. */
export function LogoMark({ className = "h-10 w-10" }: LogoMarkProps) {
  const titleId = useId();
  return (
    <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby={titleId} role="img">
      <title id={titleId}>Finanzas Para Inmigrantes</title>
      <path d="M5 22 26 5l21 17" stroke="#1264A3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 20v25h32V20" fill="#fff" stroke="#1264A3" strokeWidth="3" strokeLinejoin="round"/>
      <circle cx="38.5" cy="12" r="6" fill="#F7B731"/>
      <path d="M15 35h5v7h-5zM23 30h5v12h-5zM31 25h5v17h-5z" fill="#27A66F"/>
      <path d="M11 43h30" stroke="#E65A4F" strokeWidth="3" strokeLinecap="round"/>
      <path d="M11 39h30" stroke="#1264A3" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
    </svg>
  );
}

export function Logo({ size = "md", showTagline = true, onDark = false }: { size?: "sm" | "md"; showTagline?: boolean; onDark?: boolean }) {
  const mark = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "sm" ? "text-[0.95rem]" : "text-[1.05rem]";
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${text} font-bold tracking-[-0.025em] ${onDark ? "text-white" : "text-[#123B63]"}`}>
          Finanzas Para <span className="text-[#1264A3]">Inmigrantes</span>
        </span>
        {showTagline && <span className={`mt-1 font-mono text-[8.5px] tracking-[0.04em] ${onDark ? "text-white/60" : "text-muted-foreground"}`}>Sin SSN · Con ITIN · En Español</span>}
      </span>
    </span>
  );
}
