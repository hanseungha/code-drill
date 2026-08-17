import type { Problem } from "@/lib/types";

export const kthLargest: Problem = {
  slug: "kth-largest",
  title: "K번째 큰 수",
  difficulty: "medium",
  tags: ["정렬"],
  summary: "정렬한 뒤 인덱스로 K번째 큰 값을 얻어요.",
  description: [
    "정수 배열 `nums`와 정수 `k`가 주어져요. `nums`에서 **K번째로 큰 값**을 반환해요.",
    "여기서 K번째 큰 값은 서로 다른 값 기준이 아니라 **중복을 포함한 순위**예요. 예를 들어 `[3, 3, 1]`에서 1번째 큰 값은 3, 2번째 큰 값도 3, 3번째 큰 값은 1이에요.",
  ],
  examples: [
    {
      input: "nums = [3, 2, 1, 5, 6, 4], k = 2",
      output: "5",
      explain: "내림차순으로 [6, 5, 4, 3, 2, 1]이니까 2번째는 5예요.",
    },
    {
      input: "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4",
      output: "4",
      explain: "내림차순 [6, 5, 5, 4, 3, 3, 2, 2, 1]에서 4번째는 4예요.",
    },
  ],
  constraints: [
    "1 ≤ k ≤ nums.length ≤ 10,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
  ],
  entry: { javascript: "kthLargest", python: "kth_largest" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function kthLargest(nums, k) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def kth_largest(nums, k):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
    { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
    { input: [[1], 1], expected: 1 },
    { input: [[7, 7, 7], 2], expected: 7 },
    { input: [[-5, -1, -3, -2], 1], expected: -1, hidden: true },
    { input: [[10, 9, 8, 7, 6, 5], 6], expected: 5, hidden: true },
  ],
  hint: "내림차순으로 정렬하면 K번째 큰 값은 인덱스 `k - 1`에 있어요. 오름차순으로 정렬했다면 뒤에서 K번째, 즉 인덱스 `length - k`예요.",
  solution: {
    javascript: `function kthLargest(nums, k) {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}
`,
    python: `def kth_largest(nums, k):
    ordered = sorted(nums, reverse=True)
    return ordered[k - 1]
`,
  },
};
