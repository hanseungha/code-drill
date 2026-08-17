import type { Problem } from "@/lib/types";

export const arraySumMax: Problem = {
  slug: "array-sum-max",
  title: "배열의 합과 최댓값",
  difficulty: "easy",
  tags: ["배열", "구현"],
  summary: "배열을 한 번 훑어 합과 최댓값을 함께 구해요.",
  description: [
    "정수 배열 `nums`가 주어져요. 모든 원소의 합과 가장 큰 값을 `[합, 최댓값]` 배열로 반환해요.",
    "언어가 제공하는 배열 API를 써도 되고 직접 반복문을 돌려도 돼요. 다만 **원소가 10만 개까지 들어온다**는 점은 기억해 둬요. 편해 보이는 방법 중에 이 크기에서 터지는 것이 있어요.",
  ],
  examples: [
    { input: "nums = [1, 2, 3, 4]", output: "[10, 4]" },
    { input: "nums = [-5, -1, -3]", output: "[-9, -1]" },
    { input: "nums = [7]", output: "[7, 7]" },
  ],
  constraints: ["1 ≤ nums.length ≤ 100,000", "-10^9 ≤ nums[i] ≤ 10^9"],
  entry: { javascript: "arraySumMax", python: "array_sum_max" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]} [합, 최댓값]
 */
function arraySumMax(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def array_sum_max(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3, 4]], expected: [10, 4] },
    { input: [[-5, -1, -3]], expected: [-9, -1] },
    { input: [[7]], expected: [7, 7] },
    { input: [[0, 0, 0, 0]], expected: [0, 0] },
    { input: [[1000000000, 1000000000, 1000000000]], expected: [3000000000, 1000000000] },
    { input: [[-1, 5, -1, 5, -1]], expected: [7, 5], hidden: true },
    { input: [[2, -2, 2, -2]], expected: [0, 2], hidden: true },
  ],
  hint: "자바스크립트의 `Math.max(...nums)` 는 배열을 인자 목록으로 펼치기 때문에 원소가 몇만 개가 되면 스택이 터져요. `reduce` 나 평범한 반복문을 써요. 파이썬의 `sum`, `max` 는 이런 제한이 없어요.",
  solution: {
    javascript: `function arraySumMax(nums) {
  let total = 0;
  let high = nums[0];
  for (const n of nums) {
    total += n;
    if (n > high) high = n;
  }
  return [total, high];
}
`,
    python: `def array_sum_max(nums):
    return [sum(nums), max(nums)]
`,
  },
};
