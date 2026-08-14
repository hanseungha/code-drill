import type { Problem } from "@/lib/types";

export const maxSubarray: Problem = {
  slug: "max-subarray",
  title: "가장 큰 연속 부분 수열의 합",
  difficulty: "medium",
  tags: ["DP", "배열"],
  summary: "연속한 부분 수열 중 합이 가장 큰 값을 구합니다.",
  description: [
    "정수 배열 `nums`가 주어집니다. 길이가 1 이상인 연속한 부분 수열 중 원소의 합이 가장 큰 값을 반환하세요.",
    "배열의 모든 원소가 음수일 수도 있습니다. 이때는 가장 큰(0에 가까운) 원소 하나가 답이 됩니다.",
  ],
  examples: [
    {
      input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      output: "6",
      explain: "부분 수열 [4, -1, 2, 1]의 합이 6으로 가장 큽니다.",
    },
    { input: "nums = [1]", output: "1" },
    { input: "nums = [5, 4, -1, 7, 8]", output: "23" },
  ],
  constraints: ["1 ≤ nums.length ≤ 100,000", "-10,000 ≤ nums[i] ≤ 10,000"],
  entry: { javascript: "maxSubArray", python: "max_sub_array" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def max_sub_array(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
    { input: [[1]], expected: 1 },
    { input: [[5, 4, -1, 7, 8]], expected: 23 },
    { input: [[-1]], expected: -1 },
    { input: [[-2, -1]], expected: -1 },
    { input: [[8, -19, 5, -4, 20]], expected: 21, hidden: true },
    { input: [[-3, -2, -5, -1, -4]], expected: -1, hidden: true },
  ],
  hint: "각 위치에서 '여기서 끝나는 최대 합'은 max(현재 값, 이전까지의 최대 합 + 현재 값) 입니다. 이 값을 훑으면서 전체 최댓값을 갱신하세요 (카데인 알고리즘).",
  solution: {
    javascript: `function maxSubArray(nums) {
  let best = nums[0];
  let cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
`,
    python: `def max_sub_array(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best
`,
  },
};
