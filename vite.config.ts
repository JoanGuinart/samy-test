import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    exclude: [...configDefaults.exclude, "node_modules/"],
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@graphql": "/src/graphql",
      "@styles": "/src/assets/styles",
    },
  },
});
