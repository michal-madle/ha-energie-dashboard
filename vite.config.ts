import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "ha-energie-dashboard",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
});
