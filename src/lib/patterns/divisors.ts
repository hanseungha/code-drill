import type { Pattern } from "./types";

export const divisorsPattern: Pattern = {
  slug: "divisors",
  category: "number-theory",
  title: "약수 구하기",
  summary: "약수는 짝으로 다녀요. √n까지만 훑어 O(√n)에 끝내요.",
  complexity: "O(√n)",
  cues: [
    "어떤 수의 약수 개수나 목록이 필요할 때",
    "`가로 × 세로 = 넓이` 처럼 곱해서 특정 값이 되는 두 수를 찾을 때 — 후보는 약수뿐이에요",
    "약수의 합·완전수처럼 약수를 모두 더하거나 세는 문제",
  ],
  concept: [
    {
      kind: "text",
      body: "약수는 항상 **짝**으로 다녀요. `i`가 `n`의 약수면 `n / i`도 약수예요. 그래서 `1`부터 `n`까지 다 볼 필요 없이, 짝 중 작은 쪽인 `i * i ≤ n` 범위만 훑고 큰 짝은 `n / i`로 바로 얻으면 돼요. `O(n)`이 `O(√n)`으로 줄어요 — `n`이 10억이어도 3만 번 남짓이에요.",
    },
    {
      kind: "trace",
      caption: '"36의 약수" — i는 작은 쪽, n/i는 큰 쪽',
      lines: [
        "n = 36, i * i ≤ 36 까지만 훑어요",
        "",
        "i=1 :  36 % 1 = 0   →  1 ↔ 36",
        "i=2 :  36 % 2 = 0   →  2 ↔ 18",
        "i=3 :  36 % 3 = 0   →  3 ↔ 12",
        "i=4 :  36 % 4 = 0   →  4 ↔ 9",
        "i=5 :  36 % 5 = 1   →  나눠지지 않음, 건너뛰어요",
        "i=6 :  6 * 6 = 36   →  6 ↔ 6, 자기 자신이라 한 번만",
        "i=7 :  7 * 7 = 49 > 36 이라 멈춰요",
        "",
        "작은 쪽 1 2 3 4 6  +  큰 쪽 9 12 18 36 뒤집기",
        "→ [1, 2, 3, 4, 6, 9, 12, 18, 36]",
      ],
    },
    {
      kind: "trap",
      title: "`i * i === n` 인 제곱수에서 짝을 두 번 담기",
      body: "`n`이 제곱수면 (`36`의 `6`, `49`의 `7`) 짝이 자기 자신이에요. `i`와 `n / i`를 무심코 둘 다 담으면 `6`이 두 번 들어가요. `i !== n / i` 일 때만 큰 쪽을 담아요.",
    },
    {
      kind: "text",
      body: "정렬도 공짜예요. 작은 약수는 `1, 2, 3 …` 오름차순으로 나오고, 큰 짝은 `… 18, 12, 9` 내림차순으로 나와요. 큰 쪽만 따로 모아 **뒤집어** 붙이면 정렬 함수 없이 오름차순이 완성돼요.",
    },
    {
      kind: "table",
      headers: ["방법", "훑는 횟수", "복잡도"],
      rows: [
        ["`1`부터 `n`까지", "n 번", "`O(n)`"],
        ["`√n`까지 짝으로", "√n 번", "`O(√n)`"],
      ],
    },
  ],
  codes: [
    {
      title: "제곱근까지 훑으며 짝으로 모으기",
      note: "작은 약수는 `small`에, 큰 짝은 `large`에 모았다가 뒤집어 붙여요. `i * i === n` 인 제곱수만 한 번 담기게 걸러요.",
      code: {
        javascript: `function divisors(n) {
  const small = [];
  const large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i !== 0) continue;
    small.push(i);
    if (i !== n / i) large.push(n / i);
  }
  return small.concat(large.reverse());
}`,
        python: `def divisors(n):
    small, large = [], []
    i = 1
    while i * i <= n:
        if n % i == 0:
            small.append(i)
            if i != n // i:
                large.append(n // i)
        i += 1
    return small + large[::-1]`,
      },
    },
  ],
  relatedSlugs: ["divisors", "carpet"],
};
