/**
 * The type and the level formatter, kept apart from `./index.ts` on purpose.
 *
 * `index.ts` imports `recommended.json` at module scope, so anything that
 * imports from it drags the whole list along. ProgrammersList is a client
 * component that needs only `levelLabel`, and importing it from the barrel
 * would put the entire list into a browser chunk — on every week page, to
 * render at most a handful of rows. Client code imports this file; server code
 * may use either.
 */

export interface ProgrammersProblem {
  id: number;
  title: string;
  /** 프로그래머스 난이도. Lv.1 (가장 쉬움) ~ Lv.5 (가장 어려움). */
  level: number;
  category: string;
  week: number;
}

export interface LevelLabel {
  /** "Lv. 3". */
  text: string;
  /** 0부터 세는 색 밴드(level - 1). 범위를 벗어나면 -1. */
  group: number;
}

/**
 * 프로그래머스는 난이도를 Lv.1~Lv.5로 매겨요. 숫자가 클수록 어려워요.
 */
export function levelLabel(level: number): LevelLabel {
  if (level < 1 || level > 5) return { text: "Lv. ?", group: -1 };
  return { text: `Lv. ${level}`, group: level - 1 };
}
