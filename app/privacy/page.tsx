import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for the brw Chrome extension and daemon. brw collects no personal data, runs no analytics, and talks only to a local daemon on your machine.",
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
          <p className="legal-updated">Last updated: 21 June 2026</p>

          <p>
            This policy covers the <strong>brw Chrome extension</strong> and the{" "}
            <strong>brw daemon</strong> (<code>brwd</code>). The short version:
            brw is a local tool. It collects no personal data, runs no analytics
            or telemetry, has no servers of its own, and nothing the extension
            sees leaves your machine.
          </p>

          <h2>What brw does not collect</h2>
          <ul>
            <li>
              No personal data, accounts, analytics, telemetry, advertising
              identifiers, or usage tracking.
            </li>
            <li>
              No cookies, passwords, passkeys, autofill, or Chrome profile files
              are read, exported, or transmitted.
            </li>
            <li>
              No data is sold or shared with third parties. There is no
              third party — brw has no backend.
            </li>
          </ul>

          <h2>How the extension works</h2>
          <p>
            The extension connects only to a brw daemon running locally on your
            own computer over <code>ws://127.0.0.1</code> /{" "}
            <code>ws://localhost</code>. It uses Chrome&apos;s debugger protocol
            to drive <em>visible</em> tabs on your instruction and report back
            what happened. All activity stays between Chrome and the local
            daemon on the same machine (or, for remote setups you configure
            yourself, over your own SSH connection). brw operates a normal,
            visible browser — it adds no stealth, CAPTCHA bypass, MFA bypass, or
            cookie extraction.
          </p>

          <h2>Permissions, and why</h2>
          <ul>
            <li>
              <code>debugger</code> — drive tabs via the Chrome DevTools Protocol
              (open, read, click, type), the core of browser control.
            </li>
            <li>
              <code>tabs</code> / <code>activeTab</code> / <code>tabGroups</code>{" "}
              — see and organise the tabs brw is acting on.
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
              Host access is restricted to <code>127.0.0.1</code> and{" "}
              <code>localhost</code> — the local daemon only.
            </li>
          </ul>

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
