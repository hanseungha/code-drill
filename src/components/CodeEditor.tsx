"use client";

import { Text } from "@astryxdesign/core/Text";
import Editor, { type Monaco } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/types";

const MONACO_LANGUAGE: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
};

const TAB_SIZE: Record<Language, number> = {
  javascript: 2,
  python: 4,
};

const THEME_NAME = "code-drill";

/** Every token the Monaco theme is built from. */
const TOKENS = [
  "--color-background-card",
  "--color-background-muted",
  "--color-background-popover",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-text-disabled",
  "--color-border",
  "--color-border-emphasized",
  "--color-accent",
  "--color-accent-muted",
  "--color-syntax-comment",
  "--color-syntax-keyword",
  "--color-syntax-string",
  "--color-syntax-number",
  "--color-syntax-type",
  "--color-syntax-function",
  "--color-syntax-variable",
  "--color-syntax-operator",
  "--color-syntax-punctuation",
  "--color-syntax-constant",
  "--color-syntax-property",
  "--color-syntax-tag",
] as const;

type TokenName = (typeof TOKENS)[number];
type Palette = Record<TokenName, string>;

function channelToHex(value: number) {
  return Math.round(value).toString(16).padStart(2, "0");
}

/** `rgb(1 2 3 / 0.5)` and `rgba(1,2,3,0.5)` both land as `#010203` + alpha. */
function toHex(color: string): string {
  const parts = color.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return "#000000";
  const [r, g, b] = parts.map(Number);
  const hex = `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`;
  if (parts.length < 4) return hex;
  const alpha = Math.round(Number(parts[3]) * 255);
  return alpha >= 255 ? hex : `${hex}${channelToHex(alpha)}`;
}

/**
 * Custom properties compute to their raw token stream, so reading
 * `--color-accent` directly would hand back the literal `light-dark(a, b)`.
 * Assigning it to a real `color` property forces the browser to resolve the
 * active mode, and the computed value comes back as rgb().
 */
function readPalette(): Palette | null {
  if (typeof document === "undefined") return null;
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = "position:absolute;opacity:0;pointer-events:none";
  document.body.appendChild(probe);
  const palette = {} as Palette;
  try {
    for (const token of TOKENS) {
      probe.style.color = `var(${token})`;
      palette[token] = toHex(getComputedStyle(probe).color);
    }
  } finally {
    probe.remove();
  }
  return palette;
}

/** Relative luminance, to decide whether Monaco should inherit vs or vs-dark. */
function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) < 0.4;
}

/** Monaco wants hex without the leading '#' in rules, but with it in colors. */
const bare = (hex: string) => hex.replace("#", "");

function defineTheme(monaco: Monaco, palette: Palette) {
  monaco.editor.defineTheme(THEME_NAME, {
    base: isDark(palette["--color-background-card"]) ? "vs-dark" : "vs",
    inherit: true,
    rules: [
      { token: "", foreground: bare(palette["--color-syntax-variable"]) },
      {
        token: "comment",
        foreground: bare(palette["--color-syntax-comment"]),
        fontStyle: "italic",
      },
      { token: "keyword", foreground: bare(palette["--color-syntax-keyword"]) },
      { token: "string", foreground: bare(palette["--color-syntax-string"]) },
      { token: "number", foreground: bare(palette["--color-syntax-number"]) },
      { token: "regexp", foreground: bare(palette["--color-syntax-string"]) },
      { token: "type", foreground: bare(palette["--color-syntax-type"]) },
      {
        token: "identifier",
        foreground: bare(palette["--color-syntax-variable"]),
      },
      {
        token: "entity.name.function",
        foreground: bare(palette["--color-syntax-function"]),
      },
      {
        token: "constant",
        foreground: bare(palette["--color-syntax-constant"]),
      },
      {
        token: "attribute.name",
        foreground: bare(palette["--color-syntax-property"]),
      },
      { token: "tag", foreground: bare(palette["--color-syntax-tag"]) },
      {
        token: "operator",
        foreground: bare(palette["--color-syntax-operator"]),
      },
      {
        token: "delimiter",
        foreground: bare(palette["--color-syntax-punctuation"]),
      },
    ],
    colors: {
      "editor.background": palette["--color-background-card"],
      "editor.foreground": palette["--color-text-primary"],
      "editorLineNumber.foreground": palette["--color-text-disabled"],
      "editorLineNumber.activeForeground": palette["--color-text-secondary"],
      "editor.lineHighlightBackground": palette["--color-background-muted"],
      "editor.selectionBackground": palette["--color-accent-muted"],
      "editorCursor.foreground": palette["--color-accent"],
      "editorIndentGuide.background1": palette["--color-border"],
      "editorIndentGuide.activeBackground1":
        palette["--color-border-emphasized"],
      "editorWidget.background": palette["--color-background-popover"],
      "editorWidget.border": palette["--color-border"],
      "editorSuggestWidget.background": palette["--color-background-popover"],
      "editorSuggestWidget.border": palette["--color-border"],
      "scrollbarSlider.background": palette["--color-border"],
      "scrollbarSlider.hoverBackground": palette["--color-border-emphasized"],
      "scrollbarSlider.activeBackground": palette["--color-text-disabled"],
    },
  });
}

export function CodeEditor({
  language,
  value,
  onChange,
}: {
  language: Language;
  value: string;
  onChange: (value: string) => void;
}) {
  const monacoRef = useRef<Monaco | null>(null);
  const [, setRevision] = useState(0);

  const retheme = useCallback(() => {
    const monaco = monacoRef.current;
    const palette = readPalette();
    if (!monaco || !palette) return;
    defineTheme(monaco, palette);
    monaco.editor.setTheme(THEME_NAME);
  }, []);

  // The mode changes either because the OS preference flipped, or because the
  // toggle set `data-theme` on <html>.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", retheme);

    const observer = new MutationObserver(retheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      media.removeEventListener("change", retheme);
      observer.disconnect();
    };
  }, [retheme]);

  const beforeMount = useCallback((monaco: Monaco) => {
    monacoRef.current = monaco;
    const palette = readPalette();
    if (palette) defineTheme(monaco, palette);
    setRevision((n) => n + 1);
  }, []);

  return (
    <Editor
      language={MONACO_LANGUAGE[language]}
      value={value}
      onChange={(next) => onChange(next ?? "")}
      beforeMount={beforeMount}
      theme={THEME_NAME}
      loading={<Text color="disabled">에디터를 불러오고 있어요…</Text>}
      options={{
        fontSize: 13.5,
        fontFamily: "var(--font-family-code)",
        fontLigatures: true,
        lineHeight: 1.7,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: TAB_SIZE[language],
        insertSpaces: true,
        renderLineHighlight: "line",
        padding: { top: 16, bottom: 16 },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        bracketPairColorization: { enabled: true },
        scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
        overviewRulerLanes: 0,
        wordWrap: "on",
      }}
    />
  );
}
