import type { Week } from "@/lib/curriculum/types";

export const w01: Week = {
  week: 1,
  phase: 1,
  title: "시간 복잡도와 배열",
  summary: "제한 조건을 보고 쓸 수 있는 알고리즘을 역산하는 법을 익힙니다.",
  concept: [
    {
      kind: "text",
      body: "코딩 테스트에서 틀리는 방법은 두 가지입니다. 답이 틀리거나, 답은 맞는데 너무 느리거나. 두 번째가 훨씬 자주 일어나고, 훨씬 억울합니다. 첫 주에 시간 복잡도를 먼저 다루는 이유입니다.",
    },
    {
      kind: "text",
      body: "시간 복잡도는 '입력이 커질 때 연산 횟수가 어떤 속도로 늘어나는가'를 나타냅니다. `O(n)`은 입력이 2배가 되면 시간도 2배, `O(n²)`은 입력이 2배가 되면 시간은 4배라는 뜻입니다. 상수배와 낮은 차수 항은 버립니다 — `3n² + 100n + 5`는 그냥 `O(n²)`입니다.",
    },
    {
      kind: "heading",
      body: "제한 조건에서 알고리즘을 역산하기",
    },
    {
      kind: "text",
      body: "이 표가 이번 주에 얻어가야 할 전부입니다. 채점 서버는 보통 1초에 1억 번 정도의 단순 연산을 처리한다고 보면 됩니다. 그래서 문제의 `n` 제한을 보면 쓸 수 있는 알고리즘이 거의 정해집니다.",
    },
    {
      kind: "table",
      headers: ["n 제한", "허용 복잡도", "대표 도구"],
      rows: [
        ["n ≤ 20", "O(2ⁿ), O(n!)", "완전 탐색, 백트래킹"],
        ["n ≤ 5,000", "O(n²)", "이중 반복문, 2차원 DP"],
        ["n ≤ 200,000", "O(n log n)", "정렬, 이분 탐색, 힙"],
        ["n ≤ 10,000,000", "O(n)", "한 번 순회, 투 포인터"],
      ],
    },
    {
      kind: "text",
      body: "거꾸로도 씁니다. `n`이 10만인데 이중 반복문이 떠올랐다면, 그 풀이는 버려야 한다는 신호입니다. 100억 번 연산은 절대 1초 안에 끝나지 않습니다. 코드를 쓰기 전에 이 계산을 먼저 하는 습관이 이번 주의 목표입니다.",
    },
    {
      kind: "heading",
      body: "배열을 다루는 기본",
    },
    {
      kind: "text",
      body: "배열은 인덱스로 원소에 바로 접근할 수 있어 읽기와 쓰기가 `O(1)`입니다. 대신 중간에 끼워 넣거나 빼면 뒤쪽 원소를 전부 밀어야 해서 `O(n)`입니다. 이 비대칭이 나중에 큐를 배열로 만들면 안 되는 이유(7주차)로 이어집니다.",
    },
    {
      kind: "list",
      items: [
        "맨 뒤에 넣고 빼기는 빠릅니다 — JS `push`/`pop`, Python `append`/`pop`",
        "맨 앞에 넣고 빼기는 느립니다 — JS `unshift`/`shift`, Python `insert(0, x)`/`pop(0)`",
        "길이를 미리 알면 `Array(n).fill(0)` / `[0] * n` 으로 한 번에 만드는 편이 낫습니다",
      ],
    },
    {
      kind: "trap",
      title: "반복문 안에서 `includes` / `in` 을 쓰면 O(n²)가 됩니다",
      body: "`nums.includes(x)`와 파이썬 리스트의 `x in nums`는 배열을 처음부터 훑기 때문에 `O(n)`입니다. 반복문 안에서 부르면 전체가 `O(n²)`이 되고, `n`이 10만이면 그대로 시간 초과입니다. 2주차에서 배울 해시 집합으로 바꾸면 `O(1)`이 됩니다.",
    },
    {
      kind: "heading",
      body: "누적합 맛보기",
    },
    {
      kind: "text",
      body: "구간 합을 여러 번 물어보는 문제에서, 매번 그 구간을 더하면 질문 하나당 `O(n)`입니다. 대신 앞에서부터 더한 값을 미리 만들어 두면 어떤 구간이든 뺄셈 한 번, 즉 `O(1)`에 답할 수 있습니다. 이 아이디어는 23주차에서 다시 제대로 다룹니다.",
    },
  ],
  patterns: [
    {
      title: "한 번 순회로 최댓값과 합 구하기",
      note: "정렬은 O(n log n)입니다. 최댓값 하나가 필요할 뿐이라면 순회 한 번이면 됩니다.",
      code: {
        javascript: `let sum = 0;
let max = -Infinity;
for (const n of nums) {
  sum += n;
  if (n > max) max = n;
}`,
        python: `total = 0
best = float("-inf")
for n in nums:
    total += n
    if n > best:
        best = n`,
      },
    },
    {
      title: "누적합으로 구간 합을 O(1)에 답하기",
      note: "prefix[i]는 앞에서부터 i개의 합입니다. 구간 [l, r]의 합은 prefix[r+1] - prefix[l].",
      code: {
        javascript: `const prefix = new Array(nums.length + 1).fill(0);
for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i];
}
const rangeSum = (l, r) => prefix[r + 1] - prefix[l];`,
        python: `prefix = [0] * (len(nums) + 1)
for i, n in enumerate(nums):
    prefix[i + 1] = prefix[i] + n

def range_sum(l, r):
    return prefix[r + 1] - prefix[l]`,
      },
    },
  ],
  problems: [
    {
      title: "배열의 합과 최댓값",
      role: "워밍업",
      teaches: "순회 기본과 언어별 배열 API",
    },
    {
      title: "두 번째로 큰 수",
      role: "핵심",
      teaches: "정렬하지 않고 한 번 순회로 해결하기",
    },
    {
      slug: "two-sum",
      title: "두 수의 합",
      role: "핵심",
      teaches: "O(n²) 브루트포스를 O(n) 해시로 줄이는 경험",
    },
    {
      title: "구간 합 구하기",
      role: "도전",
      teaches: "누적합의 첫 등장",
    },
  ],
  selfCheck: [
    "n이 100,000일 때 O(n²)와 O(n log n)은 연산 횟수가 대략 몇 배 차이 나는가?",
    "배열 맨 앞에 원소를 넣는 연산이 O(n)인 이유를 설명할 수 있는가?",
    "문제에 'n ≤ 20'이라고 적혀 있다면 어떤 풀이를 먼저 떠올려야 하는가?",
  ],
};
