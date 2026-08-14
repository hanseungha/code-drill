"use client";

import Editor, { type Monaco } from "@monaco-editor/react";
import type { Language } from "@/lib/types";

const MONACO_LANGUAGE: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
};

const TAB_SIZE: Record<Language, number> = {
  javascript: 2,
  python: 4,
};

/** Matches the app palette so the editor doesn't read as a pasted-in widget. */
function defineTheme(monaco: Monaco) {
  monaco.editor.defineTheme("code-drill", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "616b7d", fontStyle: "italic" },
      { token: "keyword", foreground: "c4b5fd" },
      { token: "string", foreground: "86efac" },
      { token: "number", foreground: "fbbf24" },
      { token: "type", foreground: "2dd4bf" },
      { token: "delimiter", foreground: "8f99a9" },
    ],
    colors: {
      "editor.background": "#11141a",
      "editor.foreground": "#e7eaf0",
      "editorLineNumber.foreground": "#3b4353",
      "editorLineNumber.activeForeground": "#8f99a9",
      "editor.lineHighlightBackground": "#171b22",
      "editor.selectionBackground": "#2dd4bf33",
      "editorCursor.foreground": "#2dd4bf",
      "editorIndentGuide.background1": "#212630",
      "editorIndentGuide.activeBackground1": "#313949",
      "editorWidget.background": "#171b22",
      "editorWidget.border": "#232935",
      "editorSuggestWidget.background": "#171b22",
      "editorSuggestWidget.border": "#232935",
      "scrollbarSlider.background": "#31394980",
      "scrollbarSlider.hoverBackground": "#313949cc",
      "scrollbarSlider.activeBackground": "#616b7d",
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
  return (
    <Editor
      language={MONACO_LANGUAGE[language]}
      value={value}
      onChange={(next) => onChange(next ?? "")}
      beforeMount={defineTheme}
      theme="code-drill"
      loading={
        <span className="text-sm text-faint">에디터를 불러오는 중…</span>
      }
      options={{
        fontSize: 13.5,
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
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
