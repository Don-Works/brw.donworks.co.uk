import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for the brw Chrome extension and daemon: what browser data brw handles locally, why it is needed, and where it can go.",
  alternates: { canonical: "https://brw.donworks.co.uk/privacy" },
};

const brwUrl = "https://github.com/Don-Works/brw";

export default function PrivacyPage() {
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
          <p className="section-kicker">privacy</p>
          <h1>Privacy policy</h1>
          <p className="legal-updated">Last updated: 10 September 2026</p>

          <p>
            This policy covers the <strong>brw Chrome extension</strong> and the{" "}
            <strong>brw daemon</strong> (<code>brwd</code>). The short version: brw
            handles browser data only to perform browser control you request. The
            extension sends it to a brw daemon on <code>localhost</code>. Don
            Works and Revitt do not receive, collect, sell or use that data, and
            brw contains no advertising or publisher analytics.
          </p>

          <h2>Browser data brw handles</h2>
          <p>
            When you enable the bridge and ask an agent to use the browser, brw
            may handle the minimum information needed for that task, including:
          </p>
          <ul>
            <li>
              open-tab URLs and titles, navigation state and the tab or tab group
              being controlled;
            </li>
            <li>
              visible website content, headings, links, forms, tables, semantic
              controls and values an agent needs to read or change;
            </li>
            <li>
              console and network diagnostics, screenshots and download metadata
              when those features are requested; and
            </li>
            <li>
              page text, semantic JSON, screenshots, PDFs, downloads or short
              video only when an artifact capture is explicitly requested.
            </li>
          </ul>

          <p>
            brw does not access Chrome&apos;s password store, passkey store or
            profile files. The installed-profile extension refuses every cookie
            CDP method and the bulk-storage CDP domains, including access to
            HttpOnly cookies. Sensitive form fields and sensitive request headers
            are redacted from normal semantic observations. If you explicitly ask
            an agent to work with sensitive page or form content, brw may still
            handle personal, communication, financial, health, location or
            authentication information needed for that task.
          </p>

          <h2>How the data is used and shared</h2>
          <p>
            Browser data is used solely to provide the user-facing purpose of
            letting the agent you selected read and control visible browser tabs.
            The extension connects only to the loopback daemon configured in its
            options. It does not connect to a Don Works, Revitt, advertising or
            analytics server.
          </p>
          <p>
            If you connect <code>brwd</code> to a third-party agent or model
            service, browser observations requested by that agent may be returned
            to that service through your chosen MCP or HTTP setup. You choose and
            configure that recipient; its privacy terms apply. brw does not add
            another publisher-operated recipient.
          </p>

          <h2>Storage and retention</h2>
          <ul>
            <li>
              The extension stores only local bridge endpoints, optional profile
              labels, your enable/disable choice and connection status in Chrome
              local storage.
            </li>
            <li>
              Ordinary page observations are relayed to the local daemon and are
              not retained by the extension.
            </li>
            <li>
              Explicit browser-host artifacts are stored in an owner-only local
              directory managed by <code>brwd</code>. They have configurable
              size and retention limits and can be inspected or deleted through
              brw&apos;s artifact tools.
            </li>
          </ul>

          <h2>How the extension works</h2>
          <p>
            The extension connects only to a brw daemon running locally on your
            own computer over <code>ws://127.0.0.1</code> /{" "}
            <code>ws://localhost</code>. It uses Chrome&apos;s debugger protocol
            to drive <em>visible</em> tabs on your instruction and report back
            what happened. The Chrome-to-daemon hop stays on the same computer.
            For a remote setup, you configure your own SSH connection and the
            browser profile remains on the browser host. brw operates a normal,
            visible browser — it adds no stealth, CAPTCHA bypass, MFA bypass or
            consent bypass.
          </p>

          <h2>Your controls</h2>
          <p>
            You can disable browser control at any time in the extension&apos;s
            Options page; this closes the daemon connection and releases tabs
            attached through the debugger. Uninstalling the extension removes
            its Chrome-local settings. Explicit artifacts and daemon
            configuration stay in your local brw data directory until you
            delete them with brw&apos;s artifact tools or from that directory.
          </p>

          <h2>Permissions, and why</h2>
          <ul>
            <li>
              <code>debugger</code> — drive tabs via the Chrome DevTools Protocol
              (open, read, click, type), the core of browser control.
            </li>
            <li>
              <code>tabs</code> / <code>tabGroups</code> — see and organise the
              tabs brw is acting on.
            </li>
            <li>
              <code>notifications</code> — alert you at human-handoff points
              (MFA, CAPTCHA, purchase confirmation) and on completion or error.
            </li>
            <li>
              <code>webNavigation</code>, <code>alarms</code>,{" "}
              <code>storage</code>, <code>offscreen</code> — track navigation,
              keep the local connection alive, and store local connection
              settings. None of this leaves your device.
            </li>
            <li>
              <code>downloads</code> — identify downloads started by the tab brw
              is controlling, so the requested file can be reported or captured
              without confusing it with a human download from another tab.
            </li>
            <li>
              Host access is restricted to <code>127.0.0.1</code> and{" "}
              <code>localhost</code> — the local daemon only.
            </li>
          </ul>

          <h2>Chrome Web Store Limited Use</h2>
          <p>
            The use of information received from Google APIs will adhere to the
            Chrome Web Store User Data Policy, including the Limited Use
            requirements. brw uses browser data only for its disclosed
            user-facing browser-control purpose. It is not sold, used for
            advertising, used to determine creditworthiness, or made available
            for humans at Don Works or Revitt to read.
          </p>

          <h2>Open source</h2>
          <p>
            brw is open source under AGPL-3.0. You can read exactly what the
            extension and daemon do, including this behaviour, on{" "}
            <Link href={brwUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            .
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Open an issue on{" "}
            <Link
              href={`${brwUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
            >
              the brw repository
            </Link>{" "}
            or reach{" "}
            <Link
              href="https://revitt.co/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source&utm_content=privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Revitt
            </Link>
            .
          </p>

          <p className="legal-foot">
            <Link href="/">brw</Link> · part of{" "}
            <Link
              href="https://donworks.co.uk/?utm_source=brw.donworks.co.uk&utm_medium=referral&utm_campaign=brw_open_source&utm_content=privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Don Works
            </Link>{" "}
            · open source by Revitt · AGPL-3.0
          </p>
        </div>
      </section>
    </main>
  );
}
