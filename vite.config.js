import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Plugin to make CSS non-render-blocking
function cssAsyncPlugin() {
  return {
    name: 'css-async',
    enforce: 'post',
    transformIndexHtml(html) {
      // Convert render-blocking CSS links to async loading
      // Only in production build
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="stylesheet" href="$1" media="print" onload="this.media='all'" crossorigin>
    <noscript><link rel="stylesheet" href="$1" crossorigin></noscript>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), cssAsyncPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
