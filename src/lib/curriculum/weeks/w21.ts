import type { Week } from "@/lib/curriculum/types";

export const w21: Week = {
  week: 21,
  phase: 4,
  title: "최단 경로와 위상 정렬",
  summary: "간선에 비용이 붙으면 BFS로는 부족해요.",
  concept: [
    {
      kind: "text",
      body: "16주차에서 BFS가 최단 거리를 주는 건 모든 간선의 비용이 같을 때뿐이라고 했어요. 비용이 다르면 '홉 수가 적은 경로'와 '비용이 싼 경로'가 달라져요. 그때 필요한 게 다익스트라예요.",
    },
    {
      kind: "heading",
      body: "다익스트라",
    },
    {
      kind: "text",
      body: "안개 낀 지도를 떠올려 봐요. 출발점 주변만 걷혀 있고, 나머지는 아직 거리를 몰라요. 다익스트라는 **지금까지 거리가 확정되지 않은 곳 중 가장 가까운 곳부터 안개를 걷어요.** 한 곳을 확정할 때마다 그 이웃들의 거리를 '여기를 거치면 이만큼'으로 갱신하고, 다시 가장 가까운 미확정 지점으로 넘어가요. 가까운 데부터 하나씩 확정하니, 한 번 걷힌 곳의 거리는 다시 바뀌지 않아요.",
    },
    {
      kind: "text",
      body: "발상은 BFS와 같아요. 다만 큐 대신 **힙**을 써요. '아직 확정되지 않은 정점 중 가장 가까운 것'을 꺼내 확정하고, 거기서 갈 수 있는 곳의 거리를 갱신해요. 힙 덕분에 '가장 가까운 것'을 `O(log V)`에 찾을 수 있어 전체가 `O((V + E) log V)`예요.",
    },
    {
      kind: "text",
      body: "정확성의 핵심은 이래요. 가장 가까운 미확정 정점을 꺼냈다면, 그보다 짧은 경로는 존재할 수 없어요. 다른 경로로 돌아가려면 이미 더 먼 정점을 거쳐야 하고, 비용이 음수가 아닌 한 그건 더 비싸기 때문이에요.",
    },
    {
      kind: "trap",
      title: "음수 간선이 있으면 다익스트라가 깨져요",
      body: "위 논리가 '비용이 음수가 아니다'에 기대고 있어요. 음수 간선이 있으면 먼 길로 돌아가다 큰 음수를 만나 더 싸질 수 있어, 확정한 정점을 나중에 뒤집어야 해요. 그때는 벨만-포드(`O(VE)`)를 써요. 벨만-포드는 음수 사이클 탐지도 겸해요.",
    },
    {
      kind: "trap",
      title: "힙에서 꺼낸 값이 최신인지 확인해야 해요",
      body: "거리를 갱신할 때마다 힙에 새로 넣으면 같은 정점이 여러 번 들어가요. 꺼냈을 때 기록된 거리보다 크면 이미 처리된 낡은 항목이므로 건너뛰어요. 이 한 줄을 빠뜨리면 답은 맞아도 시간이 크게 늘어나요.",
    },
    {
      kind: "heading",
      body: "직접 따라가 보기: 다익스트라",
    },
    {
      kind: "text",
      body: "정점 4개짜리 방향 그래프에서 정점 0으로부터의 최단 거리를 구해 볼게요. 힙에서 **가장 가까운 것**을 꺼내는 순서와 `dist` 배열이 어떻게 갱신되는지 보면, '가까운 것부터 확정한다'는 말이 손에 잡혀요. `dist`는 처음에 시작점만 0, 나머지는 ∞(못 감)로 둬요.",
    },
    {
      kind: "trace",
      caption: "정점 0에서 출발 — 힙에서 꺼내는 순서와 dist 변화",
      lines: [
        "간선 (방향, 비용)      dist  [ 0   1   2   3 ]",
        "  0 -> 1 : 1          시작  [ 0   *   *   * ]   (* = 무한대)",
        "  0 -> 2 : 4",
        "  1 -> 2 : 2          힙: (0,0)",
        "  1 -> 3 : 6",
        "  2 -> 3 : 3",
        "",
        "꺼냄 (0,0)  1<- 0+1=1,  2<- 0+4=4    dist [ 0   1   4   * ]",
        "꺼냄 (1,1)  2<- 1+2=3,  3<- 1+6=7    dist [ 0   1   3   7 ]",
        "꺼냄 (3,2)  3<- 3+3=6 (7보다 쌈)      dist [ 0   1   3   6 ]",
        "꺼냄 (4,2)  4 > dist[2]=3 이라 건너뜀   (낡은 항목)",
        "꺼냄 (6,3)  이웃 없음                  dist [ 0   1   3   6 ]",
        "",
        "최단 거리 -> 0:0  1:1  2:3  3:6",
      ],
    },
    {
      kind: "text",
      body: "정점 2를 보면 처음엔 `0→2`로 4였다가, 더 가까운 정점 1을 확정한 뒤 `0→1→2`로 3까지 줄었어요. 그래서 힙엔 정점 2가 (4, 2)와 (3, 2) 두 번 들어가 있었고, 낡은 (4, 2)는 꺼낼 때 `dist[2]=3`보다 커서 그냥 건너뛰었어요. 위 트랩에서 말한 그 상황이에요.",
    },
    {
      kind: "heading",
      body: "네 가지 최단 경로",
    },
    {
      kind: "table",
      headers: ["알고리즘", "용도", "복잡도", "음수 간선"],
      rows: [
        ["BFS", "모든 간선 비용이 같을 때", "`O(V + E)`", "해당 없음"],
        ["다익스트라", "한 정점에서 전체로", "`O((V+E) log V)`", "불가"],
        ["벨만-포드", "음수 간선, 사이클 탐지", "`O(VE)`", "가능"],
        ["플로이드-워셜", "모든 쌍 사이", "`O(V³)`", "가능"],
      ],
    },
    {
      kind: "text",
      body: "플로이드-워셜은 3중 반복문 다섯 줄이 전부라 정점이 500개 이하면 먼저 고려할 만해요. **가운데 경유지 루프가 가장 바깥**에 와야 한다는 점만 기억해요. 순서를 바꾸면 틀려요.",
    },
    {
      kind: "heading",
      body: "벨만-포드",
    },
    {
      kind: "text",
      body: "음수 간선이 있을 때 쓰는 알고리즘이에요. 발상은 다익스트라보다 오히려 단순해요 — 힙으로 '가장 가까운 것'을 고르는 대신, **모든 간선을 훑으며 거리를 줄이는 일을 V−1번 반복**해요. 최단 경로에 정점이 최대 V개 들어가므로 간선은 최대 V−1개, 그래서 V−1번이면 충분해요.",
    },
    {
      kind: "text",
      body: "V−1번을 돌고 나서 **한 번 더 돌렸는데도 거리가 줄어든다면 음수 사이클이 있다는 뜻**이에요. 돌면 돌수록 싸지는 고리가 있다는 말이므로 최단 경로 자체가 정의되지 않아요. '음수 사이클이 있으면 −1을 출력하라'는 문제는 이 성질을 그대로 묻는 거예요.",
    },
    {
      kind: "text",
      body: "`O(VE)`라 다익스트라보다 훨씬 느려요. 음수 간선이 없다면 쓸 이유가 없어요. 반대로 '시간을 되돌리는 웜홀', '이득이 나는 환전' 같은 표현이 보이면 음수 간선 신호예요.",
    },
    {
      kind: "heading",
      body: "위상 정렬",
    },
    {
      kind: "text",
      body: "'A를 끝내야 B를 할 수 있다'는 선후 관계가 있을 때, 모두를 만족하는 순서를 찾는 게 위상 정렬이에요. 방향 그래프에 사이클이 없어야(DAG) 가능해요.",
    },
    {
      kind: "text",
      body: "구현은 간단해요. 각 정점의 **진입 차수**(자기를 가리키는 간선 수)를 세고, 0인 것을 큐에 넣어요. 하나 꺼낼 때마다 그 정점이 가리키는 곳들의 진입 차수를 1씩 줄이고, 0이 되면 큐에 넣어요.",
    },
    {
      kind: "text",
      body: "이 과정에서 **꺼낸 정점 수가 전체보다 적으면 사이클이 있다는 뜻**이에요. 서로가 서로를 기다려 진입 차수가 영영 0이 되지 않기 때문이에요. 그래서 위상 정렬은 사이클 탐지에도 그대로 쓰여요.",
    },
  ],
  patterns: [
    {
      title: "다익스트라",
      note: "낡은 항목 건너뛰기(첫 if)가 성능의 핵심이에요.",
      code: {
        javascript: `const dist = new Array(n).fill(Infinity);
dist[start] = 0;
const heap = new MinHeap((a, b) => a[0] - b[0]);
heap.push([0, start]);
while (heap.size > 0) {
  const [d, v] = heap.pop();
  if (d > dist[v]) continue;              // 낡은 항목
  for (const [next, cost] of graph[v]) {
    if (dist[v] + cost < dist[next]) {
      dist[next] = dist[v] + cost;
      heap.push([dist[next], next]);
    }
  }
}`,
        python: `import heapq

dist = [float("inf")] * n
dist[start] = 0
heap = [(0, start)]
while heap:
    d, v = heapq.heappop(heap)
    if d > dist[v]:                       # 낡은 항목
        continue
    for nxt, cost in graph[v]:
        if dist[v] + cost < dist[nxt]:
            dist[nxt] = dist[v] + cost
            heapq.heappush(heap, (dist[nxt], nxt))`,
      },
    },
    {
      title: "벨만-포드",
      note: "V-1번 돌린 뒤 한 번 더 줄어들면 음수 사이클이에요.",
      code: {
        javascript: `const dist = new Array(n).fill(Infinity);
dist[start] = 0;

for (let round = 0; round < n - 1; round++) {
  for (const [a, b, cost] of edges) {
    if (dist[a] === Infinity) continue;     // 아직 못 간 곳
    if (dist[a] + cost < dist[b]) dist[b] = dist[a] + cost;
  }
}

for (const [a, b, cost] of edges) {         // 한 번 더 — 음수 사이클 판정
  if (dist[a] !== Infinity && dist[a] + cost < dist[b]) return -1;
}`,
        python: `INF = float("inf")
dist = [INF] * n
dist[start] = 0

for _ in range(n - 1):
    for a, b, cost in edges:
        if dist[a] == INF:                  # 아직 못 간 곳
            continue
        if dist[a] + cost < dist[b]:
            dist[b] = dist[a] + cost

for a, b, cost in edges:                    # 한 번 더 — 음수 사이클 판정
    if dist[a] != INF and dist[a] + cost < dist[b]:
        return -1`,
      },
    },
    {
      title: "플로이드-워셜",
      note: "경유지 k가 가장 바깥 루프여야 해요.",
      code: {
        javascript: `for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dist[i][k] + dist[k][j] < dist[i][j]) {
        dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
}`,
        python: `for k in range(n):
    for i in range(n):
        for j in range(n):
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]`,
      },
    },
    {
      title: "위상 정렬 (진입 차수 + 큐)",
      code: {
        javascript: `const indegree = new Array(n).fill(0);
for (const [a, b] of edges) indegree[b]++;
const queue = [];
for (let v = 0; v < n; v++) if (indegree[v] === 0) queue.push(v);
const order = [];
let head = 0;
while (head < queue.length) {
  const v = queue[head++];
  order.push(v);
  for (const next of graph[v]) {
    if (--indegree[next] === 0) queue.push(next);
  }
}
if (order.length < n) return [];          // 사이클이 있어요`,
        python: `from collections import deque

indegree = [0] * n
for a, b in edges:
    indegree[b] += 1
queue = deque(v for v in range(n) if indegree[v] == 0)
order = []
while queue:
    v = queue.popleft()
    order.append(v)
    for nxt in graph[v]:
        indegree[nxt] -= 1
        if indegree[nxt] == 0:
            queue.append(nxt)
if len(order) < n:
    return []                             # 사이클이 있어요`,
      },
    },
  ],
  problems: [
    {
      slug: "dijkstra",
      title: "다익스트라 최단 경로",
      role: "워밍업",
      teaches: "힙을 쓴 BFS 확장",
    },
    {
      slug: "bellman-ford",
      title: "음수 간선이 있는 최단 경로",
      role: "핵심",
      teaches: "벨만-포드와 음수 사이클 판정",
    },
    {
      slug: "course-order",
      title: "수강 과목 순서",
      role: "핵심",
      teaches: "위상 정렬과 사이클 탐지",
    },
    {
      slug: "floyd-warshall",
      title: "모든 쌍 최단 거리",
      role: "도전",
      teaches: "플로이드-워셜의 루프 순서",
    },
  ],
  selfCheck: [
    "다익스트라가 음수 간선에서 깨지는 이유를 설명할 수 있나요?",
    "힙에서 꺼낸 항목이 낡았는지 확인하지 않으면 무엇이 나빠지나요?",
    "벨만-포드를 V-1번만 돌려도 되는 이유는 무엇인가요?",
    "위상 정렬 결과의 길이가 정점 수보다 짧다면 그건 무슨 뜻인가요?",
  ],
};
