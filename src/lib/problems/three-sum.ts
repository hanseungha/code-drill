import type { Problem } from "@/lib/types";

export const threeSum: Problem = {
  slug: "three-sum",
  title: "세 수의 합",
  difficulty: "easy",
  tags: ["완전탐색", "배열"],
  summary: "서로 다른 세 수를 골라 m을 넘지 않는 가장 큰 합을 만듭니다.",
  description: [
    "정수 배열 `nums`와 정수 `m`이 주어집니다. 서로 다른 **세 개의 원소**를 골라 더했을 때, `m`을 넘지 않으면서 가장 큰 합을 반환하세요.",
    "그런 조합이 하나도 없으면 `-1`을 반환합니다.",
    "원소가 100개까지이므로 세 개를 고르는 모든 경우는 최대 16만 가지 남짓입니다. 영리한 방법을 찾기 전에, **모든 경우를 만들어 보는 코드부터 정확히** 쓰는 것이 이 문제의 목적입니다.",
  ],
  examples: [
    {
      input: "nums = [5, 6, 7, 8, 9], m = 21",
      output: "21",
      explain: "5 + 7 + 9 = 21 로 정확히 m 입니다. 9 + 8 + 7 = 24 는 m을 넘습니다.",
    },
    { input: "nums = [1, 2, 3], m = 10", output: "6", explain: "고를 수 있는 조합이 하나뿐입니다." },
    { input: "nums = [10, 10, 10], m = 5", output: "-1", explain: "어떤 조합도 5를 넘지 않을 수 없습니다." },
  ],
  constraints: [
    "3 ≤ nums.length ≤ 100",
    "1 ≤ nums[i] ≤ 100,000",
    "1 ≤ m ≤ 300,000",
    "같은 인덱스를 두 번 고를 수 없습니다. 값이 같은 원소가 여러 개 있는 것은 상관없습니다.",
  ],
  entry: { javascript: "threeSum", python: "three_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number} m 이하의 최대 세 수 합, 없으면 -1
 */
function threeSum(nums, m) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def three_sum(nums, m):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[5, 6, 7, 8, 9], 21], expected: 21 },
    { input: [[1, 2, 3], 10], expected: 6 },
    { input: [[10, 10, 10], 5], expected: -1 },
    { input: [[1, 1, 1], 3], expected: 3 },
    { input: [[100, 1, 2, 3], 6], expected: 6 },
    { input: [[2, 2, 2, 100], 6], expected: 6, hidden: true },
    { input: [[7, 7, 7, 7], 21], expected: 21, hidden: true },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15], expected: 15, hidden: true },
  ],
  hint: "인덱스 `i < j < k` 로 삼중 반복문을 돌면 같은 조합을 두 번 세지 않습니다. `for j = i + 1`, `for k = j + 1` 로 시작하는 것이 요령입니다. 답을 담을 변수는 `-1`로 초기화해 두면 '없음' 처리가 저절로 됩니다.",
  solution: {
    javascript: `function threeSum(nums, m) {
  let best = -1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        if (sum <= m && sum > best) best = sum;
      }
    }
  }
  return best;
}
`,
    python: `def three_sum(nums, m):
    best = -1
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                total = nums[i] + nums[j] + nums[k]
                if total <= m and total > best:
                    best = total
    return best
`,
  },
};
