import Link from "next/link";
import { BrwMark } from "./components/BrwMark";
import {
  Bot,
  Check,
  Eye,
  FileText,
  Fingerprint,
  Gauge,
  Github,
  KeyRound,
  Layers,
  MousePointerClick,
  Repeat,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getLatestRelease } from "@/lib/latestRelease";

type PanelItem = {
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
  cta?: { label: string; href: string };
};

type CapabilityGroup = {
  label: string;
  title: string;
  body: string;
  items: string[];
  icon: LucideIcon;
};

const brwUrl = "https://github.com/Don-Works/brw";
const brwReleasesUrl = "https://github.com/Don-Works/brw/releases";
const brwInstallDocsUrl = "https://github.com/Don-Works/brw/blob/main/docs/install.md";
const brwBenchmarksUrl = "https://github.com/Don-Works/brw/blob/main/docs/benchmarks.md";
const brwRecipeDocsUrl =
  "https://github.com/Don-Works/brw/blob/main/docs/recipes-and-artifacts.md";
const claudeChromeGuideUrl =
  "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome";
const extensionId = "amocjcgddnoakjijfggdpnefdnboilpe";
// Unlisted Chrome Web Store install URL. Set this once the item is published;
// until then the Install section shows the manual (load-unpacked) route only.
const chromeStoreUrl = "";
const donworksSite =
  "https://donworks.co.uk/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";
const donworksGithub = "https://github.com/Don-Works";
const mcplexerUrl =
  "https://mcplexer.com/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";
const mcplexerWorkspacesUrl =
  "https://mcplexer.com/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source&utm_content=why_chrome_logins#workspaces";
const revittUrl =
  "https://revitt.co/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";
const residentUrl =
  "https://github.com/Don-Works/resident?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";
const handlerUrl =
  "https://github.com/Don-Works/handler?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";

const capabilityGroups: CapabilityGroup[] = [
  {
    label: "see + act",
    title: "Semantic page control",
    body: "The fast everyday surface, built around stable refs and small observations.",
    icon: ScanSearch,
    items: [
      "Snapshot and find interactive controls by role, name, text or test id",
      "Read prose, headings, links, forms, tables, Open Graph and JSON-LD",
      "Click, type, fill, select, press, scroll, hover, drag and upload",
      "Wait and assert visibility, text, values and navigation outcomes",
      "Discover and call WebMCP tools exposed directly by compatible web apps",
    ],
  },
  {
    label: "compose",
    title: "Fast multi-step execution",
    body: "Collapse browser work into fewer calls while preserving explicit checks.",
    icon: Zap,
    items: [
      "Batch and plan many steps against one pinned tab",
      "Pre-arm waits so fast page events are not missed",
      "Cancel in-flight work and observe cheap page deltas",
      "Trace a successful flow back into a replayable batch",
    ],
  },
  {
    label: "repeat",
    title: "Deterministic recipes",
    body: "Move proven workflows out of prompts and into a private, reviewable runtime.",
    icon: Repeat,
    items: [
      "Semantic search over disclosure-safe recipe metadata",
      "Immutable version and SHA-256 digest pinning",
      "Exact-origin gates, declared inputs, risk and idempotency",
      "Timers plus page, element, download, tab and network events",
    ],
  },
  {
    label: "browser",
    title: "Profiles, tabs and isolation",
    body: "The real browser stays visible, organised and under the operator's control.",
    icon: Layers,
    items: [
      "Installed-profile bridge for existing logins and passkeys",
      "One namespace per profile, plus tab leases and named tab groups",
      "Background opens and pinned targets without stealing OS focus",
      "Fresh incognito contexts on direct-CDP profiles",
    ],
  },
  {
    label: "inspect",
    title: "Debugging and evidence",
    body: "See what the page, browser and server actually did.",
    icon: Eye,
    items: [
      "Console messages, network resources and active request capture",
      "Authenticated in-page request replay with mutation guards",
      "Screenshots, element crops and Set-of-Marks overlays",
      "Downloads, responsive device emulation and real window bounds",
    ],
  },
  {
    label: "retain",
    title: "Browser-host artifacts",
    body: "Large or sensitive evidence stays beside the browser until explicitly read.",
    icon: ShieldCheck,
    items: [
      "Text, semantic JSON, screenshots, PDFs, downloads and short video",
      "Opaque handles with bounded search, read, info and delete",
      "TTL, per-item and total quotas, hashing and owner-only storage",
      "Direct-CDP cookie controls for dedicated profiles; extension cookies stay blocked",
    ],
  },
];

