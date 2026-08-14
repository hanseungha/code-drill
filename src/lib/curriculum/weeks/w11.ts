import type { Week } from "@/lib/curriculum/types";

export const w11: Week = {
  week: 11,
  phase: 2,
  title: "그래프와 DFS · BFS",
  summary: "트리의 제약을 풀면 그래프입니다. 대신 방문 표시가 필요해집니다.",
  concept: [
    {
      kind: "text",
      body: "그래프는 정점과 간선으로 이루어집니다. 트리도 그래프의 일종인데, 사이클이 없고 부모가 하나뿐이라는 제약이 붙은 특수한 경우입니다. 그 제약을 풀면 **같은 곳을 다시 방문할 수 있게** 되고, 그래서 그래프 탐색에는 방문 배열이 반드시 필요합니다.",
    },
    {
      kind: "heading",
      body: "그래프를 코드로 표현하기",
    },
    {
      kind: "table",
      headers: ["표현", "메모리", "간선 확인", "이웃 순회", "언제"],
      rows: [
        ["인접 리스트", "`O(V + E)`", "`O(차수)`", "빠름", "대부분의 경우"],
        ["인접 행렬", "`O(V²)`", "`O(1)`", "`O(V)`", "정점이 적고 간선이 빽빽할 때"],
      ],
    },
    {
      kind: "text",
      body: "정점이 10만 개면 인접 행렬은 100억 칸이라 아예 만들 수 없습니다. 특별한 이유가 없으면 인접 리스트를 쓰세요. 격자(지도) 문제는 아예 자료구조를 만들지 않고, 좌표 자체를 정점으로 보고 상하좌우를 간선으로 취급합니다.",
    },
    {
      kind: "heading",
      body: "DFS와 BFS",
    },
    {
      kind: "text",
      body: "둘 다 모든 정점을 빠짐없이 훑습니다. 차이는 **다음에 어디를 볼 것인가**뿐입니다. DFS는 갈 수 있는 데까지 깊이 들어갔다가 돌아오고(스택 또는 재귀), BFS는 가까운 곳부터 층층이 퍼집니다(큐).",
    },
    {
      kind: "list",
      items: [
        "**DFS** — 경로를 따라가야 할 때, 연결 여부만 볼 때, 재귀로 짧게 쓰고 싶을 때",
        "**BFS** — 최단 거리가 필요할 때. 간선 가중치가 모두 같으면 BFS가 곧 최단 경로입니다 (13주차)",
      ],
    },
    {
      kind: "trap",
      title: "BFS에서 방문 표시는 큐에 넣을 때 합니다",
      body: "큐에서 꺼낼 때 방문 표시를 하면, 같은 정점이 큐에 여러 번 들어갈 수 있습니다. 격자 문제에서 큐가 폭발해 메모리 초과나 시간 초과가 납니다. **큐에 넣는 순간** 방문했다고 표시하세요. DFS도 마찬가지로 재귀에 들어가기 직전에 표시합니다.",
    },
    {
      kind: "trap",
      title: "연결 요소가 여럿이면 한 번의 탐색으로 부족합니다",
      body: "섬이 여러 개인 지도처럼 그래프가 조각나 있을 수 있습니다. 한 정점에서 시작한 탐색은 그 조각만 훑습니다. 모든 정점을 훑으면서 아직 방문하지 않은 곳이 있으면 거기서 새로 탐색을 시작하고, 시작한 횟수가 곧 연결 요소의 개수입니다.",
    },
  ],
  patterns: [
    {
      title: "인접 리스트 만들기",
      code: {
        javascript: `const graph = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  graph[a].push(b);
  graph[b].push(a); // 방향 그래프면 이 줄을 뺍니다
}`,
        python: `graph = [[] for _ in range(n)]
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)  # 방향 그래프면 이 줄을 뺍니다`,
      },
    },
    {
      title: "DFS (재귀)",
      code: {
        javascript: `const visited = new Array(n).fill(false);
function dfs(v) {
  visited[v] = true;
  for (const next of graph[v]) {
    if (!visited[next]) dfs(next);
  }
}`,
        python: `visited = [False] * n

def dfs(v):
    visited[v] = True
    for nxt in graph[v]:
        if not visited[nxt]:
            dfs(nxt)`,
      },
    },
    {
      title: "BFS (큐)",
      note: "방문 표시를 큐에 넣을 때 하는 것이 핵심입니다.",
      code: {
        javascript: `const visited = new Array(n).fill(false);
const queue = [start];
let head = 0;
visited[start] = true;
while (head < queue.length) {
  const v = queue[head++];
  for (const next of graph[v]) {
    if (visited[next]) continue;
    visited[next] = true;
    queue.push(next);
  }
}`,
        python: `from collections import deque

visited = [False] * n
queue = deque([start])
visited[start] = True
while queue:
    v = queue.popleft()
    for nxt in graph[v]:
        if visited[nxt]:
            continue
        visited[nxt] = True
        queue.append(nxt)`,
      },
    },
    {
      title: "격자에서 상하좌우 훑기",
      note: "델타 배열은 격자 문제마다 나옵니다. 22주차에서 8방향으로 확장합니다.",
      code: {
        javascript: `const DX = [-1, 1, 0, 0];
const DY = [0, 0, -1, 1];
for (let d = 0; d < 4; d++) {
  const nx = x + DX[d];
  const ny = y + DY[d];
  if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;
  // ...
}`,
        python: `DIRS = ((-1, 0), (1, 0), (0, -1), (0, 1))
for dx, dy in DIRS:
    nx, ny = x + dx, y + dy
    if not (0 <= nx < rows and 0 <= ny < cols):
        continue
    # ...`,
      },
    },
  ],
  problems: [
    {
      title: "경로 존재 판별",
      role: "워밍업",
      teaches: "DFS 기본형",
    },
    {
      title: "연결 요소의 개수",
      role: "핵심",
      teaches: "모든 정점에서 탐색을 시작해야 하는 이유",
    },
    {
      slug: "number-of-islands",
      title: "섬의 개수",
      role: "핵심",
      teaches: "격자를 그래프로 보기",
    },
    {
      title: "이분 그래프 판별",
      role: "도전",
      teaches: "순회하면서 색칠하기",
    },
  ],
  selfCheck: [
    "인접 행렬이 불리해지는 조건은 무엇인가?",
    "BFS에서 방문 표시를 꺼낼 때 하면 구체적으로 무슨 일이 벌어지는가?",
    "DFS와 BFS 중 무엇을 고를지 어떤 기준으로 판단하는가?",
  ],
};
