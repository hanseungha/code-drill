import type { Week } from "@/lib/curriculum/types";

export const w01: Week = {
  week: 1,
  phase: 1,
  title: "시작하기: 문법과 복잡도",
  summary: "두 언어의 문법 차이를 정리하고, 제한 조건에서 알고리즘을 역산하는 법을 익힙니다.",
  concept: [
    {
      kind: "text",
      body: "첫 주는 도구 점검입니다. 알고리즘을 배우기 전에, 알고리즘을 적어 넣을 언어가 손에 붙어 있어야 합니다. JavaScript와 Python은 비슷해 보이지만 나눗셈·비교·정렬처럼 **매일 쓰는 연산에서 조용히 다릅니다**. 그 차이를 모르고 쓰면 알고리즘이 맞아도 틀립니다.",
    },
    {
      kind: "heading",
      body: "이 사이트의 입출력 규약",
    },
    {
      kind: "text",
      body: "백준 같은 사이트는 표준 입력에서 읽고 표준 출력으로 씁니다. `input()`으로 줄을 받고 `print()`로 답을 내보내는 방식입니다. 이 사이트는 다릅니다 — **채점기가 함수를 직접 호출하고 반환값을 비교합니다.** 프로그래머스나 LeetCode와 같은 방식입니다.",
    },
    {
      kind: "list",
      items: [
        "입력은 함수의 **인자**로 들어옵니다. `input()` / `readline`을 쓰지 마세요",
        "답은 `return` 으로 돌려줍니다. `print` 한 값은 채점되지 않습니다",
        "`console.log` / `print` 는 그대로 결과 화면에 보이므로 디버깅에 쓰면 됩니다",
        "함수 이름은 문제마다 정해져 있고, 스타터 코드에 이미 적혀 있습니다",
      ],
    },
    {
      kind: "text",
      body: "실제 시험이 표준 입력 방식이라면 파싱 코드는 그때 한 번 외우면 됩니다. `n = int(input())`, `nums = list(map(int, input().split()))` 두 줄이면 대부분 끝납니다. 연습에서 중요한 건 파싱이 아니라 그 뒤의 알고리즘이므로, 이 사이트는 인자로 건네줍니다.",
    },
    {
      kind: "heading",
      body: "연산자에서 갈리는 곳",
    },
    {
      kind: "table",
      headers: ["하려는 일", "JavaScript", "Python"],
      rows: [
        ["정수 나눗셈", "`Math.floor(a / b)` 또는 `(a / b) | 0`", "`a // b`"],
        ["나머지", "`a % b` (음수면 음수)", "`a % b` (항상 부호가 b를 따름)"],
        ["거듭제곱", "`a ** b`", "`a ** b`"],
        ["같은지 비교", "`===` (`==`는 타입 변환을 함)", "`==`"],
        ["논리 부정", "`!x`", "`not x`"],
        ["정수 최대", "`2**53 - 1` 이후 부정확", "제한 없음"],
      ],
    },
    {
      kind: "trap",
      title: "JavaScript의 `/` 는 정수 나눗셈이 아닙니다",
      body: "`7 / 2` 는 파이썬에서도 `3.5`지만, 파이썬에는 `//` 가 있고 JavaScript에는 없습니다. 중간값 계산 `(lo + hi) / 2` 를 그대로 인덱스로 쓰면 `3.5`번째 원소를 읽게 되어 `undefined` 가 나옵니다. 이분 탐색에서 가장 흔한 실수이고, 에러 없이 조용히 틀립니다. 인덱스를 만들 때는 **항상** `Math.floor` 를 씌우세요.",
    },
    {
      kind: "trap",
      title: "음수의 나머지는 두 언어가 다릅니다",
      body: "`-7 % 3` 은 JavaScript에서 `-1`, 파이썬에서 `2`입니다. 방향을 순환시키는 코드 `(d - 1) % 4` 가 JavaScript에서 `-1`이 되어 배열 접근이 깨집니다. 왼쪽으로 한 칸 돌릴 때는 `(d + 3) % 4` 처럼 **양수를 더하는 형태**로 쓰세요.",
    },
    {
      kind: "heading",
      body: "시간 복잡도",
    },
    {
      kind: "text",
      body: "코딩 테스트에서 틀리는 방법은 두 가지입니다. 답이 틀리거나, 답은 맞는데 너무 느리거나. 두 번째가 훨씬 자주 일어나고 훨씬 억울합니다. 첫 주에 복잡도를 함께 다루는 이유입니다.",
    },
    {
      kind: "text",
      body: "시간 복잡도는 '입력이 커질 때 연산 횟수가 어떤 속도로 늘어나는가'입니다. `O(n)`은 입력이 2배면 시간도 2배, `O(n²)`은 입력이 2배면 시간은 4배. 상수배와 낮은 차수 항은 버립니다 — `3n² + 100n + 5`는 그냥 `O(n²)`입니다.",
    },
    {
      kind: "text",
      body: "이 표가 이번 주에 얻어가야 할 전부입니다. 채점 서버는 보통 1초에 1억 번 정도의 단순 연산을 처리한다고 보면 됩니다. 그래서 문제의 `n` 제한을 보면 쓸 수 있는 알고리즘이 거의 정해집니다.",
    },
    {
      kind: "table",
      headers: ["n 제한", "허용 복잡도", "대표 도구", "배우는 주차"],
      rows: [
        ["n ≤ 20", "O(2ⁿ), O(n!)", "완전 탐색, 백트래킹", "4 · 17"],
        ["n ≤ 5,000", "O(n²)", "이중 반복문, 2차원 DP", "4 · 20"],
        ["n ≤ 200,000", "O(n log n)", "정렬, 이분 탐색, 힙", "7 · 11 · 18"],
        ["n ≤ 10,000,000", "O(n)", "한 번 순회, 투 포인터", "2 · 8"],
      ],
    },
    {
      kind: "text",
      body: "거꾸로도 씁니다. `n`이 10만인데 이중 반복문이 떠올랐다면 그 풀이는 버려야 한다는 신호입니다. 100억 번 연산은 절대 1초 안에 끝나지 않습니다. **코드를 쓰기 전에 이 계산을 먼저 하는 습관**이 이번 주의 목표입니다.",
    },
    {
      kind: "heading",
      body: "공간 복잡도",
    },
    {
      kind: "text",
      body: "메모리도 같은 방식으로 셉니다. 정수 하나가 대략 4~8바이트이므로, 512MB 제한이면 정수 배열은 대략 1천만~1억 개가 한계입니다. `n`이 10만인 문제에서 `n × n` 2차원 배열을 만들면 100억 칸이라 메모리 초과입니다. 2차원 DP를 1차원으로 줄이는 기법(20주차)이 나오는 이유입니다.",
    },
  ],
  patterns: [
    {
      title: "반복문 관용구",
      note: "인덱스가 정말 필요할 때만 인덱스를 쓰세요. 값만 필요하면 값만 꺼내는 쪽이 실수가 적습니다.",
      code: {
        javascript: `for (let i = 0; i < nums.length; i++) { }      // 인덱스
for (const n of nums) { }                       // 값
for (const [i, n] of nums.entries()) { }        // 둘 다
for (let i = nums.length - 1; i >= 0; i--) { }  // 거꾸로`,
        python: `for i in range(len(nums)):      # 인덱스
    pass
for n in nums:                  # 값
    pass
for i, n in enumerate(nums):    # 둘 다
    pass
for n in reversed(nums):        # 거꾸로
    pass`,
      },
    },
    {
      title: "함수와 여러 값 반환",
      note: "파이썬은 튜플로, JavaScript는 배열로 돌려줍니다. 채점기는 둘을 같은 것으로 봅니다.",
      code: {
        javascript: `function minMax(nums) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const n of nums) {
    if (n < lo) lo = n;
    if (n > hi) hi = n;
  }
  return [lo, hi];
}

const [low, high] = minMax(nums);`,
        python: `def min_max(nums):
    lo = float("inf")
    hi = float("-inf")
    for n in nums:
        if n < lo:
            lo = n
        if n > hi:
            hi = n
    return lo, hi


low, high = min_max(nums)`,
      },
    },
    {
      title: "조건 분기를 짧게 쓰기",
      note: "삼항 연산자는 값을 고를 때만 쓰세요. 분기 안에서 여러 일을 한다면 `if` 가 읽기 좋습니다.",
      code: {
        javascript: `const label = n % 2 === 0 ? "짝수" : "홀수";

if (n % 15 === 0) return "FizzBuzz";
else if (n % 3 === 0) return "Fizz";
else if (n % 5 === 0) return "Buzz";
return String(n);`,
        python: `label = "짝수" if n % 2 == 0 else "홀수"

if n % 15 == 0:
    return "FizzBuzz"
elif n % 3 == 0:
    return "Fizz"
elif n % 5 == 0:
    return "Buzz"
return str(n)`,
      },
    },
  ],
  problems: [
    {
      slug: "quotient-remainder",
      title: "몫과 나머지",
      role: "워밍업",
      teaches: "두 언어의 정수 나눗셈 차이를 직접 겪기",
    },
    {
      slug: "fizz-buzz",
      title: "FizzBuzz",
      role: "워밍업",
      teaches: "조건 분기의 순서 — 15의 배수를 먼저 봐야 하는 이유",
    },
    {
      slug: "min-and-max",
      title: "최솟값과 최댓값",
      role: "핵심",
      teaches: "한 번 순회로 두 값을 구하고 함께 반환하기",
    },
    {
      slug: "divisors",
      title: "약수 구하기",
      role: "도전",
      teaches: "O(n)을 O(√n)으로 줄이며 복잡도를 체감하기",
    },
  ],
  selfCheck: [
    "n이 100,000일 때 O(n²)와 O(n log n)은 연산 횟수가 대략 몇 배 차이 나는가?",
    "JavaScript에서 `(lo + hi) / 2` 를 인덱스로 쓰면 무슨 일이 생기는가?",
    "문제에 'n ≤ 20'이라고 적혀 있다면 어떤 풀이를 먼저 떠올려야 하는가?",
  ],
};
