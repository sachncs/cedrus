import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sachncs.github.io/cedrus",
  base: "/cedrus",
  integrations: [react(), sitemap()],
  build: {
    assets: "assets",
  },
  vite: {
    resolve: {
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
  },
});
