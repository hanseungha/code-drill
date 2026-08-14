import type { Problem } from "@/lib/types";
import { binarySearch } from "./binary-search";
import { climbingStairs } from "./climbing-stairs";
import { coinChange } from "./coin-change";
import { groupAnagrams } from "./group-anagrams";
import { longestUniqueSubstring } from "./longest-unique-substring";
import { maxSubarray } from "./max-subarray";
import { numberOfIslands } from "./number-of-islands";
import { topKFrequent } from "./top-k-frequent";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";

/** Ordered roughly easiest-first so the list doubles as a learning path. */
export const problems: Problem[] = [
  twoSum,
  validParentheses,
  binarySearch,
  climbingStairs,
  maxSubarray,
  longestUniqueSubstring,
  coinChange,
  topKFrequent,
  groupAnagrams,
  numberOfIslands,
];

export function getProblem(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = problems.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? problems[i - 1] : undefined,
    next: i >= 0 && i < problems.length - 1 ? problems[i + 1] : undefined,
  };
}

export const allTags = [...new Set(problems.flatMap((p) => p.tags))].sort();
