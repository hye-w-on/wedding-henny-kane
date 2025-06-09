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
  optimizeDeps: {
    exclude: ['@mediapipe/face_detection', '@mediapipe/camera_utils']
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  assetsInclude: ['**/*.wasm', '**/*.data'],
  build: {
    rollupOptions: {
      external: ['@mediapipe/face_detection', '@mediapipe/camera_utils'],
      output: {
        assetFileNames: (assetInfo) => {
          // MediaPipe 파일들은 원래 이름 유지
          if (assetInfo.name && (assetInfo.name.endsWith('.wasm') || assetInfo.name.endsWith('.data'))) {
            return 'mediapipe/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
