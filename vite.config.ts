import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      three: "three",
      "@react-three/fiber": "@react-three/fiber",
      "@react-three/drei": "@react-three/drei",
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
