import type { Problem } from "@/lib/types";

export const binarySearch: Problem = {
  slug: "binary-search",
  title: "이진 탐색",
  difficulty: "easy",
  tags: ["이진탐색", "배열"],
  summary: "정렬된 배열에서 target의 인덱스를 O(log n)에 찾습니다.",
  description: [
    "오름차순으로 정렬된 정수 배열 `nums`와 정수 `target`이 주어집니다. `target`이 배열에 있으면 그 인덱스를, 없으면 `-1`을 반환하세요.",
    "시간 복잡도 O(log n)으로 풀어야 합니다.",
  ],
  examples: [
    {
      input: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
      output: "4",
      explain: "9는 인덱스 4에 있습니다.",
    },
    {
      input: "nums = [-1, 0, 3, 5, 9, 12], target = 2",
      output: "-1",
      explain: "2는 배열에 없습니다.",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 10,000",
    "nums는 중복 없이 오름차순 정렬되어 있습니다.",
    "-10,000 ≤ nums[i], target ≤ 10,000",
  ],
  entry: { javascript: "search", python: "search" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def search(nums, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { input: [[5], 5], expected: 0 },
    { input: [[5], -5], expected: -1 },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1], expected: 0, hidden: true },
    { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10], expected: 9, hidden: true },
    { input: [[2, 4, 6, 8], 5], expected: -1, hidden: true },
  ],
  hint: "lo와 hi 포인터를 두고 mid = (lo + hi) >> 1 을 확인하세요. nums[mid]가 target보다 작으면 lo = mid + 1, 크면 hi = mid - 1 입니다.",
  solution: {
    javascript: `function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
`,
    python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
  },
};
