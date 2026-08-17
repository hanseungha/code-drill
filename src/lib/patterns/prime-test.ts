import type { Pattern } from "./types";

export const primeTestPattern: Pattern = {
  slug: "prime-test",
  category: "number-theory",
  title: "소수 판별",
  summary: "약수는 짝으로 다니니, √n까지만 나눠봐도 소수인지 알아요.",
  complexity: "O(√n)",
  cues: [
    "수 하나가 소수인지 판단할 때",
    "약수가 `1`과 자기 자신뿐이라는 성질을 쓰는 문제",
    "확인할 수가 몇 개 안 될 때 — 범위 전체의 소수가 필요하면 에라토스테네스의 체가 더 빨라요",
  ],
  concept: [
    {
      kind: "text",
      body: "소수는 `1`보다 크면서 약수가 `1`과 자기 자신뿐인 수예요. 약수도 짝으로 다니니까, `n`에 약수가 있다면 그중 하나는 반드시 `√n` 이하예요. 그래서 `2`부터 `√n`까지만 나눠보고 하나도 안 나눠지면 소수예요. `O(√n)`이에요.",
    },
    {
      kind: "list",
      items: [
        "`0`과 `1`은 소수가 아니에요. `2`가 가장 작은 소수예요.",
        "`2`는 **유일한 짝수 소수**예요. 이것만 예외로 처리하면 나머지 짝수는 전부 걸러도 돼요.",
        "`i < n` 이나 `i ≤ n / 2` 까지 도는 것도 정답이지만 느려요. `i * i ≤ n` 이면 충분해요.",
      ],
    },
    {
      kind: "trace",
      caption: '"29는 소수?" — √29 ≈ 5.4 까지만 확인',
      lines: [
        "29 가 소수일까? i * i ≤ 29 까지만 나눠봐요",
        "",
        "i=2 :  29 % 2 = 1   ≠ 0",
        "i=3 :  29 % 3 = 2   ≠ 0",
        "i=4 :  29 % 4 = 1   ≠ 0",
        "i=5 :  29 % 5 = 4   ≠ 0    (5 * 5 = 25 ≤ 29)",
        "i=6 :  6 * 6 = 36 > 29   →  멈춤",
        "",
        "한 번도 안 나눠짐 → 29 는 소수예요 (true)",
      ],
    },
    {
      kind: "trap",
      title: "`Math.sqrt(n)` 으로 경계를 비교하기",
      body: "`i <= Math.sqrt(n)` 은 부동소수점 오차 탓에 경계에서 한 칸 어긋날 수 있어요. `i * i <= n` 처럼 **정수 곱**으로 비교하면 오차 없이 안전해요.",
    },
    {
      kind: "text",
      body: "한 번 더 줄일 수 있어요. `2`만 따로 소수로 인정하고 나머지는 홀수만 (`3, 5, 7 …`) 확인하면 나눗셈 횟수가 절반이 돼요. 짝수는 이미 `2`에서 다 걸러지니까요.",
    },
  ],
  codes: [
    {
      title: "√n까지 나눠보기 (짝수는 먼저 거르기)",
      code: {
        javascript: `function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;         // 2, 3
  if (n % 2 === 0) return false;  // 나머지 짝수는 전부 탈락
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}`,
        python: `def is_prime(n):
    if n < 2:
        return False
    if n < 4:
        return True          # 2, 3
    if n % 2 == 0:
        return False         # 나머지 짝수는 전부 탈락
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True`,
      },
    },
  ],
  relatedSlugs: ["divisors"],
};
