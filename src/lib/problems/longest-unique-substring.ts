import type { Problem } from "@/lib/types";

export const longestUniqueSubstring: Problem = {
  slug: "longest-unique-substring",
  title: "중복 없는 가장 긴 부분 문자열",
  difficulty: "medium",
  tags: ["슬라이딩윈도우", "해시", "문자열"],
  summary: "같은 문자가 두 번 나오지 않는 가장 긴 연속 구간의 길이를 구합니다.",
  description: [
    "문자열 `s`가 주어집니다. 중복된 문자가 없는 가장 긴 연속 부분 문자열의 길이를 반환하세요.",
    "부분 문자열은 연속해야 합니다. 순서를 건너뛴 부분 수열이 아닙니다.",
  ],
  examples: [
    {
      input: 's = "abcabcbb"',
      output: "3",
      explain: '가장 긴 것은 "abc"로 길이 3입니다.',
    },
    { input: 's = "bbbbb"', output: "1", explain: '"b" 하나가 최대입니다.' },
    {
      input: 's = "pwwkew"',
      output: "3",
      explain: '"wke"가 답입니다. "pwke"는 연속하지 않으므로 안 됩니다.',
    },
  ],
  constraints: [
    "0 ≤ s.length ≤ 50,000",
    "s는 영문자, 숫자, 기호, 공백으로 이루어져 있습니다.",
  ],
  entry: {
    javascript: "lengthOfLongestSubstring",
    python: "length_of_longest_substring",
  },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def length_of_longest_substring(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["abcabcbb"], expected: 3 },
    { input: ["bbbbb"], expected: 1 },
    { input: ["pwwkew"], expected: 3 },
    { input: [""], expected: 0 },
    { input: [" "], expected: 1 },
    { input: ["dvdf"], expected: 3, hidden: true },
    { input: ["abba"], expected: 2, hidden: true },
    { input: ["tmmzuxt"], expected: 5, hidden: true },
  ],
  hint: "왼쪽 포인터와 오른쪽 포인터로 창을 유지하세요. 오른쪽 문자가 창 안에 이미 있으면, 그 문자의 마지막 등장 위치 다음으로 왼쪽 포인터를 당깁니다.",
  solution: {
    javascript: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) {
      left = last.get(ch) + 1;
    }
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
`,
    python: `def length_of_longest_substring(s):
    last = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
`,
  },
};
