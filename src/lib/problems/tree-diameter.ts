import type { Problem } from "@/lib/types";

export const treeDiameter: Problem = {
  slug: "tree-diameter",
  title: "트리의 지름",
  difficulty: "medium",
  tags: ["트리", "DFS", "트리 DP"],
  summary: "트리에서 가장 먼 두 정점 사이 경로의 길이를 구해요.",
  description: [
    "정점 개수 `n`과 무방향 간선 목록 `edges`로 이루어진 **트리**가 주어져요. 트리에서 가장 먼 두 정점 사이 경로의 **길이**(지나는 간선 수)를 반환해요. 이 값을 트리의 **지름**이라고 해요.",
    "핵심은 이거예요. 어떤 정점을 지나는 가장 긴 경로는, 그 정점에서 자식 방향으로 **가장 깊게 내려가는 두 갈래**를 더한 거예요. 모든 정점에서 이 값을 구해 가장 큰 것이 지름이에요.",
    "DFS 한 번으로 끝나요. 각 정점은 '내 아래로 가장 깊은 깊이'를 부모에게 돌려주고, 그 과정에서 '가장 깊은 두 갈래의 합'으로 지름 후보를 갱신해요.",
  ],
  examples: [
    {
      input: "n = 5, edges = [[0, 1], [1, 2], [1, 3], [3, 4]]",
      output: "3",
      explain: "2 → 1 → 3 → 4 경로가 간선 3개로 가장 길어요.",
    },
    {
      input: "n = 1, edges = []",
      output: "0",
      explain: "정점이 하나뿐이라 경로 길이는 0이에요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 50,000",
    "edges.length는 n - 1이고, 그래프는 트리예요.",
    "0 ≤ a, b < n",
  ],
  entry: { javascript: "treeDiameter", python: "tree_diameter" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {number}
 */
function treeDiameter(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def tree_diameter(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [[0, 1], [1, 2], [1, 3], [3, 4]]], expected: 3 },
    { input: [1, []], expected: 0 },
    { input: [2, [[0, 1]]], expected: 1 },
    { input: [6, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]], expected: 5 },
    { input: [7, [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6]]], expected: 5, hidden: true },
    { input: [4, [[0, 1], [0, 2], [0, 3]]], expected: 2, hidden: true },
  ],
  hint: "`depth(v, parent)`가 v에서 아래로 내려가는 최대 간선 수를 돌려주게 해요. 자식들의 깊이 중 **가장 큰 둘**을 기억해 그 합으로 지름 후보(`best`)를 갱신하고, 부모에게는 '가장 깊은 하나 + 1'을 돌려줘요. 마지막 `best`가 지름이에요.",
  solution: {
    javascript: `function treeDiameter(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  let best = 0;
  function depth(v, parent) {
    let first = 0;
    let second = 0;
    for (const next of adj[v]) {
      if (next === parent) continue;
      const d = depth(next, v) + 1;
      if (d > first) {
        second = first;
        first = d;
      } else if (d > second) {
        second = d;
      }
    }
    best = Math.max(best, first + second);
    return first;
  }
  depth(0, -1);
  return best;
}
`,
    python: `import sys


def tree_diameter(n, edges):
    sys.setrecursionlimit(300000)
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    best = 0

    def depth(v, parent):
        nonlocal best
        first = second = 0
        for nxt in adj[v]:
            if nxt == parent:
                continue
            d = depth(nxt, v) + 1
            if d > first:
                first, second = d, first
            elif d > second:
                second = d
        best = max(best, first + second)
        return first

    depth(0, -1)
    return best
`,
  },
};
