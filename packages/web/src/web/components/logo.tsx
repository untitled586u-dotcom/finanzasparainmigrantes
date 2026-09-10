import logoAsset from "../../../../logo-opt1-casa_1785636532633.png";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return <img src={logoAsset} className={`${className} object-contain`} alt="Finanzas Para Inmigrantes" />;
}

export function Logo({ size = "md", showTagline = true, onDark = false }: { size?: "sm" | "md"; showTagline?: boolean; onDark?: boolean }) {
  const width = size === "sm" ? "w-[175px]" : "w-[205px]";
  return (
    <span className={`flex min-w-0 ${width}`}>
      <img src={logoAsset} className="h-auto w-full object-contain" alt="Finanzas Para Inmigrantes" />
    </span>
  );
}
