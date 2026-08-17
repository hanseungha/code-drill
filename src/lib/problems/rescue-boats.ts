import type { Problem } from "@/lib/types";

export const rescueBoats: Problem = {
  slug: "rescue-boats",
  title: "구명보트",
  difficulty: "medium",
  tags: ["그리디", "투 포인터", "정렬"],
  summary: "한 보트에 최대 두 명, 무게 합 제한 아래에서 필요한 최소 보트 수를 구해요.",
  description: [
    "사람들의 몸무게 배열 `people`과 보트 한 척의 무게 제한 `limit`이 주어져요. 보트 한 척에는 **최대 두 명**까지 탈 수 있고, 두 사람의 무게 합이 `limit`을 넘지 않아야 해요.",
    "모두를 태우는 데 필요한 **최소 보트 수**를 반환해요.",
    "정렬한 뒤 양끝에서 짝짓는 것이 최적이에요. 가장 무거운 사람은 가장 가벼운 사람과 함께 태울 수 있으면 태우고, 아니면 혼자 보내요.",
  ],
  examples: [
    {
      input: "people = [1, 2], limit = 3",
      output: "1",
      explain: "1 + 2 = 3 ≤ 3이니 한 보트에 둘 다 태워요.",
    },
    {
      input: "people = [3, 2, 2, 1], limit = 3",
      output: "3",
      explain: "(1, 2), (2), (3) — 세 척이에요.",
    },
  ],
  constraints: [
    "1 ≤ people.length ≤ 100,000",
    "1 ≤ people[i] ≤ limit ≤ 1,000,000,000",
  ],
  entry: { javascript: "rescueBoats", python: "rescue_boats" },
  starter: {
    javascript: `/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
function rescueBoats(people, limit) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def rescue_boats(people, limit):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2], 3], expected: 1 },
    { input: [[3, 2, 2, 1], 3], expected: 3 },
    { input: [[3, 5, 3, 4], 5], expected: 4 },
    { input: [[5, 5, 5, 5], 5], expected: 4 },
    { input: [[1, 1, 1, 1], 10], expected: 2, hidden: true },
    { input: [[2, 4, 1, 3, 5], 6], expected: 3, hidden: true },
  ],
  hint: "무게 오름차순으로 정렬하고 포인터 `i`(가장 가벼움), `j`(가장 무거움)를 둬요. `people[i] + people[j] <= limit`이면 둘을 함께 태우고 `i++`, 어느 경우든 `j--`와 보트 수 증가를 해요.",
  solution: {
    javascript: `function rescueBoats(people, limit) {
  const sorted = [...people].sort((a, b) => a - b);
  let i = 0;
  let j = sorted.length - 1;
  let boats = 0;
  while (i <= j) {
    if (sorted[i] + sorted[j] <= limit) i++;
    j--;
    boats++;
  }
  return boats;
}
`,
    python: `def rescue_boats(people, limit):
    people = sorted(people)
    i, j, boats = 0, len(people) - 1, 0
    while i <= j:
        if people[i] + people[j] <= limit:
            i += 1
        j -= 1
        boats += 1
    return boats
`,
  },
};
