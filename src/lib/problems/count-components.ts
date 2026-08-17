import type { Problem } from "@/lib/types";

export const countComponents: Problem = {
  slug: "count-components",
  title: "연결 요소의 개수",
  difficulty: "medium",
  tags: ["그래프", "DFS", "BFS"],
  summary: "그래프가 몇 개의 덩어리로 나뉘어 있는지 세요.",
  description: [
    "정점 개수 `n`과 간선 목록 `edges`로 이루어진 **무방향 그래프**가 주어져요. 정점은 `0`번부터 `n-1`번까지 있어요.",
    "서로 이어져 한 덩어리를 이루는 정점 묶음을 **연결 요소**라고 해요. 이 그래프에 연결 요소가 몇 개인지 반환해요.",
    "한 정점에서 시작한 탐색은 그 덩어리 하나만 훑어요. 그래서 모든 정점을 돌면서 아직 방문하지 않은 정점을 만날 때마다 거기서 새 탐색을 시작하고, **시작한 횟수**가 곧 연결 요소의 개수예요.",
  ],
  examples: [
    {
      input: "n = 5, edges = [[0, 1], [1, 2], [3, 4]]",
      output: "2",
      explain: "{0, 1, 2}와 {3, 4} 두 덩어리예요.",
    },
    {
      input: "n = 4, edges = []",
      output: "4",
      explain: "간선이 없어 정점 하나하나가 각자 덩어리예요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 200,000",
    "0 ≤ a, b < n",
  ],
  entry: { javascript: "countComponents", python: "count_components" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def count_components(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [[0, 1], [1, 2], [3, 4]]], expected: 2 },
    { input: [4, []], expected: 4 },
    { input: [1, []], expected: 1 },
    { input: [3, [[0, 1], [1, 2], [0, 2]]], expected: 1 },
    { input: [6, [[0, 1], [2, 3], [4, 5]]], expected: 3 },
    { input: [7, [[0, 1], [1, 2], [2, 0], [3, 4]]], expected: 4, hidden: true },
    { input: [10, []], expected: 10, hidden: true },
  ],
  hint: "인접 리스트와 방문 배열을 만들어요. `0`번부터 `n-1`번까지 보면서 아직 방문하지 않은 정점이면 개수를 1 늘리고, 그 정점에서 DFS나 BFS로 같은 덩어리를 모두 방문 표시해요.",
  solution: {
    javascript: `function countComponents(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const visited = new Array(n).fill(false);
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    count++;
    const stack = [i];
    visited[i] = true;
    while (stack.length > 0) {
      const v = stack.pop();
      for (const next of graph[v]) {
        if (!visited[next]) {
          visited[next] = true;
          stack.push(next);
        }
      }
    }
  }
  return count;
}
`,
    python: `def count_components(n, edges):
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    visited = [False] * n
    count = 0
    for i in range(n):
        if visited[i]:
            continue
        count += 1
        stack = [i]
        visited[i] = True
        while stack:
            v = stack.pop()
            for nxt in graph[v]:
                if not visited[nxt]:
                    visited[nxt] = True
                    stack.append(nxt)
    return count
`,
  },
};
