import Link from "next/link";
import { BrwMark } from "./components/BrwMark";
import {
  BadgeCheck,
  Bell,
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
import { comparisonRows, measurements, deepDiveUrl, pageWatchersDocsUrl, releaseHighlights } from "@/lib/siteEvidence";

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
const brwBenchmarksUrl = "https://github.com/Don-Works/brw/blob/v0.20.0/docs/benchmarks.md";
const brwRecipeDocsUrl =
  "https://github.com/Don-Works/brw/blob/main/docs/recipes-and-artifacts.md";
const brwRepoRecipesUrl = "https://github.com/Don-Works/brw/blob/main/docs/repository-recipes.md";
const brwResearchUrl = "https://github.com/Don-Works/brw/blob/v0.20.0/docs/competitive-review-2026-10.md";
const brwLandscapeUrl = "https://github.com/Don-Works/brw/blob/v0.20.0/docs/browser-landscape-2026-10.md";
const brwExtractionUrl = "https://github.com/Don-Works/brw/blob/main/skills/brw/references/extraction.md";
const brwAuthModelUrl = "https://github.com/Don-Works/brw/blob/main/docs/auth-model.md";
const brwLicenceUrl = "https://github.com/Don-Works/brw/blob/main/LICENSE";
const brwReleaseWorkflowUrl =
  "https://github.com/Don-Works/brw/blob/main/.github/workflows/release.yml";
// Served from public/install.sh with a no-store text/x-shellscript header, so the
// URL a reader opens in a browser is byte-for-byte what `curl | sh` executes.
const installScriptPath = "/install.sh";
const installCommand = "curl -fsSL https://brw.donworks.co.uk/install.sh | sh";
const extensionId = "amocjcgddnoakjijfggdpnefdnboilpe";
// Unlisted Chrome Web Store install URL. Set this once the item is published;
// until then the Install section shows the manual (load-unpacked) route only.
const chromeStoreUrl = "";
const donworksSite =
  "https://donworks.co.uk/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source";
const donworksGithub = "https://github.com/Don-Works";
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
      "Read a public URL without opening a tab; use the browser for rendered or signed-in content",
      "Read selected prose, headings, links, forms, tables, Open Graph and JSON-LD",
      "Click, type, fill, select, press, scroll, hover, drag and upload",
      "Wait and assert visibility, text, values including empty fields, and navigation outcomes",
      "Discover and call a page's WebMCP tools, native or declarative, on every transport",
    ],
  },
  {
    label: "compose",
    title: "Fewer trips to the browser",
    body: "Collapse browser work into fewer calls while preserving explicit checks.",
    icon: Zap,
    items: [
      "Batch and plan many steps against one pinned tab",
      "Pre-arm waits so fast page events are not missed",
      "Request compact snapshots, then only changes since a prior version",
      "Cancel in-flight work and observe page changes",
      "Choose a read settle budget after checking readiness",
      "Trace a successful flow back into a replayable batch",
    ],
  },
  {
    label: "watch",
    title: "Persistent page activity",
    body: "Register a page once and give your agent a reason to return when it changes.",
    icon: Bell,
    items: [
      "Watch a page title, selected text or element count",
      "Keep registrations, digests and event metadata across daemon restarts",
      "Read queued changes with a per-watcher cursor and explicit gap reporting",
      "Notice availability changes, including login redirects and recovery",
      "Pause, resume or remove watchers without taking over your current tab",
      "Bind activity to an identity follow-up through Maix",
    ],
  },
  {
    label: "repeat",
    title: "Deterministic recipes",
    body: "Run reviewed workflows from your repository or an optional recipe provider.",
    icon: Repeat,
    items: [
      "Pass a recipe object directly, or search a provider and pin the result",
      "Commit reviewed, sanitized recipes in .brw/recipes/ and run by file",
      "Immutable version and SHA-256 digest pinning",
      "Exact-origin gates, declared inputs, risk and idempotency",
      "Timers plus page, element, download, tab and network events",
      "Named, bounded section, table and structured-field outputs",
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
      "Local usage reports for operation latency and payload size, with measurement boundaries kept separate",
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
    title: "One browser control layer",
    body: "More than clicks: tabs, groups, forms, files, console, network, responsive testing, downloads, artifacts and human hand-off — exposed as MCP and HTTP.",
    icon: Bot,
  },
  {
    label: "quickly",
    title: "Fewer calls, smaller payloads",
    body: "Find one control, read one section, or return only snapshot changes. Batch related actions and keep large captures in artifacts until you need them.",
    icon: Gauge,
  },
  {
    label: "recipes",
    title: "Teach it once. Run it exactly.",
    body: "Pass a reviewed recipe in one call, or search and run a pinned provider recipe. Both paths enforce exact origins, declared risk and postconditions.",
    icon: Sparkles,
  },
  {
    label: "your auth",
    title: "Your real browser logins",
    body: "Use an extension bridge for your existing signed-in Chromium profile, or a separate brw-owned browser for automation. Browser support and available features depend on the transport.",
    icon: KeyRound,
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
      "No publisher telemetry or brw account; bounded usage metadata stays on your machine",
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
    title: "Check each release’s signing report",
    body: "Current macOS binaries are ad-hoc signed, which identifies no developer. Installers are unsigned and not notarised.",
    icon: Signature,
    items: [
      "macOS .pkg installers are unsigned; Apple Silicon binaries carry an ad-hoc signature",
      "Linux .deb and .rpm are unsigned — there is no distribution GPG key to check them against",
      "The release notes report signing and notarisation status for the actual artifacts",
    ],
  },
  {
    label: "pipeline",
    title: "What a tag has to pass",
    body: "The repository’s pre-push hook runs task check. The release workflow builds, attests and publishes the tagged commit.",
    icon: FileCode,
    items: [
      "Unit tests plus a deterministic real-browser functional suite",
      "go vet, staticcheck and govulncheck for reachable vulnerabilities",
      "The local gate includes a gitleaks history scan and race checks",
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

const agentWebCards = [
  {
    value: "3 vs 11",
    title: "Tool calls",
    body: "Page tools return available slots; the DOM path reaches the details form for one selected slot. Neither path submits a booking.",
  },
  {
    value: "7k vs 55k",
    title: "Returned text characters",
    body: "6.7–7.7k result characters through page tools, about 55k through the form. Character counts are not billed tokens.",
  },
  {
    value: "1.2–1.3 s",
    title: "Tool time (WebMCP) vs 0.8–1.3 s (DOM)",
    body: "1.17–1.34 s through the page tools, 0.84–1.32 s through the form.",
  },
];

const facts = [
  ["starts with", "14 tools"],
  ["fast path", "inline recipes"],
  ["clients", "CLI + MCP + HTTP"],
  ["licence", "AGPL-3.0"],
];

const footerGroups = [
  {
    title: "brw",
    links: [
      ["brw on GitHub", brwUrl],
      ["Technical deep dive", deepDiveUrl],
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
      ["Max’s technical blog", "https://maxrevitt.com/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=footer"],
    ],
  },
  {
    title: "Family",
    links: [
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
          <a href="#browsers">Browsers</a>
          <a href="#recipes">Recipes</a>
          <a href="#features">Features</a>
          <a href="#compare">Compare</a>
          <a href="#install">Install</a>
          <a href="#models">Models</a>
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
              Your browser. Your agent. Less repeated work.
            </h1>
            <p className="hero-lede">
              Give your agent inspectable control of Chrome, Chromium and other
              Chromium browsers. Read only what matters, act on named controls,
              and turn proven workflows into repeatable recipes. Use your own
              model through MCP, HTTP or the CLI.
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
            <p className="hero-version"><a href={deepDiveUrl}>Read the technical deep dive by Max Revitt →</a></p>
            {version ? (
              <p className="hero-version">
                Latest release{" "}
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                  <code>{version}</code>
                </a>{" "}
                · macOS · Linux
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

        <section id="release" className="section section-alt">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">0.21.0 · 6 October 2026</p>
              <h2>Give your agent a reason to come back.</h2>
              <p>Persistent page watchers turn sampled activity into durable events. Your agent can follow up when an allowed page changes, including through an identity-bound watcher in Maix.</p>
            </div>
            <div className="support-grid">
              {releaseHighlights.map((item) => (
                <article key={item.title} className="info-panel">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <p className="benchmark-note">
              <a href="https://github.com/Don-Works/brw/releases/tag/v0.21.0">0.21.0 release notes →</a>{" · "}
              <a href={pageWatchersDocsUrl}>Page watcher contract →</a>
            </p>
          </div>
        </section>

        <section id="why" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">why brw</p>
              <h2>Read less. Act precisely. Repeat what works.</h2>
              <p>
                brw is the browser-control layer. Your agent chooses what to do;
                brw reads pages, acts on controls and checks outcomes. Connect
                your existing assistant or build your own workflow around it.
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

        <section id="browsers" className="section section-alt">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">browser support</p>
              <h2>Chromium browsers today. Firefox is a prototype.</h2>
              <p>Choose the browser you use and the connection that fits the job.</p>
            </div>
            <div className="support-grid">
              <article className="info-panel">
                <div className="panel-topline"><span>supported browser family</span><Check aria-hidden="true" /></div>
                <h3>Chrome, Chromium, Opera and more</h3>
                <p>Setup has named options for Chrome, Chromium, Edge, Brave, Vivaldi, Opera and Arc. brw uses the Chromium DevTools Protocol; installation details vary by browser and operating system.</p>
                <a className="text-link" href={brwInstallDocsUrl}>Browser setup guide →</a>
              </article>
              <article className="info-panel">
                <div className="panel-topline"><span>choose a connection</span><Layers aria-hidden="true" /></div>
                <h3>Your profile or a dedicated browser</h3>
                <p>The extension bridge uses an existing signed-in profile. Direct CDP runs a separate browser with headless mode and isolated contexts. The transport table below shows the differences.</p>
                <a className="text-link" href="#transports">Compare connections →</a>
              </article>
              <article className="info-panel">
                <div className="panel-topline"><span>research only</span><FileCode aria-hidden="true" /></div>
                <h3>Firefox is not supported yet</h3>
                <p>A WebDriver BiDi prototype has exercised Firefox primitives, but it is not wired into brwd or exposed through brw tools. Safari also has no supported backend.</p>
                <a className="text-link" href="https://github.com/Don-Works/brw/blob/main/docs/bidi-prototype.md">Firefox prototype findings →</a>
              </article>
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
                    returns URL, focus and changed elements. A successful click
                    confirms dispatch; pair it with a wait or assertion of the
                    application’s result before treating the task as complete.
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
                    semantic targets and save a reviewed recipe. Next time, pass
                    it directly or search, pin and run through a provider.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="agent-web" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">agent surfaces</p>
              <h2>Use the site&apos;s agent surface before its human UI.</h2>
              <p>
                When a page registers WebMCP tools, or a site publishes an MCP
                server, an API description, llms.txt or markdown, brw reports it
                and the agent uses it before driving the DOM. Native{" "}
                <code>document.modelContext</code> works on every transport,
                including your own signed-in Chrome.
              </p>
            </div>
            <div className="benchmark-grid" aria-label="Booking flow on revitt.co/book">
              {agentWebCards.map((card) => (
                <article key={card.title} className="benchmark-card">
                  <strong>{card.value}</strong>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
            <p className="benchmark-note">
              Reaching a bookable slot on revitt.co/book through its five WebMCP
              tools, against driving the form: three runs each, brw 0.15.2, 25
              September 2026. Tool time was similar; the measured saving is in calls and returned
              text characters. Billed tokens depend on the agent and model.{" "}
              <Link href="/agent-web">
                What brw does, and how to make a site work this way →
              </Link>
            </p>
          </div>
        </section>

        <section id="page-watchers" className="section section-alt">
          <div className="section-inner recipe-layout">
            <div className="section-header">
              <p className="section-kicker">page watchers</p>
              <h2>Notice activity. Then inspect what changed.</h2>
              <p>
                Watch a signed-in page such as Google Chat for a title change,
                or select a specific area to watch its text or element count.
                brw keeps a background tab and queues change metadata. The
                agent can then read the allowed page and decide whether to
                follow up. Availability transitions also signal when the page
                needs attention, such as a login redirect, or has recovered.
                Maix binds those signals to a granted identity.
              </p>
              <Link
                href={pageWatchersDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Register and manage a watcher →
              </Link>
            </div>
            <div>
              <pre tabIndex={0} className="codeblock">
                <code>{`brw_watch_page {
  "id": "inbox-activity",
  "url": "https://example.com/inbox",
  "selector": "#messages",
  "mode": "text",
  "interval_ms": 5000
}

brw_page_events {
  "watcher_id": "inbox-activity",
  "since_seq": 0,
  "limit": 20
}

brw_page_watchers { "action": "list" }`}</code>
              </pre>
              <p className="benchmark-note">
                Use the exact URL of your signed-in page, including its path,
                query and fragment. The first sample sets a baseline. Later changes produce events
                without page text; unchanged samples produce none. Save the
                returned cursor for the next read and check for a reported gap.
                Availability events are emitted when status changes, rather
                than on every failed sample.
              </p>
            </div>
            <p className="feature-footnote">
              Sampling runs every five seconds by default and can miss changes
              between samples. A title change does not identify every incoming
              message. Pages are not reloaded by default; an optional{" "}
              <code>refresh_interval_ms</code> reloads only the watcher&apos;s
              own tab. Keep the signed-in browser running and connected;
              registrations survive a daemon restart, but sampling waits for
              the browser to reconnect. Watchers refuse login redirects or
              other pages. Pause, resume or remove them with{" "}
              <code>brw_page_watchers</code>.
            </p>
          </div>
        </section>

        <section id="recipes" className="section recipe-section">
          <div className="section-inner recipe-layout">
            <div className="section-header">
              <p className="section-kicker">recipes</p>
              <h2>Stop paying the model to rediscover solved work.</h2>
              <p>
                A brw recipe is a deterministic browser workflow. Pass the recipe
                object directly, run a reviewed file from your project, or use
                a provider with immutable version and digest pins. Every path
                executes beside the browser with origin, risk and postcondition
                checks.
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
                <span>bring your recipe</span>
                <span>one call</span>
              </div>
              <div className="recipe-command">
                <span>inline / MCP</span>
                <code>
                  brw_recipe_run {"{"} recipe, inputs {"}"}
                </code>
                <p>No provider or installation required. The result identifies the executed recipe by digest.</p>
              </div>
              <div className="recipe-arrow" aria-hidden="true">
                or run a reviewed repository file
              </div>
              <div className="recipe-command recipe-command-hot">
                <span>file / CLI</span>
                <code>brw run --file .brw/recipes/catalog.1.0.0.json</code>
                <p>Provider recipes still use search, then run with id, version and digest. Inline recipes are not saved or indexed automatically.</p>
              </div>
            </div>

            <ul className="recipe-guarantees" aria-label="Recipe guarantees">
              <li>
                <Fingerprint aria-hidden="true" />
                <span>
                  <strong>Immutable identity</strong>
                  Provider pins must match; inline results record the executed content digest.
                </span>
              </li>
              <li>
                <ShieldCheck aria-hidden="true" />
                <span>
                  <strong>Checked writes</strong>
                  Exact origins, one allowed actuation and durable postconditions.
                </span>
              </li>
              <li>
                <FileText aria-hidden="true" />
                <span>
                  <strong>Share deliberately</strong>
                  Commit reviewed, sanitized mechanics. Keep credentials, account data and raw traces out of recipes.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="recipe-outputs" className="section section-alt">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">v0.18 capabilities</p>
              <h2>Recipes you own. Results you can check.</h2>
              <p>Named extraction, read settle control and bounded UCP summaries require v0.18.0 or newer. Check the latest release before using them.</p>
            </div>
            <div className="capability-grid">
              <article className="capability-panel">
                <h3>Say where to look and what to return.</h3>
                <p>Recipes can select an exact section, a uniquely identified table or allowlisted structured fields. Named outputs return bounded artifact handles with source provenance. Section and table selectors reject ambiguous or incomplete sources. Structured captures check the declared source and required normalized fields; they do not prove that conflicting embedded records agree. Every capture enforces its output budget.</p>
                <p>Extraction refuses recipes with runtime secrets. A provenance record identifies the source; it does not establish that the page is truthful.</p>
                <Link href={brwExtractionUrl} className="text-link">Extraction contract →</Link>
              </article>
              <article className="capability-panel">
                <h3>Keep reusable work with your code.</h3>
                <p>Use <code>.brw/recipes/</code> for reviewed, sanitized files. Validate with <code>brwctl recipe validate --file</code>, then run the chosen file explicitly. There is no automatic directory scan.</p>
                <p>Providers are optional. The HTTP provider contract can front Maix, Notion or Postgres through your adapter; those adapters are not bundled.</p>
                <Link href={brwRepoRecipesUrl} className="text-link">Repository and registry guidance →</Link>
              </article>
              <article className="capability-panel">
                <h3>Spend context and waiting time deliberately.</h3>
                <p>After an explicit readiness check, use <code>settle_ms: 0</code> to skip the default sparse-page wait. Retained snapshot baselines let intermediate observations coexist with delta reads.</p>
                <p>Keep model selection in your orchestrator: a smaller worker can execute bounded work while a larger planner reasons. Measure repair rates and total latency before choosing that split.</p>
                <Link href={brwResearchUrl} className="text-link">Measurements and limitations →</Link>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">the full surface</p>
              <h2>From reading a page to running a workflow.</h2>
              <p>
                The default MCP catalogue starts with 14 tools and discloses
                more when the agent asks. Bounded reads and artifact handles
                keep large results out of the conversation until needed.
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

        <section id="models" className="section section-alt">
          <div className="section-inner">
            <div className="section-header">
              <p className="section-kicker">bring your own model</p>
              <h2>Your main agent can use brw directly.</h2>
              <p>brw itself needs no model service. The agent you already use can call its tools. v0.19.0 also bundles an optional Python reader adapter and worker, registered separately with your MCP client.</p>
            </div>
            <div className="support-grid">
              <article className="info-panel">
                <div className="panel-topline"><span>available now</span><Bot aria-hidden="true" /></div>
                <h3>Use your existing agent</h3>
                <p>Your model reads bounded page content, chooses semantic controls and checks results. Proven work can run as a deterministic recipe without a model choosing each step.</p>
              </article>
              <article className="info-panel">
                <div className="panel-topline"><span>v0.19.0 · optional adapter</span><FileText aria-hidden="true" /></div>
                <h3>Delegate a reading task</h3>
                <p>Run the separately registered reader with a local or hosted model endpoint you configure. It returns a bounded answer with its source and trace. The worker still has processing and context costs; no hosted reader service is included.</p>
              </article>
              <article className="info-panel">
                <div className="panel-topline"><span>optional experiment</span><ScanSearch aria-hidden="true" /></div>
                <h3>Route a bounded decision</h3>
                <p>A classifier such as Jev can rank supplied candidates or select relevant passages. It does not write answers. Use a generative worker, a classifier, both, or neither.</p>
              </article>
            </div>
            <p className="benchmark-note">The adapter is packaged, but the model workflow remains exploratory. Passage selection introduced a factual regression in a small canary, so it is not enabled by default. The reader is separate from brw’s core MCP catalogue. <a href={brwResearchUrl}>Read the results and limitations →</a></p>
          </div>
        </section>

        <section id="compare" className="section section-alt comparison-section">
          <div className="section-inner">
            <div className="section-header comparison-header">
              <p className="section-kicker">proof + comparison</p>
              <h2>Built to do more work with less browser overhead.</h2>
              <p>
                Smaller observations and deterministic execution reduce avoidable
                work. These measurements isolate specific costs; they do not
                establish a whole-task speedup or a ranking against competitors.
              </p>
            </div>

            <div className="benchmark-grid" aria-label="Reproducible brw measurements">
              {measurements.map((benchmark) => (
                <article key={benchmark.title} className="benchmark-card">
                  <span className="evidence-status">{benchmark.status}</span>
                  <strong>{benchmark.value}</strong>
                  <h3>{benchmark.title}</h3>
                  <p>{benchmark.body}</p>
                </article>
              ))}
            </div>
            <p className="benchmark-note">
              Measured before release on 1 October 2026. The role-filter optimization
              ships in v0.19.0. The optional reader is bundled and separately
              registered; its model workflow remains exploratory. Payload characters are not
              billed tokens. Machine, fixture and method are in the linked reports.{" "}
              <Link href={brwBenchmarksUrl} target="_blank" rel="noopener noreferrer">
                Methods and caveats →
              </Link>{" · "}
              <Link href={brwResearchUrl} target="_blank" rel="noopener noreferrer">October measurements →</Link>{" · "}
              <Link href={brwLandscapeUrl} target="_blank" rel="noopener noreferrer">Wider competitor research →</Link>
            </p>

            <div className="comparison-intro">
              <div>
                <p className="section-kicker">choose the right layer</p>
                <h3>How brw fits alongside other tools.</h3>
              </div>
              <p>
                These tools overlap, but solve different problems. Start with the
                documented strengths below, then choose for your browser,
                workflow and hosting needs.
              </p>
            </div>

            <div className="comparison-wrap transport-wrap" tabIndex={0} aria-label="Browser automation tool comparison">
              <table className="comparison-table transport-table landscape-table">
                <thead>
                  <tr>
                    <th scope="col">Tool</th>
                    <th scope="col">Documented strengths</th>
                    <th scope="col" className="brw-column">How brw compares</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row"><a href={row.href} target="_blank" rel="noopener noreferrer">{row.label} ↗</a></th>
                      <td data-lane="Documented strengths">{row.strength}</td>
                      <td className="brw-column" data-lane="How brw compares">{row.brw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="comparison-note">
              Primary documentation checked 2 October 2026; each tool name links
              to its source. This is a feature comparison, not a matched benchmark.
              No overall speed or success-rate ranking has been established.
              Product names belong to their respective owners; brw is independent.
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
              <pre tabIndex={0} className="codeblock codeblock-lead">
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
                  <code>brw</code>, <code>brwd</code>, <code>brwctl</code>, <code>brwcheck</code>{" "}
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
                  packages paused
                </p>
                <p>
                  Current releases do not publish Windows installers. Historical
                  MSI files are not the current build; use macOS or Linux for
                  the latest packaged release.
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

              <pre tabIndex={0} className="codeblock">
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

              <pre tabIndex={0} className="codeblock">
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

              <pre tabIndex={0} className="codeblock">
                <code>
                  <span className="cmt"># build from source instead</span>
                  {"\n"}
                  <span className="prompt">$ </span>git clone https://github.com/Don-Works/brw.git
                  {"\n"}
                  <span className="prompt">$ </span>cd brw{"\n"}
                  <span className="prompt">$ </span>task build{"\n"}
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
              <h2>Choose the connection for your browser</h2>
              <p>
                The extension bridge drives the browser you already use. Direct
                CDP drives a browser brw launches and owns. They differ in what
                they can do. The table compares these two common setups. The
                one-line installer sets up the bridge; add the other lane with{" "}
                <code>brwctl setup --transport direct-cdp</code>, and run both
                side by side as separate namespaces.
              </p>
            </div>

            <p className="benchmark-note">
              Chrome’s manual remote-debugging opt-in, an existing local CDP
              endpoint, and off-host browser providers are also supported.
              Download, file and session capabilities differ from a browser brw
              starts itself. <a href={brwInstallDocsUrl + "#transports"}>See the full connection guide →</a>
            </p>
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

            <pre tabIndex={0} className="codeblock trust-commands">
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
