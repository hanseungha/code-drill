import type { Problem } from "@/lib/types";

export const uniquePaths: Problem = {
  slug: "unique-paths",
  title: "격자 경로의 수",
  difficulty: "medium",
  tags: ["DP"],
  summary: "격자의 왼쪽 위에서 오른쪽 아래로 가는 경로의 수를 세요.",
  description: [
    "`m`행 `n`열 격자가 있어요. 왼쪽 위 칸에서 시작해 **오른쪽 또는 아래로만** 한 칸씩 움직여 오른쪽 아래 칸까지 가려고 해요. 서로 다른 경로가 몇 개인지 반환해요.",
    "어떤 칸에 도착하는 경로 수는 **위 칸까지의 경로 수 + 왼쪽 칸까지의 경로 수**예요. 맨 윗줄과 맨 왼쪽 줄은 한 가지 길뿐이니 1로 두고, 나머지를 왼쪽 위부터 채워 나가요.",
  ],
  examples: [
    {
      input: "m = 3, n = 7",
      output: "28",
    },
    {
      input: "m = 3, n = 2",
      output: "3",
      explain: "아래-아래-오른쪽, 아래-오른쪽-아래, 오른쪽-아래-아래 세 가지예요.",
    },
  ],
  constraints: [
    "1 ≤ m, n ≤ 15",
  ],
  entry: { javascript: "uniquePaths", python: "unique_paths" },
  starter: {
    javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def unique_paths(m, n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [3, 7], expected: 28 },
    { input: [3, 2], expected: 3 },
    { input: [1, 1], expected: 1 },
    { input: [1, 10], expected: 1 },
    { input: [15, 15], expected: 40116600, hidden: true },
    { input: [5, 5], expected: 70, hidden: true },
  ],
  hint: "길이 `n`짜리 `dp` 배열을 1로 채우고, 두 번째 줄부터 각 칸을 `dp[j] += dp[j - 1]`로 갱신해요(`dp[j]`는 위 칸, `dp[j-1]`은 왼쪽 칸). `m`줄을 다 처리하면 `dp[n-1]`이 답이에요.",
  solution: {
    javascript: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}
`,
    python: `def unique_paths(m, n):
    dp = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[n - 1]
`,
  },
};
