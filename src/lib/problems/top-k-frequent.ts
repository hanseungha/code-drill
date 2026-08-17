import type { Problem } from "@/lib/types";
import { withMinHeap } from "./snippets";

export const topKFrequent: Problem = {
  slug: "top-k-frequent",
  title: "가장 많이 등장한 K개 원소",
  difficulty: "medium",
  tags: ["해시", "정렬", "힙"],
  summary: "배열에서 등장 횟수가 가장 많은 k개의 원소를 구해요.",
  description: [
    "정수 배열 `nums`와 정수 `k`가 주어져요. 등장 횟수가 많은 순서로 상위 `k`개의 원소를 반환해요.",
    "반환하는 순서는 채점에 영향을 주지 않아요. 정답이 되는 원소 집합은 항상 유일해요.",
  ],
  examples: [
    {
      input: "nums = [1, 1, 1, 2, 2, 3], k = 2",
      output: "[1, 2]",
      explain: "1이 3번, 2가 2번, 3이 1번 등장해서 상위 2개는 1과 2예요.",
    },
    { input: "nums = [1], k = 1", output: "[1]" },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "1 ≤ k ≤ 서로 다른 원소의 개수",
    "정답은 유일해요.",
  ],
  entry: { javascript: "topKFrequent", python: "top_k_frequent" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def top_k_frequent(nums, k):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  compare: "unordered",
  testCases: [
    { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
    { input: [[1], 1], expected: [1] },
    { input: [[4, 4, 4, 5, 5, 6], 2], expected: [4, 5] },
    { input: [[-1, -1, 3, 3, 3, 7], 1], expected: [3], hidden: true },
    {
      input: [[5, 5, 5, 5, 1, 1, 1, 2, 2, 9], 3],
      expected: [5, 1, 2],
      hidden: true,
    },
  ],
  hint: "먼저 해시맵으로 등장 횟수를 세어요. 그다음 횟수 기준 내림차순 정렬해 앞의 k개를 자르거나, 횟수를 인덱스로 쓰는 버킷 정렬로 O(n)에 뽑을 수 있어요.",
  solution: {
    javascript: `function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) {
    count.set(n, (count.get(n) ?? 0) + 1);
  }
  return [...count.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([value]) => value);
}
`,
    python: `def top_k_frequent(nums, k):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    ordered = sorted(count.items(), key=lambda kv: kv[1], reverse=True)
    return [value for value, _ in ordered[:k]]
`,
  },
};
