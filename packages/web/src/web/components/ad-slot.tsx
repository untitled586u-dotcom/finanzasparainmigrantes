import { useEffect } from "react";

/**
 * AdSlot — integración opcional con Google AdSense.
 *
 * El sitio no muestra huecos publicitarios mientras no existan las variables
 * de entorno de AdSense. Cuando el sitio esté aprobado y tengamos los IDs de
 * unidades, basta con configurar VITE_ADSENSE_CLIENT y los tres VITE_AD_SLOT_*.
 * Así evitamos enviar solicitudes publicitarias prematuras y mantenemos el
 * preview limpio mientras se termina el proyecto.
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

const env = import.meta.env as Record<string, string | undefined>;
const client = env.VITE_ADSENSE_CLIENT;
const slots = {
  leaderboard: env.VITE_AD_SLOT_LEADERBOARD,
  rectangle: env.VITE_AD_SLOT_RECTANGLE,
  "in-article": env.VITE_AD_SLOT_IN_ARTICLE,
};

function loadAdSense() {
  if (!client || document.querySelector("script[data-finanzas-adsense]")) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  script.crossOrigin = "anonymous";
  script.dataset.finanzasAdsense = "true";
  document.head.appendChild(script);
}

export function AdSlot({ label = "Publicidad", variant = "leaderboard", className = "" }: AdSlotProps) {
  const slot = slots[variant];

  useEffect(() => {
    if (!client || !slot) return;
    loadAdSense();
    const timer = window.setTimeout(() => {
      const adsbygoogle = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle ?? [];
      (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle = adsbygoogle;
      adsbygoogle.push({});
    }, 0);
    return () => window.clearTimeout(timer);
  }, [slot]);

  if (!client || !slot) return null;

  return (
    <div className={`w-full ${sizes[variant]} ${className}`} aria-label={label}>
      <ins
        className="adsbygoogle block h-full w-full"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
