import type { Problem } from "@/lib/types";

export const subtreeSizes: Problem = {
  slug: "subtree-sizes",
  title: "서브트리의 크기",
  difficulty: "medium",
  tags: ["트리", "DFS", "트리 DP"],
  summary: "루트를 0번으로 둔 트리에서 각 정점의 서브트리 크기를 구해요.",
  description: [
    "정점 개수 `n`과 무방향 간선 목록 `edges`로 이루어진 **트리**가 주어져요. 정점은 `0`번부터 `n-1`번까지이고, **0번을 루트**로 봐요.",
    "각 정점 `v`의 **서브트리 크기**(자기 자신과 모든 자손을 합한 정점 수)를 담은 배열을 반환해요.",
    "자식의 답을 모아 부모의 답을 만드는 순서로 풀어요. 루트에서 DFS로 내려갔다가 **돌아오면서** 각 정점의 크기를 '1 + 자식들의 크기 합'으로 정해요. 트리 DP의 가장 기본 형태예요.",
  ],
  examples: [
    {
      input: "n = 5, edges = [[0, 1], [0, 2], [1, 3], [1, 4]]",
      output: "[5, 3, 1, 1, 1]",
      explain: "0의 서브트리는 전체(5), 1은 자신과 3·4로 3, 잎(2·3·4)은 각각 1이에요.",
    },
    {
      input: "n = 1, edges = []",
      output: "[1]",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 50,000",
    "edges.length는 n - 1이고, 그래프는 트리예요(사이클 없이 모두 연결).",
    "0 ≤ a, b < n",
  ],
  entry: { javascript: "subtreeSizes", python: "subtree_sizes" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {number[]}
 */
function subtreeSizes(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def subtree_sizes(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [[0, 1], [0, 2], [1, 3], [1, 4]]], expected: [5, 3, 1, 1, 1] },
    { input: [1, []], expected: [1] },
    { input: [3, [[0, 1], [1, 2]]], expected: [3, 2, 1] },
    { input: [4, [[0, 1], [0, 2], [0, 3]]], expected: [4, 1, 1, 1] },
    { input: [7, [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6]]], expected: [7, 3, 3, 1, 1, 2, 1], hidden: true },
    { input: [2, [[1, 0]]], expected: [2, 1], hidden: true },
  ],
  hint: "간선으로 인접 리스트를 만들고, 크기 배열을 1로 시작해요. `dfs(v, parent)`에서 부모가 아닌 이웃(=자식)마다 재귀로 내려간 뒤 그 자식의 크기를 `v`의 크기에 더해요. 0번에서 DFS를 시작하면 돼요.",
  solution: {
    javascript: `function subtreeSizes(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const size = new Array(n).fill(1);
  function dfs(v, parent) {
    for (const next of adj[v]) {
      if (next === parent) continue;
      dfs(next, v);
      size[v] += size[next];
    }
  }
  dfs(0, -1);
  return size;
}
`,
    python: `import sys


def subtree_sizes(n, edges):
    sys.setrecursionlimit(300000)
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    size = [1] * n

    def dfs(v, parent):
        for nxt in adj[v]:
            if nxt == parent:
                continue
            dfs(nxt, v)
            size[v] += size[nxt]

    dfs(0, -1)
    return size
`,
  },
};
