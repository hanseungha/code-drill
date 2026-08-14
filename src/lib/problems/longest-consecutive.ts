import type { Problem } from "@/lib/types";

export const longestConsecutive: Problem = {
  slug: "longest-consecutive",
  title: "가장 긴 연속 수열",
  difficulty: "hard",
  tags: ["해시", "배열"],
  summary: "정렬하지 않고 셋만으로 가장 긴 연속 구간의 길이를 구합니다.",
  description: [
    "정수 배열 `nums`가 주어집니다. 값이 연속으로 이어지는 부분수열 중 **가장 긴 것의 길이**를 반환하세요. 원래 배열에서의 순서는 상관없고, 중복된 값은 한 번만 셉니다.",
    "정렬하면 `O(n log n)`에 쉽게 풀립니다. 여기서는 **셋만으로 `O(n)`**에 푸는 것이 목표입니다.",
    "핵심은 어디서부터 세기 시작할지 고르는 것입니다. 모든 값에서 시작해 세면 같은 구간을 몇 번씩 다시 세지만, `x - 1`이 셋에 없는 값 — 즉 **구간의 시작점에서만** 세면 각 값은 정확히 한 번씩만 방문됩니다.",
  ],
  examples: [
    {
      input: "nums = [100, 4, 200, 1, 3, 2]",
      output: "4",
      explain: "1, 2, 3, 4 가 이어지므로 길이 4 입니다.",
    },
    { input: "nums = [1, 1, 1]", output: "1", explain: "중복은 한 번만 셉니다." },
    { input: "nums = [10]", output: "1" },
  ],
  constraints: ["1 ≤ nums.length ≤ 100,000", "-10^9 ≤ nums[i] ≤ 10^9"],
  entry: { javascript: "longestConsecutive", python: "longest_consecutive" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number} 가장 긴 연속 수열의 길이
 */
function longestConsecutive(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def longest_consecutive(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[100, 4, 200, 1, 3, 2]], expected: 4 },
    { input: [[1, 1, 1]], expected: 1 },
    { input: [[10]], expected: 1 },
    { input: [[0, -1, 1, 2, -2]], expected: 5 },
    { input: [[5, 4, 3, 2, 1]], expected: 5 },
    { input: [[1, 3, 5, 7]], expected: 1 },
    { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expected: 7, hidden: true },
    { input: [[-5, -4, -3, 100, 101]], expected: 3, hidden: true },
    { input: [[2, 2, 3, 3, 4, 4]], expected: 3, hidden: true },
  ],
  hint: "값을 전부 셋에 넣고, 셋을 돌면서 `x - 1`이 셋에 없는 값에서만 `x + 1, x + 2, ...` 로 세어 나가세요. 안쪽 반복문이 있어도 전체는 `O(n)`입니다 — 각 값은 자기가 속한 구간에서 딱 한 번만 세어지기 때문입니다.",
  solution: {
    javascript: `function longestConsecutive(nums) {
  const seen = new Set(nums);
  let best = 0;
  for (const n of seen) {
    if (seen.has(n - 1)) continue;
    let length = 1;
    while (seen.has(n + length)) length++;
    if (length > best) best = length;
  }
  return best;
}
`,
    python: `def longest_consecutive(nums):
    seen = set(nums)
    best = 0
    for n in seen:
        if n - 1 in seen:
            continue
        length = 1
        while n + length in seen:
            length += 1
        if length > best:
            best = length
    return best
`,
  },
};
