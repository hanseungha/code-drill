export const LANGUAGES = ["javascript", "python"] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LABEL: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
};

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

/**
 * How a returned value is matched against `expected`.
 * - `exact`: deep equality, array order matters
 * - `unordered`: top-level array order is ignored
 * - `unordered-deep`: array order is ignored at every nesting level
 */
export type CompareMode = "exact" | "unordered" | "unordered-deep";

export interface TestCase {
  /** Arguments spread into the solution function, in order. */
  input: unknown[];
  expected: unknown;
  /** Hidden cases only run on 제출 and their input is never shown. */
  hidden?: boolean;
}

export interface Example {
  input: string;
  output: string;
  explain?: string;
}

export interface Problem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  /** One-liner shown in the problem list. */
  summary: string;
  /** Paragraphs of prose. `backticks` render as inline code. */
  description: string[];
  examples: Example[];
  constraints: string[];
  /** Function the runner calls, per language. */
  entry: Record<Language, string>;
  starter: Record<Language, string>;
  testCases: TestCase[];
  compare?: CompareMode;
  hint?: string;
  solution: Record<Language, string>;
}
