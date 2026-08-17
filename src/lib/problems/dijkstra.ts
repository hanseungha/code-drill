import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const dijkstra: Problem = {
  slug: "dijkstra",
  title: "다익스트라 최단 경로",
  difficulty: "medium",
  tags: ["그래프", "다익스트라", "힙"],
  summary: "가중치가 있는 그래프에서 한 정점부터 모든 정점까지의 최단 거리를 구해요.",
  description: [
    "정점 개수 `n`, 방향 간선 목록 `edges`, 시작 정점 `start`가 주어져요. 정점은 `0`번부터 `n-1`번까지 있고, `edges`의 각 원소 `[u, v, w]`는 u에서 v로 가는 비용 `w`인 간선이에요. 비용은 모두 **0 이상**이에요.",
    "`start`에서 각 정점까지의 **최단 거리**를 배열로 반환해요. `i`번째 값은 `start`에서 `i`까지의 최단 거리이고, `start` 자신은 0이에요. 갈 수 없는 정점은 `-1`로 표시해요.",
    "BFS와 발상은 같지만 큐 대신 **힙**을 써서 '아직 확정 안 된 정점 중 가장 가까운 것'을 꺼내요. 힙에서 꺼낸 거리가 기록된 거리보다 크면 낡은 항목이니 건너뛰어요.",
    "JavaScript는 스타터의 `MinHeap`을, 파이썬은 `heapq`를 써요.",
  ],
  examples: [
    {
      input: "n = 5, edges = [[0, 1, 2], [0, 2, 5], [1, 2, 1], [1, 3, 2], [2, 3, 3], [3, 4, 1]], start = 0",
      output: "[0, 2, 3, 4, 5]",
      explain: "0→1(2)→2(1)이 2까지 3, 1→3(2)로 3까지 4, 3→4(1)로 4까지 5예요.",
    },
    {
      input: "n = 3, edges = [[0, 1, 4]], start = 0",
      output: "[0, 4, -1]",
      explain: "2번 정점으로는 갈 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 300,000",
    "0 ≤ u, v, start < n, 0 ≤ w ≤ 10,000",
  ],
  entry: { javascript: "dijkstra", python: "dijkstra" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @param {number} start
 * @return {number[]}
 */
function dijkstra(n, edges, start) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def dijkstra(n, edges, start):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [[0, 1, 2], [0, 2, 5], [1, 2, 1], [1, 3, 2], [2, 3, 3], [3, 4, 1]], 0], expected: [0, 2, 3, 4, 5] },
    { input: [3, [[0, 1, 4]], 0], expected: [0, 4, -1] },
    { input: [1, [], 0], expected: [0] },
    { input: [4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 10]], 0], expected: [0, 1, 2, 3] },
    { input: [3, [[0, 1, 5], [0, 1, 2], [1, 2, 1]], 0], expected: [0, 2, 3], hidden: true },
    { input: [4, [[1, 0, 3], [2, 3, 1]], 0], expected: [0, -1, -1, -1], hidden: true },
  ],
  hint: "인접 리스트를 만들고 거리 배열을 무한대로, 시작점을 0으로 둬요. `[거리, 정점]`을 힙에 넣고 가장 가까운 것을 꺼내요. 꺼낸 거리가 기록보다 크면 건너뛰고, 아니면 이웃의 거리를 줄일 수 있을 때 갱신해 힙에 넣어요. 끝나고 무한대는 -1로 바꿔 반환해요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function dijkstra(n, edges, start) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) graph[u].push([v, w]);
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, start]);
  while (heap.size > 0) {
    const [d, v] = heap.pop();
    if (d > dist[v]) continue;
    for (const [next, w] of graph[v]) {
      if (dist[v] + w < dist[next]) {
        dist[next] = dist[v] + w;
        heap.push([dist[next], next]);
      }
    }
  }
  return dist.map((x) => (x === Infinity ? -1 : x));
}
`,
    python: `import heapq


def dijkstra(n, edges, start):
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))
    inf = float("inf")
    dist = [inf] * n
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, v = heapq.heappop(heap)
        if d > dist[v]:
            continue
        for nxt, w in graph[v]:
            if dist[v] + w < dist[nxt]:
                dist[nxt] = dist[v] + w
                heapq.heappush(heap, (dist[nxt], nxt))
    return [-1 if x == inf else x for x in dist]
`,
  },
};
