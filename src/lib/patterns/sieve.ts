import type { Pattern } from "./types";

export const sievePattern: Pattern = {
  slug: "sieve",
  category: "number-theory",
  title: "에라토스테네스의 체",
  summary: "배수를 미리 지워, N 이하의 소수를 한 번에 걸러내요.",
  complexity: "O(N log log N)",
  cues: [
    "어떤 범위 안의 소수를 전부 필요로 할 때",
    "여러 수의 소수 여부를 반복해서 물어볼 때 — 미리 걸러두면 조회가 `O(1)`이에요",
    "소인수분해를 아주 많이 해야 할 때 — 최소 소인수 배열을 곁들이면 분해가 빨라져요",
  ],
  concept: [
    {
      kind: "text",
      body: "수 하나하나를 `√n`으로 판별하는 대신, `2`부터 각 소수의 **배수를 미리 지워** 나가는 방법이에요. `2`의 배수(`4, 6, 8 …`), `3`의 배수(`9, 15 …`)를 지우다 보면, 지워지지 않고 남은 수가 곧 소수예요. `N`까지의 소수를 통째로 `O(N log log N)`에 얻어요.",
    },
    {
      kind: "trace",
      caption: '"20 이하의 소수" — 배수를 지우고 남은 수',
      lines: [
        "2부터 각 소수의 배수를 지워요.  · = 지워진 수",
        "",
        "         2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20",
        "i=2 :    2  3  ·  5  ·  7  ·  9  · 11  · 13  · 15  · 17  · 19  ·",
        "i=3 :    2  3  ·  5  ·  7  ·  ·  · 11  · 13  ·  ·  · 17  · 19  ·",
        "i=4 :  이미 지워졌어요, 건너뛰어요",
        "i=5 :  5 * 5 = 25 > 20 이라 멈춰요",
        "",
        "남은 수 = 2, 3, 5, 7, 11, 13, 17, 19",
      ],
    },
    {
      kind: "trap",
      title: "배수를 `i * 2` 부터 지우기",
      body: "`i`의 배수를 지울 때 `i * i` 부터 시작해도 돼요. `i * 2, i * 3 …` 은 이미 더 작은 소수가 지웠거든요 (`3`의 배수 중 `6`은 `2`가 벌써 지움). 바깥 루프도 `i * i ≤ N` 까지면 충분해요 — 그 위에는 새로 지울 대상이 없어요.",
    },
    {
      kind: "table",
      headers: ["상황", "방법", "복잡도"],
      rows: [
        ["수 하나가 소수인지", "`√n` 나눗셈", "`O(√n)`"],
        ["`N` 이하 소수 전부", "에라토스테네스의 체", "`O(N log log N)`"],
        ["여러 수를 각각 판별", "체로 걸러 두고 조회", "만들 때 한 번 + 조회 `O(1)`"],
      ],
    },
    {
      kind: "text",
      body: "지울 때 각 수의 **최소 소인수(가장 작은 약수)** 를 함께 적어 두면, 소인수분해도 나눗셈 없이 `O(log n)`에 끝나요. 소인수분해 유형으로 이어지는 확장이에요.",
    },
  ],
  codes: [
    {
      title: "체로 N 이하 소수 목록 만들기",
      note: "`isPrime` 배열을 `true`로 채워 두고, 소수의 배수만 `false`로 지워요. 마지막에 `true`로 남은 자리가 소수예요.",
      code: {
        javascript: `function primesUpTo(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}`,
        python: `def primes_up_to(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    i = 2
    while i * i <= n:
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
        i += 1
    return [i for i in range(2, n + 1) if is_prime[i]]`,
      },
    },
  ],
  relatedSlugs: [],
};
