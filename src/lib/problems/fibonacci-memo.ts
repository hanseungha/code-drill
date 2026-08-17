import type { Problem } from "@/lib/types";

export const fibonacciMemo: Problem = {
  slug: "fibonacci-memo",
  title: "재귀 피보나치와 메모이제이션",
  difficulty: "easy",
  tags: ["재귀", "메모이제이션"],
  summary: "한 번 구한 값을 저장해 재귀 피보나치를 빠르게 만들어요.",
  description: [
    "정수 `n`이 주어져요. `n`번째 피보나치 수를 반환해요. 피보나치 수는 `fib(0) = 0`, `fib(1) = 1`이고, 그 뒤로는 `fib(k) = fib(k-1) + fib(k-2)`예요.",
    "그냥 재귀로 짜면 같은 값을 몇 번이고 다시 계산해서 아주 느려요. 한 번 구한 값을 저장해 두고 다시 쓰면(메모이제이션) `O(n)`에 끝나요. 이 저장 습관이 19주차 DP로 이어져요.",
  ],
  examples: [
    {
      input: "n = 10",
      output: "55",
      explain: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 에서 10번째가 55예요.",
    },
    {
      input: "n = 0",
      output: "0",
    },
  ],
  constraints: [
    "0 ≤ n ≤ 70",
  ],
  entry: { javascript: "fibonacciMemo", python: "fibonacci_memo" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function fibonacciMemo(n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def fibonacci_memo(n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [10], expected: 55 },
    { input: [0], expected: 0 },
    { input: [1], expected: 1 },
    { input: [2], expected: 1 },
    { input: [20], expected: 6765 },
    { input: [50], expected: 12586269025, hidden: true },
    { input: [70], expected: 190392490709135, hidden: true },
  ],
  hint: "`memo` 맵을 두고, `fib(k)`를 구하기 전에 이미 저장돼 있으면 그대로 꺼내 써요. 없으면 `fib(k-1) + fib(k-2)`로 구해서 저장한 뒤 반환해요. 기저 조건은 `k <= 1`일 때 `k` 그대로예요.",
  solution: {
    javascript: `function fibonacciMemo(n) {
  const memo = new Map();
  function go(k) {
    if (k <= 1) return k;
    if (memo.has(k)) return memo.get(k);
    const value = go(k - 1) + go(k - 2);
    memo.set(k, value);
    return value;
  }
  return go(n);
}
`,
    python: `def fibonacci_memo(n):
    memo = {}

    def go(k):
        if k <= 1:
            return k
        if k in memo:
            return memo[k]
        memo[k] = go(k - 1) + go(k - 2)
        return memo[k]

    return go(n)
`,
  },
};
