import type { Problem } from "@/lib/types";

export const twoSumSorted: Problem = {
  slug: "two-sum-sorted",
  title: "정렬된 배열의 두 수의 합",
  difficulty: "easy",
  tags: ["투 포인터", "배열"],
  summary: "오름차순 배열에서 합이 target인 두 수의 인덱스를 양끝 포인터로 찾아요.",
  description: [
    "**오름차순으로 정렬된** 정수 배열 `nums`와 정수 `target`이 주어져요. 더해서 `target`이 되는 두 원소의 인덱스를 오름차순 배열 `[i, j]`로 반환해요.",
    "정답은 항상 정확히 하나 있고, 같은 원소를 두 번 쓸 수 없어요. 배열이 정렬돼 있다는 점을 이용해 해시 없이 `O(n)`, 추가 메모리 없이 푸는 것이 목표예요.",
  ],
  examples: [
    {
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explain: "nums[0] + nums[1] = 2 + 7 = 9.",
    },
    {
      input: "nums = [1, 3, 4, 5, 7, 11], target = 15",
      output: "[2, 5]",
      explain: "nums[2] + nums[5] = 4 + 11 = 15.",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 100,000",
    "nums는 오름차순으로 정렬돼 있어요.",
    "-10^9 ≤ nums[i], target ≤ 10^9",
    "정답은 유일하게 있어요.",
  ],
  entry: { javascript: "twoSumSorted", python: "two_sum_sorted" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSumSorted(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def two_sum_sorted(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[1, 3, 4, 5, 7, 11], 15], expected: [2, 5] },
    { input: [[1, 2], 3], expected: [0, 1] },
    { input: [[-5, -3, 0, 2, 8], -3], expected: [0, 3] },
    { input: [[0, 0, 3, 4], 0], expected: [0, 1], hidden: true },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19], expected: [8, 9], hidden: true },
  ],
  hint: "양끝에서 포인터 둘을 시작해요. 두 값의 합이 target보다 작으면 왼쪽을 오른쪽으로 한 칸(더 큰 값), 크면 오른쪽을 왼쪽으로 한 칸(더 작은 값) 옮겨요. 정렬돼 있어서 이 방향 판단이 항상 옳아요.",
  solution: {
    javascript: `function twoSumSorted(nums, target) {
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    const sum = nums[i] + nums[j];
    if (sum === target) return [i, j];
    if (sum < target) i++;
    else j--;
  }
  return [];
}
`,
    python: `def two_sum_sorted(nums, target):
    i, j = 0, len(nums) - 1
    while i < j:
        total = nums[i] + nums[j]
        if total == target:
            return [i, j]
        if total < target:
            i += 1
        else:
            j -= 1
    return []
`,
  },
};
