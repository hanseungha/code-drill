import type { Week } from "@/lib/curriculum/types";

export const w20: Week = {
  week: 20,
  phase: 4,
  title: "DP 심화 (2차원)",
  summary: "상태에 축을 하나 더해요. 배낭, LCS, 편집 거리.",
  concept: [
    {
      kind: "text",
      body: "19주차에서 `dp`는 한 줄짜리 표였어요. 이번엔 **표가 격자로 커져요.** 어렵게 볼 것 없어요. 여전히 **한 칸씩 채우는데, 각 칸의 답이 바로 위 칸과 왼쪽 칸(때로는 왼쪽 위 대각선)에서 나온다**는 것뿐이에요. 이웃 칸들이 먼저 채워져 있으면, 지금 칸은 그 값들을 더하거나 그중 최댓값을 고르기만 하면 돼요. 스도쿠를 풀듯 왼쪽 위부터 한 칸씩 채워 나가면, 오른쪽 아래 마지막 칸에 답이 적혀요.",
    },
    {
      kind: "text",
      body: "1차원 DP로 표현되지 않는 문제가 있어요. '몇 번째 물건까지 봤는가'만으로는 부족하고 '가방에 남은 용량이 얼마인가'를 함께 알아야 하는 경우예요. 이럴 때 상태에 축을 하나 더해 `dp[i][w]`로 만들어요.",
    },
    {
      kind: "text",
      body: "축이 늘어도 절차는 그대로예요. 상태를 정의하고, 전이를 쓰고, 초기값을 채우고, 순서를 정해요. 다만 상태를 정의할 때 **두 축이 각각 무엇을 뜻하는지** 분명히 적어야 해요.",
    },
    {
      kind: "heading",
      body: "0-1 배낭",
    },
    {
      kind: "text",
      body: "물건마다 무게와 가치가 있고 가방 용량이 정해져 있어요. 각 물건은 넣거나 안 넣거나 둘 중 하나예요(그래서 0-1). `dp[i][w]`를 'i번째 물건까지 고려했고 용량이 w일 때의 최대 가치'로 두면, 전이는 넣는 경우와 안 넣는 경우의 최댓값이에요.",
    },
    {
      kind: "table",
      headers: ["종류", "각 물건 사용", "내부 루프 방향", "구분"],
      rows: [
        ["0-1 배낭", "최대 한 번", "용량을 **내림차순**", "같은 물건 재사용 방지"],
        ["무한 배낭", "제한 없음", "용량을 **오름차순**", "재사용 허용"],
      ],
    },
    {
      kind: "trap",
      title: "1차원으로 줄일 때 루프 방향을 틀리면 조용히 다른 문제가 돼요",
      body: "공간을 아끼려고 `dp[w]` 한 줄로 줄일 때, 0-1 배낭은 용량을 큰 쪽부터 내려와야 해요. 오름차순으로 돌면 방금 갱신한 값을 다시 써서 같은 물건을 여러 번 넣게 돼요 — 그건 무한 배낭이에요. 에러가 없고 답만 달라서 알아채기 어려워요.",
    },
    {
      kind: "heading",
      body: "두 문자열을 나란히 놓는 DP",
    },
    {
      kind: "text",
      body: "LCS(최장 공통 부분 수열)와 편집 거리는 구조가 같아요. `dp[i][j]`를 '첫 문자열의 앞 i글자와 둘째 문자열의 앞 j글자를 봤을 때의 답'으로 두고, 두 글자가 같은지에 따라 전이가 갈려요.",
    },
    {
      kind: "list",
      items: [
        "**LCS** — 같으면 `dp[i-1][j-1] + 1`, 다르면 `max(dp[i-1][j], dp[i][j-1])`",
        "**편집 거리** — 같으면 `dp[i-1][j-1]`, 다르면 삽입·삭제·교체 세 방향의 최솟값 + 1",
      ],
    },
    {
      kind: "text",
      body: "편집 거리의 세 방향이 각각 무슨 연산인지 짚어두면 외울 필요가 없어요. `dp[i][j-1]`에서 오면 삽입, `dp[i-1][j]`에서 오면 삭제, `dp[i-1][j-1]`에서 오면 교체예요.",
    },
    {
      kind: "heading",
      body: "롤링 배열",
    },
    {
      kind: "text",
      body: "전이가 바로 이전 행만 쓴다면 표 전체를 들고 있을 필요가 없어요. 두 행만 번갈아 쓰거나, 방향을 잘 잡으면 한 행으로도 돼요. 메모리가 `O(n × m)`에서 `O(m)`으로 줄어들어요. 다만 **경로를 복원해야 한다면 표 전체가 필요해요**.",
    },
    {
      kind: "heading",
      body: "직접 채워 보기: 격자 경로의 수",
    },
    {
      kind: "text",
      body: "3×3 격자의 왼쪽 위에서 오른쪽 아래로 가는데, 오른쪽이나 아래로만 갈 수 있어요. 경로가 몇 가지인지 표를 채워 볼게요. `dp[i][j]`는 '(i, j)칸에 도달하는 경로 수'예요. 그 칸엔 **바로 위**(한 칸 아래로)나 **바로 왼쪽**(한 칸 오른쪽으로)에서만 들어오니까 `dp[i][j] = dp[i-1][j] + dp[i][j-1]`이에요. **첫 행과 첫 열**은 한 줄로만 갈 수 있어 전부 1로 시작해요. 나머지 칸은 위와 왼쪽을 더하기만 하면 돼요.",
    },
    {
      kind: "trace",
      caption: "3x3 격자 — 위+왼쪽으로 한 칸씩 채우기",
      lines: [
        "첫 행·첫 열은 전부 1 (한 줄로만 도달)",
        "",
        "      j=0 j=1 j=2",
        "i=0    1   1   1",
        "i=1    1   .   .",
        "i=2    1   .   .",
        "",
        "dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2",
        "dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3",
        "dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3",
        "dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6",
        "",
        "      j=0 j=1 j=2",
        "i=0    1   1   1",
        "i=1    1   2   3",
        "i=2    1   3   6     -> 답 dp[2][2] = 6",
      ],
    },
    {
      kind: "text",
      body: "채우는 순서를 보면 각 칸을 구할 때 위 칸과 왼쪽 칸이 **이미 채워져 있어요.** 그래서 위에서 아래로, 왼쪽에서 오른쪽으로 훑는 2중 반복문이면 순서가 저절로 맞아요. 이게 2차원 DP의 뼈대예요 — 축이 둘로 늘었을 뿐, 19주차와 똑같이 상태·전이·초기값·순서를 정하는 거예요.",
    },
    {
      kind: "trap",
      title: "2차원 배열을 `fill`로 잘못 만들면 모든 행이 한 몸이 돼요",
      body: "자바스크립트에서 `new Array(n).fill(new Array(m).fill(0))`으로 만들면, 안쪽 배열 **하나**를 모든 행이 공유해요. `dp[1][2]`를 바꿨는데 `dp[0][2]`까지 같이 바뀌어 답이 엉켜요. `Array.from({ length: n }, () => new Array(m).fill(0))`처럼 행마다 새 배열을 만들어야 해요.",
    },
  ],
  patterns: [
    {
      title: "0-1 배낭 (1차원으로 압축)",
      note: "용량 루프가 내림차순인 게 0-1을 보장해요.",
      code: {
        javascript: `const dp = new Array(capacity + 1).fill(0);
for (let i = 0; i < n; i++) {
  for (let w = capacity; w >= weight[i]; w--) {
    dp[w] = Math.max(dp[w], dp[w - weight[i]] + value[i]);
  }
}
return dp[capacity];`,
        python: `dp = [0] * (capacity + 1)
for i in range(n):
    for w in range(capacity, weight[i] - 1, -1):
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i])
return dp[capacity]`,
      },
    },
    {
      title: "최장 공통 부분 수열",
      code: {
        javascript: `const dp = Array.from({ length: a.length + 1 }, () =>
  new Array(b.length + 1).fill(0),
);
for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    dp[i][j] = a[i - 1] === b[j - 1]
      ? dp[i - 1][j - 1] + 1
      : Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}`,
        python: `dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
for i in range(1, len(a) + 1):
    for j in range(1, len(b) + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`,
      },
    },
    {
      title: "편집 거리",
      note: "초기값은 '빈 문자열로 만들려면 전부 지워야 한다'예요.",
      code: {
        javascript: `for (let i = 0; i <= a.length; i++) dp[i][0] = i;
for (let j = 0; j <= b.length; j++) dp[0][j] = j;
for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    dp[i][j] = a[i - 1] === b[j - 1]
      ? dp[i - 1][j - 1]
      : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  }
}`,
        python: `for i in range(len(a) + 1):
    dp[i][0] = i
for j in range(len(b) + 1):
    dp[0][j] = j
for i in range(1, len(a) + 1):
    for j in range(1, len(b) + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1]
        else:
            dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])`,
      },
    },
  ],
  problems: [
    {
      slug: "unique-paths",
      title: "격자 경로의 수",
      role: "워밍업",
      teaches: "2차원 DP의 가장 단순한 형태",
    },
    {
      slug: "knapsack",
      title: "0-1 배낭",
      role: "핵심",
      teaches: "용량을 상태 축으로 두기",
    },
    {
      slug: "lcs-length",
      title: "최장 공통 부분 수열",
      role: "핵심",
      teaches: "두 문자열을 나란히 놓는 DP",
    },
    {
      slug: "edit-distance",
      title: "편집 거리",
      role: "도전",
      teaches: "세 방향 전이와 그 의미",
    },
  ],
  selfCheck: [
    "격자 경로 DP에서 첫 행과 첫 열을 왜 전부 1로 두나요?",
    "0-1 배낭을 1차원으로 줄일 때 용량 루프를 오름차순으로 돌면 어떤 문제가 되나요?",
    "편집 거리의 세 전이가 각각 어떤 연산에 대응하나요?",
    "롤링 배열을 쓸 수 없는 경우는 언제인가요?",
  ],
};
