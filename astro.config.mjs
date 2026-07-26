import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://ruiy.pages.dev",
  output: "static",
  integrations: [react()],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
