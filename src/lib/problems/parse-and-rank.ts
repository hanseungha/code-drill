import type { Problem } from "@/lib/types";

export const parseAndRank: Problem = {
  slug: "parse-and-rank",
  title: "문자열 파싱 + 정렬",
  difficulty: "medium",
  tags: ["문자열", "정렬", "구현"],
  summary: "로그 문자열을 파싱해 점수 순으로 참가자를 줄 세워요.",
  description: [
    '각 원소가 `"이름 점수"` 형태(공백으로 구분)인 로그 배열 `logs`가 주어져요. 이름은 소문자 알파벳, 점수는 정수예요.',
    "점수가 **높은 사람부터** 오도록, 점수가 같으면 **이름 사전순**으로 정렬한 뒤, 이름만 담은 배열을 반환해요.",
    "문자열을 값으로 바꾸는 파싱과 다중 기준 정렬을 한 번에 다루는 문제예요. 점수를 숫자로 바꾸지 않고 문자열로 비교하면 틀리니 조심해요.",
  ],
  examples: [
    {
      input: 'logs = ["alice 90", "bob 85", "carol 90"]',
      output: '["alice", "carol", "bob"]',
      explain: "90점인 alice·carol이 앞이고 둘 중엔 이름순, 그다음 85점 bob이에요.",
    },
    {
      input: 'logs = ["kim 70"]',
      output: '["kim"]',
    },
  ],
  constraints: [
    "1 ≤ logs.length ≤ 100,000",
    "0 ≤ 점수 ≤ 1,000,000",
    "이름은 서로 다르고, 각 줄은 이름과 점수가 공백 하나로 구분돼요.",
  ],
  entry: { javascript: "parseAndRank", python: "parse_and_rank" },
  starter: {
    javascript: `/**
 * @param {string[]} logs
 * @return {string[]}
 */
function parseAndRank(logs) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def parse_and_rank(logs):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [["alice 90", "bob 85", "carol 90"]], expected: ["alice", "carol", "bob"] },
    { input: [["kim 70"]], expected: ["kim"] },
    { input: [["a 1", "b 1", "c 1"]], expected: ["a", "b", "c"] },
    { input: [["zoe 50", "amy 100", "bob 100", "amy2 50"]], expected: ["amy", "bob", "amy2", "zoe"] },
    { input: [["p 3", "q 30", "r 200", "s 1"]], expected: ["r", "q", "p", "s"], hidden: true },
    { input: [["low 0", "high 999999"]], expected: ["high", "low"], hidden: true },
  ],
  hint: "각 줄을 공백으로 나눠 이름과 점수로 분리하고, 점수는 숫자로 바꿔요. 점수 내림차순·이름 오름차순으로 정렬한 뒤 이름만 뽑아요. JavaScript는 비교자에서 `b.score - a.score || a.name.localeCompare(b.name)`, 파이썬은 `key=lambda p: (-p[1], p[0])`를 써요.",
  solution: {
    javascript: `function parseAndRank(logs) {
  const parsed = logs.map((line) => {
    const [name, score] = line.split(" ");
    return [name, Number(score)];
  });
  parsed.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return parsed.map((p) => p[0]);
}
`,
    python: `def parse_and_rank(logs):
    parsed = []
    for line in logs:
        name, score = line.split(" ")
        parsed.append((name, int(score)))
    parsed.sort(key=lambda p: (-p[1], p[0]))
    return [name for name, _ in parsed]
`,
  },
};
