import type { Problem } from "@/lib/types";

export const twoSum: Problem = {
  slug: "two-sum",
  title: "두 수의 합",
  difficulty: "easy",
  tags: ["해시", "배열"],
  summary: "더해서 target이 되는 두 원소의 인덱스를 찾아요.",
  description: [
    "정수 배열 `nums`와 정수 `target`이 주어져요. 더해서 `target`이 되는 두 원소의 인덱스를 배열로 반환해요.",
    "정답은 항상 정확히 하나 있고, 같은 원소를 두 번 사용할 수 없어요. 인덱스는 오름차순으로 반환해요.",
  ],
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explain: "nums[0] + nums[1] === 9 이라서 [0, 1]을 반환해요.",
    },
    { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
    { input: "nums = [3, 3], target = 6", output: "[0, 1]" },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
    "-10^9 ≤ target ≤ 10^9",
    "정답은 유일하게 있어요.",
  ],
  entry: { javascript: "twoSum", python: "two_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def two_sum(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[3, 2, 4], 6], expected: [1, 2] },
    { input: [[3, 3], 6], expected: [0, 1] },
    { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
    { input: [[1, 5, 3, 7, 9, 2], 11], expected: [4, 5], hidden: true },
    { input: [[0, 4, 3, 0], 0], expected: [0, 3], hidden: true },
  ],
  hint: "이미 지나온 값을 해시맵에 { 값: 인덱스 }로 담아두면, 각 원소마다 target - 값이 있었는지 O(1)에 확인할 수 있어요.",
  solution: {
    javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
    python: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:
            return [seen[need], i]
        seen[n] = i
    return []
`,
  },
};
