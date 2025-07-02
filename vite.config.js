import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  /*   server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./certs/react-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./certs/react-cert.pem")),
    },
    port: 3000,
    host: true, // Habilita el acceso desde la red
  }, */
  assetsInclude: ["**/*.md"], // Incluir archivos Markdown como assets
});
