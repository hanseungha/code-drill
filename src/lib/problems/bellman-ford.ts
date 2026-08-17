import type { Problem } from "@/lib/types";

export const bellmanFord: Problem = {
  slug: "bellman-ford",
  title: "음수 간선이 있는 최단 경로",
  difficulty: "medium",
  tags: ["그래프", "벨만-포드"],
  summary: "음수 간선이 있어도 최단 거리를 구하고, 음수 사이클이면 -1을 반환해요.",
  description: [
    "정점 개수 `n`, 방향 간선 목록 `edges`, 시작 정점 `start`가 주어져요. `edges`의 각 원소 `[u, v, w]`는 u에서 v로 가는 비용 `w`인 간선이고, `w`는 **음수일 수도 있어요.**",
    "`start`에서 각 정점까지의 최단 거리를 배열로 반환해요. 갈 수 없는 정점은 `null`로 표시해요. 단, `start`에서 도달할 수 있는 곳에 **음수 사이클**이 있으면(돌수록 거리가 계속 줄어드는 고리) 최단 거리가 정해지지 않으므로 숫자 `-1`을 반환해요.",
    "음수 간선이 있으면 다익스트라가 깨져요. 대신 **모든 간선을 훑으며 거리를 줄이는 일을 n-1번 반복**해요. 그러고도 한 번 더 줄어드는 간선이 있으면 음수 사이클이에요.",
  ],
  examples: [
    {
      input: "n = 3, edges = [[0, 1, 4], [0, 2, 5], [1, 2, -3]], start = 0",
      output: "[0, 4, 1]",
      explain: "0→1(4)→2(-3)로 2까지 1이 돼요. 0→2 직행 5보다 싸요.",
    },
    {
      input: "n = 2, edges = [[0, 1, 1], [1, 0, -3]], start = 0",
      output: "-1",
      explain: "0↔1을 돌면 비용이 계속 줄어드는 음수 사이클이에요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 1,000",
    "0 ≤ edges.length ≤ 10,000",
    "0 ≤ u, v, start < n, -10,000 ≤ w ≤ 10,000",
  ],
  entry: { javascript: "bellmanFord", python: "bellman_ford" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @param {number} start
 * @return {number[] | number}
 */
function bellmanFord(n, edges, start) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def bellman_ford(n, edges, start):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [3, [[0, 1, 4], [0, 2, 5], [1, 2, -3]], 0], expected: [0, 4, 1] },
    { input: [2, [[0, 1, 1], [1, 0, -3]], 0], expected: -1 },
    { input: [3, [[0, 1, 2]], 0], expected: [0, 2, null] },
    { input: [1, [], 0], expected: [0] },
    { input: [4, [[0, 1, 1], [1, 2, -1], [2, 3, -1]], 0], expected: [0, 1, 0, -1] },
    { input: [3, [[0, 1, 5], [1, 2, -2], [2, 1, -2]], 0], expected: -1, hidden: true },
    { input: [4, [[0, 1, 3], [1, 2, 4]], 0], expected: [0, 3, 7, null], hidden: true },
  ],
  hint: "거리 배열을 무한대로, 시작점을 0으로 둬요. n-1번 반복하며 모든 간선 `[a, b, w]`에 대해 `a`에 도달했고 `dist[a] + w < dist[b]`면 줄여요. 그 뒤 한 번 더 돌려서 여전히 줄어드는 간선이 있으면 -1을 반환하고, 아니면 무한대를 null로 바꿔 반환해요.",
  solution: {
    javascript: `function bellmanFord(n, edges, start) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  for (let round = 0; round < n - 1; round++) {
    for (const [a, b, w] of edges) {
      if (dist[a] !== Infinity && dist[a] + w < dist[b]) dist[b] = dist[a] + w;
    }
  }
  for (const [a, b, w] of edges) {
    if (dist[a] !== Infinity && dist[a] + w < dist[b]) return -1;
  }
  return dist.map((x) => (x === Infinity ? null : x));
}
`,
    python: `def bellman_ford(n, edges, start):
    inf = float("inf")
    dist = [inf] * n
    dist[start] = 0
    for _ in range(n - 1):
        for a, b, w in edges:
            if dist[a] != inf and dist[a] + w < dist[b]:
                dist[b] = dist[a] + w
    for a, b, w in edges:
        if dist[a] != inf and dist[a] + w < dist[b]:
            return -1
    return [None if x == inf else x for x in dist]
`,
  },
};
