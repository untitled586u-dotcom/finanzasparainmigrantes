import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Mail, Search } from "lucide-react";
import { Logo } from "./logo";
import { EmailAddress, MailLink } from "./mail-link";
import { categories } from "../content/categories";
import { SITE } from "../lib/site";
import { AUTHOR } from "../lib/author";

function NavLinks({ onClick }: { onClick?: () => void }) {
  const [location] = useLocation();
  return <>{categories.map((c) => { const active = location === `/categoria/${c.slug}`; return <Link key={c.slug} to={`/categoria/${c.slug}`} onClick={onClick} data-cat={c.slug} className={`rounded-lg px-3 py-2 text-[0.82rem] font-semibold transition-colors hover:bg-secondary hover:text-foreground ${active ? "bg-secondary text-foreground" : "text-muted-foreground"}`} style={active ? { boxShadow: "inset 0 -2px 0 0 var(--cat-accent)" } : undefined}>{c.name}</Link>; })}</>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-2.5 md:px-7 md:py-3">
      <Link to="/" aria-label={SITE.name}><Logo /></Link>
      <nav className="hidden items-center gap-0.5 xl:flex"><NavLinks /></nav>
      <div className="flex items-center gap-2">
        <Link to="/articulos" aria-label="Buscar y explorar guías" className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground md:flex"><Search className="h-4 w-4" /></Link>
        <Link to="/articulos" className="hidden rounded-lg bg-foreground px-4 py-2.5 text-[0.8rem] font-bold text-background transition-colors hover:bg-[var(--marigold-deep)] hover:text-white md:inline-flex md:items-center">Ver guías →</Link>
        <button className="rounded-lg p-2 hover:bg-secondary xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </div>
    {open && <div className="border-t border-border bg-card xl:hidden"><nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-5 py-3"><NavLinks onClick={() => setOpen(false)} /><Link to="/articulos" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-foreground px-3.5 py-2.5 text-center text-sm font-bold text-background">Ver todas las guías →</Link></nav></div>}
  </header>;
}

function Footer() {
  return <footer className="mt-14 bg-[var(--navy-deep)] pt-14 pb-7 text-[#c9d2de]">
    <div className="mx-auto grid max-w-[1180px] gap-9 px-5 md:px-7 lg:grid-cols-[1.6fr_1fr_1fr]">
      <div><Logo size="sm" showTagline={false} onDark /><p className="mt-4 max-w-[38ch] text-[0.84rem] leading-relaxed text-[#9facc0]">{SITE.tagline} Información educativa gratuita para tomar mejores decisiones de dinero.</p><MailLink className="mt-4 inline-flex items-center gap-2 text-[0.83rem] hover:text-[var(--marigold)]"><Mail className="h-4 w-4 text-[var(--marigold)]" /><EmailAddress /></MailLink></div>
      <div><h2 className="mb-3 font-display text-[1rem] text-white">Temas</h2><ul className="flex flex-col gap-2"><li>{categories.map((c) => <Link key={c.slug} to={`/categoria/${c.slug}`} className="mr-4 inline-block text-[0.82rem] hover:text-[var(--marigold)]">{c.name}</Link>)}</li></ul></div>
      <div><h2 className="mb-3 font-display text-[1rem] text-white">Sitio</h2><ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[0.82rem]"><li><Link to="/articulos" className="hover:text-[var(--marigold)]">Todos los artículos</Link></li><li><Link to="/sobre-nosotros" className="hover:text-[var(--marigold)]">Sobre nosotros</Link></li><li><Link to={`/autor/${AUTHOR.slug}`} className="hover:text-[var(--marigold)]">Quién escribe</Link></li><li><Link to="/politica-editorial" className="hover:text-[var(--marigold)]">Política editorial</Link></li><li><Link to="/como-ganamos-dinero" className="hover:text-[var(--marigold)]">Cómo ganamos dinero</Link></li><li><Link to="/contacto" className="hover:text-[var(--marigold)]">Contacto</Link></li><li><Link to="/privacidad" className="hover:text-[var(--marigold)]">Privacidad</Link></li><li><Link to="/terminos" className="hover:text-[var(--marigold)]">Términos</Link></li></ul></div>
    </div>
    <div className="mx-auto mt-10 max-w-[1180px] border-t border-white/10 px-5 pt-5 text-[0.7rem] leading-relaxed text-[#7c8aa0] md:px-7"><p className="mb-2"><strong className="text-[#9facc0]">Aviso:</strong> {SITE.name} ofrece información educativa de carácter general y no constituye asesoría financiera, legal, migratoria ni de seguros. Consulta siempre con un profesional con licencia antes de tomar decisiones. No estamos afiliados a ninguna agencia gubernamental.</p><p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p></div>
  </footer>;
}

export function Layout({ children }: { children: React.ReactNode }) { return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1">{children}</main><Footer /></div>; }
