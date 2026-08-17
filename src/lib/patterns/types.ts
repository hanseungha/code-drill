import type { CodePattern, ConceptBlock } from "@/lib/curriculum";

/**
 * A recurring problem *type* (유형) — the thing you learn to recognise across
 * many problems, like "find every divisor" or "test for primality".
 *
 * The curriculum teaches techniques in the order of a 24-week plan; this is the
 * other axis. When a problem smells like number theory, you come here to see
 * the shape, its complexity, and the pitfalls on one page — a reference, not a
 * lesson to work through in sequence.
 *
 * The body deliberately reuses the curriculum's own block union
 * (`ConceptBlock`) and code-snippet type (`CodePattern`), so `ConceptNote` and
 * `PatternList` render a pattern with no new rendering code and the writing
 * stays in one voice.
 */
export interface PatternCategory {
  id: string;
  /** e.g. "수학·정수론". */
  title: string;
  /** One line on what ties the category together. */
  blurb: string;
}

export interface Pattern {
  slug: string;
  /** The `PatternCategory` this sits under. */
  category: string;
  /** e.g. "약수 구하기". */
  title: string;
  /** One line for the index list. */
  summary: string;
  /** Headline complexity, shown as a token — e.g. "O(√n)". */
  complexity: string;
  /** "이럴 때 써요" — the cues that tell you to reach for this shape. */
  cues: string[];
  concept: ConceptBlock[];
  /** Reference code, JS + Python. Rendered by `PatternList`. */
  codes: CodePattern[];
  /** Slugs of written problems that drill this type. May be empty. */
  relatedSlugs: string[];
}
