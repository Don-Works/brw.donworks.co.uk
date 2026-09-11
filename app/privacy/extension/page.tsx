import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extension privacy policy",
  description:
    "Privacy policy for the brw browser extension: it collects nothing, transmits nothing off your machine, stays disconnected until you enable it, and blocks cookie and bulk-storage access.",
  alternates: { canonical: "https://brw.donworks.co.uk/privacy/extension" },
};

const brwUrl = "https://github.com/Don-Works/brw";
const extensionSourceUrl = "https://github.com/Don-Works/brw/tree/main/extension";
const serviceWorkerUrl =
  "https://github.com/Don-Works/brw/blob/main/extension/service_worker.js";
const manifestUrl =
  "https://github.com/Don-Works/brw/blob/main/extension/manifest.json";
const extensionId = "amocjcgddnoakjijfggdpnefdnboilpe";
const revittUrl =
  "https://revitt.co/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source&utm_content=extension_privacy";

const permissions: [string, string][] = [
  [
    "debugger",
    "The transport for browser control. On a request from the local daemon the extension attaches to a visible tab and issues documented Chrome DevTools Protocol commands to inspect page structure and carry out the action you asked for. Attachments are released after inactivity and when you disable control. Cookie methods and bulk-storage domains are refused in extension code before they reach the browser.",
  ],
  [
    "tabs",
    "Lists, opens, focuses, updates and closes the visible tabs you ask brw to control, and reads their URL and title so a command targets the correct tab.",
  ],
  [
    "tabGroups",
    "Creates or reuses a named group for agent-owned tabs, so automated work stays visible and separate from your own tabs.",
  ],
  [
    "downloads",
    "Correlates a download with the tab that started it, so a requested file is not confused with one you started elsewhere. It reads a bounded in-memory session buffer, not your download history.",
  ],
  [
    "notifications",
    "Alerts you when a flow needs you — MFA, a CAPTCHA, a purchase confirmation — and on completion or a sustained bridge failure.",
  ],
  [
    "webNavigation",
    "Observes main-frame navigation so waits and post-action observations do not report stale page state.",
  ],
  [
    "alarms",
    "Schedules the local reconnect and health checks that a Manifest V3 service worker needs to stay alive.",
  ],
  [
    "storage",
    "Stores your enable/disable choice, the loopback endpoints, an optional profile label and connection status in chrome.storage.local.",
  ],
  [
    "offscreen",
    "Hosts the loopback WebSocket keepalive that survives service-worker suspension. It renders and inspects no websites.",
  ],
  [
    "host access to 127.0.0.1 and localhost",
    "The only hosts in the manifest. There is no remote hostname the extension is permitted to reach.",
  ],
];

