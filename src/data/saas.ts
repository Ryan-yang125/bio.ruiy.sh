import type { Props as SaasProps } from "../components/saas/props";
// chatllm-web
// fusinote
// headlines-ai
// nestjs-template
export const SAASDATAS: SaasProps[] = [
  {
    status: "Active",
    title: "DiscovAI",
    url: "https://discovai.io/",
    screenshotUrl: "https://searchzero.pro/demo.png",
    description: `Search over 15,349 top ai tools in our database by chatgpt, Discover the latest AI Products with detailed traffic data, best match your need`,
  },
  {
    status: "Inactive",
    title: "Fusionote",
    url: "https://fusionote.vercel.app",
    screenshotUrl: "/shots/fusionote.png",
    description: `
    One-stop collection, reading, abstracting,retrieval, and management.
    Use the knowledge of web fragments to build your personal knowledge base and create your own reading corner.`,
  },
  {
    status: "Inactive",
    title: "Headlines-AI",
    url: "https://headlines-ai.com/",
    screenshotUrl: "/shots/headlines-ai.png",
    description: `Get everyday headlines news in 5 minutes powered by our AI summarized stories.`,
  },
];
