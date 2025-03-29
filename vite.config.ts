import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";
//router
import viteReact from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [viteReact(), svgr()],
  base: "/",
  resolve: {
    alias: {
      three: "three",
      "@react-three/fiber": "@react-three/fiber",
      "@react-three/drei": "@react-three/drei",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
