import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // the one-line installer: `curl -fsSL .../install.sh | sh`. Served as a
        // script, never cached (a stale CDN copy would install a stale brw), and
        // never offered as a download so the URL stays readable in a browser.
        source: "/install.sh",
        headers: [
          { key: "Content-Type", value: "text/x-shellscript; charset=utf-8" },
          { key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
      {
        // self-hosted extension package — served for ExtensionInstallForcelist
        source: "/brw.crx",
        headers: [{ key: "Content-Type", value: "application/x-chrome-extension" }],
      },
      {
        // Omaha/gupdate auto-update manifest polled by Chromium
        source: "/updates.xml",
        headers: [{ key: "Content-Type", value: "application/xml" }],
      },
      {
        // macOS configuration profile — content-type triggers the installer
        source: "/policies/brw-chromium.mobileconfig",
        headers: [{ key: "Content-Type", value: "application/x-apple-aspen-config" }],
      },
    ];
  },
};

export default nextConfig;
