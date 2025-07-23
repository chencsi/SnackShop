import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Pages({
			dirs: "src/pages",
			extensions: ["jsx", "tsx"],
			exclude: ["**/components/**/*"],
			importMode: "sync",
			resolver: "react",
		}),
		tailwindcss(),
	],
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
});
