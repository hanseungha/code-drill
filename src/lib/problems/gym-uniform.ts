import type { Problem } from "@/lib/types";

export const gymUniform: Problem = {
  slug: "gym-uniform",
  title: "체육복 나눠주기",
  difficulty: "medium",
  tags: ["그리디"],
  summary: "여벌 체육복을 이웃에게 빌려줘 체육 수업을 듣는 학생 수를 최대로 만들어요.",
  description: [
    "학생 수 `n`, 체육복을 도난당한 학생 번호 배열 `lost`, 여벌 체육복이 있는 학생 번호 배열 `reserve`가 주어져요. 학생은 1번부터 `n`번까지 있어요.",
    "체육복이 없는 학생은 **바로 앞 번호나 바로 뒤 번호** 학생에게만 여벌을 빌릴 수 있어요. 체육 수업을 들을 수 있는 학생 수의 **최댓값**을 반환해요.",
    "주의할 점이 하나 있어요. 여벌이 있지만 자기 체육복을 도난당한 학생은, 그 여벌을 자기가 입어야 해서 **남에게 빌려줄 수 없어요.**",
  ],
  examples: [
    {
      input: "n = 5, lost = [2, 4], reserve = [1, 3, 5]",
      output: "5",
      explain: "1이 2에게, 3이나 5가 4에게 빌려주면 다섯 명 모두 들을 수 있어요.",
    },
    {
      input: "n = 5, lost = [2, 4], reserve = [3]",
      output: "4",
      explain: "3은 2나 4 중 한 명에게만 빌려줄 수 있어서 한 명은 못 들어요.",
    },
    {
      input: "n = 3, lost = [3], reserve = [1]",
      output: "2",
      explain: "1은 3에게서 멀어 빌려줄 수 없어서 3은 못 들어요.",
    },
  ],
  constraints: [
    "1 ≤ n ≤ 30",
    "1 ≤ lost.length, reserve.length ≤ n (없으면 빈 배열)",
    "같은 학생이 lost와 reserve 양쪽에 있을 수 있어요.",
  ],
  entry: { javascript: "gymUniform", python: "gym_uniform" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @param {number[]} lost
 * @param {number[]} reserve
 * @return {number}
 */
function gymUniform(n, lost, reserve) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def gym_uniform(n, lost, reserve):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [5, [2, 4], [1, 3, 5]], expected: 5 },
    { input: [5, [2, 4], [3]], expected: 4 },
    { input: [3, [3], [1]], expected: 2 },
    { input: [3, [1, 2], [2, 3]], expected: 2 },
    { input: [10, [], []], expected: 10 },
    { input: [5, [1, 3, 5], [2, 4]], expected: 4, hidden: true },
    { input: [4, [2, 3], [1, 2, 3, 4]], expected: 4, hidden: true },
  ],
  hint: "학생마다 체육복 개수를 세요(기본 1, 도난이면 -1, 여벌이면 +1). 개수가 2인 학생만 빌려줄 수 있어요. 번호 순서대로 보면서 개수가 2인 학생은 앞 번호에 먼저, 없으면 뒤 번호에 빌려줘요. 마지막에 체육복이 1개 이상인 학생을 세요.",
  solution: {
    javascript: `function gymUniform(n, lost, reserve) {
  const has = new Array(n + 2).fill(1);
  for (const l of lost) has[l] -= 1;
  for (const r of reserve) has[r] += 1;
  for (let i = 1; i <= n; i++) {
    if (has[i] !== 2) continue;
    if (has[i - 1] === 0) {
      has[i - 1] = 1;
      has[i] = 1;
    } else if (has[i + 1] === 0) {
      has[i + 1] = 1;
      has[i] = 1;
    }
  }
  let count = 0;
  for (let i = 1; i <= n; i++) if (has[i] >= 1) count++;
  return count;
}
`,
    python: `def gym_uniform(n, lost, reserve):
    has = [1] * (n + 2)
    for l in lost:
        has[l] -= 1
    for r in reserve:
        has[r] += 1
    for i in range(1, n + 1):
        if has[i] != 2:
            continue
        if has[i - 1] == 0:
            has[i - 1] = 1
            has[i] = 1
        elif has[i + 1] == 0:
            has[i + 1] = 1
            has[i] = 1
    return sum(1 for i in range(1, n + 1) if has[i] >= 1)
`,
  },
};
