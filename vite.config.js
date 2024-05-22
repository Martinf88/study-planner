import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  baseUrl: "./",
  server: {
    host: true,
    port: 9999,
  },
  test: {
    environment: "jsdom",
    globals: true,
    // setupFiles: "./tests/setup.js",
  },
  optimizeDeps: {
    exclude: ["chunk-HKXCR35C"],
  },
});
