import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";

/**
 * code-drill brand theme.
 *
 * Extends Astryx's neutral theme, which is a deliberate grayscale spine — the
 * content (problem text and code) stays the focus. Two departures from the base:
 *
 * 1. Accent. Neutral's accent is monochrome (#262626 / #ebebeb). We keep the
 *    project's teal so submit buttons, links and progress read as branded.
 *    Both stops are checked against --color-on-accent: 5.5:1 light, 9.8:1 dark.
 * 2. Fonts. Neutral asks for Figtree but ships no @font-face, so it would fall
 *    back to system sans. We already load Geist via next/font, so the family
 *    tokens point at those CSS variables instead.
 *
 * Everything else — spacing, radius, motion, the categorical hue ramps and the
 * syntax palette that drives the editor — is inherited.
 *
 * After editing, run `npm run theme` to regenerate codeDrill.css / .js.
 * Never override --color-* in :root; change it here so both modes stay in sync.
 */
export const codeDrillTheme = defineTheme({
  name: "code-drill",
  extends: neutralTheme,

  tokens: {
    // [light, dark]. Dark mode carries the lighter teal because the accent
    // sits on dark surfaces there and pairs with dark on-accent text.
    "--color-accent": ["#0f766e", "#5eead4"],
    "--color-on-accent": ["#ffffff", "#0c2f2b"],
    "--color-text-accent": ["#0f766e", "#5eead4"],
    "--color-icon-accent": ["#0f766e", "#5eead4"],

    // next/font exposes these variables from the root layout.
    "--font-family-body":
      "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    "--font-family-heading":
      "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    "--font-family-code":
      'var(--font-geist-mono), ui-monospace, "SF Mono", Monaco, monospace',
  },
});

export default codeDrillTheme;
