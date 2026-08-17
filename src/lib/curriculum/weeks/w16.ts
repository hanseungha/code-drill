import type { Week } from "@/lib/curriculum/types";

export const w16: Week = {
  week: 16,
  phase: 3,
  title: "BFS 최단 거리와 격자 탐색",
  summary: "BFS가 왜 최단 거리인지 이해하고, 상태를 늘려 더 어려운 문제로.",
  concept: [
    {
      kind: "text",
      body: "격자 BFS는 **바닥에 물이 차오르는 장면**을 떠올리면 쉬워요. 시작칸에 물을 한 방울 떨어뜨리면 상하좌우로 한 겹씩 퍼져 나가요. 벽은 물이 못 지나가요. 어떤 칸에 물이 처음 닿는 순간, 그 칸까지 온 겹의 수가 곧 최단 걸음 수예요. 물은 절대 뒤로 새지 않으니까, 한 번 매겨진 거리는 다시 줄어들 일이 없어요.",
    },
    {
      kind: "text",
      body: "코드로 옮기면 이래요. BFS는 시작점에서 가까운 순서대로 방문해요. 거리 1인 곳을 전부 본 다음 거리 2를 보고, 그다음 거리 3을 봐요. 그래서 **어떤 정점에 처음 도착한 순간이 곧 최단 거리**예요. 나중에 다른 경로로 다시 도달해도 그 경로는 반드시 더 길거나 같아요.",
    },
    {
      kind: "trap",
      title: "이 성질은 모든 간선의 가중치가 같을 때만 성립해요",
      body: "간선마다 비용이 다르면 '가까운 순서'가 '적은 홉 수'와 달라져 BFS는 최단을 보장하지 못해요. 그때는 21주차의 다익스트라가 필요해요. 격자 문제는 한 칸 이동 비용이 모두 1이라 BFS가 통해요.",
    },
    {
      kind: "heading",
      body: "직접 채워 보기: 격자에 물이 차오르듯",
    },
    {
      kind: "text",
      body: "3×3 격자에서 왼쪽 위 `(0,0)`에서 출발해 각 칸의 최단 걸음 수를 매겨 볼게요. `0`은 길, `1`은 벽이에요. 가운데 `(1,1)`이 벽이라 물이 그 칸을 빙 돌아가요. 시작칸은 걸음 수 `0`이고, 물이 한 겹 퍼질 때마다 이웃 칸에 `+1`을 적어요. 아직 물이 안 닿은 칸은 `.`으로 둘게요.",
    },
    {
      kind: "trace",
      caption: "3x3 격자 BFS — 시작 (0,0), 가운데는 벽. dist가 한 겹씩 채워져요",
      lines: [
        "grid (0=길, 1=벽)      좌표",
        "  0 0 0               (0,0) (0,1) (0,2)",
        "  0 1 0               (1,0)  벽   (1,2)",
        "  0 0 0               (2,0) (2,1) (2,2)",
        "",
        "겹 0 : (0,0)에 물 한 방울",
        "  0 . .",
        "  . # .",
        "  . . .",
        "",
        "겹 1 : (0,0)의 이웃 (0,1),(1,0)",
        "  0 1 .",
        "  1 # .",
        "  . . .",
        "",
        "겹 2 : (0,2),(2,0)",
        "  0 1 2",
        "  1 # .",
        "  2 . .",
        "",
        "겹 3 : (1,2),(2,1)",
        "  0 1 2",
        "  1 # 3",
        "  2 3 .",
        "",
        "겹 4 : (2,2)  ← 마지막 칸에 물 도착",
        "  0 1 2",
        "  1 # 3",
        "  2 3 4     → (2,2)까지 최단 4걸음",
      ],
    },
    {
      kind: "text",
      body: "`#`은 벽이라 물이 못 들어간 칸이에요. `(2,2)`는 `(1,2)`(거리 3)와 `(2,1)`(거리 3) 두 곳에서 동시에 물이 닿는데, 어느 쪽으로 와도 거리는 똑같이 4예요. 이게 바로 **처음 닿는 순간이 최단**이라는 뜻이에요. 한 번 숫자가 적힌 칸은 다시 건드리지 않아요 — 방문 배열 대신 `dist`가 `-1`인지로 확인하면 돼요.",
    },
    {
      kind: "heading",
      body: "다중 시작점 BFS",
    },
    {
      kind: "text",
      body: "'모든 익은 토마토에서 동시에 퍼진다'거나 '가장 가까운 병원까지의 거리'처럼 출발점이 여러 개인 문제가 있어요. 시작점마다 BFS를 돌리면 `O(시작점 수 × V)`인데, **처음부터 모든 시작점을 큐에 함께 넣으면** 한 번의 BFS로 끝나요.",
    },
    {
      kind: "text",
      body: "이게 성립하는 이유도 같아요. 큐에 여러 시작점이 거리 0으로 들어 있으면, BFS는 여전히 거리 순서대로 퍼지고 각 칸은 가장 가까운 시작점으로부터의 거리를 갖게 돼요.",
    },
    {
      kind: "heading",
      body: "상태를 늘린 BFS",
    },
    {
      kind: "text",
      body: "이번 주에서 가장 중요한 개념이에요. '벽을 한 번 부술 수 있다'는 조건이 붙으면, 같은 칸이라도 **벽을 이미 부쉈는지 아닌지에 따라 상황이 달라요**. 그러니 방문 배열도 위치만이 아니라 `(위치, 남은 기회)`로 관리해야 해요.",
    },
    {
      kind: "list",
      items: [
        "방문 배열의 차원이 곧 '상태'예요 — `visited[x][y][k]`",
        "상태가 늘면 정점 수가 곱해져요. 기회가 1번이면 정점이 2배가 될 뿐이라 여전히 빨라요",
        "열쇠 여러 개를 모으는 문제라면 비트마스크로 상태를 표현해요 (4주차)",
      ],
    },
    {
      kind: "text",
      body: "이 아이디어를 알아채는 신호는 '~을 한 번 할 수 있다', '~을 k번까지 쓸 수 있다' 같은 조건이에요. 위치만으로 방문을 관리하면 최단 경로를 놓쳐요.",
    },
    {
      kind: "trap",
      title: "상태를 늘렸는데 방문 표시는 위치로만 하면 그대로 틀려요",
      body: "`(위치, 남은 기회)`를 큐에 넣으면서 방문 표시는 `visited[x][y]`로 하는 실수가 잦아요. 벽을 아직 안 부순 상태로 어떤 칸을 먼저 지나가면, 벽을 부순 상태로 같은 칸에 오려 할 때 '이미 방문'이라며 막혀 더 짧은 길을 놓쳐요. 큐에 넣는 상태와 방문 표시의 차원은 **정확히 같아야** 해요 — `visited[x][y][k]`.",
    },
    {
      kind: "heading",
      body: "추상 그래프",
    },
    {
      kind: "text",
      body: "격자만 그래프인 건 아니에요. '한 글자만 바꿔 다른 단어로 갈 수 있다'면 단어가 정점이고 그 변환이 간선이에요. 문제에 지도가 없어도 '상태와 상태 사이의 이동'이 보이면 BFS를 꺼낼 수 있어요.",
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
      note: "모든 시작점을 거리 0으로 큐에 미리 넣어두는 게 전부예요.",
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
      note: "visited의 마지막 차원이 '남은 기회'예요.",
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
      slug: "maze-shortest",
      title: "미로 최단 거리",
      role: "워밍업",
      teaches: "격자 BFS 템플릿",
    },
    {
      slug: "tomato-ripening",
      title: "토마토 익히기",
      role: "핵심",
      teaches: "다중 시작점 BFS",
    },
    {
      slug: "word-ladder",
      title: "단어 변환",
      role: "핵심",
      teaches: "지도가 없는 추상 그래프에서의 BFS",
    },
    {
      slug: "wall-break",
      title: "벽 부수고 이동하기",
      role: "도전",
      teaches: "방문 배열에 상태 차원 추가하기",
    },
  ],
  selfCheck: [
    "BFS가 최단 거리를 보장하는 이유와, 그 보장이 깨지는 조건은 무엇인가요?",
    "시작점이 100개일 때 BFS를 100번 돌리지 않아도 되는 이유는 무엇인가요?",
    "'벽을 한 번 부술 수 있다'는 조건에서 방문 배열이 어떻게 달라져야 하나요?",
    "한 칸에 두 방향에서 동시에 물이 닿아도 최단 거리가 같은 이유를 설명할 수 있나요?",
  ],
};
