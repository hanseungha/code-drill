import type { Pattern } from "./types";

export const primeFactorizationPattern: Pattern = {
  slug: "prime-factorization",
  category: "number-theory",
  title: "소인수분해",
  summary: "작은 소수부터 나눠떨어질 때까지 나누며 소인수를 뽑아요.",
  complexity: "O(√n)",
  cues: [
    "수를 소수들의 곱으로 쪼갤 때 (`360 = 2^3 × 3^2 × 5`)",
    "약수의 **개수**를 빠르게 구할 때 — 지수마다 `+1` 해서 곱하면 돼요",
    "GCD·LCM을 소인수로 설명하거나, 분수를 다룰 때",
  ],
  concept: [
    {
      kind: "text",
      body: "작은 소수부터 차례로 **나눠떨어지는 동안 계속 나누며** 인수를 뽑아요. `i = 2` 부터 시작해 `n`이 `i`로 나눠지면 `i`를 기록하고 `n`을 `i`로 나눠요. 더 안 나눠지면 `i`를 하나 키워요. 한 번 나눈 소수는 다시 나올 수 없어서, `i * i > n` 이 되면 멈춰도 돼요.",
    },
    {
      kind: "trace",
      caption: '"360의 소인수분해" — 남은 5를 놓치지 않기',
      lines: [
        "360 을 작은 소수부터 나눠떨어질 때까지 나눠요",
        "",
        "i=2 :  360 → 180 → 90 → 45   (2로 세 번)",
        "i=3 :  45 → 15 → 5   (3으로 두 번)",
        "i=4 :  4 * 4 = 16 > 5 이라 멈춰요",
        "남은 n = 5 > 1  →  5 도 소인수예요",
        "",
        "→ 360 = 2^3 × 3^2 × 5",
      ],
    },
    {
      kind: "trap",
      title: "마지막에 남은 `n` 을 빠뜨리기",
      body: "루프는 `i * i ≤ n` 까지만 돌아서, `√n` 보다 큰 소인수 하나가 끝에 남을 수 있어요. `14 = 2 × 7` 에서 `7` 이 그래요. **루프가 끝난 뒤 `n > 1` 이면 그 `n` 도 소인수**로 챙겨야 해요.",
    },
    {
      kind: "text",
      body: "소인수분해가 있으면 **약수의 개수**가 공짜예요. `360 = 2^3 × 3^2 × 5^1` 이면 약수는 `(3+1) × (2+1) × (1+1) = 24` 개예요. 각 소수를 `0`번부터 지수번까지 쓰는 조합의 수거든요.",
    },
    {
      kind: "text",
      body: "많은 수를 분해해야 하면 에라토스테네스의 체로 **최소 소인수** 배열을 만들어 두고, 매 분해를 `O(log n)`으로 줄일 수 있어요.",
    },
  ],
  codes: [
    {
      title: "작은 소인수부터 나눠 뽑기",
      note: "`[소수, 지수]` 쌍으로 모아요. 지수까지 세니 약수 개수도 바로 구할 수 있어요.",
      code: {
        javascript: `function factorize(n) {
  const factors = []; // [[소수, 지수], ...]
  for (let i = 2; i * i <= n; i++) {
    if (n % i !== 0) continue;
    let exp = 0;
    while (n % i === 0) {
      n /= i;
      exp++;
    }
    factors.push([i, exp]);
  }
  if (n > 1) factors.push([n, 1]); // 남은 소인수
  return factors;
}`,
        python: `def factorize(n):
    factors = []  # [(소수, 지수), ...]
    i = 2
    while i * i <= n:
        if n % i == 0:
            exp = 0
            while n % i == 0:
                n //= i
                exp += 1
            factors.append((i, exp))
        i += 1
    if n > 1:
        factors.append((n, 1))  # 남은 소인수
    return factors`,
      },
    },
  ],
  relatedSlugs: ["divisors"],
};
