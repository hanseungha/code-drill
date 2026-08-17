import type { Week } from "@/lib/curriculum/types";

export const w03: Week = {
  week: 3,
  phase: 1,
  title: "문자열",
  summary: "불변 문자열을 다루는 법과, 이어붙이기가 만드는 함정을 배워요.",
  concept: [
    {
      kind: "text",
      body: "문자열은 그냥 **문자를 한 줄로 세워 놓은 배열**이라고 보면 편해요. `\"code\"`는 `c, o, d, e` 네 칸짜리 배열이고, `s[0]`으로 첫 글자를 꺼내는 것도 배열이랑 똑같아요. 딱 하나 다른 점 — 이 배열은 칸을 못 고쳐요. 그래서 반복문에서 `s += c`로 글자를 이어붙이면 **매번 배열 전체를 새로 복사**하느라 `O(n²)`으로 느려져요. 이 함정만 조심하면 나머지는 배열 지식 그대로예요.",
    },
    {
      kind: "text",
      body: "두 언어 모두 문자열은 **불변(immutable)**이에요. 한 글자만 바꾸려 해도 새 문자열이 통째로 만들어져요. 이 사실 하나가 문자열 문제의 성능을 거의 결정해요.",
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
      body: "문자 코드 변환은 알파벳을 배열 인덱스로 쓸 때 자주 나와요. `ord(c) - ord(\"a\")`는 `a`를 0, `z`를 25로 만들어 주니까, 길이 26짜리 배열 하나로 빈도수를 셀 수 있어요.",
    },
    {
      kind: "trap",
      title: "반복문에서 문자열을 이어붙이면 O(n²)가 돼요",
      body: "`s += c`는 매번 새 문자열을 만들면서 지금까지의 내용을 전부 복사해요. 10만 번 반복하면 복사량이 50억 자에 달해요. 조각을 배열에 모았다가 마지막에 `join`으로 한 번에 합쳐요. 이 습관이 문자열 문제에서 가장 자주 점수를 갈라요.",
    },
    {
      kind: "trap",
      title: "인덱스로 문자를 바꿀 수 없어요",
      body: "`s[0] = \"x\"`는 파이썬에서 `TypeError`이고, JavaScript에서는 아무 일도 없이 조용히 무시돼요. 후자가 더 위험해요 — 에러도 없이 원본이 그대로라 원인을 찾기 어려워요. 배열로 바꿔서(`[...s]` / `list(s)`) 고친 뒤 다시 합쳐요.",
    },
    {
      kind: "heading",
      body: "양끝에서 좁혀오기",
    },
    {
      kind: "text",
      body: "팰린드롬처럼 앞뒤가 대칭인지 보는 문제는 양끝에 포인터를 두고 가운데로 좁혀오면 뒤집은 문자열을 새로 만들 필요가 없어요. 추가 메모리 없이 `O(n)`이에요. 8주차 투 포인터의 예고편이에요.",
    },
    {
      kind: "text",
      body: "`\"abcba\"`가 회문인지 손으로 검사해 볼게요. 왼쪽 포인터 `i`와 오른쪽 포인터 `j`를 양끝에 두고, 두 글자가 같으면 안쪽으로 한 칸씩 좁혀요. 서로 지나칠 때까지 한 번도 안 어긋나면 회문이에요.",
    },
    {
      kind: "trace",
      caption: "\"abcba\" 회문 검사 — i는 오른쪽으로, j는 왼쪽으로",
      lines: [
        "인덱스   0   1   2   3   4",
        "문자     a   b   c   b   a",
        "",
        "i=0, j=4 :  s[0]=a  s[4]=a   같음 → i++, j--",
        "i=1, j=3 :  s[1]=b  s[3]=b   같음 → i++, j--",
        "i=2, j=2 :  i < j 아님        → 멈춤",
        "",
        "한 번도 안 어긋남 → 회문이에요 (true)",
      ],
    },
    {
      kind: "text",
      body: "포인터가 가운데서 만나면(`i < j`가 깨지면) 검사를 끝내요. 홀수 길이면 정중앙 글자(`c`)는 자기 자신과 비교할 필요가 없어서 그냥 지나쳐요. 어긋나는 순간 바로 `false`를 돌려주면 되니까, 최악이라도 절반만 훑어서 `O(n)`이에요.",
    },
    {
      kind: "trap",
      title: "회문·애너그램 검사 전에 대소문자와 공백을 먼저 맞춰요",
      body: "`\"Anna\"`를 그대로 검사하면 `A`와 `a`가 달라서 회문이 아니라고 나와요. 문제가 대소문자·공백·문장부호를 무시하라고 하면, 비교 전에 `s.toLowerCase()`로 소문자로 바꾸고 알파벳·숫자만 남겨요. 이 **정규화**를 빼먹으면 예제는 통과하고 제출은 틀리는 상태가 돼요.",
    },
  ],
  patterns: [
    {
      title: "조각을 모았다가 한 번에 합치기",
      note: "루프 안에서 += 하지 않는 것이 핵심이에요.",
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
      slug: "reverse-string",
      title: "문자열 뒤집기",
      role: "워밍업",
      teaches: "인덱싱과 슬라이싱에 익숙해지기",
    },
    {
      slug: "palindrome-check",
      title: "팰린드롬 검사",
      role: "핵심",
      teaches: "정규화 후 양끝 비교",
    },
    {
      slug: "anagram-check",
      title: "애너그램 판별",
      role: "핵심",
      teaches: "정렬 풀이와 빈도수 풀이를 둘 다 써보고 비교하기",
    },
    {
      slug: "compress-string",
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
