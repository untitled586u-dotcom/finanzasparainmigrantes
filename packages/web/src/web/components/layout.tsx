import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "./logo";
import { categories } from "../content/categories";
import { SITE } from "../lib/site";

function NavLinks({ onClick }: { onClick?: () => void }) {
  const [location] = useLocation();
  const links = [
    { label: "Inicio", to: "/" },
    ...categories.map((c) => ({ label: c.name === "Banca y Documentos" ? "Bancos" : c.short, to: `/categoria/${c.slug}` })),
  ];
  return <>{links.map((item) => {
    const active = location === item.to;
    return <Link key={item.to} to={item.to} onClick={onClick} aria-current={active ? "page" : undefined} className={`px-2.5 py-5 text-[0.79rem] font-semibold whitespace-nowrap transition-colors ${active ? "text-[#123B63]" : "text-[#123B63]/75 hover:text-[#1264A3]"}`} style={active ? { boxShadow: "inset 0 -2px 0 0 #F28C28" } : undefined}>{item.label}</Link>;
  })}</>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-[#E4EBF2] bg-white/95 backdrop-blur-xl">
    <div className="mx-auto flex min-h-[66px] max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-5 md:px-7">
      <Link to="/" aria-label={SITE.name} className="min-w-0"><Logo /></Link>
      <nav className="hidden items-center 2xl:flex"><NavLinks /></nav>
      <div className="flex shrink-0 items-center gap-1">
        <Link to="/articulos" aria-label="Buscar y explorar guías" className="flex h-10 w-10 items-center justify-center rounded-full text-[#123B63] hover:bg-[#F3F7FA]"><Search className="h-[20px] w-[20px]" strokeWidth={2}/></Link>
        <button type="button" className="rounded-lg p-2 hover:bg-[#F3F7FA] 2xl:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </div>
    {open && <div className="border-t border-[#E4EBF2] bg-white shadow-sm 2xl:hidden"><nav className="mx-auto grid max-w-[1180px] grid-cols-2 gap-1 px-4 py-4 sm:grid-cols-3 sm:px-5"><NavLinks onClick={() => setOpen(false)} /><Link to="/articulos" onClick={() => setOpen(false)} className="col-span-full mt-2 inline-flex items-center justify-center rounded-xl bg-[#F28C28] px-4 py-3 text-sm font-bold text-white">Explorar todas las guías →</Link></nav></div>}
  </header>;
}

function Footer() {
  return <footer className="mt-12 bg-[#102E50] pt-9 pb-6 text-[#D8E2EC]">
    <div className="mx-auto max-w-[1180px] px-4 sm:px-5 md:px-7">
      <div className="grid gap-7 border-b border-white/10 pb-7 lg:grid-cols-[1.2fr_2fr] lg:items-center">
        <div><Logo size="sm" showTagline onDark /><p className="mt-3 max-w-[42ch] text-[0.74rem] leading-5 text-white/60">Información educativa gratuita para tomar mejores decisiones financieras en Estados Unidos.</p></div>
        <nav aria-label="Enlaces del sitio" className="flex flex-wrap gap-x-5 gap-y-2 text-[0.74rem] font-semibold">{categories.map(c => <Link key={c.slug} to={`/categoria/${c.slug}`} className="hover:text-white">{c.short}</Link>)}<Link to="/articulos" className="hover:text-white">Todos los artículos</Link></nav>
      </div>
      <div className="flex flex-col gap-2 pt-4 text-[0.67rem] text-white/55 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p><div className="flex gap-4"><Link to="/terminos" className="hover:text-white">Aviso legal</Link><Link to="/privacidad" className="hover:text-white">Privacidad</Link><Link to="/contacto" className="hover:text-white">Contacto</Link></div></div>
    </div>
  </footer>;
}

export function Layout({ children }: { children: React.ReactNode }) { return <div className="flex min-h-screen flex-col bg-white"><Header /><main className="flex-1">{children}</main><Footer /></div>; }
