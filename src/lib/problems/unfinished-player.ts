import type { Problem } from "@/lib/types";

export const unfinishedPlayer: Problem = {
  slug: "unfinished-player",
  title: "완주하지 못한 선수",
  difficulty: "medium",
  tags: ["해시", "문자열"],
  summary: "참가자 명단에서 완주자 명단을 빼고 한 명을 남겨요.",
  description: [
    "마라톤에 참가한 선수 이름 배열 `participant`와 완주한 선수 이름 배열 `completion`이 주어져요. 완주하지 못한 선수는 딱 한 명이에요. 그 선수의 이름을 반환해요.",
    "**동명이인이 있을 수 있어요.** 그래서 '완주자 목록에 없는 이름'을 찾는 방식은 틀려요. 이름이 몇 번 나왔는지까지 맞춰야 해요.",
    "무슨 도구를 꺼낼지 스스로 고르는 것이 이번 주의 목적이에요. 이 문제는 어느 주차의 도구로 풀리는지 먼저 생각해 보세요.",
  ],
  examples: [
    {
      input: 'participant = ["leo", "kiki", "eden"], completion = ["eden", "kiki"]',
      output: '"leo"',
    },
    {
      input: 'participant = ["mislav", "stanko", "mislav", "ana"], completion = ["stanko", "ana", "mislav"]',
      output: '"mislav"',
      explain: "mislav 는 두 명 참가해 한 명만 완주했어요.",
    },
  ],
  constraints: [
    "1 ≤ participant.length ≤ 100,000",
    "completion.length = participant.length - 1",
    "이름은 1자 이상 20자 이하의 영소문자예요.",
    "완주하지 못한 선수는 반드시 한 명이에요.",
  ],
  entry: { javascript: "unfinishedPlayer", python: "unfinished_player" },
  starter: {
    javascript: `/**
 * @param {string[]} participant
 * @param {string[]} completion
 * @return {string} 완주하지 못한 선수의 이름
 */
function unfinishedPlayer(participant, completion) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def unfinished_player(participant, completion):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [["leo", "kiki", "eden"], ["eden", "kiki"]], expected: "leo" },
    { input: [["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]], expected: "mislav" },
    { input: [["marina", "josipa", "nikola", "vinko", "filipa"], ["josipa", "filipa", "marina", "nikola"]], expected: "vinko" },
    { input: [["a"], []], expected: "a" },
    { input: [["a", "a"], ["a"]], expected: "a" },
    { input: [["kim", "lee", "kim", "lee"], ["kim", "lee", "kim"]], expected: "lee", hidden: true },
    { input: [["zzz", "aaa", "mmm"], ["mmm", "zzz"]], expected: "aaa", hidden: true },
  ],
  hint: "참가자를 `{ 이름: 인원수 }` 맵으로 세고, 완주자마다 하나씩 빼세요. 마지막에 개수가 `0`이 아닌 이름이 답이에요. 정렬해서 앞에서부터 짝을 맞춰 보는 풀이도 가능해요 — 7주차의 예고편이에요.",
  solution: {
    javascript: `function unfinishedPlayer(participant, completion) {
  const count = new Map();
  for (const name of participant) count.set(name, (count.get(name) ?? 0) + 1);
  for (const name of completion) count.set(name, count.get(name) - 1);
  for (const [name, n] of count) {
    if (n > 0) return name;
  }
  return "";
}
`,
    python: `def unfinished_player(participant, completion):
    count = {}
    for name in participant:
        count[name] = count.get(name, 0) + 1
    for name in completion:
        count[name] -= 1
    for name, n in count.items():
        if n > 0:
            return name
    return ""
`,
  },
};
