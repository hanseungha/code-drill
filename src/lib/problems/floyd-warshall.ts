import type { Problem } from "@/lib/types";

export const floydWarshall: Problem = {
  slug: "floyd-warshall",
  title: "모든 쌍 최단 거리",
  difficulty: "hard",
  tags: ["그래프", "플로이드-워셜", "DP"],
  summary: "모든 정점 쌍 사이의 최단 거리를 한 번에 구해요.",
  description: [
    "정점 개수 `n`과 방향 간선 목록 `edges`가 주어져요. `edges`의 각 원소 `[u, v, w]`는 u에서 v로 가는 비용 `w`인 간선이에요. 같은 쌍을 잇는 간선이 여러 개면 **가장 싼 것**만 의미가 있어요.",
    "**모든 정점 쌍** `(i, j)`에 대한 최단 거리를 `n × n` 표로 반환해요. `i`에서 `i`까지는 0이고, `i`에서 `j`로 갈 수 없으면 `-1`로 표시해요.",
    "핵심은 '**경유지**를 하나씩 늘려 가는 것'이에요. `i`에서 `j`로 갈 때 `k`를 거치는 게 더 싸면 갱신해요. 이때 **경유지 `k` 루프가 가장 바깥**에 와야 해요. 순서를 바꾸면 틀려요.",
  ],
  examples: [
    {
      input: "n = 3, edges = [[0, 1, 4], [1, 2, 1], [0, 2, 10]]",
      output: "[[0, 4, 5], [-1, 0, 1], [-1, -1, 0]]",
      explain: "0→2는 직행 10보다 1을 거쳐 5가 싸요. 2에서는 아무 데도 못 가요.",
    },
    {
      input: "n = 2, edges = []",
      output: "[[0, -1], [-1, 0]]",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 400",
    "0 ≤ edges.length ≤ n × n",
    "0 ≤ u, v < n, -10,000 ≤ w ≤ 10,000, 음수 사이클은 없어요.",
  ],
  entry: { javascript: "floydWarshall", python: "floyd_warshall" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @return {number[][]}
 */
function floydWarshall(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def floyd_warshall(n, edges):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [3, [[0, 1, 4], [1, 2, 1], [0, 2, 10]]], expected: [[0, 4, 5], [-1, 0, 1], [-1, -1, 0]] },
    { input: [2, []], expected: [[0, -1], [-1, 0]] },
    { input: [1, []], expected: [[0]] },
    { input: [3, [[0, 1, 1], [1, 2, 1], [2, 0, 1]]], expected: [[0, 1, 2], [2, 0, 1], [1, 2, 0]] },
    { input: [4, [[0, 1, 5], [0, 1, 2], [1, 3, 1], [3, 2, -1]]], expected: [[0, 2, 2, 3], [-1, 0, 0, 1], [-1, -1, 0, -1], [-1, -1, -1, 0]], hidden: true },
    { input: [3, [[0, 1, 3], [2, 1, 1]]], expected: [[0, 3, -1], [-1, 0, -1], [-1, 1, 0]], hidden: true },
  ],
  hint: "거리 표를 무한대로 채우고 대각선을 0으로, 간선마다 더 싼 값으로 초기화해요. 그다음 경유지 `k`를 가장 바깥 루프로 두고 `i`, `j`를 돌며 `dist[i][k] + dist[k][j]`가 더 작으면 갱신해요. 끝나고 무한대는 -1로 바꿔요.",
  solution: {
    javascript: `function floydWarshall(n, edges) {
  const INF = Infinity;
  const dist = Array.from({ length: n }, () => new Array(n).fill(INF));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) {
    if (w < dist[u][v]) dist[u][v] = w;
  }
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist.map((row) => row.map((x) => (x === INF ? -1 : x)));
}
`,
    python: `def floyd_warshall(n, edges):
    inf = float("inf")
    dist = [[inf] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        if w < dist[u][v]:
            dist[u][v] = w
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return [[-1 if x == inf else x for x in row] for row in dist]
`,
  },
};
