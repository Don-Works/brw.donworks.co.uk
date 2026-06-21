import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "brw — Semantic browser control for agents",
    short_name: "brw",
    description:
      "A real, visible Chrome exposed over MCP and HTTP. Agents act from stable refs like e17 instead of CSS selectors or screenshots. Open source by Revitt, AGPL-3.0.",
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
