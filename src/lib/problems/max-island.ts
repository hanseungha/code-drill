import type { Problem } from "@/lib/types";

export const maxIsland: Problem = {
  slug: "max-island",
  title: "격자 탐색 + 상태 관리",
  difficulty: "medium",
  tags: ["BFS", "DFS", "그래프"],
  summary: "격자에서 1로 이어진 가장 큰 덩어리의 칸 수를 구해요.",
  description: [
    "`0`과 `1`로 이루어진 격자 `grid`가 주어져요. 상하좌우로 이어진 `1`들이 하나의 **섬**을 이뤄요. 가장 큰 섬의 **칸 수**를 반환해요. 섬이 하나도 없으면 `0`을 반환해요.",
    "모든 칸을 훑되 방문한 칸을 다시 세지 않도록 **방문 표시**를 관리해요. 아직 방문하지 않은 `1`을 만나면 거기서 DFS나 BFS로 이어진 `1`을 모두 세고, 그 크기를 최댓값 후보로 삼아요.",
  ],
  examples: [
    {
      input: "grid = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]]",
      output: "3",
      explain: "왼쪽 위 섬은 3칸, 오른쪽 아래 섬도 3칸이에요. 가장 큰 값은 3이에요.",
    },
    {
      input: "grid = [[0, 0], [0, 0]]",
      output: "0",
    },
  ],
  constraints: [
    "1 ≤ 행, 열 ≤ 1,000",
    "각 칸은 0 또는 1이에요.",
  ],
  entry: { javascript: "maxIsland", python: "max_island" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function maxIsland(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def max_island(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1]]], expected: 3 },
    { input: [[[0, 0], [0, 0]]], expected: 0 },
    { input: [[[1]]], expected: 1 },
    { input: [[[1, 1, 1], [1, 1, 1]]], expected: 6 },
    { input: [[[1, 0, 1, 0, 1], [0, 0, 0, 0, 0], [1, 1, 0, 1, 1]]], expected: 2, hidden: true },
    { input: [[[0, 1, 0], [1, 1, 1], [0, 1, 0]]], expected: 5, hidden: true },
  ],
  hint: "방문 배열을 만들고 모든 칸을 훑어요. 방문 안 한 `1`을 만나면 스택(또는 큐)으로 이어진 `1`을 방문 표시하며 세어 섬 크기를 구하고, 지금까지의 최댓값과 비교해요.",
  solution: {
    javascript: `function maxIsland(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];
  const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));
  let best = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== 1 || seen[i][j]) continue;
      let area = 0;
      const stack = [[i, j]];
      seen[i][j] = true;
      while (stack.length > 0) {
        const [x, y] = stack.pop();
        area++;
        for (let d = 0; d < 4; d++) {
          const nx = x + DX[d];
          const ny = y + DY[d];
          if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
          if (grid[nx][ny] === 1 && !seen[nx][ny]) {
            seen[nx][ny] = true;
            stack.push([nx, ny]);
          }
        }
      }
      best = Math.max(best, area);
    }
  }
  return best;
}
`,
    python: `def max_island(grid):
    rows, cols = len(grid), len(grid[0])
    dirs = ((-1, 0), (1, 0), (0, -1), (0, 1))
    seen = [[False] * cols for _ in range(rows)]
    best = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] != 1 or seen[i][j]:
                continue
            area = 0
            stack = [(i, j)]
            seen[i][j] = True
            while stack:
                x, y = stack.pop()
                area += 1
                for dx, dy in dirs:
                    nx, ny = x + dx, y + dy
                    if not (0 <= nx < rows and 0 <= ny < cols):
                        continue
                    if grid[nx][ny] == 1 and not seen[nx][ny]:
                        seen[nx][ny] = True
                        stack.append((nx, ny))
            best = max(best, area)
    return best
`,
  },
};
