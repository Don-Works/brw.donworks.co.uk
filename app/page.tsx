import Link from "next/link";
import { BrwMark } from "./components/BrwMark";
import {
  BadgeCheck,
  Bot,
  Check,
  Eye,
  FileCode,
  FileText,
  Fingerprint,
  Gauge,
  Github,
  KeyRound,
  Layers,
  MousePointerClick,
  Puzzle,
  Repeat,
  ScanSearch,
  ScrollText,
  ShieldCheck,
  Signature,
  Sparkles,
  Terminal,
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
const brwAuthModelUrl = "https://github.com/Don-Works/brw/blob/main/docs/auth-model.md";
const brwLicenceUrl = "https://github.com/Don-Works/brw/blob/main/LICENSE";
const brwReleaseWorkflowUrl =
  "https://github.com/Don-Works/brw/blob/main/.github/workflows/release.yml";
// Served from public/install.sh with a no-store text/x-shellscript header, so the
// URL a reader opens in a browser is byte-for-byte what `curl | sh` executes.
const installScriptPath = "/install.sh";
const installCommand = "curl -fsSL https://brw.donworks.co.uk/install.sh | sh";
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
    title: "Your real browser logins",
    body: "Bridges to the installed, signed-in browser you already use — Chrome, Chromium, Edge, Brave, Vivaldi, Opera or Arc. The sites you're logged into, brw is too, and cookies and sessions stay on your machine.",
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
    brw: "Chrome and Chromium, plus Edge, Brave, Vivaldi, Opera and Arc — any Chromium build, named with one flag. Local, or a remote browser host over SSH.",
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

const transportRows = [
  {
    label: "The browser it drives",
    bridge: "The Chrome, Chromium, Edge, Brave, Vivaldi, Opera or Arc you already have open and signed in.",
    direct: "A separate Chromium browser that brw launches, on a profile brw owns.",
  },
  {
    label: "Where the logins come from",
    bridge: "Sessions, cookies and passkeys that are already in that profile.",
    direct:
      "Sign in once with brwd --login; the profile keeps the session for later headless runs.",
  },
  {
    label: "Chrome tab groups",
    bridge: "Yes — chrome.tabGroups keeps the agent's tabs in one labelled group.",
    direct: "No. chrome.tabGroups is an extension API with no DevTools Protocol equivalent.",
  },
  {
    label: "Incognito contexts",
    bridge: "No.",
    direct:
      "Yes — brw_open_incognito opens an isolated context, brw_close_context disposes it.",
  },
  {
    label: "Cookie tools",
    bridge:
      "No. The extension refuses every cookie CDP method, HttpOnly included, to protect the signed-in profile.",
    direct: "Yes — brw_cookies lists, sets and deletes, HttpOnly cookies included.",
  },
  {
    label: "Downloads",
    bridge:
      "Files land in the browser's own download folder. Capturing the bytes as an artifact can need macOS Files & Folders consent; the metadata-only event does not.",
    direct: "Deterministic — files are staged in brw's private cache, no Downloads access needed.",
  },
  {
    label: "Headless",
    bridge: "No. --headless with --bridge is refused rather than ignored.",
    direct: "Yes, once the profile has been signed into.",
  },
  {
    label: "How it starts",
    bridge: "brwd --bridge, plus the extension loaded in that browser.",
    direct: "brwd --mcp --http off. No extension involved.",
  },
];

const trustGroups: CapabilityGroup[] = [
  {
    label: "source",
    title: "AGPL-3.0, all of it",
    body: "Daemon, CLI and extension are in one public repository under one licence.",
    icon: ScrollText,
    items: [
      "The extension ships unminified — every file in the package is a file in the repo",
      "No telemetry, no analytics, no account, no Don Works service in the data path",
      "Improvements flow back under the same licence; a commercial licence is available",
    ],
  },
  {
    label: "provenance",
    title: "Every artifact is attested",
    body: "A checksum proves a file matches the release. An attestation proves which workflow and which commit built it.",
    icon: BadgeCheck,
    items: [
      "GitHub build-provenance attestation is generated for every release artifact",
      "SHA256SUMS.txt covers every installer, and install.sh checks both before it writes anything",
      "Verifying needs gh 2.49 or newer, signed in — the bundle comes from the GitHub API",
    ],
  },
  {
    label: "signing",
    title: "Code signing is not in place",
    body: "No release artifact carries a platform code-signing signature today, on any operating system.",
    icon: Signature,
    items: [
      "macOS packages are unsigned and not notarised; Windows packages carry no Authenticode signature",
      "Linux .deb and .rpm are unsigned — there is no distribution GPG key to check them against",
      "The signing pipeline is written and switches on when certificates are bought. No date is set",
    ],
  },
  {
    label: "pipeline",
    title: "What a tag has to pass",
    body: "A release builds only after the gate in the public workflow file.",
    icon: FileCode,
    items: [
      "Unit tests plus a deterministic real-browser functional suite",
      "go vet, staticcheck and govulncheck for reachable vulnerabilities",
      "A gitleaks scan of the full git history on every release",
    ],
  },
  {
    label: "extension",
    title: "One permanent extension id",
    body: "The daemon trusts that id with no configuration.",
    icon: Puzzle,
    items: [
      "amocjcgddnoakjijfggdpnefdnboilpe, pinned by the public key in the manifest",
      "Load-unpacked and self-hosted CRX builds resolve to the same id",
      "A re-signed build gets a different id, and an unconfigured bridge will not accept it",
    ],
  },
  {
    label: "boundaries",
    title: "What the extension cannot do",
    body: "These refusals are implemented in the extension's service worker.",
    icon: ShieldCheck,
    items: [
      "Cookie CDP methods are refused, HttpOnly cookies included",
      "Storage, DOMStorage, IndexedDB, CacheStorage and Database domains are refused",
      "Password, one-time-code and card fields are masked out of snapshots and reads",
    ],
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
      ["install.sh", installScriptPath],
      ["llms.txt", "/llms.txt"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Privacy policy", "/privacy"],
      ["Extension privacy policy", "/privacy/extension"],
      ["Licence (AGPL-3.0)", brwLicenceUrl],
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
          <a href="#install">Install</a>
          <a href="#trust">Trust</a>
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
              Control Chrome and Chromium completely. Quickly. With recipes.
            </h1>
            <p className="hero-lede">
              brw gives any agent fast, inspectable control of real Chrome and
              Chromium. Stable refs replace pixel hunting, every action reports
              what changed, and deterministic recipes turn proven browser work
              into a two-call run.
            </p>
            <div className="hero-actions">
              <a href="#install" className="button button-primary">
                <Terminal aria-hidden="true" />
                Install brw
              </a>
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

        <section id="install" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">install</p>
              <h2>One command, no administrator rights</h2>
              <p>
                The installer puts brw under your home directory and hands off
                to <code>brwctl setup</code>, which starts the bridge daemon in
                the background, registers brw with your MCP client and installs
                the agent skill.
              </p>
            </div>

            <div className="install-lead">
              <p className="install-route-head">
                <span className="install-badge">start here</span>
                macOS and Linux
              </p>
              <pre className="codeblock codeblock-lead">
                <code>
                  <span className="prompt">$ </span>
                  {installCommand}
                </code>
              </pre>
              <p className="install-lead-note">
                That command runs a shell script fetched over the network, so
                read it first.{" "}
                <a className="text-link" href={installScriptPath}>
                  install.sh
                </a>{" "}
                is served from this site as plain text, with no caching, and is
                the same file the command executes.
              </p>
              <ol className="steps">
                <li>
                  Detects your platform, resolves the version and prints the
                  whole plan — archive name, source URL, install directory —
                  before it downloads anything.
                </li>
                <li>
                  Verifies the archive&apos;s SHA-256 and its GitHub
                  build-provenance attestation. A mismatch aborts before
                  anything is written to disk.
                </li>
                <li>
                  Installs under{" "}
                  <code>~/Library/Application Support/brw</code> on macOS or{" "}
                  <code>~/.local/share/brw</code> on Linux, and symlinks{" "}
                  <code>brwd</code>, <code>brwctl</code>, <code>brwcheck</code>{" "}
                  and <code>brw-devtools-mcp</code> into{" "}
                  <code>~/.local/bin</code>. No <code>sudo</code>, nothing
                  outside your home directory.
                </li>
                <li>
                  Runs <code>brwctl setup</code>.
                </li>
              </ol>
              <p className="install-lead-note">
                It reads no input, which is what makes the pipe safe.{" "}
                <code>BRW_VERSION</code>, <code>BRW_INSTALL_DIR</code>,{" "}
                <code>BRW_BIN_DIR</code>, <code>BRW_BASE_URL</code>,{" "}
                <code>BRW_NO_SETUP</code> and <code>BRW_SKIP_ATTESTATION</code>{" "}
                change what it does.
              </p>
            </div>

            <div className="install-routes">
              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge">homebrew</span>
                  macOS and Linux
                </p>
                <p>
                  <code>brew install don-works/tap/brw</code> installs the same
                  tree into the formula prefix, which is then the app directory:{" "}
                  <code>brwctl doctor --app-dir &quot;$(brew --prefix brw)&quot;</code>.
                  Run <code>brwctl setup</code> afterwards. The tap is bumped by
                  the release workflow, so <code>brew upgrade</code> tracks
                  releases.
                </p>
                <Link
                  href="https://github.com/Don-Works/homebrew-tap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                >
                  <Github aria-hidden="true" />
                  Open the tap
                </Link>
              </div>

              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge install-badge-soon">
                    macOS pkg
                  </span>
                  Admin and MDM installs
                </p>
                <p>
                  A universal <code>.pkg</code> that installs machine-wide under{" "}
                  <code>/usr/local</code>. Take this route when you are
                  deploying to someone else&apos;s machine, or when policy
                  requires a package your MDM can ship. It needs administrator
                  rights; the one-line installer does not.
                </p>
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

              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge install-badge-soon">linux</span>
                  .deb and .rpm
                </p>
                <p>
                  <code>brw_&lt;version&gt;_linux_amd64.deb</code> and the arm64
                  and <code>.rpm</code> equivalents, for systems that expect
                  packages to come from the package manager. Installs to{" "}
                  <code>/usr/share/brw/</code>.
                </p>
              </div>

              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge install-badge-soon">
                    windows
                  </span>
                  .msi
                </p>
                <p>
                  <code>brw_&lt;version&gt;_windows_amd64.msi</code> and an
                  arm64 build. Puts the brw commands on PATH and the extension,
                  tests and licence under{" "}
                  <code>C:\Program Files\brw\share\</code>.
                </p>
              </div>
            </div>

            <div className="install-after">
              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge">setup</span>
                  What brwctl setup does
                </p>
                <p>
                  Inside the pipe it is non-interactive: it prints the plan,
                  performs it and exits. On a terminal it asks first.{" "}
                  <code>brwctl setup --dry-run</code> lists every action without
                  performing one. Nothing it writes is outside your home
                  directory and no step uses <code>sudo</code>.
                </p>
                <ul className="steps">
                  <li>
                    Writes a browser profile policy at{" "}
                    <code>~/Library/Application Support/brw/browser-profiles.json</code> on
                    macOS and <code>~/.config/brw/browser-profiles.json</code> on
                    Linux, merging
                    into an existing one rather than replacing it.
                  </li>
                  <li>
                    Installs a background daemon for your platform — a
                    LaunchAgent on macOS, a systemd user unit on Linux, a logon
                    task on Windows — bound to <code>127.0.0.1:17310</code> for
                    control and <code>127.0.0.1:17311</code> for the bridge. If
                    a service already drives that profile or holds those ports,
                    it reports what it found and writes nothing.
                  </li>
                  <li>
                    Registers brw with Claude Code through{" "}
                    <code>claude mcp add</code>. <code>--mcp-client codex</code>{" "}
                    or <code>both</code> covers Codex;{" "}
                    <code>--mcp-client none</code> prints the{" "}
                    <code>mcpServers</code> block for you to paste.
                  </li>
                  <li>
                    Installs the bundled agent skill into{" "}
                    <code>~/.claude/skills/brw</code>,{" "}
                    <code>~/.agents/skills/brw</code> and{" "}
                    <code>~/.codex/skills/brw</code>.
                  </li>
                  <li>
                    On macOS, turns off App Nap for the browser so a
                    backgrounded window does not drop the bridge.
                  </li>
                  <li>
                    Runs the doctor check and prints what is left for you to do.
                  </li>
                </ul>
              </div>

              <div className="install-route">
                <p className="install-route-head">
                  <span className="install-badge">then</span>
                  Connect a browser
                </p>
                <p>
                  Loading the extension is the one step <code>brwctl setup</code>{" "}
                  cannot do for you. The bridge drives a browser you are already
                  signed into, so that browser needs the brw extension. One
                  permanent extension id, trusted by the daemon with no
                  configuration:
                </p>
                <p className="install-id">
                  <code>{extensionId}</code>
                </p>
                <ul className="steps">
                  <li>
                    <strong>Chromium:</strong> drop one policy file and it
                    force-installs from brw&apos;s self-hosted{" "}
                    <a href="/brw.crx" target="_blank" rel="noopener noreferrer">
                      package
                    </a>{" "}
                    and{" "}
                    <a
                      href="/updates.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      update manifest
                    </a>
                    , then auto-updates. Linux needs no MDM:{" "}
                    <a
                      href="/policies/brw-chromium-policy.json"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policy JSON
                    </a>{" "}
                    into <code>/etc/chromium/policies/managed/</code>. macOS uses
                    a{" "}
                    <a
                      href="/policies/brw-chromium.mobileconfig"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      configuration profile
                    </a>
                    , Windows a{" "}
                    <a
                      href="/policies/brw-chromium-policy.reg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      .reg file
                    </a>{" "}
                    or the matching GPO.
                  </li>
                  <li>
                    <strong>Chrome:</strong> load unpacked today.{" "}
                    <code>chrome://extensions</code> &rarr; Developer mode &rarr;
                    Load unpacked &rarr; the <code>extension/</code> folder.
                    {chromeStoreUrl ? (
                      <>
                        {" "}
                        Or install it in one click from the{" "}
                        <Link
                          href={chromeStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chrome Web Store
                        </Link>
                        .
                      </>
                    ) : (
                      " A Chrome Web Store build is being prepared for review. No listing exists yet, so load-unpacked is the Chrome path until one does."
                    )}
                  </li>
                  <li>
                    Either way, open the extension&apos;s Options page and click{" "}
                    <strong>Enable local browser control</strong>. It attempts no
                    connection before you do. What it handles, and what it
                    refuses, is in the{" "}
                    <Link href="/privacy/extension">
                      extension privacy policy
                    </Link>
                    .
                  </li>
                </ul>
              </div>

              <pre className="codeblock">
                <code>
                  <span className="cmt"># setup prints this line with your workspace filled in</span>
                  {"\n"}
                  <span className="prompt">$ </span>brwctl doctor --workspace brw-chrome-profile
                  {"\n"}
                  {"\n"}
                  <span className="cmt"># before the extension is loaded and the browser restarted,</span>
                  {"\n"}
                  <span className="cmt"># doctor reports it missing and exits non-zero. That is expected.</span>
                </code>
              </pre>

              <pre className="codeblock">
                <code>
                  <span className="cmt"># then check it end to end</span>
                  {"\n"}
                  <span className="prompt">$ </span>curl -s 127.0.0.1:17310/api/browser/open \
                  {"\n"}
                  {"    "}-H &apos;content-type: application/json&apos; \
                  {"\n"}
                  {"    "}-d &apos;{"{"}&quot;url&quot;:&quot;https://example.com&quot;{"}"}&apos;
                  {"\n"}
                  {"\n"}
                  <span className="cmt"># a visible tab opened; read its controls</span>
                  {"\n"}
                  <span className="prompt">$ </span>curl -s 127.0.0.1:17310/api/page/snapshot | jq
                </code>
              </pre>

              <pre className="codeblock">
                <code>
                  <span className="cmt"># build from source instead</span>
                  {"\n"}
                  <span className="prompt">$ </span>git clone https://github.com/Don-Works/brw.git
                  {"\n"}
                  <span className="prompt">$ </span>cd brw{"\n"}
                  <span className="prompt">$ </span>make build{"\n"}
                  <span className="prompt">$ </span>./bin/brwd --mcp --http off
                </code>
              </pre>
            </div>

            <p className="feature-footnote">
              Remote browsers, multi-profile policies and SSH-first setups are in
              the{" "}
              <Link href={brwInstallDocsUrl} target="_blank" rel="noopener noreferrer">
                install docs
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="transports" className="section section-alt">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">transports</p>
              <h2>Two ways brw reaches a browser</h2>
              <p>
                The extension bridge drives the browser you already use. Direct
                CDP drives a browser brw launches and owns. They differ in what
                they can do, and each capability below exists on one of them. The
                one-line installer sets up the bridge; add the other lane with{" "}
                <code>brwctl setup --transport direct-cdp</code>, and run both
                side by side as separate namespaces.
              </p>
            </div>

            <div
              className="comparison-wrap transport-wrap"
              tabIndex={0}
              role="region"
              aria-label="Transport capability comparison"
            >
              <table className="comparison-table transport-table">
                <caption className="sr-only">
                  Capabilities of the brw extension bridge compared with the
                  direct-CDP transport
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col" className="brw-column">
                      Extension bridge
                    </th>
                    <th scope="col">Direct CDP</th>
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td className="brw-column" data-lane="Extension bridge">
                        {row.bridge}
                      </td>
                      <td data-lane="Direct CDP">{row.direct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comparison-note">
              <code>brw_identity</code> reports which transport a namespace is
              on, so an agent can check before it assumes a capability.{" "}
              <Link href={brwAuthModelUrl} target="_blank" rel="noopener noreferrer">
                Read the auth model
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="trust" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">trust</p>
              <h2>What you can check before you run it</h2>
              <p>
                brw is young and small, and it asks for control of a browser you
                are signed into. Here is what is verifiable about a release
                today, and what is not yet.
              </p>
            </div>
            <div className="capability-grid">
              {trustGroups.map(({ icon: Icon, ...group }) => (
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

            <pre className="codeblock trust-commands">
              <code>
                <span className="cmt"># the file matches the release</span>
                {"\n"}
                <span className="prompt">$ </span>shasum -a 256 -c SHA256SUMS.txt
                {"\n"}
                {"\n"}
                <span className="cmt"># the release came from this repository&apos;s workflow</span>
                {"\n"}
                <span className="prompt">$ </span>gh attestation verify brw_&lt;version&gt;_macos_universal.pkg \
                {"\n"}
                {"    "}--repo Don-Works/brw
              </code>
            </pre>
            <p className="comparison-note">
              Both checks run against artifacts from the{" "}
              <Link href={brwReleasesUrl} target="_blank" rel="noopener noreferrer">
                releases page
              </Link>
              . The workflow that produces and attests them is{" "}
              <Link
                href={brwReleaseWorkflowUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                in the repository
              </Link>
              .
            </p>
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
                direct-CDP profiles, and the{" "}
                <Link href="/privacy/extension">
                  extension privacy policy
                </Link>{" "}
                lists every refusal. Browser-control HTTP binds to loopback by
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
                Complete Chrome and Chromium control for agents — fast by
                default, repeatable by recipe. An open-source tool from
                Revitt&apos;s Don Works bench.
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
