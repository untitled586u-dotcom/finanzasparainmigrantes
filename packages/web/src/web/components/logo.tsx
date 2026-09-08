import { useId } from "react";

interface LogoMarkProps { className?: string; }

/** Mark based directly on the approved reference: orange square, white home/finance symbol. */
export function LogoMark({ className = "h-10 w-10" }: LogoMarkProps) {
  const titleId = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby={titleId} role="img">
      <title id={titleId}>Finanzas Para Inmigrantes</title>
      <rect width="48" height="48" rx="11" fill="#FF7A1A"/>
      <path d="M13 23.2 24 14l11 9.2" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.2 22.2v14h15.6v-14" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M21 36.2v-7.1h6v7.1" stroke="white" strokeWidth="2.3"/>
      <path d="M21 25.1h2.7M27 25.1h-2.7" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="m29.4 30.2 2.3 2.3 3.8-4.1" stroke="#DFF7ED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Logo({ size = "md", showTagline = true, onDark = false }: { size?: "sm" | "md"; showTagline?: boolean; onDark?: boolean }) {
  const mark = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const text = size === "sm" ? "text-[0.92rem]" : "text-[1.08rem]";
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={mark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display ${text} font-extrabold tracking-[-0.03em] ${onDark ? "text-white" : "text-[#102E54]"}`}>
          Finanzas Para <span className="text-[#1976D2]">Inmigrantes</span>
        </span>
        {showTagline && <span className={`mt-1.5 text-[8.5px] font-medium tracking-[0.025em] ${onDark ? "text-white/65" : "text-[#48617D]"}`}>Sin SSN · Con ITIN · En Español</span>}
      </span>
    </span>
  );
}
