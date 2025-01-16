import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";
//router
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact(), svgr()],
  resolve: {
    alias: {
      three: "three",
      "@react-three/fiber": "@react-three/fiber",
      "@react-three/drei": "@react-three/drei",
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
