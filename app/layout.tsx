import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getLatestRelease } from "@/lib/latestRelease";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://brw.donworks.co.uk";
const brwGithubUrl = "https://github.com/Don-Works/brw";
const title = "brw — Semantic browser control for agents";
const description =
  "brw runs a real, visible Chrome and exposes it over MCP and HTTP. Agents act from stable refs like e17 instead of CSS selectors or screenshots, with a post-action observation after every step. Open source by Revitt, AGPL-3.0.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050604",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | brw",
  },
  description,
  applicationName: "brw",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "brw",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { version } = await getLatestRelease();
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "brw",
    description,
    url: siteUrl,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    softwareVersion: version.replace(/^v/, "") || undefined,
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    codeRepository: brwGithubUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Don Works",
      url: "https://donworks.co.uk",
      parentOrganization: {
        "@type": "Organization",
        name: "Revitt",
        url: "https://revitt.co",
      },
    },
  };

  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareJsonLd),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
