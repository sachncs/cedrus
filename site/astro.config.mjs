import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sachncs.github.io",
  base: "/cedrus",
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()],
  build: {
    assets: "assets",
  },
  vite: {
    resolve: {
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
  },
});
