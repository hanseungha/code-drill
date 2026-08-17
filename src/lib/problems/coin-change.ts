import type { Problem } from "@/lib/types";

export const coinChange: Problem = {
  slug: "coin-change",
  title: "거스름돈",
  difficulty: "medium",
  tags: ["DP"],
  summary: "주어진 동전으로 금액을 만드는 데 필요한 최소 개수를 구해요.",
  description: [
    "동전 종류가 담긴 배열 `coins`와 목표 금액 `amount`가 주어져요. 목표 금액을 만드는 데 필요한 동전의 최소 개수를 반환해요.",
    "같은 동전을 여러 번 사용할 수 있어요. 어떤 조합으로도 금액을 만들 수 없다면 `-1`을 반환해요.",
    "탐욕적으로 큰 동전부터 쓰는 방법은 틀려요. 예를 들어 `coins = [1, 3, 4]`, `amount = 6`이면 4+1+1(3개)이 아니라 3+3(2개)이 정답이에요.",
  ],
  examples: [
    {
      input: "coins = [1, 2, 5], amount = 11",
      output: "3",
      explain: "11 = 5 + 5 + 1 이므로 3개예요.",
    },
    {
      input: "coins = [2], amount = 3",
      output: "-1",
      explain: "2원짜리로는 3원을 만들 수 없어요.",
    },
    { input: "coins = [1], amount = 0", output: "0" },
  ],
  constraints: [
    "1 ≤ coins.length ≤ 12",
    "1 ≤ coins[i] ≤ 2^31 - 1",
    "0 ≤ amount ≤ 10,000",
  ],
  entry: { javascript: "coinChange", python: "coin_change" },
  starter: {
    javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def coin_change(coins, amount):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [[1, 2, 5], 11], expected: 3 },
    { input: [[2], 3], expected: -1 },
    { input: [[1], 0], expected: 0 },
    { input: [[1, 3, 4], 6], expected: 2 },
    { input: [[2, 5, 10, 1], 27], expected: 4, hidden: true },
    { input: [[186, 419, 83, 408], 6249], expected: 20, hidden: true },
    { input: [[7], 3], expected: -1, hidden: true },
  ],
  hint: "dp[i] = i원을 만드는 최소 동전 개수로 둬요. dp[0] = 0이고, 각 금액 i마다 모든 동전 c에 대해 dp[i] = min(dp[i], dp[i - c] + 1) 이에요.",
  solution: {
    javascript: `function coinChange(coins, amount) {
  const INF = Infinity;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (c <= i && dp[i - c] + 1 < dp[i]) {
        dp[i] = dp[i - c] + 1;
      }
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}
`,
    python: `def coin_change(coins, amount):
    INF = float("inf")
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return -1 if dp[amount] == INF else dp[amount]
`,
  },
};
