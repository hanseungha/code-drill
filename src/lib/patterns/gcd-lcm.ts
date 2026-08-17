import type { Pattern } from "./types";

export const gcdLcmPattern: Pattern = {
  slug: "gcd-lcm",
  category: "number-theory",
  title: "최대공약수와 최소공배수",
  summary: "유클리드 호제법으로 GCD를 구하고, 곱으로 LCM을 얻어요.",
  complexity: "O(log(min(a,b)))",
  cues: [
    "두 수의 최대공약수(GCD)나 최소공배수(LCM)가 필요할 때",
    "분수를 기약분수로 줄일 때 — 분자·분모를 GCD로 나눠요",
    "여러 신호의 공통 주기, 톱니바퀴가 다시 맞물리는 순간처럼 **공통 배수**를 구할 때",
  ],
  concept: [
    {
      kind: "text",
      body: "최대공약수는 **유클리드 호제법**으로 순식간에 구해요. 핵심은 `gcd(a, b) = gcd(b, a % b)` — 큰 수를 작은 수로 나눈 **나머지**로 바꿔 가는 거예요. 나머지가 `0`이 되는 순간의 나눈 수가 답이에요. 한 단계마다 수가 확 줄어서 `O(log(min(a, b)))`예요.",
    },
    {
      kind: "trace",
      caption: '"gcd(48, 36)" — 나머지가 0이 되면 멈춰요',
      lines: [
        "gcd(48, 36) 을 나머지로 좁혀 가요",
        "",
        "gcd(48, 36) :  48 % 36 = 12   →  gcd(36, 12)",
        "gcd(36, 12) :  36 % 12 =  0   →  gcd(12,  0)",
        "gcd(12,  0) :  b 가 0         →  답은 12",
        "",
        "→ 최대공약수 12",
      ],
    },
    {
      kind: "text",
      body: "최소공배수는 GCD만 있으면 바로 나와요. `lcm(a, b) = a * b / gcd(a, b)` 예요. 두 수의 곱에서 겹치는 부분(GCD)을 한 번 나눠 주는 거예요.",
    },
    {
      kind: "trap",
      title: "`a * b` 를 먼저 곱하기",
      body: "`a * b` 를 곱한 다음 나누면 두 수가 클 때 값이 **넘칠** 수 있어요. `a / gcd(a, b) * b` 순서로, GCD로 먼저 나누고 곱하면 중간값이 작게 유지돼요.",
    },
    {
      kind: "text",
      body: "수가 셋 이상이면 **누적**하면 돼요. `lcm(lcm(a, b), c)` 처럼 왼쪽부터 접어 나가요. GCD도 똑같이 누적돼요.",
    },
  ],
  codes: [
    {
      title: "유클리드 호제법으로 GCD·LCM",
      note: "반복문 버전이에요. 재귀로는 `return b === 0 ? a : gcd(b, a % b)` 한 줄로도 써요.",
      code: {
        javascript: `function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}`,
        python: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a // gcd(a, b) * b`,
      },
    },
  ],
  relatedSlugs: ["quotient-remainder"],
};
