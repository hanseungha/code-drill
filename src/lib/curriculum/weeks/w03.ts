import type { Week } from "@/lib/curriculum/types";

export const w03: Week = {
  week: 3,
  phase: 1,
  title: "문자열",
  summary: "불변 문자열을 다루는 법과, 이어붙이기가 만드는 함정을 배웁니다.",
  concept: [
    {
      kind: "text",
      body: "두 언어 모두 문자열은 **불변(immutable)**입니다. 한 글자만 바꾸려 해도 새 문자열이 통째로 만들어집니다. 이 사실 하나가 문자열 문제의 성능을 거의 결정합니다.",
    },
    {
      kind: "heading",
      body: "기본 도구",
    },
    {
      kind: "table",
      headers: ["하고 싶은 것", "JavaScript", "Python"],
      rows: [
        ["부분 잘라내기", "`s.slice(a, b)`", "`s[a:b]`"],
        ["뒤집기", "`[...s].reverse().join(\"\")`", "`s[::-1]`"],
        ["나누기", "`s.split(\" \")`", "`s.split()`"],
        ["합치기", "`arr.join(\"\")`", "`\"\".join(arr)`"],
        ["문자 → 코드", "`s.charCodeAt(i)`", "`ord(s[i])`"],
        ["코드 → 문자", "`String.fromCharCode(n)`", "`chr(n)`"],
        ["소문자로", "`s.toLowerCase()`", "`s.lower()`"],
      ],
    },
    {
      kind: "text",
      body: "문자 코드 변환은 알파벳을 배열 인덱스로 쓸 때 자주 나옵니다. `ord(c) - ord(\"a\")`는 `a`를 0, `z`를 25로 만들어 주므로, 길이 26짜리 배열 하나로 빈도수를 셀 수 있습니다.",
    },
    {
      kind: "trap",
      title: "반복문에서 문자열을 이어붙이면 O(n²)가 됩니다",
      body: "`s += c`는 매번 새 문자열을 만들면서 지금까지의 내용을 전부 복사합니다. 10만 번 반복하면 복사량이 50억 자에 달합니다. 조각을 배열에 모았다가 마지막에 `join`으로 한 번에 합치세요. 이 습관이 문자열 문제에서 가장 자주 점수를 가릅니다.",
    },
    {
      kind: "trap",
      title: "인덱스로 문자를 바꿀 수 없습니다",
      body: "`s[0] = \"x\"`는 파이썬에서 `TypeError`이고, JavaScript에서는 아무 일도 없이 조용히 무시됩니다. 후자가 더 위험합니다 — 에러도 없이 원본이 그대로라 원인을 찾기 어렵습니다. 배열로 바꿔서(`[...s]` / `list(s)`) 고친 뒤 다시 합치세요.",
    },
    {
      kind: "heading",
      body: "양끝에서 좁혀오기",
    },
    {
      kind: "text",
      body: "팰린드롬처럼 앞뒤가 대칭인지 보는 문제는 양끝에 포인터를 두고 가운데로 좁혀오면 뒤집은 문자열을 새로 만들 필요가 없습니다. 추가 메모리 없이 `O(n)`입니다. 8주차 투 포인터의 예고편입니다.",
    },
  ],
  patterns: [
    {
      title: "조각을 모았다가 한 번에 합치기",
      note: "루프 안에서 += 하지 않는 것이 핵심입니다.",
      code: {
        javascript: `const parts = [];
for (const c of s) {
  parts.push(transform(c));
}
return parts.join("");`,
        python: `parts = []
for c in s:
    parts.append(transform(c))
return "".join(parts)`,
      },
    },
    {
      title: "알파벳을 인덱스로 쓰는 빈도수 배열",
      code: {
        javascript: `const count = new Array(26).fill(0);
for (const c of s) {
  count[c.charCodeAt(0) - 97] += 1;
}`,
        python: `count = [0] * 26
for c in s:
    count[ord(c) - ord("a")] += 1`,
      },
    },
    {
      title: "양끝에서 좁혀오며 대칭 확인",
      code: {
        javascript: `let i = 0;
let j = s.length - 1;
while (i < j) {
  if (s[i] !== s[j]) return false;
  i++;
  j--;
}
return true;`,
        python: `i, j = 0, len(s) - 1
while i < j:
    if s[i] != s[j]:
        return False
    i += 1
    j -= 1
return True`,
      },
    },
  ],
  problems: [
    {
      title: "문자열 뒤집기",
      role: "워밍업",
      teaches: "인덱싱과 슬라이싱에 익숙해지기",
    },
    {
      title: "팰린드롬 검사",
      role: "핵심",
      teaches: "정규화 후 양끝 비교",
    },
    {
      title: "애너그램 판별",
      role: "핵심",
      teaches: "정렬 풀이와 빈도수 풀이를 둘 다 써보고 비교하기",
    },
    {
      title: "문자열 압축",
      role: "도전",
      teaches: "연속 구간 스캔과 버퍼로 이어붙이기",
    },
  ],
  selfCheck: [
    "루프에서 `s += c`를 10만 번 하면 왜 느린지, 대안은 무엇인지 설명할 수 있는가?",
    "`ord(c) - ord(\"a\")`가 왜 유용한가?",
    "문자열의 한 글자만 바꾸려면 어떤 절차를 거쳐야 하는가?",
  ],
};
