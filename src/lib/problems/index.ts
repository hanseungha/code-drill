import type { Problem } from "@/lib/types";
import { anagramCheck } from "./anagram-check";
import { arraySumMax } from "./array-sum-max";
import { binarySearch } from "./binary-search";
import { carpet } from "./carpet";
import { climbingStairs } from "./climbing-stairs";
import { coinChange } from "./coin-change";
import { compressString } from "./compress-string";
import { divisors } from "./divisors";
import { duplicateCheck } from "./duplicate-check";
import { fizzBuzz } from "./fizz-buzz";
import { groupAnagrams } from "./group-anagrams";
import { invertTree } from "./invert-tree";
import { longestConsecutive } from "./longest-consecutive";
import { longestUniqueSubstring } from "./longest-unique-substring";
import { maxRowSum } from "./max-row-sum";
import { maxSubarray } from "./max-subarray";
import { minAndMax } from "./min-and-max";
import { minHeap } from "./min-heap";
import { mostFrequentChar } from "./most-frequent-char";
import { numberOfIslands } from "./number-of-islands";
import { palindromeCheck } from "./palindrome-check";
import { quotientRemainder } from "./quotient-remainder";
import { rangeAdd } from "./range-add";
import { rangeSum } from "./range-sum";
import { reverseString } from "./reverse-string";
import { robotSimulation } from "./robot-simulation";
import { rotateMatrix } from "./rotate-matrix";
import { spiralOrder } from "./spiral-order";
import { subsetSum } from "./subset-sum";
import { threeSum } from "./three-sum";
import { topKFrequent } from "./top-k-frequent";
import { treeInorder } from "./tree-inorder";
import { treeMaxDepth } from "./tree-max-depth";
import { twoSum } from "./two-sum";
import { unfinishedPlayer } from "./unfinished-player";
import { validParentheses } from "./valid-parentheses";
import { validateBst } from "./validate-bst";
import { wordToNumber } from "./word-to-number";

/**
 * Curriculum order — see docs/curriculum.md. Each entry is tagged with the week
 * it belongs to, which is why difficulty does not increase strictly here: a
 * week's warm-up is often easier than the previous week's challenge.
 */
export const problems: Problem[] = [
  quotientRemainder, // 1주차 · 시작하기: 문법과 복잡도
  fizzBuzz, // 1주차
  minAndMax, // 1주차
  divisors, // 1주차
  arraySumMax, // 2주차 · 배열: 1차원과 2차원
  maxRowSum, // 2주차
  rangeSum, // 2주차
  rangeAdd, // 2주차
  reverseString, // 3주차 · 문자열
  palindromeCheck, // 3주차
  anagramCheck, // 3주차
  compressString, // 3주차
  threeSum, // 4주차 · 완전탐색과 시뮬레이션
  subsetSum, // 4주차
  rotateMatrix, // 4주차
  robotSimulation, // 4주차
  duplicateCheck, // 5주차 · 해시: 맵과 셋
  mostFrequentChar, // 5주차
  twoSum, // 5주차
  longestConsecutive, // 5주차
  unfinishedPlayer, // 6주차 · 체크포인트 1
  carpet, // 6주차
  spiralOrder, // 6주차
  wordToNumber, // 6주차
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
  climbingStairs, // 19주차 · DP 입문 (1차원)
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
