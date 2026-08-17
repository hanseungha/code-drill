import type { Problem } from "@/lib/types";

export const evalPostfix: Problem = {
  slug: "eval-postfix",
  title: "후위 표기식 계산",
  difficulty: "medium",
  tags: ["스택"],
  summary: "후위 표기식을 스택으로 계산해요.",
  description: [
    "후위 표기식이 토큰 배열 `tokens`로 주어져요. 각 토큰은 정수이거나 연산자 `+`, `-`, `*`, `/` 중 하나예요. 계산 결과를 정수로 반환해요.",
    "후위 표기식은 연산자가 두 숫자 **뒤에** 와요. 예를 들어 `2 1 + 3 *`는 먼저 `2 + 1`을 하고 그 결과에 `3`을 곱해서 `9`가 돼요. 이 방식은 괄호가 없어도 계산 순서가 분명해요.",
    "나눗셈은 몫만 남기고 **0에 가까운 쪽으로** 버려요. 예를 들어 `-7`을 `2`로 나누면 `-3`이에요.",
  ],
  examples: [
    {
      input: 'tokens = ["2", "1", "+", "3", "*"]',
      output: "9",
      explain: "(2 + 1) * 3 = 9 예요.",
    },
    {
      input: 'tokens = ["4", "13", "5", "/", "+"]',
      output: "6",
      explain: "13 / 5 = 2, 4 + 2 = 6 이에요.",
    },
  ],
  constraints: [
    "1 ≤ tokens.length ≤ 10,000",
    "정수는 -10,000 이상 10,000 이하예요.",
    "식은 항상 올바르고, 0으로 나누는 경우는 나오지 않아요.",
  ],
  entry: { javascript: "evalPostfix", python: "eval_postfix" },
  starter: {
    javascript: `/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalPostfix(tokens) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def eval_postfix(tokens):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: [["2", "1", "+", "3", "*"]], expected: 9 },
    { input: [["4", "13", "5", "/", "+"]], expected: 6 },
    { input: [["5"]], expected: 5 },
    { input: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], expected: 22 },
    { input: [["7", "2", "/"]], expected: 3, hidden: true },
    { input: [["-7", "2", "/"]], expected: -3, hidden: true },
  ],
  hint: "숫자를 만나면 스택에 넣어요. 연산자를 만나면 스택에서 두 개를 꺼내는데, 먼저 꺼낸 값이 오른쪽 피연산자예요. 계산한 결과를 다시 스택에 넣어요. 다 처리하면 스택에 하나가 남고, 그게 답이에요.",
  solution: {
    javascript: `function evalPostfix(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (token === "+") stack.push(a + b);
      else if (token === "-") stack.push(a - b);
      else if (token === "*") stack.push(a * b);
      else {
        let q = Math.floor(Math.abs(a) / Math.abs(b));
        if ((a < 0) !== (b < 0)) q = -q;
        stack.push(q);
      }
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
}
`,
    python: `def eval_postfix(tokens):
    stack = []
    for token in tokens:
        if token in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            else:
                q = abs(a) // abs(b)
                if (a < 0) != (b < 0):
                    q = -q
                stack.append(q)
        else:
            stack.append(int(token))
    return stack.pop()
`,
  },
};
