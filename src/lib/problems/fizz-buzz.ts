import type { Problem } from "@/lib/types";

export const fizzBuzz: Problem = {
  slug: "fizz-buzz",
  title: "FizzBuzz",
  difficulty: "easy",
  tags: ["구현", "반복문"],
  summary: "1부터 n까지를 규칙에 따라 문자열로 바꿔 나열합니다.",
  description: [
    "정수 `n`이 주어집니다. `1`부터 `n`까지의 수를 다음 규칙으로 바꿔 문자열 배열로 반환하세요.",
    "3의 배수는 `\"Fizz\"`, 5의 배수는 `\"Buzz\"`, 3과 5의 공배수는 `\"FizzBuzz\"`, 나머지는 그 수를 그대로 문자열로 씁니다.",
    "조건을 쓰는 **순서**가 답을 가릅니다. 15는 3의 배수이기도 하고 5의 배수이기도 하므로, 15를 먼저 확인하지 않으면 `\"Fizz\"`에서 끝나버립니다.",
  ],
  examples: [
    {
      input: "n = 5",
      output: '["1", "2", "Fizz", "4", "Buzz"]',
    },
    {
      input: "n = 15",
      output: '["1", "2", "Fizz", ..., "14", "FizzBuzz"]',
      explain: "마지막 15는 3과 5의 공배수이므로 `\"FizzBuzz\"`입니다.",
    },
    { input: "n = 1", output: '["1"]' },
  ],
  constraints: ["1 ≤ n ≤ 1,000", "반환하는 원소는 모두 문자열입니다."],
  entry: { javascript: "fizzBuzz", python: "fizz_buzz" },
  starter: {
    javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def fizz_buzz(n):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [1], expected: ["1"] },
    { input: [3], expected: ["1", "2", "Fizz"] },
    { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
    { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] },
    { input: [16], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16"] },
    { input: [30], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19", "Buzz", "Fizz", "22", "23", "Fizz", "Buzz", "26", "Fizz", "28", "29", "FizzBuzz"], hidden: true },
    { input: [2], expected: ["1", "2"], hidden: true },
  ],
  hint: "`if (n % 15 === 0)` 을 맨 위에 두거나, 빈 문자열에 `\"Fizz\"`와 `\"Buzz\"`를 이어붙인 뒤 비어 있으면 숫자를 쓰는 방법도 있습니다. 후자는 조건 순서를 신경 쓰지 않아도 됩니다.",
  solution: {
    javascript: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    let word = "";
    if (i % 3 === 0) word += "Fizz";
    if (i % 5 === 0) word += "Buzz";
    out.push(word || String(i));
  }
  return out;
}
`,
    python: `def fizz_buzz(n):
    out = []
    for i in range(1, n + 1):
        word = ""
        if i % 3 == 0:
            word += "Fizz"
        if i % 5 == 0:
            word += "Buzz"
        out.append(word or str(i))
    return out
`,
  },
};
