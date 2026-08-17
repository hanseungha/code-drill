import type { Problem } from "@/lib/types";

export const editDistance: Problem = {
  slug: "edit-distance",
  title: "편집 거리",
  difficulty: "hard",
  tags: ["DP", "문자열"],
  summary: "한 문자열을 다른 문자열로 바꾸는 데 필요한 최소 편집 횟수를 구해요.",
  description: [
    "두 문자열 `a`와 `b`가 주어져요. `a`를 `b`로 바꾸는 데 필요한 **최소 편집 횟수**를 반환해요. 한 번의 편집은 글자 하나를 **삽입**, **삭제**, 또는 **교체**하는 것이에요.",
    "`dp[i][j]`를 'a의 앞 i글자를 b의 앞 j글자로 바꾸는 최소 횟수'라 해요. 마지막 글자가 같으면 그대로 `dp[i-1][j-1]`이고, 다르면 삭제·삽입·교체 세 방향(`dp[i-1][j]`, `dp[i][j-1]`, `dp[i-1][j-1]`) 중 가장 작은 값에 1을 더해요.",
    "빈 문자열로 시작하는 경계도 중요해요. `a`의 i글자를 빈 문자열로 만들려면 i번 삭제, 빈 문자열을 `b`의 j글자로 만들려면 j번 삽입이 필요해요.",
  ],
  examples: [
    {
      input: 'a = "horse", b = "ros"',
      output: "3",
      explain: "horse → rorse(교체) → rose(삭제) → ros(삭제), 세 번이에요.",
    },
    {
      input: 'a = "intention", b = "execution"',
      output: "5",
    },
  ],
  constraints: [
    "0 ≤ a.length, b.length ≤ 1,000",
    "두 문자열은 소문자 알파벳으로 이루어져요.",
  ],
  entry: { javascript: "editDistance", python: "edit_distance" },
  starter: {
    javascript: `/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
function editDistance(a, b) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def edit_distance(a, b):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["horse", "ros"], expected: 3 },
    { input: ["intention", "execution"], expected: 5 },
    { input: ["", "abc"], expected: 3 },
    { input: ["abc", ""], expected: 3 },
    { input: ["sunday", "saturday"], expected: 3 },
    { input: ["abc", "abc"], expected: 0, hidden: true },
    { input: ["kitten", "sitting"], expected: 3, hidden: true },
  ],
  hint: "`(a.length + 1) × (b.length + 1)` 표를 만들고 첫 행·첫 열을 0, 1, 2… 로 채워요(빈 문자열과의 거리). 나머지는 글자가 같으면 왼쪽 위 대각선 값을 그대로, 다르면 위·왼쪽·대각선 세 값의 최솟값에 1을 더해 채워요.",
  solution: {
    javascript: `function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}
`,
    python: `def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]
`,
  },
};
