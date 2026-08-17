import type { Problem } from "@/lib/types";

export const unionFind: Problem = {
  slug: "union-find",
  title: "유니온 파인드 구현",
  difficulty: "medium",
  tags: ["유니온 파인드"],
  summary: "합치기와 같은 무리인지 묻기 연산을 유니온 파인드로 처리해요.",
  description: [
    "원소 수 `n`과 연산 목록 `operations`가 주어져요. 원소는 `0`번부터 `n-1`번까지 있고, 처음엔 저마다 혼자예요. 각 연산은 `[종류, a, b]` 형태예요.",
    "종류가 `0`이면 **합치기**로, a가 속한 무리와 b가 속한 무리를 하나로 합쳐요. 종류가 `1`이면 **묻기**로, a와 b가 지금 같은 무리인지 확인해요. 묻기 연산의 답(`true`/`false`)을 순서대로 담은 배열을 반환해요.",
    "각 원소가 자기 대표를 가리키게 하고, 대표를 찾을 때 거쳐 온 원소들을 대표에 바로 붙이면(경로 압축) 연산이 거의 상수 시간에 가까워져요.",
  ],
  examples: [
    {
      input: "n = 4, operations = [[0, 0, 1], [1, 0, 1], [1, 0, 2], [0, 2, 3], [1, 2, 3]]",
      output: "[true, false, true]",
      explain: "0·1을 합친 뒤 0·1은 같은 무리(true), 0·2는 다른 무리(false), 2·3을 합친 뒤 2·3은 같은 무리(true)예요.",
    },
    {
      input: "n = 3, operations = [[1, 0, 2]]",
      output: "[false]",
      explain: "아무것도 합치지 않았으니 0과 2는 다른 무리예요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 100,000",
    "1 ≤ operations.length ≤ 200,000",
    "종류는 0 또는 1이고, 0 ≤ a, b < n이에요.",
  ],
  entry: { javascript: "unionFind", python: "union_find" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {[number, number, number][]} operations
 * @return {boolean[]}
 */
function unionFind(n, operations) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def union_find(n, operations):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [4, [[0, 0, 1], [1, 0, 1], [1, 0, 2], [0, 2, 3], [1, 2, 3]]], expected: [true, false, true] },
    { input: [3, [[1, 0, 2]]], expected: [false] },
    { input: [5, [[0, 0, 1], [0, 1, 2], [0, 3, 4], [1, 0, 2], [1, 0, 4]]], expected: [true, false] },
    { input: [2, [[1, 0, 0]]], expected: [true] },
    { input: [6, [[0, 0, 1], [0, 2, 3], [0, 4, 5], [0, 1, 3], [1, 0, 2], [1, 0, 5]]], expected: [true, false], hidden: true },
    { input: [3, [[0, 0, 1], [0, 1, 2], [1, 0, 2], [1, 2, 0]]], expected: [true, true], hidden: true },
  ],
  hint: "`parent` 배열을 자기 자신으로 초기화해요. `find(x)`는 대표를 찾으며 경로를 압축하고, `union`은 두 대표를 잇되 작은 무리를 큰 무리 밑에 붙여요. 묻기 연산은 `find(a) === find(b)`의 결과를 결과 배열에 담아요.",
  solution: {
    javascript: `function unionFind(n, operations) {
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
    if (ra === rb) return;
    if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    size[ra] += size[rb];
  }
  const result = [];
  for (const [kind, a, b] of operations) {
    if (kind === 0) union(a, b);
    else result.push(find(a) === find(b));
  }
  return result;
}
`,
    python: `def union_find(n, operations):
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
            return
        if size[ra] < size[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        size[ra] += size[rb]

    result = []
    for kind, a, b in operations:
        if kind == 0:
            union(a, b)
        else:
            result.append(find(a) == find(b))
    return result
`,
  },
};
