import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
