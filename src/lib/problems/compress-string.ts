import type { Problem } from "@/lib/types";

export const compressString: Problem = {
  slug: "compress-string",
  title: "문자열 압축",
  difficulty: "medium",
  tags: ["문자열", "구현"],
  summary: "같은 문자가 이어지는 구간을 '문자 + 개수'로 줄입니다.",
  description: [
    "문자열 `s`가 주어집니다. 같은 문자가 연속으로 나오는 구간을 `문자 + 개수` 로 바꾼 문자열을 반환하세요.",
    "개수가 `1`인 구간은 **개수를 쓰지 않습니다**. 예를 들어 `\"abc\"` 는 `\"a1b1c1\"` 이 아니라 `\"abc\"` 그대로입니다.",
    "연속 구간을 세는 일 자체는 반복문 하나면 되지만, 마지막 구간을 빠뜨리기 쉽습니다. 반복문이 끝난 뒤에 한 번 더 기록하거나, 경계를 넘어설 때 기록하도록 조건을 잡으세요.",
  ],
  examples: [
    { input: 's = "aabbbcc"', output: '"a2b3c2"' },
    { input: 's = "abc"', output: '"abc"', explain: "모든 구간의 길이가 1이라 개수를 쓰지 않습니다." },
    { input: 's = "aaaaaaaaaaaa"', output: '"a12"', explain: "개수가 두 자리여도 그대로 붙입니다." },
  ],
  constraints: ["1 ≤ s.length ≤ 100,000", "s 는 영소문자로만 이루어집니다."],
  entry: { javascript: "compressString", python: "compress_string" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function compressString(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def compress_string(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["aabbbcc"], expected: "a2b3c2" },
    { input: ["abc"], expected: "abc" },
    { input: ["aaaaaaaaaaaa"], expected: "a12" },
    { input: ["a"], expected: "a" },
    { input: ["aab"], expected: "a2b" },
    { input: ["abb"], expected: "ab2" },
    { input: ["aabbaa"], expected: "a2b2a2", hidden: true },
    { input: ["zzzzzzzzzz"], expected: "z10", hidden: true },
    { input: ["ababab"], expected: "ababab", hidden: true },
  ],
  hint: "조각을 배열에 모았다가 마지막에 한 번만 이어붙이세요. 반복문 안에서 `result += ...` 로 문자열을 계속 새로 만들면 길이가 길어질수록 급격히 느려집니다. 자바스크립트는 `join(\"\")`, 파이썬은 `\"\".join(...)` 입니다.",
  solution: {
    javascript: `function compressString(s) {
  const parts = [];
  let count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
      continue;
    }
    parts.push(count === 1 ? s[i - 1] : s[i - 1] + count);
    count = 1;
  }
  return parts.join("");
}
`,
    python: `def compress_string(s):
    parts = []
    count = 1
    for i in range(1, len(s) + 1):
        if i < len(s) and s[i] == s[i - 1]:
            count += 1
            continue
        parts.append(s[i - 1] if count == 1 else s[i - 1] + str(count))
        count = 1
    return "".join(parts)
`,
  },
};
