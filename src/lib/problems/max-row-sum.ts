import type { Problem } from "@/lib/types";

export const maxRowSum: Problem = {
  slug: "max-row-sum",
  title: "행의 합이 가장 큰 줄",
  difficulty: "easy",
  tags: ["배열", "구현"],
  summary: "2차원 배열을 행 단위로 훑어 합이 가장 큰 행의 번호를 찾아요.",
  description: [
    "2차원 정수 배열 `grid`가 주어져요. 각 행의 합을 구해, 합이 **가장 큰 행의 인덱스**를 반환해요.",
    "합이 같은 행이 여러 개면 **인덱스가 가장 작은 행**을 반환해요.",
    "`grid[i][j]` 에서 `i`는 행, `j`는 열이에요. 바깥 반복문이 행, 안쪽 반복문이 열이라는 순서에 익숙해지는 게 이 문제의 목적이에요.",
  ],
  examples: [
    { input: "grid = [[1, 2], [3, 4]]", output: "1", explain: "행의 합은 각각 3, 7 이니까 1번 행이에요." },
    {
      input: "grid = [[5], [1], [5]]",
      output: "0",
      explain: "0번과 2번 행의 합이 같으니까 더 앞선 0을 반환해요.",
    },
    { input: "grid = [[-1, -2], [-3, 0]]", output: "0", explain: "둘 다 -3 이라 앞선 0번 행이에요." },
  ],
  constraints: [
    "1 ≤ grid.length ≤ 500",
    "1 ≤ grid[i].length ≤ 500",
    "모든 행의 길이는 같아요.",
    "-10^6 ≤ grid[i][j] ≤ 10^6",
  ],
  entry: { javascript: "maxRowSum", python: "max_row_sum" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number} 합이 가장 큰 행의 인덱스
 */
function maxRowSum(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def max_row_sum(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 2], [3, 4]]], expected: 1 },
    { input: [[[5], [1], [5]]], expected: 0 },
    { input: [[[-1, -2], [-3, 0]]], expected: 0 },
    { input: [[[1, 1, 1]]], expected: 0 },
    { input: [[[0, 0], [0, 0], [1, -1]]], expected: 0 },
    { input: [[[10, -20, 30], [5, 5, 5], [-1, -1, -1]]], expected: 0, hidden: true },
    { input: [[[-5], [-2], [-9]]], expected: 1, hidden: true },
  ],
  hint: "행마다 합을 구해 지금까지의 최댓값과 비교하면 돼요. 같을 때 갱신하지 않아야 앞선 인덱스가 남아요 — `>` 와 `>=` 중 어느 쪽을 쓸지가 이 문제의 함정이에요.",
  solution: {
    javascript: `function maxRowSum(grid) {
  let best = 0;
  let bestSum = -Infinity;
  for (let i = 0; i < grid.length; i++) {
    let sum = 0;
    for (let j = 0; j < grid[i].length; j++) sum += grid[i][j];
    if (sum > bestSum) {
      bestSum = sum;
      best = i;
    }
  }
  return best;
}
`,
    python: `def max_row_sum(grid):
    best = 0
    best_sum = float("-inf")
    for i, row in enumerate(grid):
        total = sum(row)
        if total > best_sum:
            best_sum = total
            best = i
    return best
`,
  },
};
