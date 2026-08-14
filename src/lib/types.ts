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

/**
 * A structure a solution wants as real objects, but that cannot be written
 * literally in a test case.
 *
 * Test cases are plain JSON because the same case has to drive both graders —
 * the Python side receives them through `json.loads`. A binary tree has no JSON
 * form, so it is written as a level-order array and the grader revives it into
 * linked nodes immediately before the call, then serializes any returned tree
 * back to the same array form. Both languages therefore agree on the wire while
 * the solution still works with `root.left` / `root.right`.
 */
export type Shape = "tree";

/**
 * The level-order encoding, `null` for a missing child and trailing nulls
 * dropped: `[3, 9, 20, null, null, 15, 7]` is
 *
 *        3
 *       / \
 *      9  20
 *         / \
 *        15  7
 */
export const TREE_ENCODING_NOTE =
  "트리는 레벨 순서 배열로 주어집니다. `null`은 자식이 없다는 뜻이고, 채점기가 이 배열을 노드로 바꿔서 `root`로 넘겨줍니다. 노드는 `val`, `left`, `right`를 가지며, 새 노드가 필요하면 `TreeNode`로 만들 수 있습니다.";

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
  /**
   * Shape of each argument, positionally matched to `TestCase.input`.
   * `null` (or a missing entry) leaves the value as plain JSON.
   */
  argShapes?: (Shape | null)[];
  /** Shape of the return value, when it isn't plain JSON. */
  returnShape?: Shape;
  compare?: CompareMode;
  hint?: string;
  solution: Record<Language, string>;
}
