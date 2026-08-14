import type { Week } from "@/lib/curriculum/types";

export const w08: Week = {
  week: 8,
  phase: 2,
  title: "이분 탐색",
  summary: "매번 절반을 버립니다. 그리고 '답' 자체를 탐색하는 법까지.",
  concept: [
    {
      kind: "text",
      body: "정렬된 배열에서 값을 찾을 때, 가운데를 보고 목표보다 크면 오른쪽 절반을 통째로 버립니다. 매번 후보가 절반으로 줄어드니 `O(log n)`입니다. 100만 개에서 20번이면 끝납니다.",
    },
    {
      kind: "text",
      body: "쓰기는 쉬운데 정확히 쓰기가 어렵습니다. 경계 처리를 한 글자만 틀려도 무한 루프에 빠지거나 답을 하나 놓칩니다. 그래서 **한 가지 형태를 정해서 외우는 편**을 권합니다.",
    },
    {
      kind: "trap",
      title: "무한 루프를 만드는 경계 처리",
      body: "`while (lo < hi)`에서 `hi = mid`로 좁히는 형태를 쓴다면 `mid`는 반드시 내림(`Math.floor`)이어야 합니다. 올림을 쓰면 `lo`와 `hi`가 1 차이일 때 `mid === hi`가 되어 영원히 줄지 않습니다. 반대로 `lo = mid`로 좁히는 형태에서는 올림을 써야 합니다. 둘을 섞지 마세요.",
    },
    {
      kind: "heading",
      body: "lower bound와 upper bound",
    },
    {
      kind: "text",
      body: "'값이 있는가'보다 실전에서 더 자주 쓰이는 건 **삽입 위치**입니다. `lower bound`는 target 이상인 첫 위치, `upper bound`는 target 초과인 첫 위치입니다. 이 둘을 빼면 target의 개수가 나옵니다.",
    },
    {
      kind: "table",
      headers: ["원하는 것", "JavaScript", "Python"],
      rows: [
        ["target 이상인 첫 위치", "직접 구현", "`bisect_left(a, t)`"],
        ["target 초과인 첫 위치", "직접 구현", "`bisect_right(a, t)`"],
        ["target의 개수", "두 위치의 차", "`bisect_right - bisect_left`"],
      ],
    },
    {
      kind: "heading",
      body: "답을 이분 탐색하기 (파라메트릭 서치)",
    },
    {
      kind: "text",
      body: "이번 주의 진짜 무기입니다. 배열이 아니라 **답의 범위**를 이분 탐색합니다. '길이 x로 자르면 조건을 만족하는가?'처럼 **예/아니오로 답할 수 있고, x가 커질수록 답이 한 방향으로만 바뀌는** 문제에 씁니다.",
    },
    {
      kind: "text",
      body: "예를 들어 '랜선을 잘라 N개 이상 만들 수 있는 최대 길이'는, 길이가 짧을수록 많이 만들어지고 길수록 적게 만들어집니다. 즉 '만들 수 있다/없다'가 어느 지점을 경계로 딱 갈립니다. 그 경계를 이분 탐색으로 찾습니다.",
    },
    {
      kind: "list",
      items: [
        "탐색 대상이 배열이 아니라 답의 범위 `[최솟값, 최댓값]`입니다",
        "`check(x)`를 만들어 예/아니오를 판정합니다 — 보통 `O(n)`",
        "전체 복잡도는 `O(n log(범위))`가 됩니다",
      ],
    },
    {
      kind: "text",
      body: "이 패턴을 알아보는 신호는 '최대의 최소' 또는 '최소의 최대'라는 표현입니다. 직접 최적값을 구하기 어려울 때, 후보를 하나 정해놓고 가능한지만 따지는 쪽으로 문제를 뒤집는 것입니다.",
    },
  ],
  patterns: [
    {
      title: "기본 이분 탐색",
      note: "lo < hi 와 hi = mid 를 짝으로, mid는 내림. 루프가 끝나면 lo가 답의 위치입니다.",
      code: {
        javascript: `let lo = 0;
let hi = nums.length;
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid;
}
return nums[lo] === target ? lo : -1;`,
        python: `lo, hi = 0, len(nums)
while lo < hi:
    mid = (lo + hi) // 2
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid
return lo if lo < len(nums) and nums[lo] == target else -1`,
      },
    },
    {
      title: "답을 이분 탐색하기",
      note: "check(x)가 x에 대해 단조로워야 성립합니다.",
      code: {
        javascript: `let lo = 1;
let hi = Math.max(...lengths);
let best = 0;
while (lo <= hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  if (check(mid)) {
    best = mid;
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}
return best;`,
        python: `lo, hi = 1, max(lengths)
best = 0
while lo <= hi:
    mid = (lo + hi) // 2
    if check(mid):
        best = mid
        lo = mid + 1
    else:
        hi = mid - 1
return best`,
      },
    },
  ],
  problems: [
    {
      slug: "binary-search",
      title: "이진 탐색",
      role: "워밍업",
      teaches: "기본 형태를 정확히 쓰기",
    },
    {
      title: "삽입 위치 찾기",
      role: "핵심",
      teaches: "lower bound 변형",
    },
    {
      title: "회전된 정렬 배열에서 검색",
      role: "핵심",
      teaches: "정렬이 한 번 끊긴 배열에서의 이분 탐색",
    },
    {
      title: "랜선 자르기",
      role: "도전",
      teaches: "답을 이분 탐색하는 사고 전환",
    },
  ],
  selfCheck: [
    "`mid = (lo + hi) / 2`와 `lo + (hi - lo) / 2`는 무엇이 다른가?",
    "`while (lo < hi)`와 `hi = mid`를 쓸 때 mid를 올림하면 무슨 일이 일어나는가?",
    "파라메트릭 서치를 쓸 수 있는 조건은 무엇이며, 문제의 어떤 표현이 신호가 되는가?",
  ],
};