export default function ExtensionPrivacyPage() {
  return (
    <main id="main" className="legal">
      <header className="legal-header">
        <Link href="/" className="brand-lockup" aria-label="brw home">
          <span className="brand-mark" aria-hidden="true">
            brw
          </span>
          <span className="brand-wordmark">brw</span>
        </Link>
        <Link href="/" className="legal-back">
          ← Back to brw
        </Link>
      </header>

      <section className="section">
        <div className="section-inner legal-inner">
          <p className="section-kicker">extension privacy</p>
          <h1>brw extension privacy policy</h1>
          <p className="legal-updated">Last updated: 11 September 2026</p>

          <p>
            This policy covers the <strong>brw browser extension</strong>,
            extension id <code>{extensionId}</code>, for Chrome and Chromium.
            The brw daemon and the wider product are covered by the{" "}
            <Link href="/privacy">brw privacy policy</Link>.
          </p>

          <h2>The short version</h2>
          <ul>
            <li>
              Nothing is collected. No data is transmitted to Don Works, to
              Revitt, or to any third party. There is no brw account, no
              telemetry, no analytics and no advertising code.
            </li>
            <li>
              The extension&apos;s only network destination is{" "}
              <code>ws://127.0.0.1</code> — a brw daemon running on your own
              machine. No remote host is permitted by its manifest.
            </li>
            <li>
              It stays disconnected until you open Options and click{" "}
              <strong>Enable local browser control</strong>. Before that it
              attempts no connection.
            </li>
            <li>
              It cannot read HttpOnly cookies or export bulk site storage. Those
              requests are refused in extension code.
            </li>
            <li>
              Page-visible values reach the agent you configured, when you ask
              that agent to do browser work. You choose that agent; brw adds no
              recipient of its own.
            </li>
          </ul>

          <h2>What the extension connects to</h2>
          <p>
            The extension holds a WebSocket to a brw daemon (<code>brwd</code>)
            on the same computer, over <code>ws://127.0.0.1</code> or{" "}
            <code>ws://localhost</code>. Its{" "}
            <Link href={manifestUrl} target="_blank" rel="noopener noreferrer">
              manifest
            </Link>{" "}
            grants host access to <code>127.0.0.1</code> and{" "}
            <code>localhost</code> only, and its content security policy allows
            connections to nowhere else. Browser data crossing that hop does not
            leave your computer.
          </p>
          <p>
            If you run the daemon on a different machine, you build that hop
            yourself — brw&apos;s documented remote shape is stdio MCP over your
            own SSH connection, which keeps the browser and its profile on the
            machine that owns them.
          </p>

          <h2>Consent before connection</h2>
          <p>
            On install the extension opens its Options page and remains
            disabled. The data handling described above is disclosed there, and
            the extension connects only after you click{" "}
            <strong>Enable local browser control</strong>. Choosing{" "}
            <strong>Disable browser control</strong> closes the daemon socket
            and releases every debugger attachment. The toolbar popup always
            reports the current state: disabled, idle, active, reconnecting or
            down.
          </p>

          <h2>Browser data the extension handles</h2>
          <p>
            When control is enabled and you ask an agent to do browser work, the
            extension handles what that work requires, and no more:
          </p>
          <ul>
            <li>
              the URL, title and navigation state of the tabs brw is driving,
              and the tab group it keeps them in;
            </li>
            <li>
              visible page content — headings, prose, links, tables, forms and
              the semantic controls an agent needs to find and act on;
            </li>
            <li>
              the actions you asked for and their results: clicks, typing,
              scrolling, and what changed on the page afterwards;
            </li>
            <li>
              console messages, network resource metadata, screenshots and
              download metadata, when a request asks for them.
            </li>
          </ul>
          <p>
            The extension relays these observations to the local daemon and
            retains none of them itself. Nothing is stored for later, sent
            anywhere else, or aggregated.
          </p>

          <h2>What the extension refuses</h2>
          <p>
            The extension is the transport into a browser profile you are
            already signed into, so it denies the CDP methods that would let
            that profile&apos;s credentials be read or copied out. Refusals
            happen in{" "}
            <Link
              href={serviceWorkerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>service_worker.js</code>
            </Link>{" "}
            before a command reaches the browser:
          </p>
          <ul>
            <li>
              <strong>Cookies.</strong> Every CDP method whose name contains
              &ldquo;cookie&rdquo; is blocked, which includes HttpOnly cookies.
              brw&apos;s cookie tool exists only on a separate browser instance
              that brw launches and owns, never on your signed-in profile
              through this extension.
            </li>
            <li>
              <strong>Bulk site storage.</strong> The{" "}
              <code>Storage</code>, <code>DOMStorage</code>,{" "}
              <code>IndexedDB</code>, <code>CacheStorage</code> and{" "}
              <code>Database</code> CDP domains are blocked, so site storage
              cannot be enumerated or exported.
            </li>
            <li>
              <strong>Sensitive form fields.</strong> Password, one-time-code
              and payment-card inputs are marked sensitive and their values are
              masked out of snapshots and reads rather than returned.
            </li>
            <li>
              <strong>Credential headers.</strong> Request headers that carry a
              bare credential are replaced with <code>[redacted]</code> in
              captured network data.
            </li>
            <li>
              <strong>Chrome&apos;s own stores.</strong> The extension does not
              read Chrome&apos;s password store, passkey store or profile files,
              and it is not permitted in incognito windows.
            </li>
          </ul>
          <p>
            brw drives a normal, visible browser. It adds no stealth code, no
            CAPTCHA bypass, no MFA bypass and no consent bypass.
          </p>

          <h2>Where page-visible values can go</h2>
          <p>
            The point of the extension is to let an agent you chose read and act
            on pages you are signed into. When you ask it to, values that are
            visible on the page — including personal, financial, health,
            location, communication or authentication details, if the page shows
            them — are sent to the local daemon and returned to whichever MCP or
            HTTP client you connected to it. That client is your choice and its
            own privacy terms apply. Don Works and Revitt are not in that path
            and receive nothing.
          </p>

          <h2>Permissions, and why each one is there</h2>
          <ul>
            {permissions.map(([name, why]) => (
              <li key={name}>
                <code>{name}</code> — {why}
              </li>
            ))}
          </ul>

          <h2>Storage and retention</h2>
          <ul>
            <li>
              The extension stores only your consent choice, loopback endpoints,
              an optional profile label and connection status, in Chrome local
              storage on your machine.
            </li>
            <li>
              Ordinary page observations pass to the local daemon and are not
              retained by the extension.
            </li>
            <li>
              Captures you explicitly request — text, semantic JSON,
              screenshots, PDFs, downloads, short video — are stored by the
              daemon in an owner-only local directory with size and retention
              limits, and can be listed and deleted with brw&apos;s artifact
              tools.
            </li>
          </ul>

          <h2>Your controls</h2>
          <p>
            Disable browser control in Options at any time; the socket closes
            and debugger attachments are released. Uninstalling the extension
            removes its Chrome-local settings. Anything the daemon stored stays
            in your local brw data directory until you delete it.
          </p>

          <h2>Chrome Web Store Limited Use</h2>
          <p>
            brw&apos;s use of information received from Google APIs adheres to
            the{" "}
            <Link
              href="https://developer.chrome.com/docs/webstore/program-policies/limited-use"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome Web Store User Data Policy
            </Link>
            , including the Limited Use requirements. Browser data is handled
            only for the disclosed user-facing purpose of carrying out browser
            actions you request. It is not sold or transferred, not used for
            advertising, not used for personalisation, not used to determine
            creditworthiness, and not available for any human at Don Works or
            Revitt to read.
          </p>

          <h2>Read the code</h2>
          <p>
            The extension is AGPL-3.0 and ships unminified: every file in the
            package is a file in the repository. The behaviour described above
            is in{" "}
            <Link
              href={extensionSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>extension/</code>
            </Link>{" "}
            — the consent gate, the CDP deny-list and the attachment lifecycle
            are all in <code>service_worker.js</code>.
          </p>

          <h2>Contact</h2>
          <p>
            Open an issue on{" "}
            <Link
              href={`${brwUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
            >
              the brw repository
            </Link>{" "}
            or reach{" "}
            <Link href={revittUrl} target="_blank" rel="noopener noreferrer">
              Revitt
            </Link>
            .
          </p>

          <p className="legal-foot">
            <Link href="/">brw</Link> · <Link href="/privacy">brw privacy policy</Link>{" "}
            · open source by Revitt · AGPL-3.0
          </p>
        </div>
      </section>
    </main>
  );
}
