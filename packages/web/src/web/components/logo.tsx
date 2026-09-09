import { useId } from "react";

interface LogoMarkProps { className?: string; }

export function LogoMark({ className = "h-10 w-10" }: LogoMarkProps) {
  const titleId = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-labelledby={titleId} role="img">
      <title id={titleId}>Finanzas Para Inmigrantes</title>
      <rect width="48" height="48" rx="12" fill="#FFF8EF"/>
      <circle cx="35" cy="11.5" r="5.2" fill="#FFB51B"/>
      <path d="M6.5 23 23.5 8.8 41.5 23" stroke="#1264A3" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5 21.5V39h25V21.5" fill="white" stroke="#1264A3" strokeWidth="2.35" strokeLinejoin="round"/>
      <path d="M15.5 35.5V27h4.2v8.5M21.9 35.5V23h4.2v12.5M28.3 35.5v-6.7h4.2v6.7" fill="#0B9A78"/>
      <path d="M7.5 40c8.6 2.7 21.1 2 33-4.6" stroke="#E44736" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M8 40c8.7 2.5 20.3 2 31.7-4.2" stroke="#1264A3" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="3 2"/>
    </svg>
  );
}

export function Logo({ size = "md", showTagline = true, onDark = false }: { size?: "sm" | "md"; showTagline?: boolean; onDark?: boolean }) {
  const mark = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const text = size === "sm" ? "text-[0.9rem]" : "text-[1.06rem]";
  return <span className="flex min-w-0 items-center gap-2.5">
    <LogoMark className={`${mark} shrink-0`} />
    <span className="flex min-w-0 flex-col leading-none">
      <span className={`font-display ${text} font-extrabold tracking-[-0.035em] whitespace-nowrap ${onDark ? "text-white" : "text-[#102E54]"}`}>Finanzas Para <span className="text-[#1976D2]">Inmigrantes</span></span>
      {showTagline && <span className={`mt-1.5 text-[8px] font-medium tracking-[0.025em] ${onDark ? "text-white/65" : "text-[#48617D]"}`}>Sin SSN · Con ITIN · En Español</span>}
    </span>
  </span>;
}
