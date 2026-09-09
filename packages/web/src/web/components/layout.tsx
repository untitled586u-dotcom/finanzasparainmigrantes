import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "./logo";
import { categories } from "../content/categories";
import { SITE } from "../lib/site";
import { AUTHOR } from "../lib/author";

function NavLinks({ onClick }: { onClick?: () => void }) {
  const [location] = useLocation();
  return <>
    <Link to="/" onClick={onClick} className={`px-3 py-5 text-[0.82rem] font-semibold transition-colors ${location === "/" ? "text-[#123B63]" : "text-[#123B63]/75 hover:text-[#1264A3]"}`} style={location === "/" ? { boxShadow: "inset 0 -2px 0 0 #F28C28" } : undefined}>Inicio</Link>
    {categories.map((c) => { const active = location === `/categoria/${c.slug}`; return <Link key={c.slug} to={`/categoria/${c.slug}`} onClick={onClick} data-cat={c.slug} className={`px-3 py-5 text-[0.82rem] font-semibold transition-colors ${active ? "text-[#123B63]" : "text-[#123B63]/75 hover:text-[#1264A3]"}`} style={active ? { boxShadow: "inset 0 -2px 0 0 var(--cat-accent)" } : undefined}>{c.name === "Banca y Documentos" ? "Bancos" : c.name}</Link>; })}
  </>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-[#E4EBF2] bg-white/95 backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 md:px-7">
      <Link to="/" aria-label={SITE.name}><Logo /></Link>
      <nav className="hidden items-center xl:flex"><NavLinks /></nav>
      <div className="flex items-center gap-1">
        <Link to="/articulos" aria-label="Buscar guías" className="flex h-10 w-10 items-center justify-center rounded-full text-[#123B63] hover:bg-[#F3F7FA]"><Search className="h-[21px] w-[21px]" strokeWidth={2}/></Link>
        <button className="rounded-lg p-2 hover:bg-[#F3F7FA] xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </div>
    {open && <div className="border-t border-[#E4EBF2] bg-white xl:hidden"><nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-5 py-3"><NavLinks onClick={() => setOpen(false)} /><Link to="/articulos" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-[#F28C28] px-4 py-3 text-center text-sm font-bold text-white">Explorar guías →</Link></nav></div>}
  </header>;
}

function Footer() {
  return <footer className="mt-14 bg-[#102E50] pt-10 pb-6 text-[#D8E2EC]">
    <div className="mx-auto max-w-[1180px] px-5 md:px-7">
      <div className="grid gap-8 border-b border-white/10 pb-7 lg:grid-cols-[1.3fr_2fr] lg:items-center">
        <div><Logo size="sm" showTagline onDark /><p className="mt-3 max-w-[42ch] text-[0.76rem] leading-5 text-white/60">Información educativa gratuita para tomar mejores decisiones financieras en Estados Unidos.</p></div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[0.75rem] font-semibold">{categories.map(c => <Link key={c.slug} to={`/categoria/${c.slug}`} className="hover:text-white">{c.name === "Banca y Documentos" ? "Bancos" : c.name}</Link>)}<Link to="/articulos" className="hover:text-white">Todos los artículos</Link></nav>
      </div>
      <div className="flex flex-col gap-2 pt-4 text-[0.68rem] text-white/55 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p><div className="flex gap-4"><Link to="/terminos" className="hover:text-white">Aviso legal</Link><Link to="/privacidad" className="hover:text-white">Privacidad</Link><Link to="/contacto" className="hover:text-white">Contacto</Link></div></div>
    </div>
  </footer>;
}

export function Layout({ children }: { children: React.ReactNode }) { return <div className="flex min-h-screen flex-col bg-white"><Header /><main className="flex-1">{children}</main><Footer /></div>; }
