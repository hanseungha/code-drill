import type { Problem } from "@/lib/types";

export const kruskalMst: Problem = {
  slug: "kruskal-mst",
  title: "크루스칼 MST",
  difficulty: "medium",
  tags: ["유니온 파인드", "MST", "정렬"],
  summary: "간선을 싼 것부터 골라 모든 정점을 잇는 최소 비용을 구해요.",
  description: [
    "정점 개수 `n`과 무방향 가중 간선 목록 `edges`가 주어져요. 각 원소 `[a, b, cost]`는 a와 b를 비용 `cost`로 잇는 간선이에요. 모든 정점을 잇는 데 드는 **최소 비용**을 반환해요. 다 이을 수 없으면 `-1`을 반환해요.",
    "간선을 **비용이 싼 순서로** 정렬하고 하나씩 봐요. 두 끝점이 아직 다른 무리면 그 간선을 쓰고 무리를 합쳐요. 이미 같은 무리면 그 간선은 사이클을 만드니 건너뛰어요.",
    "간선 `n-1`개를 쓰면 모든 정점이 하나로 이어진 거예요. 그 전에 쓸 간선이 떨어지면 그래프가 나뉘어 있다는 뜻이라 -1이에요.",
  ],
  examples: [
    {
      input: "n = 4, edges = [[0, 1, 1], [1, 2, 2], [2, 3, 3], [0, 3, 4], [0, 2, 5]]",
      output: "6",
      explain: "비용 1·2·3 간선을 고르면 모든 정점을 잇고 합이 6이에요.",
    },
    {
      input: "n = 3, edges = [[0, 1, 1]]",
      output: "-1",
      explain: "2번 정점을 이을 간선이 없어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "0 ≤ edges.length ≤ 300,000",
    "0 ≤ a, b < n, 1 ≤ cost ≤ 1,000,000",
  ],
  entry: { javascript: "kruskalMst", python: "kruskal_mst" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number, number][]} edges
 * @return {number}
 */
function kruskalMst(n, edges) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def kruskal_mst(n, edges):
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
  hint: "`parent`와 크기 배열로 유니온 파인드를 만들어요. 간선을 비용 오름차순으로 정렬하고, `union`이 성공(두 무리를 실제로 합침)할 때만 비용을 더하고 쓴 간선 수를 세요. 쓴 간선이 `n-1`개가 되면 합을, 못 채우면 -1을 반환해요.",
  solution: {
    javascript: `function kruskalMst(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);
  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }
  function union(a, b) {
    let ra = find(a);
    let rb = find(b);
    if (ra === rb) return false;
    if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    size[ra] += size[rb];
    return true;
  }
  const sorted = [...edges].sort((a, b) => a[2] - b[2]);
  let total = 0;
  let used = 0;
  for (const [a, b, cost] of sorted) {
    if (union(a, b)) {
      total += cost;
      if (++used === n - 1) break;
    }
  }
  return used === n - 1 ? total : -1;
}
`,
    python: `def kruskal_mst(n, edges):
    parent = list(range(n))
    size = [1] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if size[ra] < size[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        size[ra] += size[rb]
        return True

    total = 0
    used = 0
    for a, b, cost in sorted(edges, key=lambda e: e[2]):
        if union(a, b):
            total += cost
            used += 1
            if used == n - 1:
                break
    return total if used == n - 1 else -1
`,
  },
};
