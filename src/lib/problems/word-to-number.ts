import type { Problem } from "@/lib/types";

export const wordToNumber: Problem = {
  slug: "word-to-number",
  title: "영단어를 숫자로 바꾸기",
  difficulty: "medium",
  tags: ["문자열", "구현"],
  summary: "숫자와 영단어가 섞인 문자열을 정수로 되돌립니다.",
  description: [
    "숫자와 영단어가 섞인 문자열 `s`가 주어집니다. 영단어를 해당하는 숫자로 바꾼 뒤, 전체를 정수로 반환하세요.",
    "쓰이는 영단어는 `zero` `one` `two` `three` `four` `five` `six` `seven` `eight` `nine` 열 개입니다.",
    "예를 들어 `\"one4seveneight\"` 는 `1`, `4`, `7`, `8` 이 이어진 `1478` 입니다.",
    "영단어 열 개를 차례로 치환하고 마지막에 정수로 바꾸는 것이 가장 짧습니다. 앞에서부터 한 글자씩 읽으며 버퍼에 모아 처리해도 됩니다.",
  ],
  examples: [
    { input: 's = "one4seveneight"', output: "1478" },
    { input: 's = "23four5six7"', output: "234567" },
    { input: 's = "2three45sixseven"', output: "234567" },
    { input: 's = "123"', output: "123", explain: "영단어가 없으면 그대로입니다." },
  ],
  constraints: [
    "1 ≤ s.length ≤ 50",
    "s 는 숫자와 위 열 개의 영단어로만 이루어집니다.",
    "s 의 첫 글자는 `0` 이나 `zero` 로 시작하지 않습니다.",
    "변환한 결과는 1 이상 2,000,000,000 이하입니다.",
  ],
  entry: { javascript: "wordToNumber", python: "word_to_number" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function wordToNumber(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def word_to_number(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["one4seveneight"], expected: 1478 },
    { input: ["23four5six7"], expected: 234567 },
    { input: ["2three45sixseven"], expected: 234567 },
    { input: ["123"], expected: 123 },
    { input: ["1zero"], expected: 10 },
    { input: ["nine"], expected: 9 },
    { input: ["onetwothreefourfivesixseveneightnine"], expected: 123456789, hidden: true },
    { input: ["5three7"], expected: 537, hidden: true },
    { input: ["twoone"], expected: 21, hidden: true },
  ],
  hint: "영단어 배열을 인덱스 순서(`zero` 가 0)로 두고 `replaceAll` / `replace` 를 열 번 돌리면 됩니다. 마지막에 문자열을 정수로 바꾸는 것을 잊지 마세요 — `\"1478\"` 과 `1478` 은 다른 값입니다.",
  solution: {
    javascript: `function wordToNumber(s) {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  let out = s;
  for (let i = 0; i < words.length; i++) {
    out = out.split(words[i]).join(String(i));
  }
  return Number(out);
}
`,
    python: `def word_to_number(s):
    words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    out = s
    for i, word in enumerate(words):
        out = out.replace(word, str(i))
    return int(out)
`,
  },
};
