import type { Problem } from "@/lib/types";
import { anagramCheck } from "./anagram-check";
import { arraySumMax } from "./array-sum-max";
import { bellmanFord } from "./bellman-ford";
import { binarySearch } from "./binary-search";
import { bipartiteCheck } from "./bipartite-check";
import { budgetAllocation } from "./budget-allocation";
import { carpet } from "./carpet";
import { climbingStairs } from "./climbing-stairs";
import { coinChange } from "./coin-change";
import { combinationSum } from "./combination-sum";
import { compressString } from "./compress-string";
import { coordinateCompression } from "./coordinate-compression";
import { countComponents } from "./count-components";
import { courseOrder } from "./course-order";
import { dijkstra } from "./dijkstra";
import { divisors } from "./divisors";
import { duplicateCheck } from "./duplicate-check";
import { editDistance } from "./edit-distance";
import { evalPostfix } from "./eval-postfix";
import { fastPower } from "./fast-power";
import { fibonacciMemo } from "./fibonacci-memo";
import { fizzBuzz } from "./fizz-buzz";
import { floydWarshall } from "./floyd-warshall";
import { graphCycle } from "./graph-cycle";
import { groupAnagrams } from "./group-anagrams";
import { gymUniform } from "./gym-uniform";
import { hanoi } from "./hanoi";
import { houseRobber } from "./house-robber";
import { invertTree } from "./invert-tree";
import { kmpSearch } from "./kmp-search";
import { knapsack } from "./knapsack";
import { kruskalMst } from "./kruskal-mst";
import { kthLargest } from "./kth-largest";
import { lcsLength } from "./lcs-length";
import { longestConsecutive } from "./longest-consecutive";
import { longestIncreasingSubseq } from "./longest-increasing-subseq";
import { longestPalindrome } from "./longest-palindrome";
import { longestUniqueSubstring } from "./longest-unique-substring";
import { maxCableLength } from "./max-cable-length";
import { maxIsland } from "./max-island";
import { maxRowSum } from "./max-row-sum";
import { maxSubarray } from "./max-subarray";
import { mazeShortest } from "./maze-shortest";
import { medianStream } from "./median-stream";
import { meetingOverlap } from "./meeting-overlap";
import { meetingRooms } from "./meeting-rooms";
import { mergeKLists } from "./merge-k-lists";
import { mergeSort } from "./merge-sort";
import { minAndMax } from "./min-and-max";
import { minCoinsGreedy } from "./min-coins-greedy";
import { minHeap } from "./min-heap";
import { minJumps } from "./min-jumps";
import { mostFrequentChar } from "./most-frequent-char";
import { movingAverage } from "./moving-average";
import { multiKeySort } from "./multi-key-sort";
import { nQueens } from "./n-queens";
import { networkDelay } from "./network-delay";
import { nextGreaterElement } from "./next-greater-element";
import { numberOfIslands } from "./number-of-islands";
import { palindromeCheck } from "./palindrome-check";
import { parseAndRank } from "./parse-and-rank";
import { pathExists } from "./path-exists";
import { permutations } from "./permutations";
import { primMst } from "./prim-mst";
import { quotientRemainder } from "./quotient-remainder";
import { rangeAdd } from "./range-add";
import { rangeSum } from "./range-sum";
import { removeDuplicatesSorted } from "./remove-duplicates-sorted";
import { rescueBoats } from "./rescue-boats";
import { reverseString } from "./reverse-string";
import { robotSimulation } from "./robot-simulation";
import { rotateMatrix } from "./rotate-matrix";
import { searchInsert } from "./search-insert";
import { searchRotated } from "./search-rotated";
import { shortestSubarraySum } from "./shortest-subarray-sum";
import { spiralOrder } from "./spiral-order";
import { subsetSum } from "./subset-sum";
import { subsetsAll } from "./subsets-all";
import { subtreeSizes } from "./subtree-sizes";
import { threeSum } from "./three-sum";
import { tomatoRipening } from "./tomato-ripening";
import { topKFrequent } from "./top-k-frequent";
import { treeDiameter } from "./tree-diameter";
import { treeInorder } from "./tree-inorder";
import { treeMaxDepth } from "./tree-max-depth";
import { triangleMaxPath } from "./triangle-max-path";
import { twoSum } from "./two-sum";
import { twoSumSorted } from "./two-sum-sorted";
import { unfinishedPlayer } from "./unfinished-player";
import { unionFind } from "./union-find";
import { uniquePaths } from "./unique-paths";
import { validParentheses } from "./valid-parentheses";
import { validateBst } from "./validate-bst";
import { wallBreak } from "./wall-break";
import { wordLadder } from "./word-ladder";
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
  multiKeySort, // 7주차 · 정렬
  kthLargest, // 7주차
  coordinateCompression, // 7주차
  groupAnagrams, // 7주차
  twoSumSorted, // 8주차 · 투 포인터와 슬라이딩 윈도우
  removeDuplicatesSorted, // 8주차
  maxSubarray, // 8주차
  longestUniqueSubstring, // 8주차
  minCoinsGreedy, // 9주차 · 그리디
  meetingRooms, // 9주차
  rescueBoats, // 9주차
  coinChange, // 9주차
  validParentheses, // 10주차 · 스택 · 큐 · 덱
  movingAverage, // 10주차
  evalPostfix, // 10주차
  nextGreaterElement, // 10주차
  binarySearch, // 11주차 · 이분 탐색과 결정 알고리즘
  searchInsert, // 11주차
  searchRotated, // 11주차
  maxCableLength, // 11주차
  meetingOverlap, // 12주차 · 체크포인트 2
  shortestSubarraySum, // 12주차
  gymUniform, // 12주차
  budgetAllocation, // 12주차
  fibonacciMemo, // 13주차 · 재귀와 분할 정복
  fastPower, // 13주차
  mergeSort, // 13주차
  hanoi, // 13주차
  treeMaxDepth, // 14주차 · 트리와 이진 트리
  treeInorder, // 14주차
  invertTree, // 14주차
  validateBst, // 14주차
  pathExists, // 15주차 · 그래프와 DFS · BFS
  countComponents, // 15주차
  numberOfIslands, // 15주차
  bipartiteCheck, // 15주차
  mazeShortest, // 16주차 · BFS 최단 거리와 격자 탐색
  tomatoRipening, // 16주차
  wordLadder, // 16주차
  wallBreak, // 16주차
  subsetsAll, // 17주차 · 백트래킹
  permutations, // 17주차
  combinationSum, // 17주차
  nQueens, // 17주차
  minHeap, // 18주차 · 힙과 우선순위 큐
  topKFrequent, // 18주차
  mergeKLists, // 18주차
  medianStream, // 18주차
  climbingStairs, // 19주차 · DP 입문 (1차원)
  houseRobber, // 19주차
  triangleMaxPath, // 19주차
  longestIncreasingSubseq, // 19주차
  uniquePaths, // 20주차 · DP 심화 (2차원)
  knapsack, // 20주차
  lcsLength, // 20주차
  editDistance, // 20주차
  dijkstra, // 21주차 · 최단 경로와 위상 정렬
  bellmanFord, // 21주차
  courseOrder, // 21주차
  floydWarshall, // 21주차
  unionFind, // 22주차 · 유니온 파인드와 MST
  graphCycle, // 22주차
  kruskalMst, // 22주차
  primMst, // 22주차
  subtreeSizes, // 23주차 · 트리 DP와 문자열 매칭
  treeDiameter, // 23주차
  kmpSearch, // 23주차
  longestPalindrome, // 23주차
  parseAndRank, // 24주차 · 최종 모의고사와 실전 전략
  maxIsland, // 24주차
  minJumps, // 24주차
  networkDelay, // 24주차
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
