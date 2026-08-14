import type { Problem } from "@/lib/types";

export const palindromeCheck: Problem = {
  slug: "palindrome-check",
  title: "팰린드롬 검사",
  difficulty: "easy",
  tags: ["문자열", "투포인터"],
  summary: "영숫자만 남기고 대소문자를 무시했을 때 앞뒤가 같은지 판정합니다.",
  description: [
    "문자열 `s`가 주어집니다. **영문자와 숫자만 남기고 대소문자를 무시**했을 때 앞에서 읽으나 뒤에서 읽으나 같으면 `true`, 아니면 `false`를 반환하세요.",
    "공백, 쉼표, 마침표 같은 문자는 모두 무시합니다. 빈 문자열이 되면 팰린드롬으로 봅니다.",
    "정규화하고 뒤집어 비교해도 되지만, **양끝에서 좁혀 오는** 방식이면 새 문자열을 만들지 않고 끝낼 수 있습니다. 8주차 투 포인터의 가장 단순한 형태입니다.",
  ],
  examples: [
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explain: "영숫자만 남기면 `amanaplanacanalpanama` 로 앞뒤가 같습니다.",
    },
    { input: 's = "race a car"', output: "false" },
    { input: 's = ".,"', output: "true", explain: "남는 문자가 없으므로 팰린드롬입니다." },
  ],
  constraints: ["1 ≤ s.length ≤ 100,000", "s 는 출력 가능한 아스키 문자로 이루어집니다."],
  entry: { javascript: "palindromeCheck", python: "palindrome_check" },
  starter: {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function palindromeCheck(s) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def palindrome_check(s):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["A man, a plan, a canal: Panama"], expected: true },
    { input: ["race a car"], expected: false },
    { input: [".,"], expected: true },
    { input: ["ab"], expected: false },
    { input: ["aa"], expected: true },
    { input: ["0P"], expected: false },
    { input: ["Was it a car or a cat I saw?"], expected: true, hidden: true },
    { input: ["12321"], expected: true, hidden: true },
    { input: ["12345"], expected: false, hidden: true },
  ],
  hint: "`0P` 를 조심하세요. `'0'` 과 `'P'` 는 아스키 코드 차이가 32라, 대소문자만 맞추고 종류를 확인하지 않으면 같다고 판단하는 구현이 있습니다. 영숫자인지 먼저 확인하고 소문자로 맞춘 뒤 비교하세요.",
  solution: {
    javascript: `function palindromeCheck(s) {
  const isAlnum = (c) => /[a-z0-9]/.test(c);
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    const a = s[i].toLowerCase();
    const b = s[j].toLowerCase();
    if (!isAlnum(a)) { i++; continue; }
    if (!isAlnum(b)) { j--; continue; }
    if (a !== b) return false;
    i++;
    j--;
  }
  return true;
}
`,
    python: `def palindrome_check(s):
    i, j = 0, len(s) - 1
    while i < j:
        if not s[i].isalnum():
            i += 1
            continue
        if not s[j].isalnum():
            j -= 1
            continue
        if s[i].lower() != s[j].lower():
            return False
        i += 1
        j -= 1
    return True
`,
  },
};
