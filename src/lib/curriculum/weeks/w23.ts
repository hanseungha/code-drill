import type { Week } from "@/lib/curriculum/types";

export const w23: Week = {
  week: 23,
  phase: 4,
  title: "트리 DP와 문자열 매칭",
  summary: "마지막 개념 주차예요. 모르면 아예 못 푸는 도구 두 가지.",
  concept: [
    {
      kind: "text",
      body: "마지막 개념 주차예요. 여기 나오는 것들은 매번 쓰이지는 않지만, 필요한 순간에 모르면 아예 못 푸는 도구들이에요. 앞의 22주를 다 거쳤다면 둘 다 '이미 아는 것의 조합'으로 읽힐 거예요.",
    },
    {
      kind: "heading",
      body: "트리 DP",
    },
    {
      kind: "text",
      body: "트리 DP는 이름 그대로 트리 위에서 하는 DP예요. 19~20주차 DP는 `dp[i]`, `dp[i][j]` 처럼 배열 위에서 왼쪽에서 오른쪽으로 채웠어요. 트리에서는 **자식의 답을 모아 부모의 답을 만들어요.** 즉 후위 순회(자식 먼저, 자기 나중) 순서로 채워요.",
    },
    {
      kind: "text",
      body: "왜 이게 성립하냐면, 트리에는 사이클이 없기 때문이에요. 어떤 정점의 답이 자기 서브트리에만 의존하므로 서로를 순환 참조하지 않아요. 14주차에서 트리 재귀를 쓸 때 이미 이 구조를 썼어요 — 최대 깊이는 `1 + max(왼쪽 깊이, 오른쪽 깊이)` 였고, 그게 가장 단순한 트리 DP예요.",
    },
    {
      kind: "table",
      headers: ["구하려는 것", "상태", "전이"],
      rows: [
        ["서브트리 크기", "`size[v]`", "`1 + Σ size[child]`"],
        ["서브트리 최대 깊이", "`depth[v]`", "`1 + max(depth[child])`"],
        ["트리의 지름", "각 정점에서 가장 깊은 자식 둘", "`max(d1 + d2)`"],
        ["최대 독립 집합", "`dp[v][0]`, `dp[v][1]`", "고르면 자식은 못 고름"],
      ],
    },
    {
      kind: "text",
      body: "**최대 독립 집합**이 트리 DP의 전형이에요. 서로 인접하지 않게 정점을 골라 가중치 합을 최대로 만드는 문제인데, 상태를 '이 정점을 골랐는가'로 하나 더 두면 풀려요. `dp[v][1]` 은 v를 골랐을 때이므로 자식은 반드시 안 고른 값 `dp[child][0]` 을 더하고, `dp[v][0]` 은 자식이 자유로우니 둘 중 큰 값을 더해요. 16주차 '도둑질'을 트리로 옮긴 것과 같아요.",
    },
    {
      kind: "text",
      body: "**트리의 지름**은 가장 먼 두 정점 사이의 거리예요. 각 정점을 최고점으로 삼는 경로만 생각하면, 그 정점에서 내려가는 가장 깊은 두 갈래를 더한 값이 후보예요. 모든 정점에서 이 후보를 구해 최댓값을 취하면 답이에요 — 후위 순회 한 번, `O(n)`이에요.",
    },
    {
      kind: "heading",
      body: "직접 채워 보기: 서브트리 크기",
    },
    {
      kind: "text",
      body: "머릿속 그림은 이래요. **잎에서 시작해 뿌리 쪽으로 정보를 모아 올려요.** 회사 조직도에서 '내 밑에 몇 명이 있나'를 세는 것과 똑같아요. 말단 직원은 자기 혼자니까 1명, 팀장은 '내 팀원들 각자의 인원 수를 다 더하고, 나 자신을 1 더한' 값이에요. 자식이 먼저 답을 알아야 부모가 더할 수 있으니, 순서는 늘 **자식 먼저·부모 나중**, 곧 후위 순회예요.",
    },
    {
      kind: "text",
      body: "작은 트리 하나로 손으로 채워 볼게요. 루트 0 아래에 자식 1과 2가 있고, 1 아래에 다시 자식 3과 4가 있어요. `size[v]` 는 'v를 포함한 서브트리의 정점 수'예요. 잎(자식이 없는 정점)은 자기 혼자니까 무조건 1로 시작하고, 부모는 `1 + 자식들의 size 합` 으로 올려요.",
    },
    {
      kind: "trace",
      caption: "루트 0에서 후위 순회 — 잎에서 뿌리로 size를 모아 올리는 과정",
      lines: [
        "트리 모양                 자식 목록",
        "        0                 0 : 1, 2",
        "       / \\                1 : 3, 4",
        "      1   2               2 : (없음, 잎)",
        "     / \\                  3 : (없음, 잎)",
        "    3   4                 4 : (없음, 잎)",
        "",
        "후위 순회 방문 순서 → 3  4  1  2  0",
        "",
        "size[3] = 1                      잎이라 자기 혼자",
        "size[4] = 1                      잎이라 자기 혼자",
        "size[1] = 1 + size[3] + size[4]  = 1 + 1 + 1 = 3",
        "size[2] = 1                      잎이라 자기 혼자",
        "size[0] = 1 + size[1] + size[2]  = 1 + 3 + 1 = 5",
        "",
        "v       0   1   2   3   4",
        "size    5   3   1   1   1     → 답 size[0] = 5 (전체 정점 수)",
      ],
    },
    {
      kind: "text",
      body: "핵심은 `size[0]` 을 구하려면 `size[1]`, `size[2]` 가 먼저 채워져 있어야 하고, `size[1]` 을 구하려면 `size[3]`, `size[4]` 가 먼저여야 한다는 점이에요. 그래서 방문 순서가 잎부터 시작해 뿌리에서 끝나요. 재귀로 짜면 이 순서가 저절로 지켜져요 — 자식 `dfs` 를 다 부른 다음에 내 값을 계산하니까요.",
    },
    {
      kind: "trap",
      title: "루트 없는 트리에서는 부모로 되돌아가는 것을 막아야 해요",
      body: "간선 목록으로 주어진 트리는 인접 리스트가 양방향이에요. 자식을 순회할 때 부모를 걸러내지 않으면 부모↔자식을 무한히 오가요. 재귀 인자에 `parent` 를 넘겨 `if (next === parent) continue;` 로 건너뛰거나, 15주차처럼 `visited` 를 써요. 트리는 사이클이 없으므로 부모 하나만 막으면 충분해요.",
    },
    {
      kind: "trap",
      title: "정점이 많으면 재귀 깊이에서 먼저 터져요",
      body: "한 줄로 늘어선 트리(사실상 연결 리스트)는 깊이가 정점 수와 같아요. 파이썬 기본 재귀 한도는 1,000이라 `n`이 10만이면 `RecursionError` 예요. `sys.setrecursionlimit(300000)` 으로 올리거나, 13주차에서 배운 대로 명시적 스택으로 바꿔요. 브라우저의 JavaScript도 대략 1만 프레임 근처에서 스택이 넘쳐요.",
    },
    {
      kind: "heading",
      body: "문자열 매칭 — KMP",
    },
    {
      kind: "text",
      body: "긴 문자열에서 패턴을 찾을 때, 어긋날 때마다 처음부터 다시 비교하면 `O(nm)`이에요. KMP는 패턴 자신의 접두사-접미사 정보를 미리 계산해두어 **어긋나도 본문 포인터를 되돌리지 않게** 만들어 `O(n+m)`으로 줄여요.",
    },
    {
      kind: "text",
      body: "핵심은 실패 함수(부분 일치 테이블)예요. `fail[i]` 는 '패턴의 앞 `i+1` 글자 중, 접두사이면서 동시에 접미사인 가장 긴 것의 길이'예요. 어긋났을 때 이 길이만큼은 이미 맞춰져 있다는 뜻이므로, 패턴 포인터를 0이 아니라 `fail[j-1]` 로 되돌리면 돼요.",
    },
    {
      kind: "text",
      body: "직관을 먼저 잡아 볼게요. 본문에서 패턴을 맞춰 나가다 중간에 어긋났다고 해봐요. 순진하게 하면 본문을 한 칸 옆으로 밀고 처음부터 다시 비교하는데, 그건 이미 확인한 글자를 또 보는 낭비예요. **KMP는 처음부터 다시 안 봐요.** 대신 '지금까지 맞춘 부분 중에서, 앞부분(접두사)과 뒷부분(접미사)이 겹치는 만큼은 이미 맞춰진 셈'이라 그 길이만큼만 건너뛰고 이어서 비교해요. 그 '건너뛸 길이'를 미리 계산한 표가 실패 함수예요.",
    },
    {
      kind: "heading",
      body: "직접 채워 보기: 실패 함수",
    },
    {
      kind: "text",
      body: "패턴 `ababc` 의 실패 함수를 한 칸씩 채워 볼게요. `fail[i]` 는 '앞 `i+1` 글자에서 접두사이면서 동시에 접미사인 가장 긴 조각의 길이'예요. `j` 는 '지금까지 이어 맞춘 접두사의 길이'를 들고 다니는 포인터예요. `pattern[i]` 와 `pattern[j]` 가 같으면 `j` 를 하나 늘려 `fail[i]` 에 적고, 다르면 `j` 를 `fail[j-1]` 로 되돌려 더 짧은 겹침을 시도해요.",
    },
    {
      kind: "trace",
      caption: "패턴 ababc — fail 배열을 왼쪽부터 채우는 과정 (i는 1부터)",
      lines: [
        "index   0   1   2   3   4",
        "char    a   b   a   b   c",
        "fail    0   .   .   .   .     ← fail[0]은 언제나 0",
        "",
        "i=1  char b  vs pattern[j=0] a   다름 → fail[1] = 0,  j 그대로 0",
        "i=2  char a  vs pattern[j=0] a   같음 → j=1, fail[2] = 1",
        "i=3  char b  vs pattern[j=1] b   같음 → j=2, fail[3] = 2",
        "i=4  char c  vs pattern[j=2] a   다름 → j = fail[1] = 0",
        "     char c  vs pattern[j=0] a   또 다름 → fail[4] = 0",
        "",
        "index   0   1   2   3   4",
        "char    a   b   a   b   c",
        "fail    0   0   1   2   0     → 완성",
      ],
    },
    {
      kind: "text",
      body: "`fail[3] = 2` 의 뜻을 읽어 볼게요. 앞 4글자 `abab` 에서 접두사이자 접미사인 가장 긴 조각은 `ab` (길이 2)예요. 그래서 본문에서 `abab` 까지 맞추다 다음 글자가 어긋나면, 앞의 `ab` 는 그대로 맞춰져 있는 셈이라 `j` 를 0이 아니라 2에서 다시 이어 가요. 이게 '처음부터 다시 안 본다'의 정체예요.",
    },
    {
      kind: "trap",
      title: "j를 0으로 되돌리지 말고 `fail[j-1]` 로 되돌려요",
      body: "어긋났을 때 습관적으로 `j = 0` 으로 초기화하면 KMP가 아니라 그냥 순진한 비교로 돌아가요. 반드시 `j = fail[j - 1]` 로 한 단계씩 줄여야 이미 맞춰둔 접두사를 살릴 수 있어요. 또 `fail` 배열은 인덱스가 0부터라 `fail[j-1]` 이지 `fail[j]` 가 아니에요. 이 오프바이원(off-by-one)이 초심자가 가장 자주 틀리는 곳이에요.",
    },
    {
      kind: "heading",
      body: "팰린드롬 — 매내처",
    },
    {
      kind: "text",
      body: "가장 긴 팰린드롬 부분 문자열은 각 위치를 중심으로 양옆으로 넓혀 보면 `O(n²)`에 풀려요. 대부분의 문제는 이걸로 통과해요. **매내처(Manacher)** 는 같은 답을 `O(n)`에 구해요 — 이미 구한 팰린드롬 안쪽은 대칭이므로, 그 대칭성으로 반대편의 결과를 재사용해 중복 확장을 건너뛰어요.",
    },
    {
      kind: "text",
      body: "구현의 첫 관문은 홀짝이에요. `aba` 는 중심이 글자이고 `abba` 는 중심이 글자 사이라 처리가 갈려요. 문자 사이사이에 `#` 을 끼워 `#a#b#b#a#` 로 만들면 길이가 항상 홀수가 되어 경우가 하나로 합쳐져요. 이 변환 뒤 반지름 배열 `p[i]` 의 최댓값이 곧 원래 문자열에서의 팰린드롬 길이예요.",
    },
    {
      kind: "text",
      body: "매내처는 코딩 테스트에서 자주 나오지는 않아요. 다만 '이미 계산한 대칭 구조를 재사용한다'는 발상은 값어치가 있고, 중심 확장 `O(n²)` 이 시간 초과가 나는 제한(`n ≥ 10만`)에서는 이것 말고 선택지가 없어요.",
    },
  ],
  patterns: [
    {
      title: "트리 DP — 최대 독립 집합",
      note: "dp[v][1]은 v를 고른 경우. 자식은 반드시 고르지 않은 값을 더해요.",
      code: {
        javascript: `// adj: 양방향 인접 리스트, weight: 정점 가중치
const dp = Array.from({ length: n }, () => [0, 0]);

function dfs(v, parent) {
  dp[v][0] = 0;
  dp[v][1] = weight[v];
  for (const next of adj[v]) {
    if (next === parent) continue;
    dfs(next, v);
    dp[v][0] += Math.max(dp[next][0], dp[next][1]);
    dp[v][1] += dp[next][0];
  }
}

dfs(0, -1);
const answer = Math.max(dp[0][0], dp[0][1]);`,
        python: `import sys
sys.setrecursionlimit(300000)

dp = [[0, 0] for _ in range(n)]

def dfs(v, parent):
    dp[v][0] = 0
    dp[v][1] = weight[v]
    for nxt in adj[v]:
        if nxt == parent:
            continue
        dfs(nxt, v)
        dp[v][0] += max(dp[nxt][0], dp[nxt][1])
        dp[v][1] += dp[nxt][0]

dfs(0, -1)
answer = max(dp[0][0], dp[0][1])`,
      },
    },
    {
      title: "트리의 지름",
      note: "각 정점에서 내려가는 가장 깊은 두 갈래를 더한 값이 그 정점을 지나는 최장 경로예요.",
      code: {
        javascript: `let best = 0;

function depth(v, parent) {
  let first = 0;
  let second = 0;          // 가장 깊은 둘
  for (const next of adj[v]) {
    if (next === parent) continue;
    const d = depth(next, v) + 1;
    if (d > first) [first, second] = [d, first];
    else if (d > second) second = d;
  }
  best = Math.max(best, first + second);
  return first;
}

depth(0, -1);`,
        python: `best = 0

def depth(v, parent):
    global best
    first = second = 0          # 가장 깊은 둘
    for nxt in adj[v]:
        if nxt == parent:
            continue
        d = depth(nxt, v) + 1
        if d > first:
            first, second = d, first
        elif d > second:
            second = d
    best = max(best, first + second)
    return first

depth(0, -1)`,
      },
    },
    {
      title: "KMP — 실패 함수와 검색",
      note: "본문 포인터 i는 절대 되돌아가지 않아요. 그래서 O(n+m)이에요.",
      code: {
        javascript: `function buildFail(pattern) {
  const fail = new Array(pattern.length).fill(0);
  let j = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = fail[j - 1];
    if (pattern[i] === pattern[j]) fail[i] = ++j;
  }
  return fail;
}

function search(text, pattern) {
  const fail = buildFail(pattern);
  const found = [];
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = fail[j - 1];
    if (text[i] === pattern[j]) {
      if (++j === pattern.length) {
        found.push(i - j + 1);
        j = fail[j - 1];
      }
    }
  }
  return found;
}`,
        python: `def build_fail(pattern):
    fail = [0] * len(pattern)
    j = 0
    for i in range(1, len(pattern)):
        while j > 0 and pattern[i] != pattern[j]:
            j = fail[j - 1]
        if pattern[i] == pattern[j]:
            j += 1
            fail[i] = j
    return fail


def search(text, pattern):
    fail = build_fail(pattern)
    found = []
    j = 0
    for i, ch in enumerate(text):
        while j > 0 and ch != pattern[j]:
            j = fail[j - 1]
        if ch == pattern[j]:
            j += 1
            if j == len(pattern):
                found.append(i - j + 1)
                j = fail[j - 1]
    return found`,
      },
    },
    {
      title: "매내처 — 가장 긴 팰린드롬",
      note: "`#`을 끼워 길이를 홀수로 통일해요. p[i]가 곧 원래 문자열에서의 팰린드롬 길이예요.",
      code: {
        javascript: `function longestPalindrome(s) {
  const t = "#" + [...s].join("#") + "#";
  const p = new Array(t.length).fill(0);
  let center = 0;
  let right = 0;             // 현재 가장 오른쪽까지 뻗은 팰린드롬

  for (let i = 0; i < t.length; i++) {
    if (i < right) p[i] = Math.min(right - i, p[2 * center - i]);
    while (
      i - p[i] - 1 >= 0 &&
      i + p[i] + 1 < t.length &&
      t[i - p[i] - 1] === t[i + p[i] + 1]
    ) {
      p[i]++;
    }
    if (i + p[i] > right) [center, right] = [i, i + p[i]];
  }

  let best = 0;
  let at = 0;
  for (let i = 0; i < p.length; i++) {
    if (p[i] > best) [best, at] = [p[i], i];
  }
  const start = (at - best) / 2;
  return s.slice(start, start + best);
}`,
        python: `def longest_palindrome(s):
    t = "#" + "#".join(s) + "#"
    p = [0] * len(t)
    center = right = 0        # 현재 가장 오른쪽까지 뻗은 팰린드롬

    for i in range(len(t)):
        if i < right:
            p[i] = min(right - i, p[2 * center - i])
        while (
            i - p[i] - 1 >= 0
            and i + p[i] + 1 < len(t)
            and t[i - p[i] - 1] == t[i + p[i] + 1]
        ):
            p[i] += 1
        if i + p[i] > right:
            center, right = i, i + p[i]

    best = max(p)
    at = p.index(best)
    start = (at - best) // 2
    return s[start:start + best]`,
      },
    },
  ],
  problems: [
    {
      slug: "subtree-sizes",
      title: "서브트리의 크기",
      role: "워밍업",
      teaches: "자식의 답을 모아 부모의 답을 만드는 순서",
    },
    {
      slug: "tree-diameter",
      title: "트리의 지름",
      role: "핵심",
      teaches: "각 정점에서 가장 깊은 두 갈래를 합치기",
    },
    {
      slug: "kmp-search",
      title: "부분 문자열 찾기 (KMP)",
      role: "핵심",
      teaches: "실패 함수와 되돌아가지 않는 비교",
    },
    {
      slug: "longest-palindrome",
      title: "가장 긴 팰린드롬 부분 문자열",
      role: "도전",
      teaches: "중심 확장에서 매내처로 — 대칭성 재사용",
    },
  ],
  selfCheck: [
    "트리 DP를 후위 순회 순서로 채우는 이유는 무엇인가요?",
    "`dp[v][1]` 을 쓸 때 자식에서 `dp[child][0]` 만 더하는 이유는 무엇인가요?",
    "KMP의 실패 함수 `fail[i]` 는 정확히 무엇을 담고 있나요?",
    "KMP에서 글자가 어긋났을 때 `j` 를 `0` 이 아니라 `fail[j-1]` 로 되돌리는 이유는 무엇인가요?",
  ],
};
