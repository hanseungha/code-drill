import type { Problem } from "@/lib/types";

export const kmpSearch: Problem = {
  slug: "kmp-search",
  title: "부분 문자열 찾기 (KMP)",
  difficulty: "hard",
  tags: ["문자열", "KMP"],
  summary: "본문에서 패턴이 나타나는 모든 위치를 KMP로 찾아요.",
  description: [
    "본문 `text`와 패턴 `pattern`이 주어져요. `pattern`이 `text` 안에 나타나는 **모든 시작 위치**(0-based)를 오름차순 배열로 반환해요. 겹치는 경우도 모두 세요.",
    "한 글자씩 밀며 매번 처음부터 비교하면 `O(n·m)`이에요. KMP는 패턴 안의 반복 구조를 미리 계산한 **실패 함수**를 써서, 불일치가 나도 본문 포인터를 **되돌리지 않아요.** 덕분에 `O(n + m)`이에요.",
    "실패 함수 `fail[i]`는 '패턴의 앞 i+1글자에서, 접두사이면서 접미사인 가장 긴 길이'예요. 불일치가 나면 이 값만큼 패턴 포인터를 뒤로 보내 비교를 이어가요.",
  ],
  examples: [
    {
      input: 'text = "abababa", pattern = "aba"',
      output: "[0, 2, 4]",
      explain: '"aba"가 0, 2, 4에서 겹치며 나타나요.',
    },
    {
      input: 'text = "hello", pattern = "ll"',
      output: "[2]",
    },
    {
      input: 'text = "abc", pattern = "xyz"',
      output: "[]",
    },
  ],
  constraints: [
    "1 ≤ pattern.length ≤ text.length ≤ 200,000",
    "두 문자열은 소문자 알파벳으로 이루어져요.",
  ],
  entry: { javascript: "kmpSearch", python: "kmp_search" },
  starter: {
    javascript: `/**
 * @param {string} text
 * @param {string} pattern
 * @return {number[]}
 */
function kmpSearch(text, pattern) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def kmp_search(text, pattern):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["abababa", "aba"], expected: [0, 2, 4] },
    { input: ["hello", "ll"], expected: [2] },
    { input: ["abc", "xyz"], expected: [] },
    { input: ["aaaaa", "aa"], expected: [0, 1, 2, 3] },
    { input: ["ababcababcab", "ababc"], expected: [0, 5] },
    { input: ["mississippi", "issi"], expected: [1, 4], hidden: true },
    { input: ["aaaaaa", "aaaaaa"], expected: [0], hidden: true },
  ],
  hint: "먼저 패턴의 실패 함수를 만들어요(`j`를 두고 `pattern[i]`와 `pattern[j]`를 비교하며 채워요). 그다음 본문을 훑되, 불일치가 나면 패턴 포인터 `j`를 `fail[j-1]`로 보내고, 일치가 패턴 끝까지 가면 시작 위치 `i - j + 1`을 담고 `j`를 다시 `fail[j-1]`로 보내요.",
  solution: {
    javascript: `function kmpSearch(text, pattern) {
  const m = pattern.length;
  const fail = new Array(m).fill(0);
  let j = 0;
  for (let i = 1; i < m; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = fail[j - 1];
    if (pattern[i] === pattern[j]) fail[i] = ++j;
  }
  const found = [];
  j = 0;
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = fail[j - 1];
    if (text[i] === pattern[j]) {
      if (++j === m) {
        found.push(i - j + 1);
        j = fail[j - 1];
      }
    }
  }
  return found;
}
`,
    python: `def kmp_search(text, pattern):
    m = len(pattern)
    fail = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = fail[j - 1]
        if pattern[i] == pattern[j]:
            j += 1
            fail[i] = j
    found = []
    j = 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pattern[j]:
            j = fail[j - 1]
        if ch == pattern[j]:
            j += 1
            if j == m:
                found.append(i - j + 1)
                j = fail[j - 1]
    return found
`,
  },
};
