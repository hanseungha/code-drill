import type { Problem } from "@/lib/types";

export const shortestSubarraySum: Problem = {
  slug: "shortest-subarray-sum",
  title: "합이 target인 최단 구간",
  difficulty: "medium",
  tags: ["슬라이딩 윈도우", "투 포인터"],
  summary: "합이 정확히 target인 가장 짧은 연속 구간의 길이를 구해요.",
  description: [
    "**양의 정수** 배열 `nums`와 정수 `target`이 주어져요. 연속한 원소들의 합이 정확히 `target`이 되는 구간 중 **가장 짧은 것의 길이**를 반환해요. 그런 구간이 하나도 없으면 `0`을 반환해요.",
    "모든 값이 양수라서, 구간을 오른쪽으로 넓히면 합이 커지고 왼쪽을 줄이면 합이 작아져요. 이 성질 덕분에 포인터 두 개로 한 번만 훑어서 `O(n)`에 풀 수 있어요.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3, 7, 5], target = 12",
      output: "2",
      explain: "[7, 5]의 합이 12이고 길이가 2예요. 더 짧은 구간은 없어요.",
    },
    {
      input: "nums = [1, 1, 1, 1], target = 3",
      output: "3",
      explain: "연속한 1 세 개의 합이 3이에요.",
    },
    {
      input: "nums = [1, 2, 3], target = 7",
      output: "0",
      explain: "합이 정확히 7인 연속 구간이 없어요.",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "1 ≤ nums[i] ≤ 10,000",
    "1 ≤ target ≤ 1,000,000,000",
  ],
  entry: { javascript: "shortestSubarraySum", python: "shortest_subarray_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function shortestSubarraySum(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def shortest_subarray_sum(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3, 7, 5], 12], expected: 2 },
    { input: [[1, 1, 1, 1], 3], expected: 3 },
    { input: [[1, 2, 3], 7], expected: 0 },
    { input: [[5], 5], expected: 1 },
    { input: [[2, 4, 6, 8], 10], expected: 2 },
    { input: [[3, 1, 1, 1, 3], 5], expected: 3, hidden: true },
    { input: [[10, 2, 3], 5], expected: 2, hidden: true },
  ],
  hint: "왼쪽 포인터를 두고 오른쪽으로 창을 넓혀요. 창의 합이 target을 넘으면 왼쪽을 줄여 합을 낮춰요. 합이 정확히 target인 순간마다 창의 길이를 최솟값 후보로 기록해요.",
  solution: {
    javascript: `function shortestSubarraySum(nums, target) {
  let left = 0;
  let sum = 0;
  let best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > target && left <= right) {
      sum -= nums[left];
      left++;
    }
    if (sum === target) best = Math.min(best, right - left + 1);
  }
  return best === Infinity ? 0 : best;
}
`,
    python: `def shortest_subarray_sum(nums, target):
    left = 0
    total = 0
    best = float("inf")
    for right, n in enumerate(nums):
        total += n
        while total > target and left <= right:
            total -= nums[left]
            left += 1
        if total == target:
            best = min(best, right - left + 1)
    return 0 if best == float("inf") else best
`,
  },
};