const why: PanelItem[] = [
  {
    label: "control",
    title: "The whole browser surface",
    body: "More than clicks: tabs, groups, forms, files, console, network, responsive testing, downloads, artifacts and human hand-off — exposed as MCP and HTTP.",
    icon: Bot,
  },
  {
    label: "quickly",
    title: "Fewer calls, smaller payloads",
    body: "Stable refs, action observations, batched plans, bounded reads and on-demand tool disclosure remove repeat screenshots and unnecessary round-trips.",
    icon: Gauge,
  },
  {
    label: "recipes",
    title: "Teach it once. Run it exactly.",
    body: "Turn stable browser work into immutable recipes with exact origins, declared risk and durable postconditions — then search and run in two calls.",
    icon: Sparkles,
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
];

const benchmarks = [
  {
    value: "2.31×",
    title: "faster event settling",
    body: "Pre-armed semantic waits versus arming after a synchronous DOM reaction.",
  },
  {
    value: "51.9×",
    title: "less proxy transfer",
    body: "A bounded browser-host read instead of hauling the full payload across HTTP.",
  },
  {
    value: "6,332×",
    title: "smaller capture result",
    body: "A compact artifact handle instead of inline base64 for a 1.31 MB capture.",
  },
  {
    value: "69.9%",
    title: "less tool catalogue context",
    body: "The default auto profile at startup versus advertising all 62 tools every turn.",
  },
];

const comparisonRows = [
  {
    label: "What it is",
    brw: "Open browser-control infrastructure for agents and automation systems.",
    claude: "Anthropic's end-user browser agent inside Claude products.",
  },
  {
    label: "Who can drive it",
    brw: "Any MCP client or HTTP client — Claude, Codex, Cursor, pi, your own service.",
    claude: "Claude Code, Claude Cowork and the Claude side panel.",
  },
  {
    label: "Browser support",
    brw: "Chrome and Chromium; local or on a remote browser host over SSH.",
    claude: "Google Chrome; other Chromium browsers are not supported.",
  },
  {
    label: "Signed-in browser",
    brw: "Yes — bridge into an installed profile, or use a dedicated direct-CDP profile.",
    claude: "Yes — works alongside the user's signed-in Chrome session.",
  },
  {
    label: "Control contract",
    brw: "Stable semantic refs, bounded reads, observations after actions, assertions, batch, plan, cancel and trace.",
    claude: "Reads, clicks, types, navigates and fills forms; also exposes screenshots, console, network and DOM context.",
  },
  {
    label: "Efficiency evidence",
    brw: "Public local probes: 2.31× faster event settling, 51.9× less proxy transfer, 6,332× smaller capture results and 69.9% less initial tool context.",
    claude: "No equivalent low-level benchmark is published in Anthropic's feature guide; private brw runs were directionally faster, not a numeric public claim.",
  },
  {
    label: "Reusable work",
    brw: "Private schema-validated recipes pinned by id, version and digest, with origin/risk/postcondition gates.",
    claude: "Recorded workflows in the classic side panel, reusable shortcuts and scheduled tasks.",
  },
  {
    label: "Large outputs",
    brw: "Browser-host artifacts for text, JSON, images, PDFs, downloads and video, read back in bounded windows.",
    claude: "No comparable public artifact-handle API is documented.",
  },
  {
    label: "Ownership",
    brw: "Self-hosted, AGPL-3.0 source, local data path, optional commercial licence.",
    claude: "Proprietary Anthropic service; available on paid Claude plans.",
  },
];

const facts = [
  ["surface", "62 tools"],
  ["fast path", "2-call recipes"],
  ["clients", "MCP + HTTP"],
  ["licence", "AGPL-3.0"],
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
      ["Resident", residentUrl],
      ["Handler", handlerUrl],
      ["Revitt", `${revittUrl}&utm_content=footer_revitt`],
    ],
  },
];

