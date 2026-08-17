import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const primMst: Problem = {
  slug: "prim-mst",
  title: "도시 연결하기 (프림)",
  difficulty: "hard",
  tags: ["MST", "힙", "그래프"],
  summary: "한 정점에서 트리를 키워 가며 모든 정점을 잇는 최소 비용을 구해요.",
  description: [
    "정점 개수 `n`과 무방향 가중 간선 목록 `edges`가 주어져요. 각 원소 `[a, b, cost]`는 a와 b를 비용 `cost`로 잇는 간선이에요. 모든 정점을 잇는 데 드는 **최소 비용**을 반환해요. 다 이을 수 없으면 `-1`을 반환해요.",
    "크루스칼이 간선을 골랐다면, 프림은 **정점을 하나씩 트리에 붙여** 키워요. 트리에서 밖으로 나가는 간선 중 가장 싼 것을 골라 새 정점을 들여요. 다익스트라와 뼈대가 같은데, 힙에 넣는 값이 '누적 거리'가 아니라 '그 간선 하나의 비용'이라는 점만 달라요.",
    "간선이 빽빽한 그래프에서 특히 잘 어울려요.",
  ],
  examples: [
    {
      input: "n = 4, edges = [[0, 1, 1], [1, 2, 2], [2, 3, 3], [0, 3, 4], [0, 2, 5]]",
      output: "6",
      explain: "0에서 시작해 1(1), 2(2), 3(3)을 차례로 붙이면 합이 6이에요.",
    },
    {
      input: "n = 3, edges = [[0, 1, 1]]",
      output: "-1",
      explain: "2번 정점을 트리에 붙일 간선이 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 300,000",
    "0 ≤ a, b < n, 1 ≤ cost ≤ 1,000,000",
  ],
  entry: { javascript: "primMst", python: "prim_mst" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @return {number}
 */
function primMst(n, edges) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def prim_mst(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4, [[0, 1, 1], [1, 2, 2], [2, 3, 3], [0, 3, 4], [0, 2, 5]]], expected: 6 },
    { input: [3, [[0, 1, 1]]], expected: -1 },
    { input: [1, []], expected: 0 },
    { input: [5, [[0, 1, 2], [0, 2, 3], [1, 2, 1], [1, 3, 4], [2, 4, 5], [3, 4, 6]]], expected: 12 },
    { input: [4, [[0, 1, 10], [1, 2, 10], [2, 3, 10], [0, 3, 10], [0, 2, 1], [1, 3, 1]]], expected: 12, hidden: true },
    { input: [2, []], expected: -1, hidden: true },
  ],
  hint: "인접 리스트를 `[비용, 이웃]`으로 만들어요. `[0, 0]`을 힙에 넣고 시작해, 가장 싼 간선을 꺼내 아직 트리에 없는 정점이면 붙이고 비용을 더해요. 그 정점의 간선들을 힙에 넣어요. 붙인 정점이 `n`개면 합을, 힙이 먼저 비면 -1을 반환해요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function primMst(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b, cost] of edges) {
    graph[a].push([cost, b]);
    graph[b].push([cost, a]);
  }
  const inTree = new Array(n).fill(false);
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  heap.push([0, 0]);
  let total = 0;
  let used = 0;
  while (heap.size > 0 && used < n) {
    const [cost, v] = heap.pop();
    if (inTree[v]) continue;
    inTree[v] = true;
    total += cost;
    used++;
    for (const [w, next] of graph[v]) {
      if (!inTree[next]) heap.push([w, next]);
    }
  }
  return used === n ? total : -1;
}
`,
    python: `import heapq


def prim_mst(n, edges):
    graph = [[] for _ in range(n)]
    for a, b, cost in edges:
        graph[a].append((cost, b))
        graph[b].append((cost, a))
    in_tree = [False] * n
    heap = [(0, 0)]
    total = 0
    used = 0
    while heap and used < n:
        cost, v = heapq.heappop(heap)
        if in_tree[v]:
            continue
        in_tree[v] = True
        total += cost
        used += 1
        for w, nxt in graph[v]:
            if not in_tree[nxt]:
                heapq.heappush(heap, (w, nxt))
    return total if used == n else -1
`,
  },
};
