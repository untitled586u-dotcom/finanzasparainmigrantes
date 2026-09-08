import { useEffect, useState, type ReactNode } from "react";
import { SITE } from "../lib/site";

const [EMAIL_USER, EMAIL_DOMAIN] = SITE.email.split("@") as [string, string];

/**
 * El edge de Cloudflare que hay delante del origen reescribe cualquier
 * `mailto:` —y también cualquier dirección escrita en texto plano— que
 * encuentre en el HTML, y lo sustituye por un enlace a
 * `/cdn-cgi/l/email-protection`, que responde 404. Bing lo reporta como error
 * 4xx en todas las páginas del sitio.
 *
 * El ajuste "Email Address Obfuscation" de la zona está en Off, pero ese edge
 * no es el de la zona (el apex no lo proxea: llega al origen con `Via: fly.io`
 * y sin que se apliquen ajustes como Always Use HTTPS), así que no se puede
 * desactivar desde el panel. La única salida es que el HTML servido no
 * contenga nada que el reescritor reconozca como correo:
 *
 * - La dirección se parte en varios nodos de texto. Se ve y se copia igual,
 *   pero deja de coincidir con el patrón de correo.
 * - El `href` con `mailto:` se compone en el cliente tras la hidratación,
 *   donde el edge ya no interviene. Antes de hidratar, el enlace apunta a
 *   /contacto, así que también funciona sin JavaScript.
 */
export function EmailAddress() {
  return (
    <>
      <span>{EMAIL_USER}</span>
      <span>@</span>
      <span>{EMAIL_DOMAIN}</span>
    </>
  );
}

export function MailLink({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [href, setHref] = useState("/contacto");

  useEffect(() => {
    setHref(`mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`);
  }, []);

  return (
    <a className={className} href={href}>
      {children ?? <EmailAddress />}
    </a>
  );
}
