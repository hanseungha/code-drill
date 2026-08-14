import type { Problem } from "@/lib/types";
import { binarySearch } from "./binary-search";
import { climbingStairs } from "./climbing-stairs";
import { coinChange } from "./coin-change";
import { groupAnagrams } from "./group-anagrams";
import { invertTree } from "./invert-tree";
import { longestUniqueSubstring } from "./longest-unique-substring";
import { maxSubarray } from "./max-subarray";
import { minHeap } from "./min-heap";
import { numberOfIslands } from "./number-of-islands";
import { topKFrequent } from "./top-k-frequent";
import { treeInorder } from "./tree-inorder";
import { treeMaxDepth } from "./tree-max-depth";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";
import { validateBst } from "./validate-bst";

/**
 * Curriculum order — see docs/curriculum.md. Each entry is tagged with the week
 * it belongs to, which is why difficulty does not increase strictly here: a
 * week's warm-up is often easier than the previous week's challenge.
 */
export const problems: Problem[] = [
  twoSum, // 5주차 · 해시: 맵과 셋
  groupAnagrams, // 7주차 · 정렬
  maxSubarray, // 8주차 · 투 포인터와 슬라이딩 윈도우
  longestUniqueSubstring, // 8주차
  coinChange, // 9주차 · 그리디
  validParentheses, // 10주차 · 스택 · 큐 · 덱
  binarySearch, // 11주차 · 이분 탐색과 결정 알고리즘
  treeMaxDepth, // 14주차 · 트리와 이진 트리
  treeInorder, // 14주차
  invertTree, // 14주차
  validateBst, // 14주차
  numberOfIslands, // 15주차 · 그래프와 DFS · BFS
  minHeap, // 18주차 · 힙과 우선순위 큐
  topKFrequent, // 18주차
  climbingStairs, // 19주차 · DP 입문
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
