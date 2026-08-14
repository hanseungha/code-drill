import type { Problem } from "@/lib/types";

export const validParentheses: Problem = {
  slug: "valid-parentheses",
  title: "올바른 괄호",
  difficulty: "easy",
  tags: ["스택", "문자열"],
  summary: "괄호 문자열이 올바르게 짝지어졌는지 판별합니다.",
  description: [
    "`(`, `)`, `{`, `}`, `[`, `]` 로만 이루어진 문자열 `s`가 주어집니다. 이 문자열이 올바른 괄호 문자열인지 판별하세요.",
    "올바른 괄호 문자열이려면 여는 괄호가 같은 종류의 닫는 괄호로 닫혀야 하고, 괄호의 중첩 순서가 올바라야 합니다. 빈 문자열은 올바른 것으로 봅니다.",
  ],
  examples: [
    { input: 's = "()[]{}"', output: "true" },
    {
      input: 's = "([)]"',
      output: "false",
      explain: "`(`가 닫히기 전에 `[`가 `]`로 닫혀야 하는데 순서가 어긋납니다.",
    },
    { input: 's = "{[]}"', output: "true" },
  ],
  constraints: ["0 ≤ s.length ≤ 10,000", "s는 괄호 문자로만 이루어져 있습니다."],
  entry: { javascript: "isValid", python: "is_valid" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def is_valid(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["()"], expected: true },
    { input: ["()[]{}"], expected: true },
    { input: ["(]"], expected: false },
    { input: ["([)]"], expected: false },
    { input: ["{[]}"], expected: true },
    { input: [""], expected: true },
    { input: ["("], expected: false, hidden: true },
    { input: ["){"], expected: false, hidden: true },
    { input: ["((((()))))"], expected: true, hidden: true },
    { input: ["([{}])()"], expected: true, hidden: true },
  ],
  hint: "여는 괄호는 스택에 넣고, 닫는 괄호를 만나면 스택 맨 위와 짝이 맞는지 확인하세요. 끝났을 때 스택이 비어 있어야 합니다.",
  solution: {
    javascript: `function isValid(s) {
  const pair = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pair) {
      if (stack.pop() !== pair[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
`,
    python: `def is_valid(s):
    pair = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pair:
            if not stack or stack.pop() != pair[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
`,
  },
};
