/**
 * The type and the tier formatter, kept apart from `./index.ts` on purpose.
 *
 * `index.ts` imports `recommended.json` at module scope, so anything that
 * imports from it drags all 372 problems along. BaekjoonList is a client
 * component that needs only `tierLabel`, and importing it from the barrel put
 * the whole 49 KB list into a browser chunk — on every week page, to render at
 * most 67 rows of it. Client code imports this file; server code may use either.
 */

export interface BaekjoonProblem {
  id: number;
  title: string;
  /** solved.ac tier, 1 (브론즈 V) ~ 30 (루비 I). 0 when unrated. */
  tier: number;
  category: string;
  week: number;
}

const TIERS = ["브론즈", "실버", "골드", "플래티넘", "다이아", "루비"] as const;
const NUMERALS = ["V", "IV", "III", "II", "I"] as const;

export interface TierLabel {
  /** "골드 III", or "언레이티드" for tier 0. */
  text: string;
  /** Index into TIERS — the colour band, not the level within it. */
  group: number;
}

/**
 * solved.ac numbers tiers 1~30 from 브론즈 V upward, five levels per colour,
 * counting *down* within a colour (V is the lowest, I the highest).
 */
export function tierLabel(tier: number): TierLabel {
  if (tier < 1 || tier > 30) return { text: "언레이티드", group: -1 };
  const group = Math.floor((tier - 1) / 5);
  return { text: `${TIERS[group]} ${NUMERALS[(tier - 1) % 5]}`, group };
}
