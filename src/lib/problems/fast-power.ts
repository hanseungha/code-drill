import type { Problem } from "@/lib/types";

export const fastPower: Problem = {
  slug: "fast-power",
  title: "거듭제곱 빠르게",
  difficulty: "medium",
  tags: ["분할 정복", "수학"],
  summary: "지수를 절반씩 줄여 거듭제곱을 O(log n)에 구해요.",
  description: [
    "정수 `base`, `exp`, `mod`가 주어져요. `base`를 `exp`번 곱한 값을 `mod`로 나눈 나머지, 즉 `(base ^ exp) % mod`를 반환해요.",
    "`base`를 `exp`번 그냥 곱하면 `O(exp)`라 지수가 크면 느려요. 대신 `base^exp = (base^(exp/2))²`라는 관계를 쓰면 지수가 절반씩 줄어서 `O(log exp)`에 끝나요. 지수가 홀수면 `base`를 한 번 더 곱해 줘요.",
    "나머지(`mod`)로 계산하는 이유는 곱이 너무 커지지 않게 하기 위해서예요. 곱할 때마다 `mod`를 취하면 값이 항상 작게 유지돼요.",
  ],
  examples: [
    {
      input: "base = 2, exp = 10, mod = 1000",
      output: "24",
      explain: "2^10 = 1024, 1024 % 1000 = 24 예요.",
    },
    {
      input: "base = 3, exp = 5, mod = 100",
      output: "43",
      explain: "3^5 = 243, 243 % 100 = 43 이에요.",
    },
  ],
  constraints: [
    "0 ≤ base ≤ 1,000,000,000",
    "0 ≤ exp ≤ 1,000,000,000",
    "1 ≤ mod ≤ 100,000",
  ],
  entry: { javascript: "fastPower", python: "fast_power" },
  starter: {
    javascript: `/**
 * @param {number} base
 * @param {number} exp
 * @param {number} mod
 * @return {number}
 */
function fastPower(base, exp, mod) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def fast_power(base, exp, mod):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [2, 10, 1000], expected: 24 },
    { input: [3, 5, 100], expected: 43 },
    { input: [5, 0, 7], expected: 1 },
    { input: [10, 9, 1], expected: 0 },
    { input: [7, 100, 13], expected: 9 },
    { input: [123, 456, 100000], expected: 66561, hidden: true },
    { input: [0, 0, 5], expected: 1, hidden: true },
  ],
  hint: "결과를 1로 시작하고 지수를 이진수처럼 훑어요. 지수가 홀수인 순간마다 현재 밑을 결과에 곱하고, 매 단계 밑을 제곱하면서 지수를 반으로 줄여요. 모든 곱셈 뒤에 `% mod`를 붙이면 값이 커지지 않아요.",
  solution: {
    javascript: `function fastPower(base, exp, mod) {
  let result = 1 % mod;
  let b = base % mod;
  let e = exp;
  while (e > 0) {
    if (e % 2 === 1) result = (result * b) % mod;
    b = (b * b) % mod;
    e = Math.floor(e / 2);
  }
  return result;
}
`,
    python: `def fast_power(base, exp, mod):
    result = 1 % mod
    b = base % mod
    e = exp
    while e > 0:
        if e % 2 == 1:
            result = (result * b) % mod
        b = (b * b) % mod
        e //= 2
    return result
`,
  },
};
