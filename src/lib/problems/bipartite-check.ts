import type { Problem } from "@/lib/types";

export const bipartiteCheck: Problem = {
  slug: "bipartite-check",
  title: "이분 그래프 판별",
  difficulty: "hard",
  tags: ["그래프", "BFS", "DFS"],
  summary: "정점을 두 색으로 칠해 이웃끼리 색이 다르게 만들 수 있는지 판정해요.",
  description: [
    "정점 개수 `n`과 간선 목록 `edges`로 이루어진 **무방향 그래프**가 주어져요. 정점은 `0`번부터 `n-1`번까지 있어요.",
    "모든 정점을 두 가지 색으로 칠하되, **간선으로 이어진 두 정점은 항상 색이 다르게** 만들 수 있으면 그 그래프는 **이분 그래프**예요. 이분 그래프면 `true`, 아니면 `false`를 반환해요.",
    "탐색하면서 색을 칠하면 돼요. 시작 정점을 한 색으로 칠하고, 이웃은 반대 색으로 칠해요. 칠하려는 이웃이 이미 **같은 색**으로 칠해져 있으면 이분 그래프가 아니에요. 그래프가 여러 덩어리로 나뉘어 있을 수 있으니 모든 정점에서 확인해요.",
  ],
  examples: [
    {
      input: "n = 4, edges = [[0, 1], [1, 2], [2, 3], [3, 0]]",
      output: "true",
      explain: "0·2를 한 색, 1·3을 다른 색으로 칠하면 돼요(짝수 길이 사이클).",
    },
    {
      input: "n = 3, edges = [[0, 1], [1, 2], [2, 0]]",
      output: "false",
      explain: "삼각형(홀수 길이 사이클)은 두 색으로 칠할 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 200,000",
    "0 ≤ a, b < n, self-loop는 없어요.",
  ],
  entry: { javascript: "bipartiteCheck", python: "bipartite_check" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {boolean}
 */
function bipartiteCheck(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def bipartite_check(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]], expected: true },
    { input: [3, [[0, 1], [1, 2], [2, 0]]], expected: false },
    { input: [2, [[0, 1]]], expected: true },
    { input: [5, []], expected: true },
    { input: [6, [[0, 1], [1, 2], [3, 4], [4, 5], [5, 3]]], expected: false },
    { input: [4, [[0, 1], [1, 2], [2, 3]]], expected: true, hidden: true },
    { input: [7, [[0, 1], [1, 2], [2, 0], [3, 4]]], expected: false, hidden: true },
  ],
  hint: "`color` 배열을 0(안 칠함)으로 두고, 아직 안 칠한 정점마다 BFS를 시작해요. 시작 정점을 1로 칠하고, 이웃이 안 칠해졌으면 반대 색(`3 - 현재색`)으로 칠해 큐에 넣어요. 이웃이 이미 현재 정점과 같은 색이면 바로 `false`예요.",
  solution: {
    javascript: `function bipartiteCheck(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const color = new Array(n).fill(0);
  for (let s = 0; s < n; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue = [s];
    let head = 0;
    while (head < queue.length) {
      const v = queue[head++];
      for (const next of graph[v]) {
        if (color[next] === 0) {
          color[next] = 3 - color[v];
          queue.push(next);
        } else if (color[next] === color[v]) {
          return false;
        }
      }
    }
  }
  return true;
}
`,
    python: `from collections import deque


def bipartite_check(n, edges):
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    color = [0] * n
    for s in range(n):
        if color[s] != 0:
            continue
        color[s] = 1
        queue = deque([s])
        while queue:
            v = queue.popleft()
            for nxt in graph[v]:
                if color[nxt] == 0:
                    color[nxt] = 3 - color[v]
                    queue.append(nxt)
                elif color[nxt] == color[v]:
                    return False
    return True
`,
  },
};
