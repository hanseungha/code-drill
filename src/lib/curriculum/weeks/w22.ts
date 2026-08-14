import type { Week } from "@/lib/curriculum/types";

export const w22: Week = {
  week: 22,
  phase: 4,
  title: "유니온 파인드와 MST",
  summary: "'이 둘이 같은 무리인가'를 거의 상수 시간에 답합니다.",
  concept: [
    {
      kind: "text",
      body: "15주차에서 연결 요소를 DFS로 셌습니다. 그런데 간선이 하나씩 추가되는 상황이라면 매번 DFS를 다시 돌려야 합니다. 유니온 파인드는 **합치기와 같은 무리인지 확인하기**를 각각 거의 `O(1)`에 처리합니다.",
    },
    {
      kind: "text",
      body: "아이디어는 각 무리마다 대표 하나를 정해두는 것입니다. `find(x)`는 x가 속한 무리의 대표를 찾고, `union(a, b)`는 두 무리의 대표를 하나로 합칩니다. 같은 무리인지는 대표가 같은지로 판정합니다.",
    },
    {
      kind: "heading",
      body: "두 가지 최적화",
    },
    {
      kind: "text",
      body: "순진하게 구현하면 트리가 한 줄로 길어져 `find`가 `O(n)`이 됩니다. 두 가지를 함께 쓰면 사실상 상수 시간이 됩니다.",
    },
    {
      kind: "list",
      items: [
        "**경로 압축** — `find` 하는 김에 지나온 노드를 전부 대표에 직접 붙입니다. 다음부터 한 번에 도달합니다",
        "**union by rank/size** — 합칠 때 작은 무리를 큰 무리 밑에 붙입니다. 트리가 깊어지지 않습니다",
      ],
    },
    {
      kind: "trap",
      title: "경로 압축 없이 쓰면 최악에 O(n)입니다",
      body: "`union(0,1), union(1,2), union(2,3)...` 처럼 이어 붙이면 한 줄짜리 트리가 만들어집니다. `find`가 매번 끝까지 내려가야 해서 전체가 `O(n²)`이 됩니다. 경로 압축은 두 줄이면 되니 항상 넣으세요.",
    },
    {
      kind: "heading",
      body: "사이클 판정",
    },
    {
      kind: "text",
      body: "간선 `(a, b)`를 추가하려는데 a와 b가 **이미 같은 무리**라면, 그 간선은 사이클을 만듭니다. 이 판정이 다음에 나올 크루스칼의 핵심 부품입니다.",
    },
    {
      kind: "heading",
      body: "최소 신장 트리 (MST)",
    },
    {
      kind: "text",
      body: "모든 정점을 연결하되 간선 비용의 합이 최소가 되게 고른 것을 최소 신장 트리라 합니다. 정점이 V개면 간선은 정확히 V-1개이고 사이클이 없습니다. '모든 도시를 잇는 최소 비용 도로망' 같은 문제가 이것입니다.",
    },
    {
      kind: "text",
      body: "크루스칼은 그리디입니다(9주차). 간선을 비용 오름차순으로 정렬해놓고 싼 것부터 집되, 사이클을 만드는 간선만 건너뜁니다. 유니온 파인드가 바로 그 사이클 판정을 담당합니다.",
    },
    {
      kind: "table",
      headers: ["단계", "도구", "복잡도"],
      rows: [
        ["간선 정렬", "정렬 (7주차)", "`O(E log E)`"],
        ["사이클 판정", "유니온 파인드", "거의 `O(1)`"],
        ["전체", "크루스칼", "`O(E log E)`"],
      ],
    },
    {
      kind: "text",
      body: "간선을 V-1개 고르는 순간 멈춰도 됩니다. 그리디가 여기서 통하는 이유는 '가장 싼 간선은 항상 어떤 MST에 포함된다'는 성질 때문입니다.",
    },
    {
      kind: "heading",
      body: "프림",
    },
    {
      kind: "text",
      body: "같은 MST를 다른 방향에서 만듭니다. 크루스칼이 **간선을 싼 것부터** 집었다면, 프림은 **정점을 하나씩 키웁니다.** 시작 정점 하나를 무리에 넣고, 무리 밖으로 나가는 간선 중 가장 싼 것을 골라 그 끝 정점을 무리에 넣기를 V-1번 반복합니다.",
    },
    {
      kind: "text",
      body: "구조가 다익스트라와 거의 같습니다 — 힙에서 가장 싼 것을 꺼내고, 이미 무리에 든 정점이면 건너뜁니다. 다른 점은 하나뿐입니다. 다익스트라는 힙에 **시작점부터의 누적 거리**를 넣고, 프림은 **간선 하나의 비용**만 넣습니다.",
    },
    {
      kind: "table",
      headers: ["", "크루스칼", "프림"],
      rows: [
        ["키우는 대상", "간선 집합", "정점 무리 하나"],
        ["필요한 도구", "정렬 + 유니온 파인드", "힙"],
        ["복잡도", "`O(E log E)`", "`O(E log V)`"],
        ["유리한 그래프", "간선이 적을 때 (희소)", "간선이 많을 때 (밀집)"],
      ],
    },
    {
      kind: "text",
      body: "코딩 테스트에서는 크루스칼 하나로 대부분 통과합니다. 다만 간선 목록이 아니라 **인접 행렬로 주어지는 밀집 그래프**(모든 도시 쌍의 거리가 전부 주어지는 문제)에서는 간선이 `V²`개라 정렬 비용이 부담스럽고, 그때 프림이 자연스럽습니다.",
    },
  ],
  patterns: [
    {
      title: "유니온 파인드 (경로 압축 + union by size)",
      code: {
        javascript: `const parent = Array.from({ length: n }, (_, i) => i);
const size = new Array(n).fill(1);

function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];   // 경로 압축
    x = parent[x];
  }
  return x;
}

function union(a, b) {
  let ra = find(a);
  let rb = find(b);
  if (ra === rb) return false;       // 이미 같은 무리 = 사이클
  if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
  parent[rb] = ra;
  size[ra] += size[rb];
  return true;
}`,
        python: `parent = list(range(n))
size = [1] * n

def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]   # 경로 압축
        x = parent[x]
    return x

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb:                        # 이미 같은 무리 = 사이클
        return False
    if size[ra] < size[rb]:
        ra, rb = rb, ra
    parent[rb] = ra
    size[ra] += size[rb]
    return True`,
      },
    },
    {
      title: "크루스칼 MST",
      note: "union이 false를 돌려주면 그 간선은 사이클을 만든다는 뜻이라 건너뜁니다.",
      code: {
        javascript: `edges.sort((a, b) => a[2] - b[2]);
let total = 0;
let used = 0;
for (const [a, b, cost] of edges) {
  if (union(a, b)) {
    total += cost;
    if (++used === n - 1) break;
  }
}`,
        python: `edges.sort(key=lambda e: e[2])
total = used = 0
for a, b, cost in edges:
    if union(a, b):
        total += cost
        used += 1
        if used == n - 1:
            break`,
      },
    },
    {
      title: "프림 MST",
      note: "다익스트라와 뼈대가 같습니다. 힙에 넣는 값이 누적 거리가 아니라 간선 비용입니다.",
      code: {
        javascript: `const inTree = new Array(n).fill(false);
const heap = new MinHeap((a, b) => a[0] - b[0]);
heap.push([0, 0]);                    // [비용, 정점]
let total = 0;
let used = 0;

while (heap.size > 0 && used < n) {
  const [cost, v] = heap.pop();
  if (inTree[v]) continue;            // 이미 무리에 든 정점
  inTree[v] = true;
  total += cost;
  used++;
  for (const [next, w] of graph[v]) {
    if (!inTree[next]) heap.push([w, next]);
  }
}`,
        python: `import heapq

in_tree = [False] * n
heap = [(0, 0)]                       # (비용, 정점)
total = used = 0

while heap and used < n:
    cost, v = heapq.heappop(heap)
    if in_tree[v]:                    # 이미 무리에 든 정점
        continue
    in_tree[v] = True
    total += cost
    used += 1
    for nxt, w in graph[v]:
        if not in_tree[nxt]:
            heapq.heappush(heap, (w, nxt))`,
      },
    },
  ],
  problems: [
    {
      title: "유니온 파인드 구현",
      role: "워밍업",
      teaches: "find와 union, 그리고 두 가지 최적화",
    },
    {
      title: "그래프 사이클 판정",
      role: "핵심",
      teaches: "합치기 전에 같은 무리인지 확인하기",
    },
    {
      title: "크루스칼 MST",
      role: "핵심",
      teaches: "정렬 + 유니온 파인드의 결합",
    },
    {
      title: "도시 연결하기 (프림)",
      role: "도전",
      teaches: "밀집 그래프에서 정점을 키우는 방식",
    },
  ],
  selfCheck: [
    "경로 압축을 빼면 어떤 입력에서 O(n²)가 되는가?",
    "유니온 파인드로 사이클을 판정하는 원리는?",
    "크루스칼이 그리디로 정당한 이유를 한 문장으로 말할 수 있는가?",
    "프림의 힙에 넣는 값이 다익스트라와 어떻게 다른가?",
  ],
};
