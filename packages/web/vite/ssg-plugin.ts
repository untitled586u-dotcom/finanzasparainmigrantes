import { execFileSync } from "node:child_process";
import path from "node:path";
import type { Plugin } from "vite";

const webRoot = path.resolve(__dirname, "..");

/**
 * El pipeline de publicación de la plataforma ejecuta `vite build` directamente,
 * sin pasar por el script `build` del package. Si el pre-render y la compresión
 * viven solo en ese script, producción se despliega con el shell del SPA: cada
 * ruta cae en el fallback 404 y el HTML crudo pierde title, canonical y H1.
 *
 * Enganchando los tres pasos al propio ciclo de vida de Vite, cualquier forma de
 * construir (script del package, turbo, `bunx vite build`) produce el sitio
 * estático completo.
 */
export default function ssgPlugin(): Plugin {
	const run = (script: string, label: string) => {
		console.log(`\n[ssg] ${label}`);
		execFileSync("bun", ["run", script], { cwd: webRoot, stdio: "inherit" });
	};

	return {
		name: "fpi-ssg",
		apply: "build",
		// El sitemap, robots.txt y llms.txt se escriben en `public/`, así que hay
		// que generarlos antes de que Vite copie ese directorio a `dist/`.
		buildStart() {
			run("scripts/generate-sitemap.ts", "sitemap + robots + llms.txt");
		},
		// closeBundle corre cuando `dist/` ya está escrito por completo.
		//
		// No se pre-comprime a .br/.gz: el proxy del despliegue descomprimía la
		// respuesta pero mantenía el Content-Length del fichero comprimido, lo que
		// truncaba el HTML. La compresión la hace el proxy.
		closeBundle() {
			run("scripts/prerender.tsx", "pre-render de rutas");
		},
	};
}
