import type { Problem } from "@/lib/types";

export const rangeSum: Problem = {
  slug: "range-sum",
  title: "구간 합 구하기",
  difficulty: "medium",
  tags: ["누적합", "배열"],
  summary: "질문이 많을 때, 미리 한 번 계산해두고 각 질문에 O(1)로 답해요.",
  description: [
    "정수 배열 `nums`와 질문 목록 `queries`가 주어져요. 각 질문은 `[l, r]` 형태이고, `nums[l]` 부터 `nums[r]` 까지(양끝 포함)의 합을 뜻해요. 질문마다의 답을 순서대로 배열에 담아 반환해요.",
    "질문이 들어올 때마다 `l`부터 `r`까지 더하면 질문 하나가 `O(n)`이고, 질문이 10만 개면 `O(nq)`가 되어 늦어요.",
    "**누적합**을 미리 만들어 두면 각 질문은 뺄셈 한 번이에요. `pre[i]` 를 앞에서부터 `i`개의 합이라고 두면, `l..r` 의 합은 `pre[r + 1] - pre[l]` 이에요. 길이를 `n + 1`로 잡는 이유는 `l = 0` 일 때 따로 처리하지 않으려는 거예요.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3, 4, 5], queries = [[0, 2], [1, 3], [4, 4]]",
      output: "[6, 9, 5]",
      explain: "1+2+3 = 6, 2+3+4 = 9, 5 = 5 예요.",
    },
    { input: "nums = [10], queries = [[0, 0]]", output: "[10]" },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "1 ≤ queries.length ≤ 100,000",
    "0 ≤ l ≤ r < nums.length",
    "-10^6 ≤ nums[i] ≤ 10^6",
  ],
  entry: { javascript: "rangeSum", python: "range_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number[][]} queries 각 원소는 [l, r] (양끝 포함)
 * @return {number[]} 질문마다의 구간 합
 */
function rangeSum(nums, queries) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def range_sum(nums, queries):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3, 4, 5], [[0, 2], [1, 3], [4, 4]]], expected: [6, 9, 5] },
    { input: [[10], [[0, 0]]], expected: [10] },
    { input: [[1, 2, 3, 4, 5], [[0, 4]]], expected: [15] },
    { input: [[-1, -2, -3], [[0, 1], [1, 2], [0, 2]]], expected: [-3, -5, -6] },
    { input: [[5, 0, 5, 0, 5], [[1, 1], [3, 3], [0, 4]]], expected: [0, 0, 15] },
    { input: [[2, 4, 6, 8], [[0, 0], [1, 2], [2, 3], [0, 3]]], expected: [2, 10, 14, 20], hidden: true },
    { input: [[1000000, -1000000, 1000000], [[0, 2]]], expected: [1000000], hidden: true },
  ],
  hint: "누적합 배열을 `pre[0] = 0`, `pre[i + 1] = pre[i] + nums[i]` 로 만들어요. 그러면 질문 하나는 `pre[r + 1] - pre[l]` 로 끝나요. `r + 1` 을 쓰기 때문에 배열 길이는 `n + 1` 이어야 해요.",
  solution: {
    javascript: `function rangeSum(nums, queries) {
  const pre = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) pre[i + 1] = pre[i] + nums[i];
  return queries.map(([l, r]) => pre[r + 1] - pre[l]);
}
`,
    python: `def range_sum(nums, queries):
    pre = [0] * (len(nums) + 1)
    for i, n in enumerate(nums):
        pre[i + 1] = pre[i] + n
    return [pre[r + 1] - pre[l] for l, r in queries]
`,
  },
};
