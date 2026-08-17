import type { Problem } from "@/lib/types";

export const graphCycle: Problem = {
  slug: "graph-cycle",
  title: "그래프 사이클 판정",
  difficulty: "medium",
  tags: ["유니온 파인드", "그래프"],
  summary: "무방향 그래프에 사이클이 있는지 유니온 파인드로 판정해요.",
  description: [
    "정점 개수 `n`과 무방향 간선 목록 `edges`가 주어져요. 정점은 `0`번부터 `n-1`번까지 있어요. 이 그래프에 **사이클이 있으면** `true`, 없으면 `false`를 반환해요.",
    "간선을 하나씩 보면서, 두 끝점이 **이미 같은 무리**에 속해 있다면 그 간선이 무리를 한 바퀴 잇는 셈이라 사이클이 생겨요. 아직 다른 무리면 둘을 합쳐요.",
    "자기 자신을 잇는 간선(self-loop)도 사이클로 봐요.",
  ],
  examples: [
    {
      input: "n = 3, edges = [[0, 1], [1, 2], [2, 0]]",
      output: "true",
      explain: "0-1-2-0으로 한 바퀴 도는 사이클이 있어요.",
    },
    {
      input: "n = 4, edges = [[0, 1], [1, 2], [2, 3]]",
      output: "false",
      explain: "한 줄로 이어져 있어 사이클이 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 200,000",
    "0 ≤ a, b < n",
  ],
  entry: { javascript: "graphCycle", python: "graph_cycle" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {boolean}
 */
function graphCycle(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def graph_cycle(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [3, [[0, 1], [1, 2], [2, 0]]], expected: true },
    { input: [4, [[0, 1], [1, 2], [2, 3]]], expected: false },
    { input: [1, [[0, 0]]], expected: true },
    { input: [5, [[0, 1], [2, 3], [3, 4], [4, 2]]], expected: true },
    { input: [4, []], expected: false },
    { input: [6, [[0, 1], [1, 2], [3, 4]]], expected: false, hidden: true },
    { input: [3, [[0, 1], [0, 1]]], expected: true, hidden: true },
  ],
  hint: "`parent`를 자기 자신으로 시작해요. 각 간선의 두 끝점 대표를 찾아 같으면 사이클이니 바로 `true`를 반환하고, 다르면 두 무리를 합쳐요. 모든 간선을 봐도 걸리지 않으면 `false`예요.",
  solution: {
    javascript: `function graphCycle(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  for (const [a, b] of edges) {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return true;
    parent[ra] = rb;
  }
  return false;
}
`,
    python: `def graph_cycle(n, edges):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return True
        parent[ra] = rb
    return False
`,
  },
};
