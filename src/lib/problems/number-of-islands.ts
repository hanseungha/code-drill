import type { Problem } from "@/lib/types";

export const numberOfIslands: Problem = {
  slug: "number-of-islands",
  title: "섬의 개수",
  difficulty: "medium",
  tags: ["그래프", "BFS/DFS"],
  summary: "2차원 격자에서 상하좌우로 이어진 땅 덩어리의 수를 세요.",
  description: [
    "`1`(땅)과 `0`(물)로 이루어진 2차원 배열 `grid`가 주어져요. 섬의 개수를 반환해요.",
    "섬은 상하좌우로 인접한 땅끼리 이어진 덩어리예요. 대각선으로는 이어지지 않아요. 격자의 바깥은 모두 물로 둘러싸여 있다고 생각해요.",
  ],
  examples: [
    {
      input: "grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]",
      output: "3",
      explain: "좌상단 덩어리, 가운데 한 칸, 우하단 두 칸으로 총 3개예요.",
    },
    {
      input: "grid = [[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]",
      output: "1",
    },
  ],
  constraints: [
    "1 ≤ grid.length, grid[i].length ≤ 300",
    "grid[i][j]는 0 또는 1이에요.",
  ],
  entry: { javascript: "numIslands", python: "num_islands" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def num_islands(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    {
      input: [
        [
          [1, 1, 1, 1, 0],
          [1, 1, 0, 1, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      ],
      expected: 1,
    },
    {
      input: [
        [
          [1, 1, 0, 0, 0],
          [1, 1, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 1, 1],
        ],
      ],
      expected: 3,
    },
    { input: [[[0]]], expected: 0 },
    { input: [[[1]]], expected: 1 },
    {
      input: [
        [
          [1, 0, 1, 0, 1],
          [0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1],
        ],
      ],
      expected: 8,
      hidden: true,
    },
    {
      input: [
        [
          [1, 1, 1],
          [0, 1, 0],
          [1, 1, 1],
        ],
      ],
      expected: 1,
      hidden: true,
    },
  ],
  hint: "격자를 훑다가 아직 방문하지 않은 1을 만나면 섬 개수를 1 늘리고, 거기서 BFS나 DFS로 이어진 땅을 전부 방문 처리해요.",
  solution: {
    javascript: `function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const seen = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 1 || seen[r][c]) continue;
      count++;
      const stack = [[r, c]];
      seen[r][c] = true;
      while (stack.length) {
        const [y, x] = stack.pop();
        for (const [dy, dx] of dirs) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) continue;
          if (seen[ny][nx] || grid[ny][nx] !== 1) continue;
          seen[ny][nx] = true;
          stack.push([ny, nx]);
        }
      }
    }
  }
  return count;
}
`,
    python: `def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    seen = [[False] * cols for _ in range(rows)]
    count = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != 1 or seen[r][c]:
                continue
            count += 1
            stack = [(r, c)]
            seen[r][c] = True
            while stack:
                y, x = stack.pop()
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < rows and 0 <= nx < cols:
                        if not seen[ny][nx] and grid[ny][nx] == 1:
                            seen[ny][nx] = True
                            stack.append((ny, nx))
    return count
`,
  },
};
