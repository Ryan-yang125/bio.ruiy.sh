import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://bio.ruiy.sh",
  output: "static",
  integrations: [react()],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
