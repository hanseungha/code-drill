import type { Problem } from "@/lib/types";

export const tomatoRipening: Problem = {
  slug: "tomato-ripening",
  title: "토마토 익히기",
  difficulty: "medium",
  tags: ["BFS", "그래프"],
  summary: "익은 토마토가 사방으로 퍼져 모두 익는 데 걸리는 최소 일수를 구해요.",
  description: [
    "토마토 상자 `box`가 격자로 주어져요. `1`은 익은 토마토, `0`은 안 익은 토마토, `-1`은 토마토가 없는 칸이에요.",
    "하루가 지나면 익은 토마토는 상하좌우로 붙어 있는 안 익은 토마토를 익혀요. **모든** 토마토가 익는 데 걸리는 **최소 일수**를 반환해요. 처음부터 다 익어 있으면 `0`, 아무리 지나도 다 익지 못하면 `-1`을 반환해요.",
    "익은 토마토가 여러 개라도 걱정 없어요. 처음부터 익은 토마토를 **모두 큐에 함께 넣고** BFS를 한 번 돌리면, 각 칸은 가장 가까운 토마토로부터 익는 날짜를 갖게 돼요.",
  ],
  examples: [
    {
      input: "box = [[0, 0, 0], [0, 0, 0], [0, 0, 1]]",
      output: "4",
      explain: "오른쪽 아래에서 퍼져 왼쪽 위까지 익는 데 4일 걸려요.",
    },
    {
      input: "box = [[1, -1, 0], [0, -1, 0], [0, 0, 0]]",
      output: "-1",
      explain: "가운데 열이 막혀 왼쪽 아래 토마토들은 익지 못해요.",
    },
    {
      input: "box = [[1, 1, 1], [1, 1, 1]]",
      output: "0",
      explain: "이미 모두 익어 있어요.",
    },
  ],
  constraints: [
    "1 ≤ 행, 열 ≤ 1,000",
    "각 칸은 -1, 0, 1 중 하나예요.",
  ],
  entry: { javascript: "tomatoRipening", python: "tomato_ripening" },
  starter: {
    javascript: `/**
 * @param {number[][]} box
 * @return {number}
 */
function tomatoRipening(box) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def tomato_ripening(box):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[[0, 0, 0], [0, 0, 0], [0, 0, 1]]], expected: 4 },
    { input: [[[1, -1, 0], [0, -1, 0], [0, 0, 0]]], expected: 6 },
    { input: [[[1, 1, 1], [1, 1, 1]]], expected: 0 },
    { input: [[[0, 0, 0], [0, 0, 0]]], expected: -1 },
    { input: [[[1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1]]], expected: 4, hidden: true },
    { input: [[[-1, 1]]], expected: 0, hidden: true },
  ],
  hint: "거리 배열을 -1로 채우고, 처음 익은 토마토(1)를 모두 0일로 큐에 넣어요. BFS로 안 익은(0) 이웃을 `현재 + 1`일로 익히며 퍼뜨려요. 끝나고 아직 안 익은 0이 남아 있으면 -1, 아니면 거리 배열의 최댓값이 답이에요.",
  solution: {
    javascript: `function tomatoRipening(box) {
  const rows = box.length;
  const cols = box[0].length;
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
  const queue = [];
  let head = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (box[i][j] === 1) {
        dist[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }
  while (head < queue.length) {
    const [x, y] = queue[head++];
    for (let d = 0; d < 4; d++) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
      if (box[nx][ny] === 0 && dist[nx][ny] === -1) {
        dist[nx][ny] = dist[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  let days = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (box[i][j] === 0 && dist[i][j] === -1) return -1;
      days = Math.max(days, dist[i][j]);
    }
  }
  return days;
}
`,
    python: `from collections import deque


def tomato_ripening(box):
    rows, cols = len(box), len(box[0])
    dirs = ((-1, 0), (1, 0), (0, -1), (0, 1))
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque()
    for i in range(rows):
        for j in range(cols):
            if box[i][j] == 1:
                dist[i][j] = 0
                queue.append((i, j))
    while queue:
        x, y = queue.popleft()
        for dx, dy in dirs:
            nx, ny = x + dx, y + dy
            if not (0 <= nx < rows and 0 <= ny < cols):
                continue
            if box[nx][ny] == 0 and dist[nx][ny] == -1:
                dist[nx][ny] = dist[x][y] + 1
                queue.append((nx, ny))
    days = 0
    for i in range(rows):
        for j in range(cols):
            if box[i][j] == 0 and dist[i][j] == -1:
                return -1
            days = max(days, dist[i][j])
    return days
`,
  },
};
