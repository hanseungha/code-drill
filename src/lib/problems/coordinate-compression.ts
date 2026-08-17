import type { Problem } from "@/lib/types";

export const coordinateCompression: Problem = {
  slug: "coordinate-compression",
  title: "좌표 압축",
  difficulty: "medium",
  tags: ["정렬", "해시"],
  summary: "각 값을 정렬 순위로 바꿔 값의 범위를 줄여요.",
  description: [
    "정수 배열 `values`가 주어져요. 각 값을 **자신보다 작은 서로 다른 값의 개수**로 바꾼 배열을 반환해요.",
    "즉 등장하는 서로 다른 값들을 오름차순으로 정렬해 0, 1, 2… 순위를 매긴 뒤, 원래 순서를 유지한 채 각 값을 그 순위로 치환해요. 같은 값은 같은 순위를 가져요.",
  ],
  examples: [
    {
      input: "values = [40, 10, 20, 30]",
      output: "[3, 0, 1, 2]",
      explain: "정렬하면 [10, 20, 30, 40]이고 순위는 10→0, 20→1, 30→2, 40→3이에요.",
    },
    {
      input: "values = [100, 100, 5, 50]",
      output: "[2, 2, 0, 1]",
      explain: "서로 다른 값은 5, 50, 100이며 순위는 각각 0, 1, 2예요. 중복된 100은 같은 순위 2를 써요.",
    },
  ],
  constraints: [
    "1 ≤ values.length ≤ 100,000",
    "-10^9 ≤ values[i] ≤ 10^9",
  ],
  entry: { javascript: "coordinateCompression", python: "coordinate_compression" },
  starter: {
    javascript: `/**
 * @param {number[]} values
 * @return {number[]}
 */
function coordinateCompression(values) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def coordinate_compression(values):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[40, 10, 20, 30]], expected: [3, 0, 1, 2] },
    { input: [[100, 100, 5, 50]], expected: [2, 2, 0, 1] },
    { input: [[7]], expected: [0] },
    { input: [[-1000000000, 0, 1000000000]], expected: [0, 1, 2] },
    { input: [[3, 3, 3, 3]], expected: [0, 0, 0, 0], hidden: true },
    { input: [[5, 1, 4, 1, 5, 9, 2, 6]], expected: [3, 0, 2, 0, 3, 5, 1, 4], hidden: true },
  ],
  hint: "`[...new Set(values)]`로 중복을 없앤 뒤 정렬하고, `값 → 순위` 맵을 만들어 원래 배열을 매핑해요. Python은 `sorted(set(values))`와 딕셔너리 컴프리헨션을 쓰면 돼요.",
  solution: {
    javascript: `function coordinateCompression(values) {
  const sorted = [...new Set(values)].sort((a, b) => a - b);
  const rank = new Map(sorted.map((v, i) => [v, i]));
  return values.map((v) => rank.get(v));
}
`,
    python: `def coordinate_compression(values):
    rank = {v: i for i, v in enumerate(sorted(set(values)))}
    return [rank[v] for v in values]
`,
  },
};
