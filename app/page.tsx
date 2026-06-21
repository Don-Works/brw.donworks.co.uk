import Link from "next/link";
import { BrwMark } from "./components/BrwMark";
import {
  Boxes,
  Eye,
  Gauge,
  Github,
  Globe,
  KeyRound,
  Layers,
  MousePointerClick,
  Network,
  Plug,
  ScanSearch,
  ServerCog,
  Terminal,
  type LucideIcon,
} from "lucide-react";

type PanelItem = {
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
  cta?: { label: string; href: string };
};

const brwUrl = "https://github.com/Don-Works/brw";
const extensionId = "amocjcgddnoakjijfggdpnefdnboilpe";
// Unlisted Chrome Web Store install URL. Set this once the item is published;
// until then the Install section shows the manual (load-unpacked) route only.
const chromeStoreUrl = "";
const donworksSite = "https://donworks.co.uk";
const donworksGithub = "https://github.com/Don-Works";
const mcplexerUrl = "https://mcplexer.com";
const mcplexerWorkspacesUrl =
  "https://mcplexer.com/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source&utm_content=why_chrome_logins#workspaces";
const revittUrl =
  "https://revitt.co/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";

const features: PanelItem[] = [
  {
    label: "01",
    title: "Cross-harness",
    body: "stdio MCP for agent harnesses and an HTTP JSON API for custom clients. The same real browser, reachable from wherever your agent runs.",
    icon: Boxes,
  },
  {
    label: "02",
    title: "SSH-first remote runtime",
    body: "Remote control is a first-class path. The visible browser stays on the machine that owns the profile; SSH carries stdio MCP, so cookies, passkeys and downloads never leave home.",
    icon: ServerCog,
  },
  {
    label: "03",
    title: "Installed-profile bridge",
    body: "A Chrome extension bridges to an already-authenticated installed Chrome profile — the auth you already have, without copying cookies or fighting Chrome's remote-debug lockdown.",
    icon: Layers,
  },
  {
    label: "04",
    title: "Semantic snapshot, read, find",
    body: "Snapshots combine DOM and accessibility data. Read prose, links, headings, forms, tables and structured product data. Find elements and act on them by stable ref.",
    icon: ScanSearch,
  },
  {
    label: "05",
    title: "Tabs, downloads, network",
    body: "Tabs and tab groups, downloads, console, network capture and request replay, plus cancellation. Organise visible Chrome work into named runs the human can watch.",
    icon: Network,
  },
  {
    label: "06",
    title: "Set-of-Marks overlays",
    body: "Screenshots are a visual fallback, not the main channel — with optional Set-of-Marks overlays that label elements with the same refs the agent acts on.",
    icon: Eye,
  },
];

const why: PanelItem[] = [
  {
    label: "faster",
    title: "Fewer turns, fewer tokens",
    body: "Pre-release head-to-heads vs Claude-in-Chrome: same tasks, fewer turns and fewer tokens. Agents act from stable refs, not a fresh screenshot each turn. Public benchmark on the way.",
    icon: Gauge,
  },
  {
    label: "agnostic",
    title: "Any agent harness",
    body: "Not tied to one vendor's browser. Claude Code, Codex, Cursor, opencode, pi, Gemini or your own client — anything that speaks MCP or HTTP drives the same brw.",
    icon: Plug,
  },
  {
    label: "your auth",
    title: "Your real Chrome logins",
    body: "Bridges to your installed, signed-in Chrome. The sites you're logged into, brw is too — cookies and sessions stay on your machine.",
    icon: KeyRound,
    cta: {
      label: "Bind profiles to workspaces with MCPlexer →",
      href: mcplexerWorkspacesUrl,
    },
  },
  {
    label: "whole web",
    title: "The whole web, not a sandbox",
    body: "A real browser on your profile reaches any page you can — gated dashboards, signed-in apps, content a locked-down agent browser can't.",
    icon: Globe,
  },
];

