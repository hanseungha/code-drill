import type { Problem } from "@/lib/types";

export const pathExists: Problem = {
  slug: "path-exists",
  title: "경로 존재 판별",
  difficulty: "easy",
  tags: ["그래프", "DFS"],
  summary: "두 정점 사이에 길이 있는지 그래프를 탐색해 판정해요.",
  description: [
    "정점 개수 `n`과 간선 목록 `edges`로 이루어진 **무방향 그래프**가 주어져요. 정점은 `0`번부터 `n-1`번까지 있고, `edges`의 각 원소 `[a, b]`는 a와 b를 잇는 길이에요.",
    "출발 정점 `start`에서 도착 정점 `target`까지 **길을 따라 갈 수 있으면** `true`, 갈 수 없으면 `false`를 반환해요.",
    "먼저 간선 목록으로 인접 리스트를 만들고, `start`에서 DFS나 BFS로 퍼져 나가며 `target`에 닿는지 확인해요. 방문한 정점을 다시 방문하지 않도록 방문 표시를 꼭 해요.",
  ],
  examples: [
    {
      input: "n = 6, edges = [[0, 1], [1, 2], [3, 4]], start = 0, target = 2",
      output: "true",
      explain: "0 → 1 → 2로 갈 수 있어요.",
    },
    {
      input: "n = 6, edges = [[0, 1], [1, 2], [3, 4]], start = 0, target = 4",
      output: "false",
      explain: "0이 속한 덩어리와 4가 속한 덩어리가 떨어져 있어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 200,000",
    "0 ≤ a, b, start, target < n",
    "self-loop나 중복 간선이 있을 수 있어요.",
  ],
  entry: { javascript: "pathExists", python: "path_exists" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
function pathExists(n, edges, start, target) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def path_exists(n, edges, start, target):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [6, [[0, 1], [1, 2], [3, 4]], 0, 2], expected: true },
    { input: [6, [[0, 1], [1, 2], [3, 4]], 0, 4], expected: false },
    { input: [1, [], 0, 0], expected: true },
    { input: [3, [[0, 1], [1, 2]], 2, 0], expected: true },
    { input: [4, [[0, 1], [2, 3]], 1, 3], expected: false },
    { input: [5, [[0, 1], [1, 2], [2, 3], [3, 4]], 0, 4], expected: true, hidden: true },
    { input: [2, [], 0, 1], expected: false, hidden: true },
  ],
  hint: "인접 리스트를 만든 뒤 스택(또는 큐)에 `start`를 넣고 방문 표시해요. 하나씩 꺼내며 `target`이면 `true`를 반환하고, 아직 방문하지 않은 이웃을 표시하며 넣어요. 다 훑어도 못 만나면 `false`예요.",
  solution: {
    javascript: `function pathExists(n, edges, start, target) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const visited = new Array(n).fill(false);
  const stack = [start];
  visited[start] = true;
  while (stack.length > 0) {
    const v = stack.pop();
    if (v === target) return true;
    for (const next of graph[v]) {
      if (!visited[next]) {
        visited[next] = true;
        stack.push(next);
      }
    }
  }
  return false;
}
`,
    python: `def path_exists(n, edges, start, target):
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    visited = [False] * n
    stack = [start]
    visited[start] = True
    while stack:
        v = stack.pop()
        if v == target:
            return True
        for nxt in graph[v]:
            if not visited[nxt]:
                visited[nxt] = True
                stack.append(nxt)
    return False
`,
  },
};
