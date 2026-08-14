"use client";

import { AppShell } from "@astryxdesign/core/AppShell";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * Responsive contract:
 *   > 1024px  problem panel | editor · results   (workspace only)
 *   <= 1024px workspace collapses to문제/코드 tabs; the list page is one column
 *
 * `height="fill"` gives the shell its own scroll container, which the
 * workspace needs so the editor pane can size to the viewport instead of
 * growing the page. `contentPadding={0}` lets each screen own its padding —
 * the list page is a padded column, the workspace is edge-to-edge.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      topNav={<SiteHeader />}
      contentPadding={0}
      height="fill"
      variant="section"
    >
      {children}
    </AppShell>
  );
}
