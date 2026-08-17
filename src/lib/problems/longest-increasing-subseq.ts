import type { Problem } from "@/lib/types";

export const longestIncreasingSubseq: Problem = {
  slug: "longest-increasing-subseq",
  title: "최장 증가 부분 수열",
  difficulty: "hard",
  tags: ["DP", "이분 탐색"],
  summary: "값이 계속 커지는 가장 긴 부분 수열의 길이를 구해요.",
  description: [
    "정수 배열 `nums`가 주어져요. 원소의 **순서는 유지하되 몇 개를 골라** 만든 수열 중, 값이 앞에서 뒤로 **엄격히 증가**하는 가장 긴 것의 **길이**를 반환해요. 원소가 이어져 있을 필요는 없어요.",
    "가장 단순한 풀이는 `dp[i]`를 'i번째로 끝나는 증가 수열의 최대 길이'로 두는 `O(n²)`이에요. 각 `i`마다 앞의 모든 `j`를 보고 `nums[j] < nums[i]`이면 `dp[j] + 1`로 늘려요.",
    "여기서 한 걸음 더 나아가면, '길이별 마지막 값의 최소'를 배열로 관리하고 이분 탐색으로 자리를 찾아 `O(n log n)`까지 줄일 수 있어요.",
  ],
  examples: [
    {
      input: "nums = [10, 9, 2, 5, 3, 7, 101, 18]",
      output: "4",
      explain: "[2, 3, 7, 101] 또는 [2, 5, 7, 18] 등 길이 4가 최장이에요.",
    },
    {
      input: "nums = [0, 1, 0, 3, 2, 3]",
      output: "4",
      explain: "[0, 1, 2, 3]이 최장이에요.",
    },
  ],
  constraints: [
    "0 ≤ nums.length ≤ 100,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
    "'엄격히 증가'이므로 같은 값은 이어 쓸 수 없어요.",
  ],
  entry: { javascript: "longestIncreasingSubseq", python: "longest_increasing_subseq" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function longestIncreasingSubseq(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def longest_increasing_subseq(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
    { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
    { input: [[7, 7, 7, 7]], expected: 1 },
    { input: [[]], expected: 0 },
    { input: [[1, 2, 3, 4, 5]], expected: 5 },
    { input: [[5, 4, 3, 2, 1]], expected: 1, hidden: true },
    { input: [[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]], expected: 4, hidden: true },
  ],
  hint: "`tails` 배열을 두고 각 값마다 이분 탐색으로 `그 값 이상인 첫 자리`를 찾아 덮어써요. 그 자리가 배열 끝이면 길이를 늘린 거예요. 마지막에 `tails`의 길이가 최장 증가 부분 수열의 길이예요. (더 쉬운 O(n²) DP로 시작해도 좋아요.)",
  solution: {
    javascript: `function longestIncreasingSubseq(nums) {
  const tails = [];
  for (const n of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n;
  }
  return tails.length;
}
`,
    python: `def longest_increasing_subseq(nums):
    tails = []
    for n in nums:
        lo, hi = 0, len(tails)
        while lo < hi:
            mid = (lo + hi) // 2
            if tails[mid] < n:
                lo = mid + 1
            else:
                hi = mid
        if lo == len(tails):
            tails.append(n)
        else:
            tails[lo] = n
    return len(tails)
`,
  },
};
