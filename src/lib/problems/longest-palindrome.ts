import type { Problem } from "@/lib/types";

export const longestPalindrome: Problem = {
  slug: "longest-palindrome",
  title: "가장 긴 팰린드롬 부분 문자열",
  difficulty: "hard",
  tags: ["문자열"],
  summary: "문자열 안에서 앞뒤가 같은 가장 긴 연속 부분 문자열의 길이를 구해요.",
  description: [
    "문자열 `s`가 주어져요. `s`의 연속된 부분 문자열 중 **팰린드롬**(앞에서 읽으나 뒤에서 읽으나 같은 문자열)인 가장 긴 것의 **길이**를 반환해요.",
    "각 자리를 **중심**으로 잡고 좌우로 같은 글자인 동안 넓혀 가면 그 중심에서의 가장 긴 팰린드롬을 알 수 있어요. 팰린드롬은 길이가 홀수일 수도(중심이 글자 하나) 짝수일 수도(중심이 두 글자 사이) 있으니 두 경우를 모두 봐요.",
    "이 중심 확장은 `O(n²)`이에요. 대칭성을 재사용하는 매내처 알고리즘을 쓰면 `O(n)`까지 줄일 수 있어요.",
  ],
  examples: [
    {
      input: 's = "babad"',
      output: "3",
      explain: '"bab" 또는 "aba"가 길이 3으로 가장 길어요.',
    },
    {
      input: 's = "cbbd"',
      output: "2",
      explain: '"bb"가 길이 2예요.',
    },
    {
      input: 's = "abc"',
      output: "1",
      explain: "팰린드롬이 한 글자짜리뿐이에요.",
    },
  ],
  constraints: [
    "0 ≤ s.length ≤ 1,000",
    "s는 소문자 알파벳으로 이루어져요.",
  ],
  entry: { javascript: "longestPalindrome", python: "longest_palindrome" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function longestPalindrome(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def longest_palindrome(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["babad"], expected: 3 },
    { input: ["cbbd"], expected: 2 },
    { input: ["abc"], expected: 1 },
    { input: [""], expected: 0 },
    { input: ["aaaa"], expected: 4 },
    { input: ["forgeeksskeegfor"], expected: 10, hidden: true },
    { input: ["abacdfgdcaba"], expected: 3, hidden: true },
  ],
  hint: "각 인덱스를 중심으로 좌우로 넓히는 `expand(l, r)`을 만들어 팰린드롬 길이 `r - l - 1`을 돌려주게 해요. 모든 위치에서 홀수 중심(`i, i`)과 짝수 중심(`i, i + 1`) 두 경우의 길이를 구해 최댓값을 기록해요.",
  solution: {
    javascript: `function longestPalindrome(s) {
  if (s.length === 0) return 0;
  let best = 1;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return r - l - 1;
  }
  for (let i = 0; i < s.length; i++) {
    best = Math.max(best, expand(i, i), expand(i, i + 1));
  }
  return best;
}
`,
    python: `def longest_palindrome(s):
    if not s:
        return 0

    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return r - l - 1

    best = 1
    for i in range(len(s)):
        best = max(best, expand(i, i), expand(i, i + 1))
    return best
`,
  },
};
