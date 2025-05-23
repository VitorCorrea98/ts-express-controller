import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["cjs"],
	dts: true,
	clean: true,
	sourcemap: true,
	minify: false,
	splitting: false,
	outExtension({ format }) {
		return {
			js: format === "esm" ? ".mjs" : ".cjs",
		};
	},
});
