import type { Problem } from "@/lib/types";

export const mazeShortest: Problem = {
  slug: "maze-shortest",
  title: "미로 최단 거리",
  difficulty: "easy",
  tags: ["BFS", "그래프"],
  summary: "격자 미로에서 좌상단부터 우하단까지 지나는 최소 칸 수를 BFS로 구해요.",
  description: [
    "`0`은 지나갈 수 있는 길, `1`은 벽인 격자 `grid`가 주어져요. 왼쪽 위 칸 `(0, 0)`에서 오른쪽 아래 칸 `(행-1, 열-1)`까지 상하좌우로만 움직여요.",
    "출발 칸과 도착 칸을 **모두 포함해** 지나는 칸 수가 가장 적은 경로의 칸 수를 반환해요. 도착할 수 없으면 `-1`을 반환해요.",
    "BFS는 시작점에서 가까운 칸부터 층층이 퍼지니, 도착 칸에 **처음 닿은 순간이 곧 최단**이에요.",
  ],
  examples: [
    {
      input: "grid = [[0, 0, 1], [1, 0, 0], [1, 1, 0]]",
      output: "5",
      explain: "(0,0)→(0,1)→(1,1)→(1,2)→(2,2), 다섯 칸이에요.",
    },
    {
      input: "grid = [[0, 1], [1, 0]]",
      output: "-1",
      explain: "벽에 막혀 도착 칸으로 갈 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ 행, 열 ≤ 1,000",
    "각 칸은 0 또는 1이고, 시작 칸 (0, 0)은 항상 0이에요.",
  ],
  entry: { javascript: "mazeShortest", python: "maze_shortest" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function mazeShortest(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def maze_shortest(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[0, 0, 1], [1, 0, 0], [1, 1, 0]]], expected: 5 },
    { input: [[[0, 1], [1, 0]]], expected: -1 },
    { input: [[[0]]], expected: 1 },
    { input: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]]], expected: 5 },
    { input: [[[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 1, 1, 1], [0, 0, 0, 0]]], expected: 14, hidden: true },
    { input: [[[0, 1, 0], [0, 1, 0], [0, 0, 0]]], expected: 5, hidden: true },
  ],
  hint: "거리 배열을 -1로 채우고 시작 칸을 1로 둬요(칸 수를 세니까요). 큐에서 칸을 꺼내 상하좌우 이웃 중 벽이 아니고 아직 방문하지 않은 칸을 `현재 + 1`로 표시하며 넣어요. 마지막에 도착 칸의 값을 반환하면 돼요.",
  solution: {
    javascript: `function mazeShortest(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const queue = [[0, 0]];
  let head = 0;
  dist[0][0] = 1;
  while (head < queue.length) {
    const [x, y] = queue[head++];
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
      if (grid[nx][ny] === 1 || dist[nx][ny] !== -1) continue;
      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
  return dist[rows - 1][cols - 1];
}
`,
    python: `from collections import deque


def maze_shortest(grid):
    rows, cols = len(grid), len(grid[0])
    dirs = ((-1, 0), (1, 0), (0, -1), (0, 1))
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque([(0, 0)])
    dist[0][0] = 1
    while queue:
        x, y = queue.popleft()
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if not (0 <= nx < rows and 0 <= ny < cols):
                continue
            if grid[nx][ny] == 1 or dist[nx][ny] != -1:
                continue
            dist[nx][ny] = dist[x][y] + 1
            queue.append((nx, ny))
    return dist[rows - 1][cols - 1]
`,
  },
};
