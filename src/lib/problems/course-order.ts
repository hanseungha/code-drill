import type { Problem } from "@/lib/types";
import { MIN_HEAP_JS, withMinHeap } from "./snippets";

export const courseOrder: Problem = {
  slug: "course-order",
  title: "수강 과목 순서",
  difficulty: "medium",
  tags: ["그래프", "위상 정렬"],
  summary: "선수과목 관계를 지키는 수강 순서를 위상 정렬로 찾아요.",
  description: [
    "과목 수 `n`과 선후 관계 목록 `edges`가 주어져요. 과목은 `0`번부터 `n-1`번까지 있고, `edges`의 각 원소 `[a, b]`는 'a를 들어야 b를 들을 수 있다'는 뜻이에요.",
    "모든 선후 관계를 지키는 수강 순서를 배열로 반환해요. 가능한 순서가 여러 개면 **번호가 작은 과목을 먼저** 듣는 사전순으로 가장 앞선 하나를 반환해요. 순환이 있어 순서를 정할 수 없으면 **빈 배열**을 반환해요.",
    "각 과목의 **진입 차수**(자기를 가리키는 간선 수)를 세고 0인 것부터 들어요. 하나 들을 때마다 그 과목이 여는 과목들의 진입 차수를 줄이고, 0이 되면 후보에 넣어요. 사전순을 위해 후보는 힙으로 관리해요.",
  ],
  examples: [
    {
      input: "n = 4, edges = [[0, 1], [0, 2], [1, 3], [2, 3]]",
      output: "[0, 1, 2, 3]",
      explain: "0을 먼저, 그다음 1·2, 마지막에 3이에요. 1과 2 중에서는 번호가 작은 1이 먼저예요.",
    },
    {
      input: "n = 2, edges = [[0, 1], [1, 0]]",
      output: "[]",
      explain: "서로가 서로의 선수과목이라 순서를 정할 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 200,000",
    "0 ≤ a, b < n",
  ],
  entry: { javascript: "courseOrder", python: "course_order" },
  starter: {
    javascript: withMinHeap(`/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {number[]}
 */
function courseOrder(n, edges) {
  // 여기에 코드를 작성하세요
}
`),
    python: `import heapq


def course_order(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4, [[0, 1], [0, 2], [1, 3], [2, 3]]], expected: [0, 1, 2, 3] },
    { input: [2, [[0, 1], [1, 0]]], expected: [] },
    { input: [3, []], expected: [0, 1, 2] },
    { input: [3, [[2, 0], [2, 1]]], expected: [2, 0, 1] },
    { input: [5, [[1, 0], [0, 2], [3, 2], [4, 3]]], expected: [1, 0, 4, 3, 2] },
    { input: [4, [[0, 1], [1, 2], [2, 3], [3, 1]]], expected: [], hidden: true },
    { input: [6, [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]], expected: [4, 5, 0, 2, 3, 1], hidden: true },
  ],
  hint: "진입 차수 배열을 만들고 0인 과목을 최소 힙에 넣어요. 힙에서 가장 작은 번호를 꺼내 순서에 담고, 그 과목이 여는 과목들의 진입 차수를 줄여 0이 되면 힙에 넣어요. 다 끝났는데 담은 개수가 n보다 적으면 순환이 있으니 빈 배열을 반환해요.",
  solution: {
    javascript: `${MIN_HEAP_JS}

function courseOrder(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (const [a, b] of edges) {
    graph[a].push(b);
    indegree[b]++;
  }
  const heap = new MinHeap();
  for (let v = 0; v < n; v++) if (indegree[v] === 0) heap.push(v);
  const order = [];
  while (heap.size > 0) {
    const v = heap.pop();
    order.push(v);
    for (const next of graph[v]) {
      if (--indegree[next] === 0) heap.push(next);
    }
  }
  return order.length < n ? [] : order;
}
`,
    python: `import heapq


def course_order(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for a, b in edges:
        graph[a].append(b)
        indegree[b] += 1
    heap = [v for v in range(n) if indegree[v] == 0]
    heapq.heapify(heap)
    order = []
    while heap:
        v = heapq.heappop(heap)
        order.append(v)
        for nxt in graph[v]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                heapq.heappush(heap, nxt)
    return [] if len(order) < n else order
`,
  },
};
