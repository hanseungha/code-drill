import type { Problem } from "@/lib/types";

export const mostFrequentChar: Problem = {
  slug: "most-frequent-char",
  title: "가장 많이 등장한 문자",
  difficulty: "medium",
  tags: ["해시", "문자열"],
  summary: "빈도수 맵을 만든 뒤 가장 큰 값을 가진 키를 뽑습니다.",
  description: [
    "영소문자로 이루어진 문자열 `s`가 주어집니다. 가장 많이 등장한 문자를 반환하세요.",
    "가장 많이 등장한 문자가 여럿이면 **사전순으로 앞선 문자**를 반환합니다.",
    "빈도수 세기는 해시의 절반입니다. 먼저 `{ 문자: 개수 }` 를 만들고, 그 다음 만들어진 맵에서 최댓값을 뽑는 **두 단계로 나누는 것**이 요령입니다. 한 번에 하려 들면 동점 처리에서 꼬입니다.",
  ],
  examples: [
    { input: 's = "aabbbcc"', output: '"b"' },
    {
      input: 's = "abab"',
      output: '"a"',
      explain: "a와 b 모두 두 번이므로 사전순으로 앞선 a 입니다.",
    },
    { input: 's = "z"', output: '"z"' },
  ],
  constraints: ["1 ≤ s.length ≤ 100,000", "s 는 영소문자로만 이루어집니다."],
  entry: { javascript: "mostFrequentChar", python: "most_frequent_char" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {string} 한 글자
 */
function mostFrequentChar(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def most_frequent_char(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["aabbbcc"], expected: "b" },
    { input: ["abab"], expected: "a" },
    { input: ["z"], expected: "z" },
    { input: ["abcabc"], expected: "a" },
    { input: ["aaabbbccc"], expected: "a" },
    { input: ["zzzaaa"], expected: "a" },
    { input: ["qwertyuiop"], expected: "e", hidden: true },
    { input: ["mississippi"], expected: "i", hidden: true },
    { input: ["ba"], expected: "a", hidden: true },
  ],
  hint: "맵을 순회하며 최댓값을 찾을 때 **순회 순서에 기대지 마세요**. 개수가 더 클 때만 갱신하고, 같을 때는 문자를 비교해 더 앞선 쪽을 남기면 순서와 무관하게 답이 정해집니다. 영소문자뿐이므로 길이 26 배열로도 됩니다 — 그러면 순서가 곧 사전순입니다.",
  solution: {
    javascript: `function mostFrequentChar(s) {
  const count = new Map();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);

  let best = null;
  let bestCount = 0;
  for (const [c, n] of count) {
    if (n > bestCount || (n === bestCount && c < best)) {
      best = c;
      bestCount = n;
    }
  }
  return best;
}
`,
    python: `def most_frequent_char(s):
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1

    best = None
    best_count = 0
    for c, n in count.items():
        if n > best_count or (n == best_count and c < best):
            best = c
            best_count = n
    return best
`,
  },
};
