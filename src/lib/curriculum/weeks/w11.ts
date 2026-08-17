import type { Week } from "@/lib/curriculum/types";

export const w11: Week = {
  week: 11,
  phase: 2,
  title: "이분 탐색과 결정 알고리즘",
  summary: "매번 절반을 버려요. 그리고 '답' 자체를 탐색하는 법까지.",
  concept: [
    {
      kind: "text",
      body: "이분 탐색은 **숫자 업다운 게임**과 똑같아요. 1부터 100 사이 숫자를 맞힐 때 무작정 1, 2, 3 부르지 않죠. 가운데인 50을 부르고 '업'이면 아래 절반을 통째로 버리고, '다운'이면 위 절반을 버려요. 한 번 물어볼 때마다 후보가 반으로 줄어드니, 100만 개짜리도 스무 번이면 끝나요.",
    },
    {
      kind: "text",
      body: "정렬된 배열에서 값을 찾을 때, 가운데를 보고 목표보다 크면 오른쪽 절반을 통째로 버려요. 매번 후보가 절반으로 줄어드니 `O(log n)`이에요. 100만 개에서 20번이면 끝나요.",
    },
    {
      kind: "text",
      body: "쓰기는 쉬운데 정확히 쓰기가 어려워요. 경계 처리를 한 글자만 틀려도 무한 루프에 빠지거나 답을 하나 놓쳐요. 그래서 **한 가지 형태를 정해서 외우는 편**을 권해요.",
    },
    {
      kind: "trap",
      title: "무한 루프를 만드는 경계 처리",
      body: "`while (lo < hi)`에서 `hi = mid`로 좁히는 형태를 쓴다면 `mid`는 반드시 내림(`Math.floor`)이어야 해요. 올림을 쓰면 `lo`와 `hi`가 1 차이일 때 `mid === hi`가 돼서 영원히 줄지 않아요. 반대로 `lo = mid`로 좁히는 형태에서는 올림을 써야 해요. 둘을 섞지 마세요.",
    },
    {
      kind: "text",
      body: "말보다 손이 빨라요. 정렬된 배열 `[1, 3, 5, 7, 9, 11]`에서 `7`을 찾을 때 `lo`, `hi`, `mid`가 어떻게 움직이는지 한 단계씩 따라가 볼게요. 아래 기본 이분 탐색 형태 그대로, `mid = (lo + hi) / 2`를 내림해서 써요.",
    },
    {
      kind: "trace",
      caption: "[1,3,5,7,9,11]에서 7 찾기 — lo/hi/mid의 이동",
      lines: [
        "index   0   1   2   3   4   5",
        "value   1   3   5   7   9  11     ← target = 7",
        "",
        "start   lo=0  hi=6",
        "step 1  mid=3  value[3]=7  →  7 아님, 7 이상이니 hi=3",
        "step 2  lo=0 hi=3  mid=1  value[1]=3  →  3<7 이니 lo=2",
        "step 3  lo=2 hi=3  mid=2  value[2]=5  →  5<7 이니 lo=3",
        "",
        "end     lo=3 hi=3  (lo<hi 깨짐, 루프 종료)",
        "        value[3] == 7  →  index 3 에서 찾음",
      ],
    },
    {
      kind: "text",
      body: "세 단계 만에 후보가 6개에서 1개로 줄었죠. `mid`를 소수점째 그대로 두면 `value[2.5]` 같은 게 나와 배열이 엉키니, JS에서는 `Math.floor`가 필수예요. 앞의 함정과 정확히 이어지는 이유예요.",
    },
    {
      kind: "heading",
      body: "lower bound와 upper bound",
    },
    {
      kind: "text",
      body: "'값이 있는가'보다 실전에서 더 자주 쓰이는 건 **삽입 위치**예요. `lower bound`는 target 이상인 첫 위치, `upper bound`는 target 초과인 첫 위치예요. 이 둘을 빼면 target의 개수가 나와요.",
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
      body: "이번 주의 진짜 무기예요. 배열이 아니라 **답의 범위**를 이분 탐색해요. '길이 x로 자르면 조건을 만족하는가?'처럼 **예/아니오로 답할 수 있고, x가 커질수록 답이 한 방향으로만 바뀌는** 문제에 써요.",
    },
    {
      kind: "text",
      body: "예를 들어 '랜선을 잘라 N개 이상 만들 수 있는 최대 길이'는, 길이가 짧을수록 많이 만들어지고 길수록 적게 만들어져요. 즉 '만들 수 있다/없다'가 어느 지점을 경계로 딱 갈려요. 그 경계를 이분 탐색으로 찾아요.",
    },
    {
      kind: "list",
      items: [
        "탐색 대상이 배열이 아니라 답의 범위 `[최솟값, 최댓값]`이에요",
        "`check(x)`를 만들어 예/아니오를 판정해요 — 보통 `O(n)`",
        "전체 복잡도는 `O(n log(범위))`가 돼요",
      ],
    },
    {
      kind: "text",
      body: "이 패턴을 알아보는 신호는 '최대의 최소' 또는 '최소의 최대'라는 표현이에요. 직접 최적값을 구하기 어려울 때, 후보를 하나 정해놓고 가능한지만 따지는 쪽으로 문제를 뒤집는 거예요.",
    },
  ],
  patterns: [
    {
      title: "기본 이분 탐색",
      note: "lo < hi 와 hi = mid 를 짝으로, mid는 내림. 루프가 끝나면 lo가 답의 위치예요.",
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
      note: "check(x)가 x에 대해 단조로워야 성립해요.",
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
      slug: "search-insert",
      title: "삽입 위치 찾기",
      role: "핵심",
      teaches: "lower bound 변형",
    },
    {
      slug: "search-rotated",
      title: "회전된 정렬 배열에서 검색",
      role: "핵심",
      teaches: "정렬이 한 번 끊긴 배열에서의 이분 탐색",
    },
    {
      slug: "max-cable-length",
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
