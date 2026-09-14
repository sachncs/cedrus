import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://sachncs.github.io",
  base: "/cedrus",
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()],
  build: {
    assets: "assets",
  },
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    build: {
      cssCodeSplit: true,
    },
  },
});
