import type { Week } from "@/lib/curriculum/types";

export const w13: Week = {
  week: 13,
  phase: 3,
  title: "재귀와 분할 정복",
  summary: "문제를 자기 자신의 작은 버전으로 쪼개는 사고법.",
  concept: [
    {
      kind: "text",
      body: "재귀는 '같은 문제의 더 작은 버전을 풀 수 있다고 가정하고, 그걸 이용해 지금 문제를 푸는' 방식입니다. 중요한 건 **작은 문제가 어떻게 풀리는지 따라 내려가지 않는 것**입니다. 그건 컴퓨터가 합니다.",
    },
    {
      kind: "text",
      body: "재귀 함수를 쓸 때 정할 것은 두 가지뿐입니다. 더 이상 쪼갤 수 없는 **기저 조건**과, 작은 답으로 큰 답을 만드는 **결합 규칙**입니다.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "기저 조건 — 언제 쪼개기를 멈추는가 (빈 배열, 노드 없음, n이 0 또는 1)",
        "쪼개기 — 문제를 어떻게 더 작게 만드는가",
        "결합 — 작은 답들을 어떻게 합쳐 지금의 답으로 만드는가",
      ],
    },
    {
      kind: "trap",
      title: "기저 조건을 빠뜨리면 스택 오버플로",
      body: "재귀 호출은 콜 스택에 쌓입니다. 멈추지 않으면 스택이 넘칩니다. 파이썬은 기본 재귀 깊이가 1,000이라 정상적인 풀이도 깊이가 깊으면 터집니다 — `sys.setrecursionlimit(10**6)`으로 올릴 수 있습니다. JavaScript는 대략 1만 단계 안팎에서 `RangeError`가 납니다.",
    },
    {
      kind: "trap",
      title: "같은 값을 여러 번 다시 계산하는 재귀",
      body: "재귀 피보나치는 `fib(n-1)`과 `fib(n-2)`를 부르는데, 이 둘이 같은 하위 문제를 중복해서 계산합니다. `fib(40)`이 약 3억 번 호출됩니다. 한 번 구한 값을 저장해 두면(메모이제이션) `O(n)`이 됩니다. 이것이 19주차 DP의 출발점입니다.",
    },
    {
      kind: "heading",
      body: "분할 정복",
    },
    {
      kind: "text",
      body: "재귀 중에서도 문제를 **절반씩** 쪼개는 형태를 분할 정복이라 합니다. 절반씩 줄어드니 깊이가 `log n`이고, 각 깊이에서 `O(n)`의 일을 하면 전체가 `O(n log n)`이 됩니다. 병합 정렬이 정확히 그 구조입니다.",
    },
    {
      kind: "table",
      headers: ["알고리즘", "쪼개기", "결합", "복잡도"],
      rows: [
        ["병합 정렬", "반으로 나눔", "정렬된 둘을 합침 `O(n)`", "`O(n log n)`"],
        ["퀵 정렬", "기준값 기준 분할 `O(n)`", "결합 불필요", "평균 `O(n log n)`"],
        ["거듭제곱", "지수를 반으로", "제곱 한 번 `O(1)`", "`O(log n)`"],
      ],
    },
    {
      kind: "text",
      body: "거듭제곱이 좋은 예입니다. `a^n`을 n번 곱하면 `O(n)`이지만, `a^n = (a^(n/2))²`라는 관계를 쓰면 `O(log n)`입니다. 지수가 홀수면 `a`를 한 번 더 곱해 주면 됩니다.",
    },
    {
      kind: "heading",
      body: "재귀와 반복",
    },
    {
      kind: "text",
      body: "모든 재귀는 스택을 직접 관리하면 반복문으로 바꿀 수 있습니다. 10주차에서 스택을 배운 뒤에 재귀를 배우는 이유입니다. 깊이가 깊어 스택 오버플로가 걱정될 때 이 변환을 씁니다.",
    },
  ],
  patterns: [
    {
      title: "메모이제이션으로 중복 계산 없애기",
      code: {
        javascript: `const memo = new Map();
function fib(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fib(n - 1) + fib(n - 2);
  memo.set(n, value);
  return value;
}`,
        python: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
      },
    },
    {
      title: "병합 정렬",
      code: {
        javascript: `function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}`,
        python: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + left[i:] + right[j:]`,
      },
    },
    {
      title: "빠른 거듭제곱",
      code: {
        javascript: `function power(a, n) {
  if (n === 0) return 1;
  const half = power(a, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * a;
}`,
        python: `def power(a, n):
    if n == 0:
        return 1
    half = power(a, n // 2)
    return half * half if n % 2 == 0 else half * half * a`,
      },
    },
  ],
  problems: [
    {
      title: "재귀 피보나치와 메모이제이션",
      role: "워밍업",
      teaches: "중복 계산을 직접 체감하기",
    },
    {
      title: "거듭제곱 빠르게",
      role: "핵심",
      teaches: "분할 정복으로 O(log n) 만들기",
    },
    {
      title: "병합 정렬 직접 구현",
      role: "핵심",
      teaches: "분할 → 정복 → 병합의 전체 구조",
    },
    {
      title: "하노이 탑",
      role: "도전",
      teaches: "재귀적 사고의 정석",
    },
  ],
  selfCheck: [
    "재귀 함수를 쓸 때 반드시 정해야 하는 두 가지는?",
    "재귀 피보나치가 느린 이유와, 고치는 방법은?",
    "분할 정복이 O(n log n)이 되는 이유를 '깊이 × 각 깊이의 일'로 설명할 수 있는가?",
  ],
};
