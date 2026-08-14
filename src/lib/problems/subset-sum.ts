import type { Problem } from "@/lib/types";

export const subsetSum: Problem = {
  slug: "subset-sum",
  title: "부분집합의 합",
  difficulty: "medium",
  tags: ["완전탐색", "비트마스크"],
  summary: "비트마스크로 2ⁿ개의 부분집합을 빠짐없이 훑습니다.",
  description: [
    "정수 배열 `nums`와 정수 `target`이 주어집니다. 원소의 합이 `target`이 되는 **공집합이 아닌 부분집합의 개수**를 반환하세요.",
    "값이 같아도 인덱스가 다르면 다른 부분집합입니다. 예를 들어 `nums = [1, 1]` 에서 합이 `1`인 부분집합은 두 개입니다.",
    "원소가 `n`개면 부분집합은 `2ⁿ`개입니다. `0`부터 `2ⁿ - 1`까지의 정수 하나하나를 **어떤 원소를 골랐는지 나타내는 비트열**로 보면, 반복문 하나로 모든 부분집합을 훑을 수 있습니다. `i`번 비트가 켜져 있는지는 `mask & (1 << i)` 로 확인합니다.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3], target = 3",
      output: "2",
      explain: "{3} 과 {1, 2} 두 가지입니다.",
    },
    {
      input: "nums = [1, 1, 1], target = 2",
      output: "3",
      explain: "인덱스 기준으로 (0,1), (0,2), (1,2) 세 가지입니다.",
    },
    { input: "nums = [5], target = 3", output: "0" },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 15",
    "-1,000 ≤ nums[i] ≤ 1,000",
    "-15,000 ≤ target ≤ 15,000",
  ],
  entry: { javascript: "subsetSum", python: "subset_sum" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number} 합이 target 인 공집합 아닌 부분집합의 개수
 */
function subsetSum(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def subset_sum(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3], 3], expected: 2 },
    { input: [[1, 1, 1], 2], expected: 3 },
    { input: [[5], 3], expected: 0 },
    { input: [[5], 5], expected: 1 },
    { input: [[-1, 1], 0], expected: 1 },
    { input: [[1, 2, 3, 4, 5], 5], expected: 3 },
    { input: [[2, 2, 2, 2], 4], expected: 6, hidden: true },
    { input: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 7], expected: 6435, hidden: true },
    { input: [[-3, -2, -1, 1, 2, 3], 0], expected: 9, hidden: true },
  ],
  hint: "`for (let mask = 1; mask < (1 << n); mask++)` 로 돌면 공집합인 `0`을 자연스럽게 건너뜁니다. 안쪽에서 `i`번 비트가 켜졌는지 확인하며 합을 만드세요. `1 << 15` 는 32,768 이므로 전부 훑어도 순식간입니다.",
  solution: {
    javascript: `function subsetSum(nums, target) {
  const n = nums.length;
  let count = 0;
  for (let mask = 1; mask < (1 << n); mask++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) sum += nums[i];
    }
    if (sum === target) count++;
  }
  return count;
}
`,
    python: `def subset_sum(nums, target):
    n = len(nums)
    count = 0
    for mask in range(1, 1 << n):
        total = 0
        for i in range(n):
            if mask & (1 << i):
                total += nums[i]
        if total == target:
            count += 1
    return count
`,
  },
};
