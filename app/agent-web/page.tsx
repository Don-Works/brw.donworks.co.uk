import Link from "next/link";
import type { Metadata } from "next";
import {
  agentWebBrwVersion,
  agentWebUpdated,
  aiCatalogExample,
  bookingExampleUrl,
  bookingRows,
  brwAgentGuideUrl,
  brwBookingRunUrl,
  callTimings,
  declarativeFormExample,
  fallbackHints,
  headLinksExample,
  preferenceOrder,
  registerToolExample,
  revittExampleUrl,
  revittSurfaces,
} from "@/lib/agentWeb";

export const metadata: Metadata = {
  title: "Agent surfaces",
  description:
    "brw uses a site's WebMCP tools, MCP server, llms.txt and markdown before it drives the page. Measured on a booking site: 3 tool calls instead of 11, about 7 KB read instead of 55 KB.",
  alternates: {
    canonical: "https://brw.donworks.co.uk/agent-web",
    types: { "text/markdown": "https://brw.donworks.co.uk/agent-web.md" },
  },
};

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function AgentWebPage() {
  return (
    <main id="main" className="legal agent-web">
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
          <p className="section-kicker">agent surfaces</p>
          <h1>Sites built for agents take a few calls</h1>
          <p className="legal-updated">
            Measured {agentWebUpdated} with brw {agentWebBrwVersion} ·{" "}
            <a href="/agent-web.md">this page as markdown</a>
          </p>

          <p>
            When a site exposes tools, an API or markdown for agents, brw uses
            them before it drives the page. On a booking site that registers five
            WebMCP tools, an agent reached a bookable slot in 3 tool calls
            instead of 11, and read about 7 KB of results instead of about 55 KB.
          </p>

          <h2>The measured difference</h2>
          <p>
            Target: <a href={bookingExampleUrl} {...external}>revitt.co/book</a>,
            driven through the extension bridge in a real signed-in Chromium,
            three runs per path. The end state for both: a slot is chosen and the
            booking can be submitted.
          </p>
          <div
            className="comparison-wrap transport-wrap"
            tabIndex={0}
            role="region"
            aria-label="Booking flow: page tools against driving the page"
          >
            <table className="comparison-table transport-table agent-web-table">
              <caption className="sr-only">
                Tool calls, tool time and bytes returned for the WebMCP path and
                the DOM path on the same booking flow
              </caption>
              <thead>
                <tr>
                  <th scope="col">Path</th>
                  <th scope="col">Tool calls</th>
                  <th scope="col">Tool time</th>
                  <th scope="col">Returned</th>
                  <th scope="col">What it took</th>
                </tr>
              </thead>
              <tbody>
                {bookingRows.map((row) => (
                  <tr key={row.path}>
                    <th scope="row">{row.path}</th>
                    <td data-lane="Tool calls">{row.calls}</td>
                    <td data-lane="Tool time">{row.toolTime}</td>
                    <td data-lane="Returned">{row.returned}</td>
                    <td data-lane="What it took">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="agent-web-after-table">
            Tool time is similar on both paths. The saving is in agent round
            trips, each of which is a model turn, and in the bytes the agent
            reads, which are tokens.{" "}
            <a href={brwBookingRunUrl} {...external}>
              Method and raw ranges
            </a>
            .
          </p>

          <h3>Individual calls</h3>
          <ul>
            {callTimings.map(([call, time]) => (
              <li key={call}>
                <code>{call}</code>: {time}
              </li>
            ))}
          </ul>
          <p>
            <code>brw_read_url</code> on <code>github.com/settings/profile</code>{" "}
            returned <code>fallback_hint: &quot;login_wall&quot;</code>.
          </p>

          <h2>The order brw follows</h2>
          <ol className="agent-web-order">
            {preferenceOrder.map((surface) => (
              <li key={surface.order}>
                <strong>{surface.name}.</strong> {surface.body}
              </li>
            ))}
          </ol>

          <h2>What brw does with each surface</h2>
          <h3>WebMCP page tools</h3>
          <ul>
            <li>
              Listed and called on every transport, including the extension
              bridge in your own signed-in Chrome.
            </li>
            <li>
              Native first: when Chrome&apos;s own{" "}
              <code>document.modelContext</code> is present, brw lists and
              invokes through it and never shims over it.
            </li>
            <li>
              <code>brwd --enable-webmcp</code> installs a fallback runtime at
              document start for browsers without native support, with{" "}
              <code>navigator.modelContext</code> as a legacy alias. It is off by
              default because a page can observe it.
            </li>
            <li>
              Declarative <code>&lt;form toolname&gt;</code> tools are listed
              alongside registered ones.
            </li>
            <li>
              <code>readOnlyHint</code> and <code>consequentialHint</code> are
              surfaced. With confirm-actions on, a consequential tool goes through
              the same consent gate as a purchase click.
            </li>
            <li>
              A tool&apos;s result is marked <code>untrusted_output</code>: it is
              data the page wrote, not instructions.
            </li>
            <li>
              Tools a site registers after hydration are waited for:{" "}
              <code>brw_page_tools</code> waits up to 2 s and{" "}
              <code>brw_call_page_tool</code> up to 2.5 s on a young document.
            </li>
          </ul>

          <h3>On every navigation</h3>
          <p>
            <code>brw_open</code>, <code>brw_navigate_to</code> and{" "}
            <code>brw_navigate</code> report <code>page_tools</code> and{" "}
            <code>agent_surfaces</code> for the landed page. An ordinary page
            gets neither field.
          </p>

          <h3>brw_read_url, with no browser</h3>
          <p>
            No tab and no cookies. It asks for markdown first, then discovers the
            site&apos;s agent surfaces: <code>llms.txt</code>, <code>.md</code>{" "}
            twins, <code>&lt;link rel=&quot;alternate&quot;
            type=&quot;text/markdown&quot;&gt;</code>, the RFC 9727{" "}
            <code>/.well-known/api-catalog</code>, MCP server cards in{" "}
            <code>/.well-known/ai-catalog.json</code>,{" "}
            <code>/.well-known/ucp</code> and an A2A agent card. An{" "}
            <code>ai-plugin.json</code> manifest is reported as deprecated. It
            echoes <code>Content-Signal</code> and <code>x-markdown-tokens</code>,
            and sends an honest user agent:{" "}
            <code>brw/&lt;version&gt; (+https://brw.donworks.co.uk)</code>.
          </p>
          <p>
            When the read cannot see the page a person would, it says so in{" "}
            <code>fallback_hint</code>, and the agent steps up to a real tab:
          </p>
          <ul>
            {fallbackHints.map(([hint, meaning]) => (
              <li key={hint}>
                <code>{hint}</code>: {meaning}
              </li>
            ))}
          </ul>
          <p>
            <a href={brwAgentGuideUrl} {...external}>
              The agent guide
            </a>{" "}
            has the fields and the exact behaviour.
          </p>

          <h2>For site owners</h2>
          <p>
            A site brw can use without touching its DOM is one that publishes
            some of the following. <a href={revittExampleUrl} {...external}>revitt.co</a>{" "}
            publishes all of them and is the live example:
          </p>
          <ul>
            {revittSurfaces.map(([label, url]) => (
              <li key={url}>
                {label}:{" "}
                <a href={url} {...external}>
                  {url.replace("https://", "")}
                </a>
              </li>
            ))}
          </ul>

          <h3>Register WebMCP tools</h3>
          <p>
            Call <code>registerTool(tool, {"{ signal }"})</code> on{" "}
            <code>document.modelContext</code>. Aborting the signal unregisters
            the tool, so tie it to the view that owns it. Give each tool an input
            schema, and set <code>readOnlyHint</code> on reads and{" "}
            <code>consequentialHint</code> on anything that books, buys or sends.
          </p>
          <pre className="codeblock">
            <code>{registerToolExample}</code>
          </pre>

          <h3>Or declare a form</h3>
          <p>
            A form with a <code>toolname</code> is a tool with no script. Without{" "}
            <code>toolautosubmit</code>, brw fills it and leaves the submit to the
            agent once the user has agreed.
          </p>
          <pre className="codeblock">
            <code>{declarativeFormExample}</code>
          </pre>

          <h3>Publish llms.txt and markdown twins</h3>
          <p>
            Write <code>/llms.txt</code> to the format at{" "}
            <a href="https://llmstxt.org" {...external}>llmstxt.org</a>. Publish a
            markdown copy of each page at its own <code>.md</code> URL and link it
            from the page&apos;s head.
          </p>
          <pre className="codeblock">
            <code>{headLinksExample}</code>
          </pre>
          <p>
            If you also answer <code>Accept: text/markdown</code> on the page&apos;s
            own URL: on Vercel with Next.js, the <code>Vary: Accept</code> header
            set by the route did not reach the response, so a browser cache
            reused the markdown for the HTML URL. Serve Accept-negotiated
            markdown with <code>Cache-Control: private, no-store</code>, or use a
            separate <code>.md</code> URL.
          </p>

          <h3>Describe your API and MCP server</h3>
          <p>
            Serve an RFC 9727 linkset at <code>/.well-known/api-catalog</code>{" "}
            pointing at your OpenAPI description. Serve{" "}
            <code>/.well-known/ai-catalog.json</code> with an entry for your MCP
            server card, so an agent can call the server directly.
          </p>
          <pre className="codeblock">
            <code>{aiCatalogExample}</code>
          </pre>

          <h3>Check what brw sees</h3>
          <p>
            Ask an agent with brw to call{" "}
            <code>brw_read_url {"{ url }"}</code> on one of your pages, and{" "}
            <code>brw_open</code> on it. The first reports{" "}
            <code>agent_surfaces</code> and any <code>fallback_hint</code>; the
            second reports <code>page_tools</code>.
          </p>

          <p className="legal-foot">
            brw is open source under AGPL-3.0.{" "}
            <Link href="/#install">Install brw</Link> ·{" "}
            <a href="https://github.com/Don-Works/brw" {...external}>
              Source
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
