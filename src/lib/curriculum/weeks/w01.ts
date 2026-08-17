import type { Week } from "@/lib/curriculum/types";

export const w01: Week = {
  week: 1,
  phase: 1,
  title: "시작하기: 문법과 복잡도",
  summary: "두 언어의 문법 차이를 정리하고, 제한 조건에서 알고리즘을 역산하는 법을 익혀요.",
  concept: [
    {
      kind: "text",
      body: "첫 주는 도구 점검이에요. 알고리즘을 배우기 전에, 알고리즘을 적어 넣을 언어가 손에 붙어 있어야 해요. JavaScript와 Python은 비슷해 보이지만 나눗셈·비교·정렬처럼 **매일 쓰는 연산에서 조용히 달라요**. 그 차이를 모르고 쓰면 알고리즘이 맞아도 틀려요.",
    },
    {
      kind: "heading",
      body: "이 사이트의 입출력 규약",
    },
    {
      kind: "text",
      body: "백준 같은 사이트는 표준 입력에서 읽고 표준 출력으로 써요. `input()`으로 줄을 받고 `print()`로 답을 내보내는 방식이에요. 이 사이트는 달라요 — **채점기가 함수를 직접 호출하고 반환값을 비교해요.** 프로그래머스나 LeetCode와 같은 방식이에요.",
    },
    {
      kind: "list",
      items: [
        "입력은 함수의 **인자**로 들어와요. `input()` / `readline`을 쓰지 마요",
        "답은 `return` 으로 돌려줘요. `print` 한 값은 채점되지 않아요",
        "`console.log` / `print` 는 그대로 결과 화면에 보이니까 디버깅에 쓰면 돼요",
        "함수 이름은 문제마다 정해져 있고, 스타터 코드에 이미 적혀 있어요",
      ],
    },
    {
      kind: "text",
      body: "실제 시험이 표준 입력 방식이라면 파싱 코드는 그때 한 번 외우면 돼요. `n = int(input())`, `nums = list(map(int, input().split()))` 두 줄이면 대부분 끝나요. 연습에서 중요한 건 파싱이 아니라 그 뒤의 알고리즘이라서, 이 사이트는 인자로 건네줘요.",
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
      title: "JavaScript의 `/` 는 정수 나눗셈이 아니에요",
      body: "`7 / 2` 는 파이썬에서도 `3.5`지만, 파이썬에는 `//` 가 있고 JavaScript에는 없어요. 중간값 계산 `(lo + hi) / 2` 를 그대로 인덱스로 쓰면 `3.5`번째 원소를 읽게 돼서 `undefined` 가 나와요. 이분 탐색에서 가장 흔한 실수이고, 에러 없이 조용히 틀려요. 인덱스를 만들 때는 **항상** `Math.floor` 를 씌워요.",
    },
    {
      kind: "trap",
      title: "음수의 나머지는 두 언어가 달라요",
      body: "`-7 % 3` 은 JavaScript에서 `-1`, 파이썬에서 `2`예요. 방향을 순환시키는 코드 `(d - 1) % 4` 가 JavaScript에서 `-1`이 돼서 배열 접근이 깨져요. 왼쪽으로 한 칸 돌릴 때는 `(d + 3) % 4` 처럼 **양수를 더하는 형태**로 써요.",
    },
    {
      kind: "heading",
      body: "시간 복잡도",
    },
    {
      kind: "text",
      body: "코딩 테스트에서 틀리는 방법은 두 가지예요. 답이 틀리거나, 답은 맞는데 너무 느리거나. 두 번째가 훨씬 자주 일어나고 훨씬 억울해요. 첫 주에 복잡도를 함께 다루는 이유예요.",
    },
    {
      kind: "text",
      body: "복잡도는 어렵게 생각할 것 없이 **'입력이 2배가 되면 일이 몇 배로 늘어나나'** 딱 하나만 물어보는 거예요. 어떤 일은 입력이 2배면 일도 2배로 얌전히 늘고(`O(n)`), 어떤 일은 4배로 확 늘어요(`O(n²)`). 이 '늘어나는 속도'가 알고리즘의 운명을 가르고, 입력이 커질수록 격차는 걷잡을 수 없이 벌어져요.",
    },
    {
      kind: "text",
      body: "시간 복잡도는 '입력이 커질 때 연산 횟수가 어떤 속도로 늘어나는가'예요. `O(n)`은 입력이 2배면 시간도 2배, `O(n²)`은 입력이 2배면 시간은 4배. 상수배와 낮은 차수 항은 버려요 — `3n² + 100n + 5`는 그냥 `O(n²)`이에요.",
    },
    {
      kind: "text",
      body: "이 표가 이번 주에 얻어가야 할 전부예요. 채점 서버는 보통 1초에 1억 번 정도의 단순 연산을 처리한다고 보면 돼요. 그래서 문제의 `n` 제한을 보면 쓸 수 있는 알고리즘이 거의 정해져요.",
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
      body: "말로만 들으면 감이 안 오니까, `n`이 10배씩 커질 때 세 복잡도가 실제로 몇 번 연산하는지 세어 볼게요. `n log n`은 밑이 2인 로그로 어림했어요 (`log₂ 1000 ≈ 10`).",
    },
    {
      kind: "trace",
      caption: "n이 커질 때 연산 횟수가 얼마나 벌어지는가",
      lines: [
        "n        O(n)        O(n log n)      O(n^2)",
        "-----------------------------------------------",
        "10       10          33             100",
        "100      100         664            10,000",
        "1000     1,000       9,966          1,000,000",
        "",
        "n=10   일 때 : 100배 차이도 안 나서 셋 다 눈 깜짝할 새",
        "n=1000 일 때 : O(n)과 O(n^2)이 100만 대 1000, 1000배 격차",
      ],
    },
    {
      kind: "text",
      body: "`n`이 10배 커질 때 `O(n)`은 10배, `O(n²)`은 무려 100배로 뛰는 게 보여요. `n`이 작을 땐 다 비슷하지만 커지는 순간 `O(n²)`만 폭발해요. 그래서 **`n` 제한이 알고리즘을 정해요** — `n`이 10만이면 `O(n²)`은 100억 번이라 1초를 한참 넘겨요.",
    },
    {
      kind: "text",
      body: "거꾸로도 써요. `n`이 10만인데 이중 반복문이 떠올랐다면 그 풀이는 버려야 한다는 신호예요. 100억 번 연산은 절대 1초 안에 끝나지 않아요. **코드를 쓰기 전에 이 계산을 먼저 하는 습관**이 이번 주의 목표예요.",
    },
    {
      kind: "heading",
      body: "공간 복잡도",
    },
    {
      kind: "text",
      body: "메모리도 같은 방식으로 세어요. 정수 하나가 대략 4~8바이트라서, 512MB 제한이면 정수 배열은 대략 1천만~1억 개가 한계예요. `n`이 10만인 문제에서 `n × n` 2차원 배열을 만들면 100억 칸이라 메모리 초과예요. 2차원 DP를 1차원으로 줄이는 기법(20주차)이 나오는 이유예요.",
    },
  ],
  patterns: [
    {
      title: "반복문 관용구",
      note: "인덱스가 정말 필요할 때만 인덱스를 써요. 값만 필요하면 값만 꺼내는 쪽이 실수가 적어요.",
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
      note: "파이썬은 튜플로, JavaScript는 배열로 돌려줘요. 채점기는 둘을 같은 것으로 봐요.",
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
      note: "삼항 연산자는 값을 고를 때만 써요. 분기 안에서 여러 일을 한다면 `if` 가 읽기 좋아요.",
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
