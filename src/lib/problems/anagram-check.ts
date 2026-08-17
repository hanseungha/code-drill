import type { Problem } from "@/lib/types";

export const anagramCheck: Problem = {
  slug: "anagram-check",
  title: "애너그램 판별",
  difficulty: "easy",
  tags: ["문자열", "해시", "정렬"],
  summary: "두 문자열이 같은 문자로 이루어져 있는지 판정해요.",
  description: [
    "문자열 `s`와 `t`가 주어져요. 두 문자열이 서로 애너그램이면 `true`, 아니면 `false`를 반환해요. 애너그램은 **같은 문자를 같은 개수만큼** 쓰고 순서만 다른 관계예요.",
    "두 가지 풀이를 모두 써 봐요. 정렬해서 비교하면 `O(n log n)`이고 한 줄로 끝나요. 문자별 개수를 세어 비교하면 `O(n)`이지만 코드가 몇 줄 늘어나요.",
    "코딩 테스트에서는 대부분 정렬 풀이로 충분해요. 어느 쪽이 더 빠른지보다, **정렬이 만들어 주는 표준형**이라는 발상이 7주차와 이어져요.",
  ],
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: "true" },
    { input: 's = "rat", t = "car"', output: "false" },
    { input: 's = "aa", t = "a"', output: "false", explain: "길이가 다르면 볼 것도 없어요." },
  ],
  constraints: [
    "1 ≤ s.length, t.length ≤ 100,000",
    "s 와 t 는 영소문자로만 이루어져요.",
  ],
  entry: { javascript: "anagramCheck", python: "anagram_check" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function anagramCheck(s, t) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def anagram_check(s, t):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["anagram", "nagaram"], expected: true },
    { input: ["rat", "car"], expected: false },
    { input: ["aa", "a"], expected: false },
    { input: ["a", "a"], expected: true },
    { input: ["ab", "ba"], expected: true },
    { input: ["aab", "abb"], expected: false },
    { input: ["listen", "silent"], expected: true, hidden: true },
    { input: ["abcd", "abce"], expected: false, hidden: true },
    { input: ["aabbcc", "abcabc"], expected: true, hidden: true },
  ],
  hint: "길이부터 비교하면 대부분의 오답을 바로 걸러내요. 빈도수 풀이는 영소문자뿐이니 길이 26짜리 배열이면 충분해요 — 맵보다 빠르고 5주차 해시의 예고편이기도 해요.",
  solution: {
    javascript: `function anagramCheck(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const base = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - base]++;
    count[t.charCodeAt(i) - base]--;
  }
  return count.every((c) => c === 0);
}
`,
    python: `def anagram_check(s, t):
    if len(s) != len(t):
        return False
    count = [0] * 26
    base = ord("a")
    for a, b in zip(s, t):
        count[ord(a) - base] += 1
        count[ord(b) - base] -= 1
    return all(c == 0 for c in count)
`,
  },
};
