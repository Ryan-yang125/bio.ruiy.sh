import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? "https://bio.ruiy.sh" : "http://localhost:4321",
  integrations: [tailwind(), react()],
});
