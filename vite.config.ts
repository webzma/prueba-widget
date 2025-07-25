import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: "src/widget-entry.tsx",
      output: {
        entryFileNames: "aicc360-chat-widget.js",
        format: "iife",
        name: "Aicc360ChatWidget",
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
