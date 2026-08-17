import type { Problem } from "@/lib/types";

export const lcsLength: Problem = {
  slug: "lcs-length",
  title: "최장 공통 부분 수열",
  difficulty: "medium",
  tags: ["DP", "문자열"],
  summary: "두 문자열에 공통으로 순서를 지켜 나타나는 가장 긴 부분 수열의 길이를 구해요.",
  description: [
    "두 문자열 `a`와 `b`가 주어져요. 두 문자열 **모두에서 순서를 지켜** 뽑을 수 있는 공통 부분 수열 중 가장 긴 것의 **길이**를 반환해요. 글자가 이어져 있을 필요는 없어요.",
    "두 문자열을 나란히 놓고 표를 채워요. `dp[i][j]`를 'a의 앞 i글자와 b의 앞 j글자의 최장 공통 부분 수열 길이'라 하면, 마지막 글자가 같으면 `dp[i-1][j-1] + 1`, 다르면 `dp[i-1][j]`와 `dp[i][j-1]` 중 큰 값이에요.",
  ],
  examples: [
    {
      input: 'a = "abcde", b = "ace"',
      output: "3",
      explain: '"ace"가 두 문자열에 순서대로 들어 있어요.',
    },
    {
      input: 'a = "abc", b = "abc"',
      output: "3",
    },
    {
      input: 'a = "abc", b = "def"',
      output: "0",
    },
  ],
  constraints: [
    "0 ≤ a.length, b.length ≤ 1,000",
    "두 문자열은 소문자 알파벳으로 이루어져요.",
  ],
  entry: { javascript: "lcsLength", python: "lcs_length" },
  starter: {
    javascript: `/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
function lcsLength(a, b) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def lcs_length(a, b):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["abcde", "ace"], expected: 3 },
    { input: ["abc", "abc"], expected: 3 },
    { input: ["abc", "def"], expected: 0 },
    { input: ["", "abc"], expected: 0 },
    { input: ["aggtab", "gxtxayb"], expected: 4 },
    { input: ["bl", "yby"], expected: 1, hidden: true },
    { input: ["abcbdab", "bdcaba"], expected: 4, hidden: true },
  ],
  hint: "`(a.length + 1) × (b.length + 1)` 크기의 표를 0으로 채워요. `i`, `j`를 1부터 돌며 `a[i-1] === b[j-1]`이면 `dp[i][j] = dp[i-1][j-1] + 1`, 아니면 `Math.max(dp[i-1][j], dp[i][j-1])`로 채워요. 오른쪽 아래 칸이 답이에요.",
  solution: {
    javascript: `function lcsLength(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
`,
    python: `def lcs_length(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
`,
  },
};