const facts = [
  ["control", "MCP + HTTP"],
  ["from", "Revitt"],
  ["licence", "AGPL-3.0"],
  ["source", "GitHub"],
];

const footerGroups = [
  {
    title: "brw",
    links: [
      ["brw on GitHub", brwUrl],
      ["llms.txt", "/llms.txt"],
    ],
  },
  {
    title: "Don Works",
    links: [
      ["donworks.co.uk", donworksSite],
      ["Don Works on GitHub", donworksGithub],
    ],
  },
  {
    title: "Family",
    links: [
      ["MCPlexer", mcplexerUrl],
      ["Revitt", `${revittUrl}&utm_content=footer_revitt`],
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand-lockup" aria-label="brw home">
          <span className="brand-mark" aria-hidden="true">
            brw
          </span>
          <span className="brand-wordmark">brw</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#why">Why</a>
          <a href="#what">What</a>
          <a href="#features">Features</a>
          <a href="#quickstart">Quick start</a>
          <a href="#install">Install</a>
          <a href="#safety">Safety</a>
          <Link href={brwUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        </nav>
      </header>

      <main id="main">
        <section className="hero-section">
          <div className="hero-grid-upright" aria-hidden="true" />
          <div className="hero-grid-plane" aria-hidden="true" />
          <div className="scanlines" aria-hidden="true" />

          <div className="hero-centered">
            <p className="eyebrow">
              <span aria-hidden="true" />
              open source by Revitt
            </p>
            <h1 className="hero-mark">
              <BrwMark title="brw" />
            </h1>
            <p className="hero-tagline">Semantic browser control for agents.</p>
            <p className="hero-lede">
              brw runs a real, visible Chrome and exposes it over MCP and HTTP.
              Agents act from stable refs like <code>e17</code> instead of CSS
              selectors or screenshots, and get a plain observation back after
              every action — so they know what actually happened.
            </p>
            <div className="hero-actions">
              <Link
                href={brwUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                <Github aria-hidden="true" />
                Get brw on GitHub
              </Link>
              <a href="#quickstart" className="button button-secondary">
                <Terminal aria-hidden="true" />
                Quick start
              </a>
            </div>
            <dl className="facts-grid">
              {facts.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="why" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">why brw</p>
              <h2>Built to win on real web work</h2>
              <p>
                Other agent browsers burn tokens re-reading pixels, lock you to
                one vendor, and stall at the login wall. brw takes the other
                path.
              </p>
            </div>
            <div className="panel-grid panel-grid-4">
              {why.map(({ icon: Icon, ...item }) => (
                <article key={item.title} className="info-panel">
                  <div className="panel-topline">
                    <span>{item.label}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.cta && (
                    <a
                      className="panel-cta"
                      href={item.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.cta.label}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="what" className="section section-alt">
          <div className="section-inner split-layout">
            <div className="section-header section-header-sticky">
              <p className="section-kicker">what it is</p>
              <h2>A real browser agents can drive by ref</h2>
              <p>
                brw controls headed Chrome/Chromium through CDP and exposes it as
                MCP tools and an HTTP JSON API. It is the actual web — signed-in
                tabs, real clicks and forms — not a sandboxed copy or a stack of
                screenshots.
              </p>
            </div>
            <div className="stacked-panels">
              <article className="wide-panel">
                <span>ref</span>
                <div>
                  <MousePointerClick aria-hidden="true" />
                  <h3>Act from stable refs</h3>
                  <p>
                    Snapshots combine DOM and accessibility data into stable
                    refs like <code>e17</code>. Agents click, type, fill, select,
                    scroll, drag, upload, wait and assert by ref — not by brittle
                    CSS selectors or by re-reading a screenshot every turn.
                  </p>
                </div>
              </article>
              <article className="wide-panel">
                <span>read</span>
                <div>
                  <ScanSearch aria-hidden="true" />
                  <h3>Read the page semantically</h3>
                  <p>
                    Pull prose, links, headings, forms, tables and structured
                    product data straight from the page. Screenshots are kept as
                    a visual fallback, with optional Set-of-Marks overlays.
                  </p>
                </div>
              </article>
              <article className="wide-panel">
                <span>observe</span>
                <div>
                  <Eye aria-hidden="true" />
                  <h3>An observation after every action</h3>
                  <p>
                    Every action returns a post-action observation, so the agent
                    knows what changed instead of guessing. Acting from refs and
                    observations means fewer turns, less token spend and less
                    wall time than re-interpreting pixels.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">what&apos;s inside</p>
              <h2>Built for real, signed-in web work</h2>
              <p>
                The full MCP surface is large; run{" "}
                <code>brwd --mcp --mcp-tools core</code> to advertise just the
                common-flow tools while keeping everything callable.
              </p>
            </div>
            <div className="panel-grid">
              {features.map(({ icon: Icon, ...item }) => (
                <article key={item.title} className="info-panel">
                  <div className="panel-topline">
                    <span>{item.label}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quickstart" className="section section-alt">
          <div className="section-inner split-layout">
            <div className="section-header section-header-sticky">
              <p className="section-kicker">quick start</p>
              <h2>Clone, build, run as MCP</h2>
              <p>
                brw is a single daemon, <code>brwd</code>. Build it, then run it
                as an MCP server over stdio or expose the HTTP API on loopback.
              </p>
              <p>
                For remote and installed-Chrome setups, see the docs on the{" "}
                <Link href={brwUrl} target="_blank" rel="noopener noreferrer">
                  brw repository
                </Link>
                .
              </p>
            </div>
            <div className="stacked-panels">
              <pre className="codeblock">
                <code>
                  <span className="cmt"># clone and build</span>
                  {"\n"}
                  <span className="prompt">$ </span>git clone https://github.com/Don-Works/brw.git
                  {"\n"}
                  <span className="prompt">$ </span>cd brw{"\n"}
                  <span className="prompt">$ </span>make build{"\n"}
                  {"\n"}
                  <span className="cmt"># run as an MCP server (stdio)</span>
                  {"\n"}
                  <span className="prompt">$ </span>./bin/brwd --mcp --http off
                  {"\n"}
                  {"\n"}
                  <span className="cmt"># or expose the HTTP API on loopback</span>
                  {"\n"}
                  <span className="prompt">$ </span>./bin/brwd --http 127.0.0.1:17310
                </code>
              </pre>
              <pre className="codeblock">
                <code>
                  <span className="cmt"># open a page and read its controls</span>
                  {"\n"}
                  <span className="prompt">$ </span>curl -s 127.0.0.1:17310/api/browser/open \
                  {"\n"}
                  {"    "}-H &apos;content-type: application/json&apos; \
                  {"\n"}
                  {"    "}-d &apos;{"{"}&quot;url&quot;:&quot;https://example.com&quot;{"}"}&apos;
                  {"\n"}
                  {"\n"}
                  <span className="prompt">$ </span>curl -s 127.0.0.1:17310/api/page/snapshot | jq
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section id="install" className="section">
          <div className="section-inner split-layout">
            <div className="section-header section-header-sticky">
              <p className="section-kicker">install</p>
              <h2>Recommended on Chromium</h2>
              <p>
                The brw extension bridges the daemon to your real, signed-in
                browser over <code>ws://127.0.0.1</code>. It drives visible tabs
                through the debugger protocol and{" "}
                <strong>never reads cookies, passwords or passkeys</strong>.
              </p>
              <p>
                brw is open source — and so is{" "}
                <a
                  href="https://www.chromium.org/Home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chromium
                </a>
                , so it&apos;s what we champion. On Chromium you force-install
                the extension and get auto-updates from a single policy file
                pointed at brw&apos;s own update server — no Chrome Web Store,
                no review queue, no gatekeeping. It works on Chrome too.
              </p>
              <p>
                One permanent extension ID, trusted by the daemon with zero
                config:
              </p>
              <p className="install-id">
                <code>{extensionId}</code>
              </p>
            </div>
            <div className="stacked-panels">
              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge">recommended</span>
                  Chromium — force-install + auto-update
                </p>
                <p>
                  Point Chromium at brw&apos;s self-hosted{" "}
                  <a href="/updates.xml" target="_blank" rel="noopener noreferrer">
                    update manifest
                  </a>
                  . It installs the signed{" "}
                  <a href="/brw.crx" target="_blank" rel="noopener noreferrer">
                    package
                  </a>{" "}
                  and keeps it current automatically. Drop one policy file for
                  your platform:
                </p>
                <ul className="steps">
                  <li>
                    <strong>Linux:</strong> save{" "}
                    <a href="/policies/brw-chromium-policy.json" target="_blank" rel="noopener noreferrer">
                      the policy JSON
                    </a>{" "}
                    to <code>/etc/chromium/policies/managed/</code> — no MDM
                    needed.
                  </li>
                  <li>
                    <strong>macOS:</strong> install the{" "}
                    <a href="/policies/brw-chromium.mobileconfig" target="_blank" rel="noopener noreferrer">
                      configuration profile
                    </a>{" "}
                    (or push it via MDM).
                  </li>
                  <li>
                    <strong>Windows:</strong> import{" "}
                    <a href="/policies/brw-chromium-policy.reg" target="_blank" rel="noopener noreferrer">
                      the .reg file
                    </a>{" "}
                    (or set the matching GPO).
                  </li>
                </ul>
                <p>
                  No policy at all? On Chromium, <code>brwd</code> can launch the
                  browser with the extension already loaded —{" "}
                  <code>--load-extension</code> still works on Chromium (Chrome
                  137+ dropped it), so there is nothing to click.
                </p>
              </div>
              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge install-badge-soon">
                    also works
                  </span>
                  Chrome — load unpacked
                </p>
                <ol className="steps">
                  <li>
                    Run <code>make install-extension</code> (or open{" "}
                    <code>chrome://extensions</code>).
                  </li>
                  <li>
                    Turn on <strong>Developer mode</strong>, click{" "}
                    <strong>Load unpacked</strong>, choose the{" "}
                    <code>extension/</code> folder.
                  </li>
                  <li>
                    Run <code>brwd --bridge</code> and brw is on your real
                    browser.
                  </li>
                </ol>
                {chromeStoreUrl ? (
                  <p>
                    Or one-click from the{" "}
                    <Link
                      href={chromeStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chrome Web Store
                    </Link>
                    .
                  </p>
                ) : (
                  <p>
                    A one-click Chrome Web Store build is in review; until it
                    lands, load-unpacked installs the exact same extension and
                    ID.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="safety" className="section section-band">
          <div className="section-inner closing-shell">
            <div>
              <p className="section-kicker">safety</p>
              <h2>A normal browser, on a short leash</h2>
              <p>
                brw uses a normal visible browser and a persistent user profile.
                It does <strong>not</strong> add stealth code, CAPTCHA bypass,
                MFA bypass, fraud-check bypass, consent bypass or cookie
                extraction. Browser-control HTTP binds to loopback by default;
                for remote use, prefer stdio MCP over SSH so the profile stays on
                the machine that owns it. Released under AGPL-3.0 — free to use,
                change and build on, with improvements shared back. If that
                doesn&apos;t fit your business,{" "}
                <Link
                  href={`${revittUrl}&utm_content=safety_commercial`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  talk to Revitt
                </Link>{" "}
                about a commercial licence.
              </p>
            </div>
            <Link
              href={brwUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <Github aria-hidden="true" />
              Browse the code
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-mark" aria-hidden="true">
              brw
            </span>
            <div>
              <span>brw</span>
              <p>
                Semantic browser control for agents. An open-source tool from the
                Don Works bench at Revitt.
              </p>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>brw.donworks.co.uk</span>
          <span>
            <Link href="/privacy">Privacy</Link> · Open source by Revitt ·
            AGPL-3.0
          </span>
        </div>
      </footer>
    </>
  );
}
