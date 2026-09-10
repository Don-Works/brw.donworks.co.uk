import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "brw — Complete Chrome and Chromium control for agents",
    short_name: "brw",
    description:
      "Control real Chrome and Chromium quickly with stable refs, batched actions and deterministic recipes over MCP or HTTP. Open source by Revitt, AGPL-3.0.",
    start_url: "/",
    display: "standalone",
    background_color: "#050604",
    theme_color: "#ff2ec4",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
