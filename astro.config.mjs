import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // site: process.env.CI ? "https://bio.ruiy.sh" : "http://localhost:4321",
  site: "https://bio.ruiy.sh",
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
