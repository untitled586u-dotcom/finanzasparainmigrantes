"""Extrae el markdown de cada artículo a content/bodies/<slug>.ts
para que no viaje en el bundle inicial."""
import re, os, glob

SRC = "packages/web/src/web/content"
BODIES = f"{SRC}/bodies"
os.makedirs(BODIES, exist_ok=True)

total = 0
for path in sorted(glob.glob(f"{SRC}/articles-*.ts")):
    s = open(path, encoding="utf-8").read()
    out = []
    pos = 0
    count = 0
    while True:
        m = re.search(r'\n(\s*)content: `', s[pos:])
        if not m:
            out.append(s[pos:])
            break
        start = pos + m.start()
        body_start = pos + m.end()
        end = s.index('`', body_start)

        # slug del artículo al que pertenece este content
        slug = re.findall(r'slug: "([^"]+)"', s[:start])[-1]
        body = s[body_start:end]

        with open(f"{BODIES}/{slug}.ts", "w", encoding="utf-8") as f:
            f.write("export default `" + body + "`;\n")

        out.append(s[pos:start])
        # elimina el campo content y la coma que le sigue
        after = s[end + 1:]
        after = re.sub(r'^,\s*\n', '\n', after)
        pos = end + 1 + (len(s) - end - 1 - len(after))
        count += 1
        total += 1
    new = "".join(out)
    # limpia posibles líneas vacías dobles dejadas por el borrado
    new = re.sub(r'\n\n(\s*)\},', r'\n\1},', new)
    open(path, "w", encoding="utf-8").write(new)
    print(f"{os.path.basename(path)}: {count} cuerpos extraídos")

print(f"Total: {total} artículos")
