import type { Week } from "@/lib/curriculum/types";

export const w13: Week = {
  week: 13,
  phase: 3,
  title: "BFS 최단 거리와 격자 탐색",
  summary: "BFS가 왜 최단 거리인지 이해하고, 상태를 늘려 더 어려운 문제로.",
  concept: [
    {
      kind: "text",
      body: "BFS는 시작점에서 가까운 순서대로 방문합니다. 거리 1인 곳을 전부 본 다음 거리 2를 보고, 그다음 거리 3을 봅니다. 그래서 **어떤 정점에 처음 도착한 순간이 곧 최단 거리**입니다. 나중에 다른 경로로 다시 도달해도 그 경로는 반드시 더 길거나 같습니다.",
    },
    {
      kind: "trap",
      title: "이 성질은 모든 간선의 가중치가 같을 때만 성립합니다",
      body: "간선마다 비용이 다르면 '가까운 순서'가 '적은 홉 수'와 달라져 BFS는 최단을 보장하지 못합니다. 그때는 20주차의 다익스트라가 필요합니다. 격자 문제는 한 칸 이동 비용이 모두 1이라 BFS가 통합니다.",
    },
    {
      kind: "heading",
      body: "다중 시작점 BFS",
    },
    {
      kind: "text",
      body: "'모든 익은 토마토에서 동시에 퍼진다'거나 '가장 가까운 병원까지의 거리'처럼 출발점이 여러 개인 문제가 있습니다. 시작점마다 BFS를 돌리면 `O(시작점 수 × V)`인데, **처음부터 모든 시작점을 큐에 함께 넣으면** 한 번의 BFS로 끝납니다.",
    },
    {
      kind: "text",
      body: "이게 성립하는 이유도 같습니다. 큐에 여러 시작점이 거리 0으로 들어 있으면, BFS는 여전히 거리 순서대로 퍼지고 각 칸은 가장 가까운 시작점으로부터의 거리를 갖게 됩니다.",
    },
    {
      kind: "heading",
      body: "상태를 늘린 BFS",
    },
    {
      kind: "text",
      body: "이번 주에서 가장 중요한 개념입니다. '벽을 한 번 부술 수 있다'는 조건이 붙으면, 같은 칸이라도 **벽을 이미 부쉈는지 아닌지에 따라 상황이 다릅니다**. 그러니 방문 배열도 위치만이 아니라 `(위치, 남은 기회)`로 관리해야 합니다.",
    },
    {
      kind: "list",
      items: [
        "방문 배열의 차원이 곧 '상태'입니다 — `visited[x][y][k]`",
        "상태가 늘면 정점 수가 곱해집니다. 기회가 1번이면 정점이 2배가 될 뿐이라 여전히 빠릅니다",
        "열쇠 여러 개를 모으는 문제라면 비트마스크로 상태를 표현합니다 (23주차)",
      ],
    },
    {
      kind: "text",
      body: "이 아이디어를 알아채는 신호는 '~을 한 번 할 수 있다', '~을 k번까지 쓸 수 있다' 같은 조건입니다. 위치만으로 방문을 관리하면 최단 경로를 놓칩니다.",
    },
    {
      kind: "heading",
      body: "추상 그래프",
    },
    {
      kind: "text",
      body: "격자만 그래프인 것은 아닙니다. '한 글자만 바꿔 다른 단어로 갈 수 있다'면 단어가 정점이고 그 변환이 간선입니다. 문제에 지도가 없어도 '상태와 상태 사이의 이동'이 보이면 BFS를 꺼낼 수 있습니다.",
    },
  ],
  patterns: [
    {
      title: "격자 BFS 최단 거리",
      code: {
        javascript: `const dist = Array.from({ length: rows }, () => new Array(cols).fill(-1));
const queue = [[sx, sy]];
let head = 0;
dist[sx][sy] = 0;
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
}`,
        python: `from collections import deque

dist = [[-1] * cols for _ in range(rows)]
queue = deque([(sx, sy)])
dist[sx][sy] = 0
while queue:
    x, y = queue.popleft()
    for dx, dy in DIRS:
        nx, ny = x + dx, y + dy
        if not (0 <= nx < rows and 0 <= ny < cols):
            continue
        if grid[nx][ny] == 1 or dist[nx][ny] != -1:
            continue
        dist[nx][ny] = dist[x][y] + 1
        queue.append((nx, ny))`,
      },
    },
    {
      title: "다중 시작점 BFS",
      note: "모든 시작점을 거리 0으로 큐에 미리 넣어두는 것이 전부입니다.",
      code: {
        javascript: `const queue = [];
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (grid[i][j] === 1) {
      dist[i][j] = 0;
      queue.push([i, j]);
    }
  }
}`,
        python: `queue = deque()
for i in range(rows):
    for j in range(cols):
        if grid[i][j] == 1:
            dist[i][j] = 0
            queue.append((i, j))`,
      },
    },
    {
      title: "상태를 추가한 BFS",
      note: "visited의 마지막 차원이 '남은 기회'입니다.",
      code: {
        javascript: `// visited[x][y][k] — k는 남은 부수기 횟수
const visited = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => new Array(K + 1).fill(false)),
);
// 벽이면 기회를 하나 쓰고 진행
if (grid[nx][ny] === 1 && k > 0 && !visited[nx][ny][k - 1]) {
  visited[nx][ny][k - 1] = true;
  queue.push([nx, ny, k - 1, step + 1]);
}`,
        python: `# visited[x][y][k] — k는 남은 부수기 횟수
visited = [[[False] * (K + 1) for _ in range(cols)] for _ in range(rows)]
# 벽이면 기회를 하나 쓰고 진행
if grid[nx][ny] == 1 and k > 0 and not visited[nx][ny][k - 1]:
    visited[nx][ny][k - 1] = True
    queue.append((nx, ny, k - 1, step + 1))`,
      },
    },
  ],
  problems: [
    {
      title: "미로 최단 거리",
      role: "워밍업",
      teaches: "격자 BFS 템플릿",
    },
    {
      title: "토마토 익히기",
      role: "핵심",
      teaches: "다중 시작점 BFS",
    },
    {
      title: "단어 변환",
      role: "핵심",
      teaches: "지도가 없는 추상 그래프에서의 BFS",
    },
    {
      title: "벽 부수고 이동하기",
      role: "도전",
      teaches: "방문 배열에 상태 차원 추가하기",
    },
  ],
  selfCheck: [
    "BFS가 최단 거리를 보장하는 이유와, 그 보장이 깨지는 조건은?",
    "시작점이 100개일 때 BFS를 100번 돌리지 않아도 되는 이유는?",
    "'벽을 한 번 부술 수 있다'는 조건에서 방문 배열이 어떻게 달라져야 하는가?",
  ],
};
