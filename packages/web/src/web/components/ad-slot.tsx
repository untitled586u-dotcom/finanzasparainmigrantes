/**
 * AdSlot — contenedor listo para Google AdSense.
 *
 * Cuando el sitio esté aprobado en AdSense:
 * 1. Descomenta el <script> de AdSense en index.html con tu ca-pub-XXXX.
 * 2. Crea una unidad de anuncio en tu panel de AdSense y copia su data-ad-slot.
 * 3. Reemplaza el placeholder de abajo por el bloque <ins className="adsbygoogle" ... />
 *    y llama a (window.adsbygoogle = window.adsbygoogle || []).push({}).
 *
 * Mientras tanto muestra un espacio reservado para ver la maquetación.
 */
interface AdSlotProps {
  label?: string;
  variant?: "leaderboard" | "rectangle" | "in-article";
  className?: string;
}

const sizes: Record<NonNullable<AdSlotProps["variant"]>, string> = {
  leaderboard: "min-h-[90px] md:min-h-[110px]",
  rectangle: "min-h-[250px]",
  "in-article": "min-h-[120px]",
};

export function AdSlot({ label = "Espacio publicitario", variant = "leaderboard", className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-xl border-[1.5px] border-dashed border-border font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground ${sizes[variant]} ${className}`}
      aria-hidden="true"
    >
      {label} · AdSense
    </div>
  );
}
