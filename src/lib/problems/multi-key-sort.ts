import type { Problem } from "@/lib/types";

export const multiKeySort: Problem = {
  slug: "multi-key-sort",
  title: "다중 기준 정렬",
  difficulty: "easy",
  tags: ["정렬", "구현"],
  summary: "여러 기준을 순서대로 적용해 사람 목록을 정렬해요.",
  description: [
    "각 원소가 `[이름, 나이, 점수]` 형태인 배열 `people`이 주어져요. 다음 기준을 **순서대로** 적용해 정렬한 뒤, 정렬된 이름만 담은 배열을 반환해요.",
    "1) 점수가 높은 사람이 앞에 와요. 2) 점수가 같으면 나이가 어린 사람이 앞에 와요. 3) 나이도 같으면 이름 사전순으로 앞에 와요.",
    "이름은 서로 다르니까 정렬 결과는 유일하게 정해져요.",
  ],
  examples: [
    {
      input: 'people = [["alice", 30, 90], ["bob", 25, 90], ["carol", 25, 80]]',
      output: '["bob", "alice", "carol"]',
      explain:
        "점수는 alice·bob이 90으로 같아 나이가 어린 bob이 앞, 그다음 alice, 마지막이 점수 80인 carol이에요.",
    },
    {
      input: 'people = [["kim", 40, 70], ["lee", 40, 70]]',
      output: '["kim", "lee"]',
      explain: "점수와 나이가 모두 같으니까 이름 사전순으로 kim, lee 순이에요.",
    },
  ],
  constraints: [
    "1 ≤ people.length ≤ 10,000",
    "0 ≤ 나이 ≤ 120, 0 ≤ 점수 ≤ 100",
    "이름은 소문자 알파벳으로 이루어지며 서로 달라요.",
  ],
  entry: { javascript: "multiKeySort", python: "multi_key_sort" },
  starter: {
    javascript: `/**
 * @param {[string, number, number][]} people
 * @return {string[]}
 */
function multiKeySort(people) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def multi_key_sort(people):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[["alice", 30, 90], ["bob", 25, 90], ["carol", 25, 80]]], expected: ["bob", "alice", "carol"] },
    { input: [[["kim", 40, 70], ["lee", 40, 70]]], expected: ["kim", "lee"] },
    { input: [[["solo", 20, 55]]], expected: ["solo"] },
    {
      input: [
        [
          ["amy", 30, 88],
          ["ben", 30, 88],
          ["cho", 22, 88],
          ["dan", 22, 95],
        ],
      ], expected: ["dan", "cho", "amy", "ben"],
    },
    {
      input: [
        [
          ["zoe", 19, 100],
          ["ann", 19, 100],
          ["max", 50, 100],
        ],
      ], expected: ["ann", "zoe", "max"],
      hidden: true,
    },
    {
      input: [
        [
          ["p", 40, 60],
          ["q", 30, 60],
          ["r", 40, 61],
          ["s", 30, 60],
        ],
      ], expected: ["r", "q", "s", "p"],
      hidden: true,
    },
  ],
  hint: "JavaScript는 비교자에서 `b.score - a.score || a.age - b.age || a.name.localeCompare(b.name)`처럼 `||`로 다음 기준으로 넘어가요. Python은 `key=lambda p: (-p[2], p[1], p[0])`로 튜플을 돌려주면 돼요.",
  solution: {
    javascript: `function multiKeySort(people) {
  return [...people]
    .sort((a, b) => b[2] - a[2] || a[1] - b[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map((p) => p[0]);
}
`,
    python: `def multi_key_sort(people):
    ordered = sorted(people, key=lambda p: (-p[2], p[1], p[0]))
    return [p[0] for p in ordered]
`,
  },
};
