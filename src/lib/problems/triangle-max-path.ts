import type { Problem } from "@/lib/types";

export const triangleMaxPath: Problem = {
  slug: "triangle-max-path",
  title: "정수 삼각형",
  difficulty: "medium",
  tags: ["DP"],
  summary: "삼각형 꼭대기부터 바닥까지 내려가며 얻는 합의 최댓값을 구해요.",
  description: [
    "숫자로 이루어진 삼각형이 배열 `triangle`로 주어져요. `triangle[0]`은 원소 1개, 그다음 줄마다 원소가 하나씩 늘어나요. 맨 위에서 시작해 아래로 내려가는데, 한 칸 내려갈 때는 **바로 아래 칸 또는 그 오른쪽 칸**으로만 갈 수 있어요.",
    "바닥에 닿을 때까지 지나온 수의 **합이 가장 클 때** 그 값을 반환해요.",
    "위에서부터 내려가며 생각하면 경우가 갈라지지만, **아래에서 위로** 올려 생각하면 쉬워져요. 바닥 바로 윗줄의 각 칸은 '자기 값 + 아래 두 칸 중 큰 값'으로 정해지고, 이걸 꼭대기까지 접어 올리면 꼭대기 한 칸이 답이에요.",
  ],
  examples: [
    {
      input: "triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]",
      output: "21",
      explain: "2 → 4 → 7 → 8, 합이 21이에요.",
    },
    {
      input: "triangle = [[5]]",
      output: "5",
    },
  ],
  constraints: [
    "1 ≤ triangle.length ≤ 500",
    "triangle[r]의 길이는 r + 1이에요.",
    "-10,000 ≤ 각 값 ≤ 10,000",
  ],
  entry: { javascript: "triangleMaxPath", python: "triangle_max_path" },
  starter: {
    javascript: `/**
 * @param {number[][]} triangle
 * @return {number}
 */
function triangleMaxPath(triangle) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def triangle_max_path(triangle):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], expected: 21 },
    { input: [[[5]]], expected: 5 },
    { input: [[[1], [2, 3]]], expected: 4 },
    { input: [[[-1], [2, 3], [1, -1, -3]]], expected: 2 },
    { input: [[[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]], expected: 30, hidden: true },
    { input: [[[10], [-5, -5], [-5, -5, -5]]], expected: 0, hidden: true },
  ],
  hint: "맨 아랫줄을 복사해 `dp`로 시작해요. 아래에서 두 번째 줄부터 위로 올라가며, 각 칸을 `triangle[r][c] + Math.max(dp[c], dp[c+1])`로 갱신해요. 꼭대기까지 오면 `dp[0]`이 답이에요.",
  solution: {
    javascript: `function triangleMaxPath(triangle) {
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c < triangle[r].length; c++) {
      dp[c] = triangle[r][c] + Math.max(dp[c], dp[c + 1]);
    }
  }
  return dp[0];
}
`,
    python: `def triangle_max_path(triangle):
    dp = list(triangle[-1])
    for r in range(len(triangle) - 2, -1, -1):
        for c in range(len(triangle[r])):
            dp[c] = triangle[r][c] + max(dp[c], dp[c + 1])
    return dp[0]
`,
  },
};
