import { Fragment } from "react";

/**
 * Problem prose is plain text with `backtick` spans for identifiers — just
 * enough formatting to avoid pulling in a markdown renderer.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-brand ring-1 ring-line"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
