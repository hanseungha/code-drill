import type { Language } from "@/lib/types";

/**
 * A piece of lesson content.
 *
 * Deliberately a small block union rather than markdown: the lesson needs
 * tables (the complexity budget in week 1 is the whole point of that week) and
 * a distinct "trap" treatment, both of which map onto Astryx components
 * directly. Parsing markdown would mean a dependency and a second styling path.
 *
 * `body` and list items render `backticks` as inline code, matching how problem
 * descriptions already work.
 */
export type ConceptBlock =
  | { kind: "text"; body: string }
  | { kind: "heading"; body: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; headers: string[]; rows: string[][] }
  /** Something that silently produces a wrong answer, called out on its own. */
  | { kind: "trap"; title: string; body: string };

export interface CodePattern {
  title: string;
  /** Why the shape looks like this, or when it stops working. */
  note?: string;
  code: Record<Language, string>;
}

export type ProblemRole = "워밍업" | "핵심" | "도전" | "모의고사";

export interface WeekProblem {
  /** Slug of a written problem. Absent while the problem is still planned. */
  slug?: string;
  /** Shown while planned; a written problem uses its own title instead. */
  title: string;
  role: ProblemRole;
  /** One line on what this problem is here to teach. */
  teaches: string;
}

export interface Week {
  week: number;
  phase: number;
  title: string;
  /** One line for the curriculum map. */
  summary: string;
  /** Checkpoint weeks review instead of introducing, and hide problem types. */
  isCheckpoint?: boolean;
  concept: ConceptBlock[];
  patterns: CodePattern[];
  problems: WeekProblem[];
  /** Answer these out loud before moving on. */
  selfCheck: string[];
}

export interface Phase {
  id: number;
  title: string;
  /** Inclusive week range. */
  range: [number, number];
  goal: string;
}
