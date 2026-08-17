import type { Week } from "@/lib/curriculum/types";

export const w05: Week = {
  week: 5,
  phase: 1,
  title: "해시: 맵과 셋",
  summary: "'본 적 있나?'와 '몇 번 나왔나?'를 O(1)에 답하는 도구예요.",
  concept: [
    {
      kind: "text",
      body: "해시맵은 옷가게의 **번호표 보관소**라고 생각하면 쉬워요. 옷을 맡기면 번호표를 주고, 나중에 번호표만 내밀면 직원이 곧장 그 칸으로 가서 옷을 꺼내 줘요. 온 매장을 뒤지지 않아요. 여기서 번호표가 **열쇠(key)**, 옷이 **값(value)**이에요. 열쇠만 주면 그 칸을 `O(1)`에 찾아 주는 게 해시의 전부예요.",
    },
    {
      kind: "text",
      body: "2주차에서 반복문 안의 `includes`가 `O(n²)`을 만든다는 걸 봤어요. 해시는 정확히 그 문제를 없애는 도구예요. 값을 넣어두면 '있었나?'를 평균 `O(1)`에 답해요.",
    },
    {
      kind: "text",
      body: "원리는 단순해요. 값을 해시 함수에 넣어 정수 하나를 얻고, 그 정수를 배열의 인덱스로 써요. 배열 인덱스 접근은 `O(1)`이니 조회도 `O(1)`이에요. 서로 다른 값이 같은 칸으로 가는 충돌이 생기지만, 구현체가 알아서 처리하니까 평균적으로는 상수 시간이 유지돼요.",
    },
    {
      kind: "heading",
      body: "맵과 셋, 무엇을 쓸까",
    },
    {
      kind: "list",
      items: [
        "**셋(Set)** — 값의 존재 여부만 필요할 때. 중복 제거, '본 적 있나' 판정",
        "**맵(Map)** — 값에 무언가를 붙여야 할 때. 빈도수, 값 → 인덱스, 값 → 목록",
      ],
    },
    {
      kind: "table",
      headers: ["하고 싶은 것", "JavaScript", "Python"],
      rows: [
        ["존재 확인", "`set.has(x)`", "`x in s`"],
        ["값 꺼내기", "`map.get(k)`", "`d[k]` 또는 `d.get(k)`"],
        ["기본값과 함께 꺼내기", "`map.get(k) ?? 0`", "`d.get(k, 0)`"],
        ["빈도수 한 번에", "직접 세기", "`Counter(nums)`"],
        ["키 개수", "`map.size`", "`len(d)`"],
      ],
    },
    {
      kind: "trap",
      title: "JavaScript에서 객체를 맵 대신 쓰면 키가 문자열로 바뀌어요",
      body: "`obj[1]`과 `obj[\"1\"]`은 같은 칸이에요. 숫자와 문자열을 섞어 세면 조용히 합쳐져요. 또 객체는 `toString` 같은 상속된 키를 가지고 있어서 `\"toString\" in obj`가 `true`가 돼요. 키가 숫자이거나 임의의 문자열이면 `Map`과 `Set`을 써요.",
    },
    {
      kind: "trap",
      title: "리스트나 배열은 해시 키가 될 수 없어요",
      body: "Python에서 `d[[1, 2]]`는 `TypeError: unhashable type`이에요. 튜플 `d[(1, 2)]`로 바꿔야 해요. JavaScript의 `Map`은 배열도 키로 받지만 **참조**로 비교하니까 내용이 같은 다른 배열은 다른 키가 돼요. 내용으로 묶으려면 문자열로 만들어 키를 삼아요 — 7주차 애너그램 묶기에서 이 기법을 써요.",
    },
    {
      kind: "heading",
      body: "빈도수 세기가 절반이에요",
    },
    {
      kind: "text",
      body: "해시 문제의 상당수는 '빈도수를 센 다음 그 결과를 본다'로 풀려요. 세는 코드는 항상 같은 모양이니까 손에 붙여두면 좋아요.",
    },
    {
      kind: "text",
      body: "`[a, b, a, c, a]`를 왼쪽부터 하나씩 읽으며 맵이 커지는 과정을 따라가 볼게요. 원소를 볼 때마다 '이미 있으면 +1, 없으면 처음이니까 1'을 해요. `get`에 기본값 `0`을 주는 이유가 여기서 보여요 — 처음 보는 열쇠는 `0 + 1`로 시작하거든요.",
    },
    {
      kind: "trace",
      caption: "[a,b,a,c,a] 빈도수 세기 — 맵이 한 원소씩 자라는 과정",
      lines: [
        "읽은 값   한 일             맵 상태",
        "  (시작)                    { }",
        "   a      0 + 1 -> 1        { a:1 }",
        "   b      0 + 1 -> 1        { a:1, b:1 }",
        "   a      1 + 1 -> 2        { a:2, b:1 }",
        "   c      0 + 1 -> 1        { a:2, b:1, c:1 }",
        "   a      2 + 1 -> 3        { a:3, b:1, c:1 }",
        "",
        "가장 많이 나온 값 -> a (3번)",
      ],
    },
    {
      kind: "trap",
      title: "빈도수가 0이 된 열쇠를 안 지우면 개수가 어긋나요",
      body: "원소를 빼는 문제에서 개수를 `-1` 하다 보면 값이 `0`인 열쇠가 맵에 남아요. 이때 `map.size`나 `len(d)`로 '서로 다른 값의 개수'를 세면 사라진 값까지 세어 답이 틀려요. 개수가 `0`이 되면 열쇠 자체를 지워요(`map.delete(k)` / `del d[k]`). 문자열 윈도우 문제에서 특히 자주 나오는 실수예요.",
    },
  ],
  patterns: [
    {
      title: "빈도수 세기",
      code: {
        javascript: `const count = new Map();
for (const x of items) {
  count.set(x, (count.get(x) ?? 0) + 1);
}`,
        python: `from collections import Counter

count = Counter(items)
# 직접 세면
count = {}
for x in items:
    count[x] = count.get(x, 0) + 1`,
      },
    },
    {
      title: "본 적 있는지 판정하며 진행하기",
      note: "지금까지 지나온 것만 셋에 넣어두면, 각 원소마다 O(1)에 짝을 찾을 수 있어요.",
      code: {
        javascript: `const seen = new Set();
for (const x of nums) {
  if (seen.has(target - x)) return true;
  seen.add(x);
}
return false;`,
        python: `seen = set()
for x in nums:
    if target - x in seen:
        return True
    seen.add(x)
return False`,
      },
    },
  ],
  problems: [
    {
      slug: "duplicate-check",
      title: "중복 원소 찾기",
      role: "워밍업",
      teaches: "셋으로 '본 적 있나' 판정하기",
    },
    {
      slug: "most-frequent-char",
      title: "가장 많이 등장한 문자",
      role: "핵심",
      teaches: "빈도수 맵을 만들고 최댓값 뽑기",
    },
    {
      slug: "two-sum",
      title: "두 수의 합",
      role: "핵심",
      teaches: "O(n²) 브루트포스를 O(n) 해시로 줄이는 경험",
    },
    {
      slug: "longest-consecutive",
      title: "가장 긴 연속 수열",
      role: "도전",
      teaches: "정렬하지 않고 셋만으로 O(n)에 푸는 발상",
    },
  ],
  selfCheck: [
    "해시 조회가 평균 O(1)인데 최악에는 O(n)이 될 수 있는 이유는?",
    "JavaScript에서 객체 대신 Map을 써야 하는 상황을 두 가지 말할 수 있는가?",
    "내용이 같은 두 배열을 같은 키로 묶으려면 어떻게 해야 하는가?",
  ],
};
