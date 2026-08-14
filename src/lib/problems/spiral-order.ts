import type { Problem } from "@/lib/types";

export const spiralOrder: Problem = {
  slug: "spiral-order",
  title: "나선형 순회",
  difficulty: "medium",
  tags: ["시뮬레이션", "배열"],
  summary: "행렬을 바깥에서 안으로 시계 방향으로 감아 읽습니다.",
  description: [
    "`n × m` 정수 행렬 `grid`가 주어집니다. 왼쪽 위에서 출발해 **시계 방향으로 안쪽으로 감아 들어가며** 읽은 순서대로 1차원 배열에 담아 반환하세요.",
    "행과 열의 개수가 다를 수 있고, 한 줄짜리 행렬도 들어옵니다.",
    "경계를 네 개(위·아래·왼쪽·오른쪽)로 들고 한 줄 읽을 때마다 좁히는 방식이 가장 안전합니다. 방향을 바꿀 때마다 **이미 읽은 줄을 다시 읽지 않도록** 조건을 넣는 것이 이 문제의 전부입니다.",
  ],
  examples: [
    {
      input: "grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
      output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
      explain: "바깥 테두리를 한 바퀴 돈 뒤 가운데 5가 남습니다.",
    },
    { input: "grid = [[1, 2, 3, 4]]", output: "[1, 2, 3, 4]", explain: "한 행뿐이면 그대로입니다." },
    { input: "grid = [[1], [2], [3]]", output: "[1, 2, 3]" },
  ],
  constraints: [
    "1 ≤ n, m ≤ 200",
    "모든 행의 길이는 같습니다.",
    "-10^6 ≤ grid[i][j] ≤ 10^6",
  ],
  entry: { javascript: "spiralOrder", python: "spiral_order" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number[]} 나선형으로 읽은 순서
 */
function spiralOrder(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def spiral_order(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
    { input: [[[1, 2, 3, 4]]], expected: [1, 2, 3, 4] },
    { input: [[[1], [2], [3]]], expected: [1, 2, 3] },
    { input: [[[1]]], expected: [1] },
    { input: [[[1, 2], [3, 4]]], expected: [1, 2, 4, 3] },
    { input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
    { input: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expected: [1, 2, 4, 6, 8, 7, 5, 3], hidden: true },
    { input: [[[1, 2, 3], [4, 5, 6]]], expected: [1, 2, 3, 6, 5, 4], hidden: true },
    { input: [[[-1, -2], [-3, -4]]], expected: [-1, -2, -4, -3], hidden: true },
  ],
  hint: "`top`, `bottom`, `left`, `right` 네 변수를 두고 → ↓ ← ↑ 순으로 한 줄씩 읽으며 안쪽으로 좁히세요. ← 와 ↑ 를 읽기 전에 `top <= bottom`, `left <= right` 를 다시 확인해야 한 줄짜리 행렬에서 같은 칸을 두 번 담지 않습니다.",
  solution: {
    javascript: `function spiralOrder(grid) {
  const out = [];
  let top = 0;
  let bottom = grid.length - 1;
  let left = 0;
  let right = grid[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) out.push(grid[top][j]);
    top++;
    for (let i = top; i <= bottom; i++) out.push(grid[i][right]);
    right--;
    if (top <= bottom) {
      for (let j = right; j >= left; j--) out.push(grid[bottom][j]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) out.push(grid[i][left]);
      left++;
    }
  }
  return out;
}
`,
    python: `def spiral_order(grid):
    out = []
    top, bottom = 0, len(grid) - 1
    left, right = 0, len(grid[0]) - 1

    while top <= bottom and left <= right:
        for j in range(left, right + 1):
            out.append(grid[top][j])
        top += 1
        for i in range(top, bottom + 1):
            out.append(grid[i][right])
        right -= 1
        if top <= bottom:
            for j in range(right, left - 1, -1):
                out.append(grid[bottom][j])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1):
                out.append(grid[i][left])
            left += 1
    return out
`,
  },
};
