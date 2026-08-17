import type { Problem } from "@/lib/types";

export const climbingStairs: Problem = {
  slug: "climbing-stairs",
  title: "계단 오르기",
  difficulty: "easy",
  tags: ["DP"],
  summary: "한 번에 1칸 또는 2칸씩 올라 n번째 계단에 도달하는 경우의 수를 세요.",
  description: [
    "`n`개의 계단을 올라요. 한 번에 1칸 또는 2칸을 오를 수 있을 때, 꼭대기에 도달하는 서로 다른 방법의 수를 반환해요.",
    "결과가 커질 수 있으니 반복문으로 계산해요. 단순 재귀는 시간 초과가 나요.",
  ],
  examples: [
    {
      input: "n = 2",
      output: "2",
      explain: "1+1, 2 두 가지예요.",
    },
    {
      input: "n = 3",
      output: "3",
      explain: "1+1+1, 1+2, 2+1 세 가지예요.",
    },
  ],
  constraints: ["1 ≤ n ≤ 45"],
  entry: { javascript: "climbStairs", python: "climb_stairs" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def climb_stairs(n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [1], expected: 1 },
    { input: [2], expected: 2 },
    { input: [3], expected: 3 },
    { input: [5], expected: 8 },
    { input: [10], expected: 89 },
    { input: [30], expected: 1346269, hidden: true },
    { input: [45], expected: 1836311903, hidden: true },
  ],
  hint: "n번째 계단에 도달하는 방법은 (n-1)번째에서 1칸 오르거나 (n-2)번째에서 2칸 오르는 경우뿐이에요. 즉 f(n) = f(n-1) + f(n-2) 인 피보나치예요.",
  solution: {
    javascript: `function climbStairs(n) {
  let a = 1;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
`,
    python: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
`,
  },
};