export default async function HomePage() {
  const { version, htmlUrl } = await getLatestRelease();
  const downloadUrl = htmlUrl || brwReleasesUrl;
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
          <a href="#recipes">Recipes</a>
          <a href="#features">Features</a>
          <a href="#compare">Compare</a>
          <a href="#quickstart">Setup</a>
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
            <div className="hero-mark" aria-hidden="true">
              <BrwMark title="brw" />
            </div>
            <h1 className="hero-tagline">
              Control Chrome completely. Quickly. With recipes.
            </h1>
            <p className="hero-lede">
              brw gives any agent fast, inspectable control of real Chrome.
              Stable refs replace pixel hunting, every action reports what
              changed, and deterministic recipes turn proven browser work into
              a two-call run.
            </p>
            <div className="hero-actions">
              <Link
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                <Github aria-hidden="true" />
                Download installer
              </Link>
              <a href="#compare" className="button button-secondary">
                <Gauge aria-hidden="true" />
                See the proof
              </a>
            </div>
            {version ? (
              <p className="hero-version">
                Latest release{" "}
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <code>{version}</code>
                </a>{" "}
                · macOS · Linux · Windows
              </p>
            ) : null}
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
              <h2>Control more. Spend less. Repeat what works.</h2>
              <p>
                Most browser agents are a feature inside one product. brw is the
                browser-control layer: open, inspectable and reusable from any
                agent that speaks MCP or HTTP.
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
              <p className="section-kicker">the fast loop</p>
              <h2>See it. Act once. Reuse it.</h2>
              <p>
                The normal path is semantic and compact: inspect only what the
                next action needs, act by ref, and read the returned delta. Once
                the flow is stable, move it into a recipe instead of asking a
                model to rediscover it forever.
              </p>
            </div>
            <div className="stacked-panels">
              <article className="wide-panel">
                <span>ref</span>
                <div>
                  <MousePointerClick aria-hidden="true" />
                  <h3>Find stable refs</h3>
                  <p>
                    Snapshot the actionable frontier or find one control by
                    role, name, text or test id. brw returns stable refs like{" "}
                    <code>e17</code>, not brittle selectors.
                  </p>
                </div>
              </article>
              <article className="wide-panel">
                <span>read</span>
                <div>
                  <Zap aria-hidden="true" />
                  <h3>Act and read the change</h3>
                  <p>
                    Click, type, fill, select, drag, upload or commit. The action
                    returns URL, focus and changed elements, so the agent does
                    not spend another turn asking whether it worked.
                  </p>
                </div>
              </article>
              <article className="wide-panel">
                <span>observe</span>
                <div>
                  <Repeat aria-hidden="true" />
                  <h3>Promote the proven flow</h3>
                  <p>
                    Trace or draft the successful mechanics, validate the
                    semantic targets and install an immutable recipe. Next time:
                    search, pin and run.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="recipes" className="section recipe-section">
          <div className="section-inner recipe-layout">
            <div className="section-header">
              <p className="section-kicker">recipes</p>
              <h2>Stop paying the model to rediscover solved work.</h2>
              <p>
                A brw recipe is a private, deterministic browser workflow — not
                a saved prompt. Search returns safe metadata. Run fetches the
                exact immutable version and executes it beside the browser with
                origin, risk and postcondition checks.
              </p>
              <Link
                href={brwRecipeDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Read the recipe architecture →
              </Link>
            </div>

            <div className="recipe-console">
              <div className="recipe-console-head">
                <span>known workflow</span>
                <span>two calls</span>
              </div>
              <div className="recipe-command">
                <span>01 / search</span>
                <code>
                  brw_recipe_search {"{"} query, origin {"}"}
                </code>
                <p>Returns id, version, digest, risk and score — never the private steps.</p>
              </div>
              <div className="recipe-arrow" aria-hidden="true">
                ↓ pin the exact match
              </div>
              <div className="recipe-command recipe-command-hot">
                <span>02 / run</span>
                <code>
                  brw_recipe_run {"{"} id, version, digest, inputs {"}"}
                </code>
                <p>Returns status, attempts, timings and artifact handles.</p>
              </div>
            </div>

            <ul className="recipe-guarantees" aria-label="Recipe guarantees">
              <li>
                <Fingerprint aria-hidden="true" />
                <span>
                  <strong>Immutable identity</strong>
                  An id, semantic version and SHA-256 digest must all match.
                </span>
              </li>
              <li>
                <ShieldCheck aria-hidden="true" />
                <span>
                  <strong>Safe writes</strong>
                  Exact origins, one allowed actuation and durable postconditions.
                </span>
              </li>
              <li>
                <FileText aria-hidden="true" />
                <span>
                  <strong>Private by design</strong>
                  Recipe bodies and credentials stay outside the public repo.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">the full surface</p>
              <h2>Everything the agent needs. One browser layer.</h2>
              <p>
                brw exposes 62 tools today, but does not dump all 62 into every
                prompt. The default starts lean and discloses the long tail only
                when the agent asks for it.
              </p>
            </div>
            <div className="capability-grid">
              {capabilityGroups.map(({ icon: Icon, ...group }) => (
                <article key={group.title} className="capability-panel">
                  <div className="panel-topline">
                    <span>{group.label}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.body}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="feature-footnote">
              Need the smallest possible prompt? Use <code>--mcp-tools auto</code>,{" "}
              <code>core</code> or <code>minimal</code>. Every tool remains
              discoverable and directly callable.
            </p>
          </div>
        </section>

        <section id="compare" className="section section-alt comparison-section">
          <div className="section-inner">
            <div className="section-header comparison-header">
              <p className="section-kicker">proof + comparison</p>
              <h2>Built to do more work with less browser overhead.</h2>
              <p>
                Private pre-release head-to-heads against Claude in Chrome moved
                in the same direction: fewer turns, fewer tokens, less wall time
                and lower estimated cost. Those transcripts contain private page
                state, so we label that result directional — not a public numeric
                promise.
              </p>
            </div>

            <div className="benchmark-grid" aria-label="Reproducible brw measurements">
              {benchmarks.map((benchmark) => (
                <article key={benchmark.title} className="benchmark-card">
                  <strong>{benchmark.value}</strong>
                  <h3>{benchmark.title}</h3>
                  <p>{benchmark.body}</p>
                </article>
              ))}
            </div>
            <p className="benchmark-note">
              Reproducible Apple M4 Max samples from September 2026. These are
              brw engineering probes, not Claude measurements.{" "}
              <Link href={brwBenchmarksUrl} target="_blank" rel="noopener noreferrer">
                Methods and caveats →
              </Link>
            </p>

            <div className="comparison-intro">
              <div>
                <p className="section-kicker">brw vs Claude in Chrome</p>
                <h3>Infrastructure versus a finished assistant.</h3>
              </div>
              <p>
                Claude in Chrome is polished and capable. brw wins when you need
                an open, agent-agnostic control layer, deterministic execution or
                an API you own. Here is the fair comparison.
              </p>
            </div>

            <div className="comparison-wrap" tabIndex={0}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col" className="brw-column">brw</th>
                    <th scope="col">Claude in Chrome</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td className="brw-column">{row.brw}</td>
                      <td>{row.claude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comparison-note">
              Compared from public documentation checked 10 September 2026.{" "}
              <a href={claudeChromeGuideUrl} target="_blank" rel="noopener noreferrer">
                Read Anthropic&apos;s current feature guide
              </a>
              . Claude is an Anthropic product; brw is independent and is not
              affiliated with or endorsed by Anthropic.
            </p>
          </div>
        </section>

        <section id="quickstart" className="section">
          <div className="section-inner split-layout">
            <div className="section-header section-header-sticky">
              <p className="section-kicker">quick start</p>
              <h2>Install. Start brw. Give your agent Chrome.</h2>
              <p>
                Native installers put <code>brwd</code>, <code>brwctl</code>,
                <code>brwcheck</code>, and <code>brw-devtools-mcp</code> on your
                PATH. Pick the release asset for your platform, then run the
                daemon as stdio MCP or expose the HTTP API on loopback.
              </p>
              <p>
                For remote and installed-Chrome setups, see the{" "}
                <Link href={brwInstallDocsUrl} target="_blank" rel="noopener noreferrer">
                  install docs
                </Link>
                .
              </p>
            </div>
            <div className="stacked-panels">
              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge">recommended</span>
                  Native installers from GitHub releases
                </p>
                <ul className="steps">
                  <li>
                    <strong>Windows:</strong> <code>.msi</code> for amd64 or
                    arm64.
                  </li>
                  <li>
                    <strong>macOS:</strong> universal <code>.pkg</code>.
                  </li>
                  <li>
                    <strong>Linux:</strong> <code>.deb</code> or{" "}
                    <code>.rpm</code> for amd64 or arm64.
                  </li>
                </ul>
                <Link
                  href={brwReleasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  <Github aria-hidden="true" />
                  Open releases
                </Link>
              </div>
              <pre className="codeblock">
                <code>
                  <span className="cmt"># after installing from a release</span>
                  {"\n"}
                  <span className="cmt"># run as an MCP server over stdio</span>
                  {"\n"}
                  <span className="prompt">$ </span>brwd --mcp --http off
                  {"\n"}
                  {"\n"}
                  <span className="cmt"># or expose the HTTP API on loopback</span>
                  {"\n"}
                  <span className="prompt">$ </span>brwd --http 127.0.0.1:17310
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
              <pre className="codeblock">
                <code>
                  <span className="cmt"># source build if you need it</span>
                  {"\n"}
                  <span className="prompt">$ </span>git clone https://github.com/Don-Works/brw.git
                  {"\n"}
                  <span className="prompt">$ </span>cd brw{"\n"}
                  <span className="prompt">$ </span>make build{"\n"}
                  <span className="prompt">$ </span>./bin/brwd --mcp --http off
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section id="install" className="section section-alt">
          <div className="section-inner split-layout">
            <div className="section-header section-header-sticky">
              <p className="section-kicker">install</p>
              <h2>Daemon first, Chromium bridge when you need real profile auth</h2>
              <p>
                Start with a native brw installer from GitHub releases. The
                extension is only needed when you want the daemon to bridge into
                an already-signed-in Chrome or Chromium profile over{" "}
                <code>ws://127.0.0.1</code>.
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
                  <span className="install-badge">daemon</span>
                  Native package installers
                </p>
                <p>
                  GitHub releases ship <code>.msi</code> for Windows, a
                  universal macOS <code>.pkg</code>, and Linux <code>.deb</code>
                  / <code>.rpm</code> packages. They put the brw commands on
                  PATH and install the extension, tests, README, and licence
                  into the platform share directory.
                </p>
                <Link
                  href={brwReleasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  <Github aria-hidden="true" />
                  Download from releases
                </Link>
              </div>
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
                    A one-click Chrome Web Store build is being prepared for
                    review; until it lands, load-unpacked installs the same
                    extension from source.
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
                MFA bypass, fraud-check bypass or consent bypass. The
                installed-profile extension refuses HttpOnly cookie and bulk
                storage access; explicit cookie tools exist only for dedicated
                direct-CDP profiles. Browser-control HTTP binds to loopback by
                default, recipes declare their risk, and mutating requests are
                guarded. For remote use, prefer stdio MCP over SSH so the profile
                stays on the machine that owns it. Released under AGPL-3.0 — free
                to use, change and build on, with improvements shared back. If
                that doesn&apos;t fit your business,{" "}
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
                Complete Chrome control for agents — fast by default, repeatable
                by recipe. An open-source tool from Revitt&apos;s Don Works bench.
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
