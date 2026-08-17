import type { Problem } from "@/lib/types";

export const maxCableLength: Problem = {
  slug: "max-cable-length",
  title: "랜선 자르기",
  difficulty: "hard",
  tags: ["이분 탐색", "파라메트릭 서치"],
  summary: "N개 이상을 만들 수 있는 랜선의 최대 길이를 답의 범위에서 이분 탐색해요.",
  description: [
    "길이가 제각각인 랜선들 `lengths`가 주어져요. 이 랜선들을 잘라서 **길이가 같은 조각 N개 이상**을 만들려고 해요. 각 랜선은 정수 길이로만 자를 수 있고, 남는 부분은 버려요.",
    "만들 수 있는 조각 하나의 **최대 길이**를 반환해요. 예를 들어 802cm 랜선을 200cm로 자르면 4조각이 나오고 2cm는 버려요.",
    "여기서 길이를 하나 정하면 '몇 조각 나오는지'는 바로 셀 수 있어요. 그리고 길이가 **길수록 조각 수는 줄어들어요.** 그래서 'N개를 만들 수 있다/없다'가 어떤 길이를 경계로 딱 갈려요. 그 경계를 길이 범위에서 이분 탐색으로 찾아요.",
  ],
  examples: [
    {
      input: "lengths = [802, 743, 457, 539], n = 11",
      output: "200",
      explain: "200으로 자르면 4·3·2·2 = 11조각이에요. 201로는 11개를 못 만들어요.",
    },
    {
      input: "lengths = [10, 10], n = 4",
      output: "5",
      explain: "5로 자르면 각 2조각씩 4조각이 나와요.",
    },
  ],
  constraints: [
    "1 ≤ lengths.length ≤ 10,000",
    "1 ≤ lengths[i] ≤ 1,000,000,000",
    "1 ≤ n, 그리고 길이 1로 자르면 항상 N개 이상 만들 수 있어요.",
  ],
  entry: { javascript: "maxCableLength", python: "max_cable_length" },
  starter: {
    javascript: `/**
 * @param {number[]} lengths
 * @param {number} n
 * @return {number}
 */
function maxCableLength(lengths, n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def max_cable_length(lengths, n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[802, 743, 457, 539], 11], expected: 200 },
    { input: [[10, 10], 4], expected: 5 },
    { input: [[1], 1], expected: 1 },
    { input: [[100], 3], expected: 33 },
    { input: [[7, 7, 7, 7], 4], expected: 7 },
    { input: [[1000000000], 1], expected: 1000000000, hidden: true },
    { input: [[300, 300, 300], 7], expected: 100, hidden: true },
  ],
  hint: "길이 범위 `[1, max(lengths)]`를 이분 탐색해요. 가운데 길이 `mid`에서 조각 수는 `모든 랜선의 (길이 / mid)를 내림해 더한 값`이에요. 이 수가 N 이상이면 더 길게(`lo = mid + 1`) 시도하며 답을 기록하고, 모자라면 더 짧게(`hi = mid - 1`) 줄여요.",
  solution: {
    javascript: `function maxCableLength(lengths, n) {
  let lo = 1;
  let hi = Math.max(...lengths);
  let best = 0;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    let count = 0;
    for (const length of lengths) count += Math.floor(length / mid);
    if (count >= n) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return best;
}
`,
    python: `def max_cable_length(lengths, n):
    lo, hi = 1, max(lengths)
    best = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        count = sum(length // mid for length in lengths)
        if count >= n:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return best
`,
  },
};
