import type { Problem } from "@/lib/types";

export const houseRobber: Problem = {
  slug: "house-robber",
  title: "도둑질",
  difficulty: "medium",
  tags: ["DP"],
  summary: "이웃한 집을 연달아 털 수 없을 때 훔칠 수 있는 최대 금액을 구해요.",
  description: [
    "집들이 한 줄로 늘어서 있고, 각 집에 있는 돈이 배열 `nums`로 주어져요. 단, **바로 이웃한 두 집을 연달아 털면** 경보가 울려요. 경보 없이 훔칠 수 있는 **최대 금액**을 반환해요.",
    "각 집에서 정할 것은 '턴다 / 안 턴다' 둘 중 하나예요. `i`번 집까지 봤을 때의 최대 금액을 `dp[i]`라 하면, `i`번 집을 털면 `dp[i-2] + nums[i]`, 안 털면 `dp[i-1]`이니 둘 중 큰 값이에요.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3, 1]",
      output: "4",
      explain: "1번째와 3번째 집을 털면 1 + 3 = 4예요.",
    },
    {
      input: "nums = [2, 7, 9, 3, 1]",
      output: "12",
      explain: "9 + 3이 아니라 2 + 9 + 1 = 12가 최대예요.",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 100,000",
    "0 ≤ nums[i] ≤ 10,000",
  ],
  entry: { javascript: "houseRobber", python: "house_robber" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function houseRobber(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def house_robber(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3, 1]], expected: 4 },
    { input: [[2, 7, 9, 3, 1]], expected: 12 },
    { input: [[]], expected: 0 },
    { input: [[5]], expected: 5 },
    { input: [[2, 1, 1, 2]], expected: 4 },
    { input: [[100, 1, 1, 100, 1, 1, 100]], expected: 300, hidden: true },
    { input: [[0, 0, 0]], expected: 0, hidden: true },
  ],
  hint: "값 두 개만 기억하면 돼요. `prev`(두 칸 전까지의 최대)와 `cur`(한 칸 전까지의 최대)를 두고, 각 집에서 `Math.max(cur, prev + 현재 집)`을 새 `cur`로 삼아요. 다 돌면 `cur`이 답이에요.",
  solution: {
    javascript: `function houseRobber(nums) {
  let prev = 0;
  let cur = 0;
  for (const money of nums) {
    const next = Math.max(cur, prev + money);
    prev = cur;
    cur = next;
  }
  return cur;
}
`,
    python: `def house_robber(nums):
    prev, cur = 0, 0
    for money in nums:
        prev, cur = cur, max(cur, prev + money)
    return cur
`,
  },
};
