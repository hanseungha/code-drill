import type { Problem } from "@/lib/types";

export const minAndMax: Problem = {
  slug: "min-and-max",
  title: "최솟값과 최댓값",
  difficulty: "easy",
  tags: ["배열", "구현"],
  summary: "한 번의 순회로 두 값을 함께 구해 배열로 반환해요.",
  description: [
    "정수 배열 `nums`가 주어져요. 가장 작은 값과 가장 큰 값을 `[최솟값, 최댓값]` 배열로 반환해요.",
    "배열을 두 번 훑어도 답은 같지만, **한 번만 훑으면서 두 값을 동시에 갱신**해 보세요. 순회 한 번에 여러 정보를 모으는 습관은 이후 거의 모든 주차에서 다시 쓰여요.",
    "값을 여러 개 돌려주는 방법도 함께 익혀요. 자바스크립트는 배열로, 파이썬은 튜플이나 리스트로 반환하면 돼요.",
  ],
  examples: [
    { input: "nums = [3, 1, 4, 1, 5]", output: "[1, 5]" },
    { input: "nums = [-2]", output: "[-2, -2]", explain: "원소가 하나면 최솟값과 최댓값이 같아요." },
    { input: "nums = [10, -10]", output: "[-10, 10]" },
  ],
  constraints: ["1 ≤ nums.length ≤ 100,000", "-10^9 ≤ nums[i] ≤ 10^9"],
  entry: { javascript: "minAndMax", python: "min_and_max" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]} [최솟값, 최댓값]
 */
function minAndMax(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def min_and_max(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[3, 1, 4, 1, 5]], expected: [1, 5] },
    { input: [[-2]], expected: [-2, -2] },
    { input: [[10, -10]], expected: [-10, 10] },
    { input: [[0, 0, 0]], expected: [0, 0] },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 5] },
    { input: [[1, 2, 3, 4, 5]], expected: [1, 5], hidden: true },
    { input: [[-7, -3, -9, -1]], expected: [-9, -1], hidden: true },
  ],
  hint: "첫 원소로 두 변수를 초기화하고 두 번째 원소부터 비교해요. `0`으로 초기화하면 모든 값이 음수인 배열에서 최댓값이 `0`으로 남아요.",
  solution: {
    javascript: `function minAndMax(nums) {
  let low = nums[0];
  let high = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < low) low = nums[i];
    if (nums[i] > high) high = nums[i];
  }
  return [low, high];
}
`,
    python: `def min_and_max(nums):
    low = high = nums[0]
    for n in nums[1:]:
        if n < low:
            low = n
        if n > high:
            high = n
    return [low, high]
`,
  },
};
