export const comparisonRows = [
  {
    label: "Playwright MCP",
    href: "https://github.com/microsoft/playwright-mcp",
    strength: "Accessibility snapshots, persistent or isolated sessions, and Chrome, Firefox, WebKit and Edge options. Also documents a CLI + skills path for coding agents.",
    brw: "Chromium-focused control with a CLI, MCP and HTTP API, compact observations and reviewed recipes. Use Playwright when Firefox or WebKit coverage is a requirement.",
  },
  {
    label: "agent-browser",
    href: "https://agent-browser.dev/commands",
    strength: "An agent-oriented browser CLI with semantic targeting, compact snapshots and snapshot deltas.",
    brw: "Overlapping tools for smaller observations, plus installed-profile bridges, tab leases and recipe execution. Compact refs and deltas are shared ideas, not exclusive features.",
  },
  {
    label: "Stagehand",
    href: "https://docs.stagehand.dev/v4/first-steps/introduction",
    strength: "Model-assisted browser actions, action discovery and natural-language extraction into a supplied schema.",
    brw: "Deterministic reads for sections, tables, forms and embedded data. The optional reading-worker experiment is not equivalent to arbitrary typed semantic extraction.",
  },
  {
    label: "Browser Use Cloud",
    href: "https://docs.browser-use.com/cloud/quickstart",
    strength: "Hosted browser agents and managed browser infrastructure, with a CDP connection for your own code. Browser Use also offers an open-source local agent library.",
    brw: "A browser-control layer you run and connect to your own agent. A provider interface can attach browser infrastructure; brw does not provide a hosted agent service.",
  },
  {
    label: "Chrome DevTools MCP",
    href: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
    strength: "Chrome performance traces and insights, network inspection, screenshots and console debugging with source-mapped stack traces.",
    brw: "Browser actions, console and network inspection, screenshots and artifacts. We have not established parity with DevTools performance analysis.",
  },
  {
    label: "Claude in Chrome",
    href: "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome",
    strength: "An end-user assistant in Google Chrome, connected to Claude Code, Cowork and the browser side panel. Anthropic documents Chrome-only support.",
    brw: "An open control API for your choice of agent and Chromium browser. You supply the assistant; brw supplies the browser operations and repeatable workflows.",
  },
];

export const measurements = [
  {
    value: "14 tools",
    title: "in the initial MCP catalogue",
    status: "released capability",
    body: "Auto mode reveals more tools on demand. Your agent can also use the CLI or HTTP API; schema size is one part of its context budget.",
  },
  {
    value: "86.4%",
    title: "fewer observation characters",
    status: "existing compact + delta surfaces",
    body: "One fixture: an initial compact snapshot plus four compact deltas returned 1,884 characters, versus five full JSON snapshots. This is not a token or task-speed measurement.",
  },
  {
    value: "9.46×",
    title: "faster role-filtered extraction",
    status: "released in v0.19.0",
    body: "Wikipedia searchbox extraction fell from 22.7 to 2.4 ms median. MDN and Hacker News measured 3.25× and 6.2×. These time the in-page extraction only, not a browser job.",
  },
  {
    value: "99.21%",
    title: "smaller returned answer payload",
    status: "optional worker · experimental",
    body: "One public-page canary: 30,035 source characters became a 236-character answer-and-source packet. The worker still reads evidence; this is not a total billed-token saving.",
  },
];
