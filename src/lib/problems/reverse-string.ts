import type { Problem } from "@/lib/types";

export const reverseString: Problem = {
  slug: "reverse-string",
  title: "문자열 뒤집기",
  difficulty: "easy",
  tags: ["문자열", "구현"],
  summary: "문자열을 거꾸로 뒤집어 반환해요.",
  description: [
    "문자열 `s`가 주어져요. 문자 순서를 뒤집은 문자열을 반환해요.",
    "두 언어 모두 문자열은 **불변**이에요. 자리를 바꿔치기할 수 없으니, 문자를 꺼내 뒤집은 뒤 새 문자열을 만들어야 해요. 파이썬은 슬라이스 한 줄로 끝나지만 자바스크립트에는 문자열 `reverse`가 없어요.",
  ],
  examples: [
    { input: 's = "hello"', output: '"olleh"' },
    { input: 's = "한글도 됩니다"', output: '"다니됩 도글한"' },
    { input: 's = "a"', output: '"a"' },
  ],
  constraints: [
    "1 ≤ s.length ≤ 100,000",
    "s 는 영문자, 숫자, 공백, 한글로 이루어져요.",
  ],
  entry: { javascript: "reverseString", python: "reverse_string" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function reverseString(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def reverse_string(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["hello"], expected: "olleh" },
    { input: ["한글도 됩니다"], expected: "다니됩 도글한" },
    { input: ["a"], expected: "a" },
    { input: ["ab"], expected: "ba" },
    { input: ["racecar"], expected: "racecar" },
    { input: ["  공백  "], expected: "  백공  ", hidden: true },
    { input: ["12345"], expected: "54321", hidden: true },
  ],
  hint: "자바스크립트는 `s.split(\"\").reverse().join(\"\")`, 파이썬은 `s[::-1]` 이에요. 반복문으로 앞에서부터 읽어 앞에 붙여 나가도 되지만, 매번 새 문자열을 만들면 `O(n²)`이 돼요.",
  solution: {
    javascript: `function reverseString(s) {
  return s.split("").reverse().join("");
}
`,
    python: `def reverse_string(s):
    return s[::-1]
`,
  },
};
