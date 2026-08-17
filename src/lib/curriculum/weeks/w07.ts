import type { Week } from "@/lib/curriculum/types";

export const w07: Week = {
  week: 7,
  phase: 2,
  title: "정렬",
  summary: "정렬 알고리즘을 짜는 법이 아니라, 정렬하면 쉬워지는 문제를 알아보는 눈.",
  concept: [
    {
      kind: "text",
      body: "정렬은 반 아이들을 키 순서로 세우는 일과 같아요. 이때 딱 두 가지만 정하면 돼요. 첫째, **두 명 중 누가 앞이냐**를 판단하는 규칙(비교 기준). 둘째, **키가 똑같은 두 명은 어떻게 하냐**예요. 좋은 정렬은 키가 같으면 원래 서 있던 순서를 그대로 지켜 줘요 — 이걸 **안정 정렬**이라고 해요. 이 두 가지 감만 잡으면 정렬 문제는 대부분 풀려요.",
    },
    {
      kind: "text",
      body: "실전에서 정렬 알고리즘을 직접 구현할 일은 거의 없어요. 두 언어 모두 `O(n log n)` 정렬을 내장하고 있어서, 그걸 쓰면 돼요. 이번 주의 진짜 목표는 **어떤 문제가 정렬 한 번으로 쉬워지는지 알아보는 것**이에요.",
    },
    {
      kind: "text",
      body: "정렬이 답이 되는 신호는 이런 것들이에요. 순서와 무관한 답을 구할 때, 짝을 찾을 때, 겹치는 구간을 볼 때, K번째를 찾을 때. 정렬은 `O(n log n)`을 쓰지만 그 뒤의 스캔이 `O(n)`으로 끝나면 전체가 `O(n log n)`이라 대부분의 제한을 통과해요.",
    },
    {
      kind: "trap",
      title: "JavaScript의 `sort()`는 기본이 문자열 비교예요",
      body: "`[10, 9, 1].sort()`는 `[1, 10, 9]`를 돌려줘요. 원소를 문자열로 바꿔 사전순으로 비교하거든요. 숫자를 정렬할 때는 **반드시** 비교자를 주세요: `arr.sort((a, b) => a - b)`. 이건 실무에서도 가장 흔한 버그 중 하나예요.",
    },
    {
      kind: "heading",
      body: "비교자와 키",
    },
    {
      kind: "text",
      body: "JavaScript는 두 원소를 받아 음수/0/양수를 돌려주는 **비교자**를 써요. 파이썬은 원소 하나를 받아 정렬 기준 값을 돌려주는 **키 함수**를 써요. 파이썬 쪽이 실수할 여지가 적어서, 다중 기준일 때는 튜플을 돌려주면 그대로 처리돼요.",
    },
    {
      kind: "table",
      headers: ["기준", "JavaScript", "Python"],
      rows: [
        ["숫자 오름차순", "`(a, b) => a - b`", "`sorted(a)`"],
        ["숫자 내림차순", "`(a, b) => b - a`", "`sorted(a, reverse=True)`"],
        ["속성 하나", "`(a, b) => a.age - b.age`", "`key=lambda p: p.age`"],
        ["나이 오름차순, 동점이면 이름순", "`(a, b) => a.age - b.age || a.name.localeCompare(b.name)`", "`key=lambda p: (p.age, p.name)`"],
        ["점수 내림차순, 동점이면 이름순", "`(a, b) => b.score - a.score || a.name.localeCompare(b.name)`", "`key=lambda p: (-p.score, p.name)`"],
      ],
    },
    {
      kind: "text",
      body: "마지막 줄의 파이썬 트릭을 눈여겨봐요. 숫자에 마이너스를 붙이면 그 항목만 내림차순이 돼요. `reverse=True`는 모든 항목을 뒤집으니까 다중 기준에서는 쓸 수 없어요.",
    },
    {
      kind: "heading",
      body: "안정 정렬",
    },
    {
      kind: "text",
      body: "값이 같은 원소들의 원래 순서가 유지되는 정렬을 **안정(stable) 정렬**이라고 해요. 두 언어의 내장 정렬은 모두 안정이에요. 덕분에 '먼저 이름순으로 정렬한 뒤 점수순으로 정렬'하면 점수가 같은 사람끼리는 이름순이 유지돼요 — 다중 기준을 두 번의 정렬로 나눠 쓸 수 있다는 뜻이에요.",
    },
    {
      kind: "heading",
      body: "원리는 알아두기",
    },
    {
      kind: "list",
      items: [
        "**버블 정렬** `O(n²)` — 이웃끼리 비교해 큰 값을 뒤로 밀어내요. 느리지만 이해가 쉬워요",
        "**삽입 정렬** `O(n²)` — 카드를 손에 정렬해 넣듯 앞쪽 정렬된 구간에 끼워 넣어요. 거의 정렬된 입력에서는 매우 빨라요",
        "**병합 정렬** `O(n log n)` — 반으로 쪼개 각각 정렬한 뒤 합쳐요. 13주차 분할 정복에서 직접 구현해요",
      ],
    },
    {
      kind: "text",
      body: "병합 정렬의 핵심은 '반으로 쪼개기'가 아니라 **이미 정렬된 두 배열을 합치는 부분**이에요. 이걸 손으로 한 번 해 보면 원리가 잡혀요. 정렬된 `[1, 3]`과 `[2, 4]`를 합쳐 볼게요. 두 배열의 맨 앞을 가리키는 손가락 `i`, `j`를 두고, **가리킨 두 값 중 작은 쪽을 결과에 담고 그 손가락만 한 칸 옮겨요**. 이걸 반복하면 저절로 정렬된 채로 합쳐져요.",
    },
    {
      kind: "trace",
      caption: "[1,3] 과 [2,4] 합치기 — 두 손가락 i, j가 앞에서부터 이동",
      lines: [
        "L = [1, 3]      R = [2, 4]",
        "",
        "i  j   비교        담은 값   결과",
        "0  0   1 <= 2      1 (L)     [1]",
        "1  0   3 >  2      2 (R)     [1, 2]",
        "1  1   3 <= 4      3 (L)     [1, 2, 3]",
        "2  1   ---         4 (R)     [1, 2, 3, 4]     ← L이 소진돼 R만 남음",
        "",
        "한쪽이 비면 남은 쪽을 그대로 이어 붙여요 → [1, 2, 3, 4]",
      ],
    },
    {
      kind: "text",
      body: "비교할 때 `<`가 아니라 `<=`(같으면 왼쪽을 먼저)를 쓴 데 주목해요. 동점일 때 왼쪽 배열 원소를 먼저 담으니까 **원래 순서가 지켜져요** — 이게 병합 정렬이 안정 정렬인 이유예요.",
    },
    {
      kind: "heading",
      body: "좌표 압축",
    },
    {
      kind: "text",
      body: "정렬이 곧바로 답을 주지는 않지만 정렬 덕에 가능해지는 기법이 하나 있어요. 값의 범위가 10억인데 실제로 등장하는 서로 다른 값은 1,000개뿐인 경우, 값을 정렬해 **순위로 바꾸면** 배열 크기를 1,000으로 줄일 수 있어요.",
    },
    {
      kind: "text",
      body: "쓰는 조건은 명확해요 — 값 자체가 아니라 **대소 관계만 필요할 때**예요. 좌표가 10억까지 가는 문제에서 `visited` 배열을 만들 수 없을 때, 등장한 좌표만 모아 0, 1, 2… 로 다시 매기면 그대로 배열을 쓸 수 있어요.",
    },
  ],
  patterns: [
    {
      title: "다중 기준 정렬",
      code: {
        javascript: `people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));`,
        python: `people.sort(key=lambda p: (p.age, p.name))`,
      },
    },
    {
      title: "정렬한 뒤 이웃끼리만 보기",
      note: "정렬해두면 '겹치는가'를 바로 앞 원소 하나와의 비교로 끝낼 수 있어요.",
      code: {
        javascript: `intervals.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < intervals.length; i++) {
  if (intervals[i][0] < intervals[i - 1][1]) return false;
}
return true;`,
        python: `intervals.sort(key=lambda x: x[0])
for i in range(1, len(intervals)):
    if intervals[i][0] < intervals[i - 1][1]:
        return False
return True`,
      },
    },
    {
      title: "좌표 압축",
      note: "중복을 없애고 정렬한 뒤, 값 → 순위 맵을 만들어요.",
      code: {
        javascript: `const sorted = [...new Set(values)].sort((a, b) => a - b);
const rank = new Map(sorted.map((v, i) => [v, i]));
const compressed = values.map((v) => rank.get(v));`,
        python: `sorted_values = sorted(set(values))
rank = {v: i for i, v in enumerate(sorted_values)}
compressed = [rank[v] for v in values]`,
      },
    },
  ],
  problems: [
    {
      slug: "multi-key-sort",
      title: "다중 기준 정렬",
      role: "워밍업",
      teaches: "비교자와 키 함수 작성",
    },
    {
      slug: "kth-largest",
      title: "K번째 큰 수",
      role: "핵심",
      teaches: "정렬 후 인덱스로 답 얻기",
    },
    {
      slug: "coordinate-compression",
      title: "좌표 압축",
      role: "핵심",
      teaches: "정렬로 값을 순위로 바꿔 범위를 줄이기",
    },
    {
      slug: "group-anagrams",
      title: "애너그램 묶기",
      role: "도전",
      teaches: "정렬 결과를 해시 키로 쓰기",
    },
  ],
  selfCheck: [
    "`[10, 9, 1].sort()`가 JavaScript에서 왜 `[1, 10, 9]`가 되는가?",
    "파이썬에서 점수 내림차순, 동점이면 이름 오름차순으로 정렬하려면?",
    "안정 정렬이라는 성질 덕분에 가능해지는 일은 무엇인가?",
    "좌표 압축이 필요해지는 조건은 무엇인가?",
  ],
};
