import type { Week } from "@/lib/curriculum/types";

export const w20: Week = {
  week: 20,
  phase: 4,
  title: "최단 경로와 위상 정렬",
  summary: "간선에 비용이 붙으면 BFS로는 부족합니다.",
  concept: [
    {
      kind: "text",
      body: "13주차에서 BFS가 최단 거리를 주는 건 모든 간선의 비용이 같을 때뿐이라고 했습니다. 비용이 다르면 '홉 수가 적은 경로'와 '비용이 싼 경로'가 달라집니다. 그때 필요한 것이 다익스트라입니다.",
    },
    {
      kind: "heading",
      body: "다익스트라",
    },
    {
      kind: "text",
      body: "발상은 BFS와 같습니다. 다만 큐 대신 **힙**을 씁니다. '아직 확정되지 않은 정점 중 가장 가까운 것'을 꺼내 확정하고, 거기서 갈 수 있는 곳의 거리를 갱신합니다. 힙 덕분에 '가장 가까운 것'을 `O(log V)`에 찾을 수 있어 전체가 `O((V + E) log V)`입니다.",
    },
    {
      kind: "text",
      body: "정확성의 핵심은 이렇습니다. 가장 가까운 미확정 정점을 꺼냈다면, 그보다 짧은 경로는 존재할 수 없습니다. 다른 경로로 돌아가려면 이미 더 먼 정점을 거쳐야 하고, 비용이 음수가 아닌 한 그건 더 비싸기 때문입니다.",
    },
    {
      kind: "trap",
      title: "음수 간선이 있으면 다익스트라가 깨집니다",
      body: "위 논리가 '비용이 음수가 아니다'에 기대고 있습니다. 음수 간선이 있으면 먼 길로 돌아가다 큰 음수를 만나 더 싸질 수 있어, 확정한 정점을 나중에 뒤집어야 합니다. 그때는 벨만-포드(`O(VE)`)를 씁니다. 벨만-포드는 음수 사이클 탐지도 겸합니다.",
    },
    {
      kind: "trap",
      title: "힙에서 꺼낸 값이 최신인지 확인해야 합니다",
      body: "거리를 갱신할 때마다 힙에 새로 넣으면 같은 정점이 여러 번 들어갑니다. 꺼냈을 때 기록된 거리보다 크면 이미 처리된 낡은 항목이므로 건너뛰세요. 이 한 줄을 빠뜨리면 답은 맞아도 시간이 크게 늘어납니다.",
    },
    {
      kind: "heading",
      body: "세 가지 최단 경로",
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
      body: "플로이드-워셜은 3중 반복문 다섯 줄이 전부라 정점이 500개 이하면 먼저 고려할 만합니다. **가운데 경유지 루프가 가장 바깥**에 와야 한다는 점만 기억하세요. 순서를 바꾸면 틀립니다.",
    },
    {
      kind: "heading",
      body: "위상 정렬",
    },
    {
      kind: "text",
      body: "'A를 끝내야 B를 할 수 있다'는 선후 관계가 있을 때, 모두를 만족하는 순서를 찾는 것이 위상 정렬입니다. 방향 그래프에 사이클이 없어야(DAG) 가능합니다.",
    },
    {
      kind: "text",
      body: "구현은 간단합니다. 각 정점의 **진입 차수**(자기를 가리키는 간선 수)를 세고, 0인 것을 큐에 넣습니다. 하나 꺼낼 때마다 그 정점이 가리키는 곳들의 진입 차수를 1씩 줄이고, 0이 되면 큐에 넣습니다.",
    },
    {
      kind: "text",
      body: "이 과정에서 **꺼낸 정점 수가 전체보다 적으면 사이클이 있다는 뜻**입니다. 서로가 서로를 기다려 진입 차수가 영영 0이 되지 않기 때문입니다. 그래서 위상 정렬은 사이클 탐지에도 그대로 쓰입니다.",
    },
  ],
  patterns: [
    {
      title: "다익스트라",
      note: "낡은 항목 건너뛰기(첫 if)가 성능의 핵심입니다.",
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
      title: "플로이드-워셜",
      note: "경유지 k가 가장 바깥 루프여야 합니다.",
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
if (order.length < n) return [];          // 사이클이 있습니다`,
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
    return []                             # 사이클이 있습니다`,
      },
    },
  ],
  problems: [
    {
      title: "다익스트라 최단 경로",
      role: "워밍업",
      teaches: "힙을 쓴 BFS 확장",
    },
    {
      title: "네트워크 지연 시간",
      role: "핵심",
      teaches: "모든 정점까지의 거리 중 최댓값",
    },
    {
      title: "수강 과목 순서",
      role: "핵심",
      teaches: "위상 정렬과 사이클 탐지",
    },
    {
      title: "모든 쌍 최단 거리",
      role: "도전",
      teaches: "플로이드-워셜의 루프 순서",
    },
  ],
  selfCheck: [
    "다익스트라가 음수 간선에서 깨지는 이유를 설명할 수 있는가?",
    "힙에서 꺼낸 항목이 낡았는지 확인하지 않으면 무엇이 나빠지는가?",
    "위상 정렬 결과의 길이가 정점 수보다 짧다면 그건 무슨 뜻인가?",
  ],
};
