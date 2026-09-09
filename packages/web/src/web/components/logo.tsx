import { useId } from "react";

interface LogoMarkProps { className?: string; }

/** Compact version of the approved brand mark: home + growth + U.S. identity. */
export function LogoMark({ className = "h-10 w-10" }: LogoMarkProps) {
  const titleId = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby={titleId} role="img">
      <title id={titleId}>Finanzas Para Inmigrantes</title>
      <rect width="48" height="48" rx="11" fill="#F4FAFD"/>
      <circle cx="34.5" cy="12.5" r="5" fill="#FFB51B"/>
      <path d="M7 22.5 23.5 9 40 22.5" stroke="#1264A3" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21.5v18h24v-18" fill="white" stroke="#1264A3" strokeWidth="2.4" strokeLinejoin="round"/>
      <path d="M16 35V25h4v10M22 35V21h4v14M28 35V28h4v7" fill="#0B9A78"/>
      <path d="M8 39.5c8.5 2.8 20.5 2.3 31.5-3.7" stroke="#E44736" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 39.5c8.8 2.7 19.8 2.2 30.2-3.4" stroke="#1264A3" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
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
