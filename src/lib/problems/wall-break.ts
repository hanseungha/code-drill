import type { Problem } from "@/lib/types";

export const wallBreak: Problem = {
  slug: "wall-break",
  title: "벽 부수고 이동하기",
  difficulty: "hard",
  tags: ["BFS", "그래프"],
  summary: "벽을 한 번 부술 수 있을 때 좌상단부터 우하단까지 최소 칸 수를 구해요.",
  description: [
    "`0`은 길, `1`은 벽인 격자 `grid`가 주어져요. 왼쪽 위 `(0, 0)`에서 오른쪽 아래 `(행-1, 열-1)`까지 상하좌우로 움직여요.",
    "이동하는 동안 **벽을 딱 한 번** 부수고 지나갈 수 있어요. 도착 칸까지 지나는 칸 수(출발·도착 포함)의 최솟값을 반환해요. 부수더라도 도착할 수 없으면 `-1`을 반환해요.",
    "같은 칸이라도 **벽을 이미 부쉈는지 아닌지에 따라 상황이 달라요.** 그래서 방문 표시를 `(행, 열)`이 아니라 `(행, 열, 부순 적 있는지)`로 관리해요. 위치만으로 관리하면 최단 경로를 놓쳐요.",
  ],
  examples: [
    {
      input: "grid = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]",
      output: "5",
      explain: "가운데 벽을 한 번 부수면 세로로 내려가다 가로질러 5칸에 도착해요.",
    },
    {
      input: "grid = [[0, 1, 1], [1, 1, 1], [1, 1, 0]]",
      output: "-1",
      explain: "벽을 한 번 부숴서는 도착할 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ 행, 열 ≤ 1,000",
    "각 칸은 0 또는 1이고, 시작 칸 (0, 0)은 0이에요.",
  ],
  entry: { javascript: "wallBreak", python: "wall_break" },
  starter: {
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function wallBreak(grid) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def wall_break(grid):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[0, 1, 0], [0, 1, 0], [0, 1, 0]]], expected: 5 },
    { input: [[[0, 1, 1], [1, 1, 1], [1, 1, 0]]], expected: -1 },
    { input: [[[0]]], expected: 1 },
    { input: [[[0, 0], [1, 0]]], expected: 3 },
    { input: [[[0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 0, 1], [0, 0, 0, 1]]], expected: 7, hidden: true },
    { input: [[[0, 1], [1, 0]]], expected: 3, hidden: true },
  ],
  hint: "거리 배열을 `[행][열][2]`로 만들어요(마지막 차원은 아직 안 부숨/부숨). 이웃이 길이면 같은 상태로 이동하고, 이웃이 벽인데 아직 안 부쉈으면 부순 상태로 이동해요. 도착 칸에 처음 닿은 값이 답이에요.",
  solution: {
    javascript: `function wallBreak(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];
  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => [-1, -1]),
  );
  const queue = [[0, 0, 0]];
  let head = 0;
  dist[0][0][0] = 1;
  while (head < queue.length) {
    const [x, y, broke] = queue[head++];
    if (x === rows - 1 && y === cols - 1) return dist[x][y][broke];
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
      if (grid[nx][ny] === 0 && dist[nx][ny][broke] === -1) {
        dist[nx][ny][broke] = dist[x][y][broke] + 1;
        queue.push([nx, ny, broke]);
      } else if (grid[nx][ny] === 1 && broke === 0 && dist[nx][ny][1] === -1) {
        dist[nx][ny][1] = dist[x][y][0] + 1;
        queue.push([nx, ny, 1]);
      }
    }
  }
  return -1;
}
`,
    python: `from collections import deque


def wall_break(grid):
    rows, cols = len(grid), len(grid[0])
    dirs = ((-1, 0), (1, 0), (0, -1), (0, 1))
    dist = [[[-1, -1] for _ in range(cols)] for _ in range(rows)]
    queue = deque([(0, 0, 0)])
    dist[0][0][0] = 1
    while queue:
        x, y, broke = queue.popleft()
        if x == rows - 1 and y == cols - 1:
            return dist[x][y][broke]
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if not (0 <= nx < rows and 0 <= ny < cols):
                continue
            if grid[nx][ny] == 0 and dist[nx][ny][broke] == -1:
                dist[nx][ny][broke] = dist[x][y][broke] + 1
                queue.append((nx, ny, broke))
            elif grid[nx][ny] == 1 and broke == 0 and dist[nx][ny][1] == -1:
                dist[nx][ny][1] = dist[x][y][0] + 1
                queue.append((nx, ny, 1))
    return -1
`,
  },
};
