import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  
  return {
    plugins: [
      react(), 
      // Solo usar tailwindcss en desarrollo
      ...(isProduction ? [] : [tailwindcss()])
    ],
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
      cssCodeSplit: false,
    },
    css: {
      postcss: {
        plugins: isProduction ? [] : undefined,
      },
    },
  };
});
