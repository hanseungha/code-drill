import type { Problem } from "@/lib/types";

export const carpet: Problem = {
  slug: "carpet",
  title: "카펫 만들기",
  difficulty: "medium",
  tags: ["완전탐색", "수학"],
  summary: "테두리와 안쪽 격자 수만 보고 카펫의 가로세로를 되찾아요.",
  description: [
    "카펫의 바깥 한 줄은 갈색, 안쪽은 노란색으로 칠해져 있어요. 갈색 격자 수 `brown`과 노란색 격자 수 `yellow`가 주어질 때, 카펫의 `[가로, 세로]` 를 반환해요.",
    "가로는 세로보다 크거나 같아요. 답은 항상 하나뿐이에요.",
    "전체 격자 수는 `brown + yellow` 이고, 이는 `가로 × 세로` 예요. 즉 **전체 격자 수의 약수만 후보**예요. 후보가 몇 개 안 되므로 하나씩 넣어 확인하면 돼요 — 1주차의 약수 구하기와 4주차의 완전탐색이 만나는 지점이에요.",
  ],
  examples: [
    {
      input: "brown = 10, yellow = 2",
      output: "[4, 3]",
      explain: "4 × 3 = 12 개 중 안쪽 2 × 1 = 2 개가 노란색이에요.",
    },
    { input: "brown = 8, yellow = 1", output: "[3, 3]" },
    { input: "brown = 24, yellow = 24", output: "[8, 6]" },
  ],
  constraints: [
    "8 ≤ brown ≤ 5,000",
    "1 ≤ yellow ≤ 2,000,000",
    "가로 ≥ 세로 ≥ 3 인 답이 항상 하나 존재해요.",
  ],
  entry: { javascript: "carpet", python: "carpet" },
  starter: {
    javascript: `/**
 * @param {number} brown 테두리(갈색) 격자 수
 * @param {number} yellow 안쪽(노란색) 격자 수
 * @return {number[]} [가로, 세로]
 */
function carpet(brown, yellow) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def carpet(brown, yellow):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [10, 2], expected: [4, 3] },
    { input: [8, 1], expected: [3, 3] },
    { input: [24, 24], expected: [8, 6] },
    { input: [14, 4], expected: [6, 3] },
    { input: [18, 6], expected: [8, 3] },
    { input: [4000, 998001], expected: [1001, 1001], hidden: true },
    { input: [12, 3], expected: [5, 3], hidden: true },
  ],
  hint: "전체 격자 수 `total = brown + yellow` 의 약수 `h` 를 세로로 두고 `w = total / h` 를 가로로 둬요. `w ≥ h` 이고 `(w - 2) * (h - 2) === yellow` 이면 답이에요. 1주차처럼 `h * h ≤ total` 까지만 훑으면 충분해요.",
  solution: {
    javascript: `function carpet(brown, yellow) {
  const total = brown + yellow;
  for (let h = 3; h * h <= total; h++) {
    if (total % h !== 0) continue;
    const w = total / h;
    if ((w - 2) * (h - 2) === yellow) return [w, h];
  }
  return [];
}
`,
    python: `def carpet(brown, yellow):
    total = brown + yellow
    h = 3
    while h * h <= total:
        if total % h == 0:
            w = total // h
            if (w - 2) * (h - 2) == yellow:
                return [w, h]
        h += 1
    return []
`,
  },
};
