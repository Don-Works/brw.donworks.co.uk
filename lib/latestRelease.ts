// Server-side helper to surface the newest brw GitHub release on the site
// without a rebuild. The fetch is cached via Next.js ISR (revalidate hourly), so
// a new release shows up within the window automatically, there is no per-visitor
// GitHub rate-limit (the cached response is shared), and it fails soft: on any
// error the version is empty and links fall back to the generic releases page, so
// the page never breaks.
//
// Reusable pattern for mcplexer.com — point REPO at the other repo.

const REPO = "Don-Works/brw";
export const RELEASES_URL = `https://github.com/${REPO}/releases`;

export type LatestRelease = {
  /** Release tag, e.g. "v0.5.2". Empty string when unavailable. */
  version: string;
  /** URL of the specific latest release (always has the current assets). */
  htmlUrl: string;
};

export async function getLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return { version: "", htmlUrl: RELEASES_URL };
    const data = (await res.json()) as { tag_name?: unknown; html_url?: unknown };
    return {
      version: typeof data.tag_name === "string" ? data.tag_name : "",
      htmlUrl: typeof data.html_url === "string" ? data.html_url : RELEASES_URL,
    };
  } catch {
    return { version: "", htmlUrl: RELEASES_URL };
  }
}
