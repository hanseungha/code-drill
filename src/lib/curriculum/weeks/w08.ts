import type { Week } from "@/lib/curriculum/types";

export const w08: Week = {
  week: 8,
  phase: 2,
  title: "투 포인터와 슬라이딩 윈도우",
  summary: "이중 반복문을 한 번의 순회로 접는 기술이에요.",
  concept: [
    {
      kind: "text",
      body: "그림 두 개로 시작해요. **투 포인터**는 배열 위를 달리는 두 주자예요. 양끝에서 마주 보고 달리기도 하고, 앞에서 나란히 달리기도 하는데 공통점은 **한 번 지나온 곳으로는 되돌아가지 않는다**는 거예요. **슬라이딩 윈도우**는 배열 위에 놓인 창문이에요. 오른쪽 끝을 밀어 창을 **늘였다가**, 조건이 깨지면 왼쪽 끝을 당겨 **줄였다가** 하면서 딱 맞는 구간을 찾아요. 둘 다 두 개의 위치(L, R)만 기억하면 돼요.",
    },
    {
      kind: "text",
      body: "배열에서 '어떤 구간' 또는 '어떤 두 원소'를 찾는 문제는 순진하게 짜면 모든 쌍을 보게 돼서 `O(n²)`이에요. 투 포인터는 포인터 두 개를 두되 **되돌아가지 않게** 움직여서 이를 `O(n)`으로 만들어요.",
    },
    {
      kind: "text",
      body: "왜 `O(n)`인지가 중요해요. 반복문이 중첩돼 보여도, 각 포인터가 배열을 최대 한 번씩만 훑고 끝나서 전체 이동 횟수가 `2n`을 넘지 않아요. 이 논리를 스스로 설명할 수 있으면 이 주는 성공이에요.",
    },
    {
      kind: "heading",
      body: "형태 1 — 양끝 투 포인터",
    },
    {
      kind: "text",
      body: "**정렬된** 배열에서 합이 목표값인 두 수를 찾을 때 써요. 양끝에서 시작해 합이 크면 오른쪽을 당기고, 작으면 왼쪽을 밀어요. 정렬돼 있다는 사실이 '이 방향으로 움직이면 합이 커진다/작아진다'를 보장해 줘서 성립해요.",
    },
    {
      kind: "trap",
      title: "정렬되지 않은 배열에 양끝 투 포인터를 쓰면 틀려요",
      body: "정렬이 전제예요. 인덱스를 답으로 요구하는 문제에서 정렬하면 원래 인덱스가 사라지니까, 그때는 투 포인터가 아니라 해시(5주차)를 써야 해요. 5주차 `두 수의 합`이 해시로 풀리는 이유가 이거예요.",
    },
    {
      kind: "heading",
      body: "형태 2 — 슬라이딩 윈도우",
    },
    {
      kind: "text",
      body: "연속된 구간을 다룰 때 써요. 오른쪽 포인터로 창을 넓히다가 조건이 깨지면 왼쪽 포인터로 좁혀요. 창의 길이가 고정이면 더 단순하고, 조건에 따라 길이가 변하면 '언제 좁힐지'가 핵심이에요.",
    },
    {
      kind: "list",
      items: [
        "**고정 길이** — 길이 k 창의 최대 합 같은 문제. 한 칸 밀 때마다 들어온 값을 더하고 나간 값을 빼요",
        "**가변 길이** — 조건을 만족하는 가장 긴/짧은 구간. 넓히다가 조건 위반이면 만족할 때까지 좁혀요",
      ],
    },
    {
      kind: "text",
      body: "가변 길이 윈도우는 보통 해시와 함께 와요. '중복 없는 가장 긴 부분 문자열'이 대표적이에요 — 창 안의 문자를 셋으로 관리하면서, 중복이 생기면 그 문자가 빠질 때까지 왼쪽을 밀어요.",
    },
    {
      kind: "heading",
      body: "직접 따라가 보기: 합이 7 이상인 최소 길이 구간",
    },
    {
      kind: "text",
      body: "`nums = [2, 3, 1, 2, 4, 3]`에서 합이 7 이상이 되는 가장 짧은 연속 구간을 찾아 볼게요. 오른쪽 끝 `R`을 한 칸씩 밀면서 값을 창에 더하고, 창의 합이 7 이상이 되면 그때부터 왼쪽 끝 `L`을 당겨 **더 짧게 만들 수 있는지** 확인해요. 창을 줄일 때는 빠져나가는 값을 합에서 빼요.",
    },
    {
      kind: "trace",
      caption: "R을 밀며 넓히고, 합이 7 이상이면 L을 당겨 줄여요 (합 = 창 안 값의 합)",
      lines: [
        "index    0   1   2   3   4   5",
        "nums     2   3   1   2   4   3",
        "",
        "R=0  [2]              합 2   < 7  넓혀요",
        "R=1  [2 3]            합 5   < 7  넓혀요",
        "R=2  [2 3 1]          합 6   < 7  넓혀요",
        "R=3  [2 3 1 2]        합 8  >= 7  길이 4, L 당겨요",
        "     [3 1 2]          합 6   < 7  멈춰요",
        "R=4  [3 1 2 4]        합 10 >= 7  L 당겨요",
        "     [1 2 4]          합 7  >= 7  길이 3, 더 당겨요",
        "     [2 4]            합 6   < 7  멈춰요",
        "R=5  [2 4 3]          합 9  >= 7  L 당겨요",
        "     [4 3]            합 7  >= 7  길이 2, 더 당겨요",
        "     [3]              합 3   < 7  멈춰요",
        "",
        "최소 길이 = 2   ([4, 3])",
      ],
    },
    {
      kind: "text",
      body: "`R`은 0에서 5까지 한 번, `L`도 앞으로만 움직여요. 둘 다 뒤로 가지 않으니 전체 이동이 `2n`을 넘지 않고, 그래서 `O(n)`이에요. 창의 합을 매번 다시 더하지 않고 **들어온 값은 더하고 나간 값은 빼는** 게 속도의 핵심이에요.",
    },
    {
      kind: "trap",
      title: "슬라이딩 윈도우는 값이 음수면 무너져요",
      body: "'합이 7 이상인 최소 구간' 같은 문제가 슬라이딩 윈도우로 풀리는 건 값이 모두 **양수**라서예요. 값이 커지면 합도 반드시 커지니까, '창을 넓히면 합이 는다'가 보장돼요. 음수가 섞이면 창을 넓혀도 합이 줄 수 있어서 '언제 좁힐지' 규칙이 깨져요. 그런 문제는 누적 합이나 다른 도구를 써야 해요.",
    },
    {
      kind: "heading",
      body: "카데인 알고리즘",
    },
    {
      kind: "text",
      body: "연속 부분 수열의 최대 합은 포인터 대신 '여기서 새로 시작할까, 이어붙일까'라는 한 줄의 판단으로 풀려요. 이전까지의 누적이 음수면 버리고 새로 시작하는 편이 항상 나아요. 엄밀히는 DP지만 코드가 한 줄이라 이 주에 함께 다뤄요.",
    },
  ],
  patterns: [
    {
      title: "양끝 투 포인터 (정렬된 배열)",
      code: {
        javascript: `let i = 0;
let j = nums.length - 1;
while (i < j) {
  const sum = nums[i] + nums[j];
  if (sum === target) return [i, j];
  if (sum < target) i++;
  else j--;
}`,
        python: `i, j = 0, len(nums) - 1
while i < j:
    total = nums[i] + nums[j]
    if total == target:
        return [i, j]
    if total < target:
        i += 1
    else:
        j -= 1`,
      },
    },
    {
      title: "가변 길이 슬라이딩 윈도우",
      note: "오른쪽으로 넓히고, 조건이 깨진 동안 왼쪽으로 좁혀요.",
      code: {
        javascript: `let left = 0;
let best = 0;
const window = new Set();
for (let right = 0; right < s.length; right++) {
  while (window.has(s[right])) {
    window.delete(s[left]);
    left++;
  }
  window.add(s[right]);
  best = Math.max(best, right - left + 1);
}`,
        python: `left = 0
best = 0
window = set()
for right, c in enumerate(s):
    while c in window:
        window.remove(s[left])
        left += 1
    window.add(c)
    best = max(best, right - left + 1)`,
      },
    },
    {
      title: "카데인 알고리즘",
      code: {
        javascript: `let cur = nums[0];
let best = nums[0];
for (let i = 1; i < nums.length; i++) {
  cur = Math.max(nums[i], cur + nums[i]);
  best = Math.max(best, cur);
}`,
        python: `cur = best = nums[0]
for n in nums[1:]:
    cur = max(n, cur + n)
    best = max(best, cur)`,
      },
    },
  ],
  problems: [
    {
      slug: "two-sum-sorted",
      title: "정렬된 배열의 두 수의 합",
      role: "워밍업",
      teaches: "양끝 포인터의 기본형",
    },
    {
      slug: "remove-duplicates-sorted",
      title: "정렬된 배열 중복 제거",
      role: "핵심",
      teaches: "읽기 포인터와 쓰기 포인터를 분리하기",
    },
    {
      slug: "max-subarray",
      title: "가장 큰 연속 부분 수열의 합",
      role: "핵심",
      teaches: "카데인 알고리즘",
    },
    {
      slug: "longest-unique-substring",
      title: "중복 없는 가장 긴 부분 문자열",
      role: "도전",
      teaches: "가변 윈도우와 해시의 조합",
    },
  ],
  selfCheck: [
    "포인터 두 개를 쓰는데도 O(n)인 이유를 설명할 수 있는가?",
    "양끝 투 포인터가 정렬을 전제하는 이유는? 정렬하면 안 되는 문제는 어떻게 푸는가?",
    "가변 길이 윈도우에서 '언제 왼쪽을 미는가'를 무엇으로 판단하는가?",
    "슬라이딩 윈도우가 값이 모두 양수일 때만 안전한 이유를 설명할 수 있나요?",
  ],
};
