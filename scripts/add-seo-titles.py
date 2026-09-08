#!/usr/bin/env python3
"""One-off: inserta seoTitle (<=60 chars) en los articulos cuyo <title> excedia."""
import glob
import re
import sys

SEO = {
    "seguro-de-auto-florida-inmigrantes": "Seguro de auto en Florida para inmigrantes (PIP 2026)",
    "impuestos-trabajador-independiente-1099-itin": "Impuestos con ITIN siendo independiente: 1099 y Schedule C",
    "seguro-de-auto-nueva-york-inmigrantes": "Seguro de auto en Nueva York para inmigrantes 2026",
    "seguro-de-auto-california-inmigrantes": "Seguro de auto en California para inmigrantes 2026",
    "seguro-de-auto-con-matricula-consular": "Seguro de auto con matrícula consular: cómo obtenerlo",
    "reporte-de-credito-gratis-como-leerlo": "Reporte de crédito gratis: cómo pedirlo y leerlo",
    "enviar-dinero-guatemala-honduras-el-salvador": "Enviar dinero a Guatemala, Honduras y El Salvador",
    "seguro-de-casa-y-renta-inmigrantes": "Seguro de renta y de casa para inmigrantes",
    "seguro-de-auto-texas-inmigrantes": "Seguro de auto en Texas para inmigrantes 2026",
    "enviar-dinero-latinoamerica": "Cómo enviar dinero a Latinoamérica sin pagar de más",
    "seguro-de-auto-illinois-inmigrantes": "Seguro de auto en Illinois para inmigrantes 2026",
    "impuesto-remesas-1-por-ciento-2026": "Impuesto del 1% a las remesas en 2026: cómo te afecta",
    "construir-credito-desde-cero-inmigrantes": "Cómo construir crédito en EE.UU. desde cero",
    "seguro-de-auto-georgia-inmigrantes": "Seguro de auto en Georgia para inmigrantes 2026",
    "seguro-de-auto-arizona-inmigrantes": "Seguro de auto en Arizona para inmigrantes 2026",
    "seguro-de-auto-nevada-inmigrantes": "Seguro de auto en Nevada para inmigrantes 2026",
    "prestamos-personales-mal-credito": "Préstamos personales con mal crédito o sin historial",
    "mejorar-puntaje-credito-rapido": "Cómo subir tu puntaje de crédito rápido: 9 acciones",
    "enviar-dinero-republica-dominicana": "Enviar dinero a República Dominicana: mejores opciones",
    "seguro-de-salud-para-inmigrantes": "Seguro de salud para inmigrantes: opciones reales",
    "credito-por-hijos-itin-2026": "Crédito por Hijos con ITIN en 2026: quién califica",
    "seguro-de-auto-con-itin": "Seguro de auto con ITIN: asegura tu carro sin SSN",
    "enviar-dinero-venezuela": "Enviar dinero a Venezuela: cómo hacerlo seguro",
    "enviar-dinero-colombia-ecuador": "Enviar dinero a Colombia y Ecuador: costos y apps",
    "seguro-de-auto-barato-hispanos": "Cómo conseguir seguro de auto barato en EE.UU.",
    "renovar-itin-vencido": "Cómo renovar un ITIN vencido: paso a paso (W-7)",
    "enviar-dinero-a-mexico": "Enviar dinero a México: mejores apps en 2026",
    "cobertura-minima-vs-completa": "Cobertura mínima vs completa: ¿cuál necesitas?",
    "seguro-de-auto-carolina-del-norte-inmigrantes": "Seguro de auto en Carolina del Norte: límites 2026",
    "que-es-buen-puntaje-credito": "¿Qué es un buen puntaje de crédito en EE.UU.?",
    "hipoteca-con-itin-bancos-que-prestan": "Hipoteca con ITIN: qué bancos prestan y requisitos",
    "bancos-que-aceptan-matricula-consular": "Bancos que aceptan matrícula consular (lista 2026)",
}

for slug, t in SEO.items():
    if len(t) > 60:
        sys.exit(f"seoTitle demasiado largo ({len(t)}): {t}")

base = "/home/user/finanzas-para-inmigrantes/packages/web/src/web/content"
done = set()

for path in sorted(glob.glob(f"{base}/articles-*.ts")):
    with open(path, encoding="utf-8") as fh:
        lines = fh.readlines()
    out = []
    changed = False
    for line in lines:
        out.append(line)
        m = re.match(r'^(\s*)slug: "([^"]+)",\s*$', line)
        if m and m.group(2) in SEO and m.group(2) not in done:
            slug = m.group(2)
            out.append(f'{m.group(1)}seoTitle: "{SEO[slug]}",\n')
            done.add(slug)
            changed = True
    if changed:
        with open(path, "w", encoding="utf-8") as fh:
            fh.writelines(out)
        print(f"actualizado {path}")

missing = set(SEO) - done
print(f"insertados: {len(done)}")
if missing:
    sys.exit(f"slugs no encontrados: {sorted(missing)}")
