import type { Problem } from "@/lib/types";

export const duplicateCheck: Problem = {
  slug: "duplicate-check",
  title: "중복 원소 찾기",
  difficulty: "easy",
  tags: ["해시", "배열"],
  summary: "앞에서부터 훑으며 처음으로 다시 나온 값을 찾아요.",
  description: [
    "정수 배열 `nums`가 주어져요. 앞에서부터 훑을 때 **처음으로 다시 나온 값**을 반환해요.",
    "다시 나온 값이 하나도 없으면 `-1`을 반환해요. 배열에 `-1`이 들어 있을 수도 있지만, 그 경우에도 `-1`이 두 번 나왔다면 답은 `-1`이에요.",
  ],
  examples: [
    {
      input: "nums = [1, 2, 3, 4, 2, 5]",
      output: "2",
      explain: "4까지는 모두 처음 보는 값이고, 다섯 번째 원소 2에서 처음으로 이미 본 값을 만나요.",
    },
    { input: "nums = [1, 2, 3]", output: "-1", explain: "중복이 없어요." },
    { input: "nums = [0, 1, 0]", output: "0" },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "-10^9 ≤ nums[i] ≤ 10^9",
  ],
  entry: { javascript: "duplicateCheck", python: "duplicate_check" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function duplicateCheck(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def duplicate_check(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 3, 4, 2, 5]], expected: 2 },
    { input: [[1, 2, 3]], expected: -1 },
    { input: [[5, 5]], expected: 5 },
    { input: [[7]], expected: -1 },
    { input: [[-3, 0, -3]], expected: -3 },
    { input: [[0, 1, 0]], expected: 0, hidden: true },
    { input: [[10, 20, 30, 20, 10]], expected: 20, hidden: true },
    { input: [[-1, 2, -1]], expected: -1, hidden: true },
  ],
  hint: "이미 본 값을 셋에 넣어두면 '본 적 있나?'를 평균 O(1)에 물어볼 수 있어요. 배열을 두 번 도는 O(n²) 대신 한 번만 돌면 돼요.",
  solution: {
    javascript: `function duplicateCheck(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return -1;
}
`,
    python: `def duplicate_check(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return n
        seen.add(n)
    return -1
`,
  },
};
