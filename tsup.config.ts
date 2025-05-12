import { defineConfig } from "tsup";

export default defineConfig({
	format: ["cjs", "esm"],
	outDir: "dist",
	entry: ["src/index.ts"],
	dts: true,
	clean: true,
	sourcemap: true,
	shims: true,
	minify: false,
});
