import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const networkDelay: Problem = {
  slug: "network-delay",
  title: "그래프 + 최적화",
  difficulty: "hard",
  tags: ["그래프", "다익스트라", "힙"],
  summary: "한 정점에서 신호가 모든 정점에 닿는 데 걸리는 시간을 구해요.",
  description: [
    "정점 개수 `n`, 방향 가중 간선 목록 `edges`, 시작 정점 `source`가 주어져요. 각 원소 `[u, v, w]`는 u에서 v로 신호가 가는 데 `w`만큼 걸린다는 뜻이에요.",
    "`source`에서 신호를 보냈을 때 **모든 정점에 신호가 닿는 데 걸리는 시간**을 반환해요. 이는 `source`에서 각 정점까지의 최단 시간 중 **가장 큰 값**이에요. 한 정점이라도 신호를 받지 못하면 `-1`을 반환해요.",
    "한 정점에서 전체로 가는 최단 거리는 다익스트라예요. 거기서 최댓값을 취하고, 무한대(못 닿음)가 하나라도 있으면 -1로 처리하면 돼요.",
    "JavaScript는 스타터의 `MinHeap`을, 파이썬은 `heapq`를 써요.",
  ],
  examples: [
    {
      input: "n = 4, edges = [[0, 1, 1], [0, 2, 4], [1, 2, 1], [2, 3, 1]], source = 0",
      output: "3",
      explain: "0→1(1), 0→1→2(2), 0→1→2→3(3)이라 가장 오래 걸리는 곳이 3이에요.",
    },
    {
      input: "n = 3, edges = [[0, 1, 2]], source = 0",
      output: "-1",
      explain: "2번 정점은 신호를 받지 못해요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 300,000",
    "0 ≤ u, v, source < n, 0 ≤ w ≤ 10,000",
  ],
  entry: { javascript: "networkDelay", python: "network_delay" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @param {number} source
 * @return {number}
 */
function networkDelay(n, edges, source) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def network_delay(n, edges, source):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4, [[0, 1, 1], [0, 2, 4], [1, 2, 1], [2, 3, 1]], 0], expected: 3 },
    { input: [3, [[0, 1, 2]], 0], expected: -1 },
    { input: [1, [], 0], expected: 0 },
    { input: [3, [[0, 1, 1], [0, 2, 1], [1, 2, 5]], 0], expected: 1 },
    { input: [5, [[0, 1, 3], [1, 2, 3], [2, 3, 3], [3, 4, 3]], 0], expected: 12, hidden: true },
    { input: [2, [[1, 0, 5]], 0], expected: -1, hidden: true },
  ],
  hint: "다익스트라로 `source`에서 모든 정점까지의 최단 거리를 구해요. 거리 배열을 훑어 무한대가 하나라도 있으면 -1을, 아니면 가장 큰 거리를 반환해요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function networkDelay(n, edges, source) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) graph[u].push([v, w]);
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, source]);
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
  let ans = 0;
  for (const d of dist) {
    if (d === Infinity) return -1;
    ans = Math.max(ans, d);
  }
  return ans;
}
`,
    python: `import heapq


def network_delay(n, edges, source):
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))
    inf = float("inf")
    dist = [inf] * n
    dist[source] = 0
    heap = [(0, source)]
    while heap:
        d, v = heapq.heappop(heap)
        if d > dist[v]:
            continue
        for nxt, w in graph[v]:
            if dist[v] + w < dist[nxt]:
                dist[nxt] = dist[v] + w
                heapq.heappush(heap, (dist[nxt], nxt))
    ans = 0
    for d in dist:
        if d == inf:
            return -1
        ans = max(ans, d)
    return ans
`,
  },
};
