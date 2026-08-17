import type { Problem } from "@/lib/types";

export const quotientRemainder: Problem = {
  slug: "quotient-remainder",
  title: "몫과 나머지",
  difficulty: "easy",
  tags: ["수학", "구현"],
  summary: "정수 나눗셈의 몫과 나머지를 두 언어에서 같은 규칙으로 구해요.",
  description: [
    "정수 `a`와 `b`가 주어져요. `a`를 `b`로 나눈 몫과 나머지를 `[몫, 나머지]` 배열로 반환해요.",
    "몫은 **0 방향으로 버려요**. `-7`을 `2`로 나눈 몫은 `-4`가 아니라 `-3`이에요. 나머지는 `a - b * 몫` 으로 정의하니 나머지의 부호는 `a`를 따라가요.",
    "두 언어의 기본 연산자가 서로 다른 답을 내는 문제예요. 언어에 맞춰 맞추는 것이 이 문제의 전부예요.",
  ],
  examples: [
    { input: "a = 7, b = 2", output: "[3, 1]" },
    {
      input: "a = -7, b = 2",
      output: "[-3, -1]",
      explain:
        "몫을 0 방향으로 버려 -3, 나머지는 -7 - 2 × (-3) = -1 이에요. 파이썬의 `-7 // 2`는 -4, `-7 % 2`는 1이라 그대로 쓰면 틀려요.",
    },
    { input: "a = 7, b = -2", output: "[-3, 1]" },
  ],
  constraints: [
    "-10^9 ≤ a ≤ 10^9",
    "-10^9 ≤ b ≤ 10^9",
    "b ≠ 0",
  ],
  entry: { javascript: "quotientRemainder", python: "quotient_remainder" },
  starter: {
    javascript: `/**
 * @param {number} a
 * @param {number} b
 * @return {number[]} [몫, 나머지]
 */
function quotientRemainder(a, b) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def quotient_remainder(a, b):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [7, 2], expected: [3, 1] },
    { input: [-7, 2], expected: [-3, -1] },
    { input: [7, -2], expected: [-3, 1] },
    { input: [-7, -2], expected: [3, -1] },
    { input: [10, 5], expected: [2, 0] },
    { input: [0, 5], expected: [0, 0] },
    { input: [1000000000, 3], expected: [333333333, 1], hidden: true },
    { input: [-1, 1000000000], expected: [0, -1], hidden: true },
    { input: [-9, -4], expected: [2, -1], hidden: true },
  ],
  hint: "자바스크립트의 `/`는 실수 나눗셈이라 `Math.trunc`가 필요하고, 파이썬의 `//`는 `-∞` 방향으로 버려요. 파이썬에서는 절댓값으로 몫을 구한 뒤 부호를 따로 붙이면 돼요. 나머지는 몫만 정하고 나면 `a - b * 몫` 한 줄이에요.",
  solution: {
    javascript: `function quotientRemainder(a, b) {
  const q = Math.trunc(a / b);
  return [q, a - b * q];
}
`,
    python: `def quotient_remainder(a, b):
    q = abs(a) // abs(b)
    if (a < 0) != (b < 0):
        q = -q
    return [q, a - b * q]
`,
  },
};
