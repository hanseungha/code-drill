import { Code } from "@astryxdesign/core/Code";
import { Text } from "@astryxdesign/core/Text";
import { Fragment } from "react";

/**
 * Prose with just two inline marks: `backticks` for identifiers and **bold**
 * for the phrase a paragraph turns on.
 *
 * Deliberately not a markdown renderer. Problem descriptions and lesson notes
 * are the only consumers, both are authored in this repo, and a parser would
 * add a dependency plus a second styling path for something two regexes cover.
 */
const PATTERN = /(`[^`]+`|\*\*[^*]+\*\*)/g;

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(PATTERN).map((part, i) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return <Code key={i}>{part.slice(1, -1)}</Code>;
        }
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          // Text renders a span; Astryx has no strong variant, and weight
          // carries the emphasis visually.
          return (
            <Text key={i} type="inherit" weight="semibold">
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
