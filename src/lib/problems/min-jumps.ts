import type { Problem } from "@/lib/types";

export const minJumps: Problem = {
  slug: "min-jumps",
  title: "DP 또는 그리디 판단",
  difficulty: "medium",
  tags: ["그리디", "DP"],
  summary: "각 칸에서 뛸 수 있는 최대 거리가 주어질 때 끝까지 가는 최소 점프 수를 구해요.",
  description: [
    "정수 배열 `nums`가 주어져요. `nums[i]`는 인덱스 `i`에서 **앞으로 최대 몇 칸** 뛸 수 있는지를 뜻해요. 인덱스 0에서 시작해 **마지막 인덱스**까지 가는 데 필요한 **최소 점프 수**를 반환해요. 끝까지 갈 수 없으면 `-1`을 반환해요.",
    "매 칸에서 '지금 점프로 닿을 수 있는 범위' 안에서 **다음 점프로 가장 멀리 갈 수 있는 곳**을 기준으로 삼으면, 각 구간을 한 번의 점프로 처리하는 그리디가 성립해요. `O(n)`이에요.",
    "DP로도 풀 수 있지만(`dp[i]` = i까지 최소 점프), 그리디가 더 빠르고 짧아요. 어느 쪽을 고를지 스스로 판단해 봐요.",
  ],
  examples: [
    {
      input: "nums = [2, 3, 1, 1, 4]",
      output: "2",
      explain: "0에서 1로(1칸) 뛰고, 1에서 마지막으로(3칸) 뛰면 두 번이에요.",
    },
    {
      input: "nums = [0, 2]",
      output: "-1",
      explain: "첫 칸에서 한 칸도 못 뛰어 끝까지 갈 수 없어요.",
    },
    {
      input: "nums = [1]",
      output: "0",
      explain: "이미 마지막 칸에 있어요.",
    },
  ],
  constraints: [
    "1 ≤ nums.length ≤ 100,000",
    "0 ≤ nums[i] ≤ 10,000",
  ],
  entry: { javascript: "minJumps", python: "min_jumps" },
  starter: {
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function minJumps(nums) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def min_jumps(nums):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[2, 3, 1, 1, 4]], expected: 2 },
    { input: [[0, 2]], expected: -1 },
    { input: [[1]], expected: 0 },
    { input: [[2, 3, 0, 1, 4]], expected: 2 },
    { input: [[3, 2, 1, 0, 4]], expected: -1 },
    { input: [[1, 1, 1, 1, 1]], expected: 4, hidden: true },
    { input: [[5, 1, 1, 1, 1]], expected: 1, hidden: true },
  ],
  hint: "`curEnd`(지금 점프로 닿는 끝)와 `farthest`(다음에 닿을 수 있는 가장 먼 곳)를 둬요. 각 칸에서 `farthest`를 갱신하고, `i`가 `curEnd`에 닿으면 점프 수를 늘리고 `curEnd`를 `farthest`로 옮겨요. 이때 `farthest`가 제자리면 더 못 가니 -1이에요.",
  solution: {
    javascript: `function minJumps(nums) {
  const n = nums.length;
  let jumps = 0;
  let curEnd = 0;
  let farthest = 0;
  for (let i = 0; i < n - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      if (farthest <= i) return -1;
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}
`,
    python: `def min_jumps(nums):
    n = len(nums)
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(n - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            if farthest <= i:
                return -1
            jumps += 1
            cur_end = farthest
    return jumps
`,
  },
};
