// Shared by /agent-web and its markdown twin /agent-web.md, so the measured
// figures cannot drift between the two.

export const agentWebUpdated = "25 September 2026";
export const agentWebBrwVersion = "0.15.2";
export const bookingExampleUrl = "https://revitt.co/book";
export const revittExampleUrl = "https://revitt.co";
export const brwBookingRunUrl =
  "https://github.com/Don-Works/brw/blob/main/docs/benchmarks.md#a-booking-flow-page-tools-against-the-dom";
export const brwAgentGuideUrl =
  "https://github.com/Don-Works/brw/blob/main/docs/agent-guide.md#agent-surfaces-first-then-the-dom";

export type PathRow = {
  path: string;
  calls: string;
  toolTime: string;
  returned: string;
  result: string;
};

export const bookingRows: PathRow[] = [
  {
    path: "WebMCP page tools",
    calls: "3",
    toolTime: "1.17–1.34 s",
    returned: "6.7–7.7 KB",
    result:
      "brw_open, brw_page_tools, brw_call_page_tool find_available_slots. Slots across several days in one call. One more call, book_meeting, completes the booking.",
  },
  {
    path: "Driving the page",
    calls: "11",
    toolTime: "0.84–1.32 s",
    returned: "~55 KB",
    result:
      "Open, snapshot, click the meeting type, poll snapshots for dates, click a day, poll for times, click a time, poll for the details form. One day's slots at a time; name, email and submit still to do.",
  },
];

export const callTimings: [string, string][] = [
  ["brw_read_url of revitt.co/book (served markdown, with agent_surfaces)", "95–143 ms"],
  ["brw_open", "347–779 ms"],
  ["brw_page_tools", "3–18 ms"],
  ["list_meeting_types", "19–310 ms"],
  ["find_available_slots", "710–794 ms"],
  ["book_meeting refusing an off-grid time", "711–807 ms"],
];

export type Surface = { name: string; order: string; body: string };

export const preferenceOrder: Surface[] = [
  {
    order: "1",
    name: "A WebMCP tool on the page",
    body: "brw_open and navigations list the landed page's tools as page_tools. The agent calls one with brw_call_page_tool instead of clicking.",
  },
  {
    order: "2",
    name: "The site's own MCP server or API",
    body: "agent_surfaces lists the MCP endpoints, OpenAPI descriptions and api-catalog a site declares. The agent calls them directly; brw reports them and does not proxy them.",
  },
  {
    order: "3",
    name: "llms.txt or a markdown copy",
    body: "brw_read_url reads them with no tab and no cookies.",
  },
  {
    order: "4",
    name: "The DOM",
    body: "Snapshot, act by ref, read. What brw has always done.",
  },
];

export const fallbackHints: [string, string][] = [
  ["login_wall", "The server answered with a sign-in form. Open the page in a signed-in profile."],
  ["js_shell", "An empty app shell that renders in JavaScript. Open it in a tab."],
  ["challenge", "A bot check. Open it in a real profile."],
  ["auth_required", "A 401 or 403. Open it in a signed-in profile."],
];

export const revittSurfaces: [string, string][] = [
  ["WebMCP tools on /book", "https://revitt.co/book"],
  ["llms.txt", "https://revitt.co/llms.txt"],
  ["Markdown twin", "https://revitt.co/book.md"],
  ["RFC 9727 api-catalog", "https://revitt.co/.well-known/api-catalog"],
  ["ai-catalog.json with an MCP server card", "https://revitt.co/.well-known/ai-catalog.json"],
];

export const registerToolExample = `const tools = new AbortController();

document.modelContext?.registerTool(
  {
    name: "find_available_slots",
    description: "Free slots for a meeting type, across several days.",
    inputSchema: {
      type: "object",
      properties: { meetingType: { type: "string" } },
      required: ["meetingType"],
    },
    annotations: { readOnlyHint: true },
    async execute({ meetingType }) {
      return await listSlots(meetingType);
    },
  },
  { signal: tools.signal },
);

// book_meeting sends an invite: mark it consequential
// annotations: { consequentialHint: true }

// unregister every tool when the view goes away
// tools.abort();`;

export const declarativeFormExample = `<form toolname="send_brief"
      tooldescription="Send a project brief to the studio.">
  <input name="email" type="email"
         toolparamdescription="Where the reply goes">
  <textarea name="brief"
            toolparamdescription="What you need built"></textarea>
</form>`;

export const headLinksExample = `<link rel="alternate" type="text/markdown" href="/book.md">
<link rel="llms" type="text/plain" href="/llms.txt">
<link rel="api-catalog" href="/.well-known/api-catalog">`;

export const aiCatalogExample = `{
  "specVersion": "1.0",
  "entries": [
    {
      "type": "application/mcp-server-card+json",
      "url": "https://example.com/mcp/server-card",
      "description": "Booking MCP server. Streamable HTTP."
    }
  ]
}`;
