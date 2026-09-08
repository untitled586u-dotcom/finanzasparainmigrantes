import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite"
import path from "path";
import runableAnalyticsPlugin from "./vite/__plugins/runable-analytics-plugin";
import honoDevPlugin from "./vite/__plugins/hono-dev-plugin";
import assetOptimizerPlugin from "./vite/__plugins/asset-optimizer-plugin";
import ssgPlugin from "./vite/ssg-plugin";

const root = path.resolve(__dirname, "../..");

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, root, '');
	Object.assign(process.env, env);

	return {
		// All env files live at the repo root — keep Vite's own env loading there too,
		// so packages/web/.env* files can never shadow the root .env.
		envDir: root,
		plugins: [honoDevPlugin(), react(), runableAnalyticsPlugin(), tailwind(), assetOptimizerPlugin(), ssgPlugin()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src/web"),
			},
		},
		build: {
			rollupOptions: {
				output: {
					// El entry juntaba react, react-dom, wouter, lucide y TanStack Query
					// en un solo chunk de ~500 kB. Separarlos por librería reduce el
					// coste de la primera carga y permite cachearlos por separado: al
					// publicar contenido nuevo, el vendor no se invalida.
					manualChunks(id) {
						if (!id.includes("node_modules")) return;
						if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
							return "vendor-react";
						}
						if (
							/node_modules\/(react-markdown|remark-.*|micromark.*|mdast-.*|hast-.*|unified|unist-.*|vfile.*|bail|trough|decode-named-character-reference|character-entities.*|property-information|space-separated-tokens|comma-separated-tokens|html-url-attributes|zwitch|longest-streak|ccount|escape-string-regexp|markdown-table|devlop|estree-.*|is-plain-obj|trim-lines)\//.test(
								id,
							)
						) {
							return "vendor-markdown";
						}
						if (/node_modules\/(@tanstack|@orpc)\//.test(id)) {
							return "vendor-query";
						}
						if (/node_modules\/lucide-react\//.test(id)) {
							return "vendor-icons";
						}
						return "vendor";
					},
				},
			},
		},
		server: {
			allowedHosts: true,
			hmr: { overlay: false, },
			cors: false
		}
	};
});
