import type { Week } from "@/lib/curriculum/types";

export const w19: Week = {
  week: 19,
  phase: 4,
  title: "힙과 우선순위 큐",
  summary: "항상 가장 작은 것만 빠르게 꺼내는 자료구조.",
  concept: [
    {
      kind: "text",
      body: "정렬은 전체 순서를 만듭니다. 그런데 많은 문제에서 필요한 건 '지금 가장 작은 것 하나'뿐입니다. 힙은 전체를 정렬하지 않고 최솟값만 `O(log n)`에 꺼내주는 자료구조입니다.",
    },
    {
      kind: "text",
      body: "구조는 완전 이진 트리인데, 배열 하나로 표현합니다. 인덱스 `i`의 부모는 `(i-1)/2`, 자식은 `2i+1`과 `2i+2`입니다. 지켜야 할 규칙은 하나뿐 — **모든 노드가 자기 자식보다 작다**. 형제끼리의 순서는 상관없습니다. 그래서 완전 정렬보다 유지 비용이 쌉니다.",
    },
    {
      kind: "table",
      headers: ["연산", "복잡도", "동작"],
      rows: [
        ["넣기 (push)", "`O(log n)`", "맨 뒤에 넣고 부모보다 작은 동안 위로 올림"],
        ["꺼내기 (pop)", "`O(log n)`", "뿌리를 빼고 마지막 원소를 올린 뒤 아래로 내림"],
        ["최솟값 보기 (peek)", "`O(1)`", "뿌리를 그냥 읽음"],
        ["배열로 힙 만들기", "`O(n)`", "아래에서부터 내리기 — 하나씩 넣는 것보다 빠름"],
      ],
    },
    {
      kind: "heading",
      body: "언어별 사정",
    },
    {
      kind: "text",
      body: "파이썬은 `heapq`가 표준 라이브러리에 있습니다. **최소 힙만** 제공하므로 최대 힙이 필요하면 값에 마이너스를 붙여 넣고 꺼낼 때 다시 뒤집습니다.",
    },
    {
      kind: "trap",
      title: "JavaScript에는 내장 힙이 없습니다",
      body: "직접 만들어야 합니다. 이번 주 첫 문제가 그것이고, 그 이후 문제부터는 스타터에 만들어진 힙이 딸려옵니다. 실전에서도 자기 스니펫을 붙여넣는 것이 정상이니, 한 번 제대로 만들어두고 그다음부터는 가져다 쓰세요.",
    },
    {
      kind: "trap",
      title: "짝을 넣을 때 비교 기준을 주지 않으면 조용히 틀립니다",
      body: "JavaScript에서 배열끼리 `<`로 비교하면 문자열로 바뀌어 사전순이 됩니다. `[10, x]`가 `[9, x]`보다 앞선다고 판단합니다. 다익스트라처럼 `[거리, 노드]`를 담을 때 반드시 비교자를 넘기세요. 파이썬은 튜플을 앞에서부터 비교하므로 자연스럽게 동작하지만, 두 번째 원소가 비교 불가능한 객체면 에러가 납니다.",
    },
    {
      kind: "heading",
      body: "힙이 답인 문제들",
    },
    {
      kind: "list",
      items: [
        "**상위 K개** — 크기 K인 힙을 유지하며 넘치면 최솟값을 버립니다. `O(n log k)`",
        "**여러 정렬 목록 병합** — 각 목록의 맨 앞만 힙에 넣고 하나씩 꺼냅니다",
        "**스케줄링** — 가장 빨리 끝나는 작업을 반복해서 꺼냅니다 (15주차 그리디와 결합)",
        "**중앙값 스트림** — 최대 힙과 최소 힙을 반씩 유지합니다",
        "**최단 경로** — 가장 가까운 정점을 꺼내는 다익스트라 (20주차)",
      ],
    },
    {
      kind: "text",
      body: "상위 K개에서 힙을 쓰는 이유를 짚어두세요. 전체 정렬은 `O(n log n)`인데 힙은 `O(n log k)`입니다. n이 100만이고 k가 10이면 큰 차이입니다. 다만 k가 n에 가까우면 그냥 정렬하는 편이 낫습니다.",
    },
  ],
  patterns: [
    {
      title: "파이썬 heapq와 최대 힙 흉내",
      code: {
        javascript: `// JavaScript는 MinHeap 클래스를 직접 씁니다.
const heap = new MinHeap();
heap.push(5);
const smallest = heap.pop();

// 최대 힙이 필요하면 비교자를 뒤집습니다.
const maxHeap = new MinHeap((a, b) => b - a);`,
        python: `import heapq

heap = []
heapq.heappush(heap, 5)
smallest = heapq.heappop(heap)

# 최대 힙은 부호를 뒤집어 넣고 꺼낼 때 되돌립니다.
heapq.heappush(heap, -value)
largest = -heapq.heappop(heap)`,
      },
    },
    {
      title: "상위 K개 유지하기",
      note: "힙 크기를 K로 고정하면 O(n log k)입니다.",
      code: {
        javascript: `const heap = new MinHeap();
for (const x of nums) {
  heap.push(x);
  if (heap.size > k) heap.pop();   // 가장 작은 것을 버림
}`,
        python: `import heapq

heap = []
for x in nums:
    heapq.heappush(heap, x)
    if len(heap) > k:
        heapq.heappop(heap)   # 가장 작은 것을 버림`,
      },
    },
    {
      title: "짝을 담을 때는 비교 기준을 명시",
      code: {
        javascript: `// [거리, 노드] — 거리 기준 최소 힙
const heap = new MinHeap((a, b) => a[0] - b[0]);
heap.push([0, start]);`,
        python: `# 튜플은 앞에서부터 비교되므로 그대로 동작합니다
heap = [(0, start)]
heapq.heappush(heap, (dist, node))`,
      },
    },
  ],
  problems: [
    {
      slug: "min-heap",
      title: "최소 힙 직접 구현",
      role: "워밍업",
      teaches: "sift up과 sift down을 손으로 만들기",
    },
    {
      slug: "top-k-frequent",
      title: "가장 많이 등장한 K개 원소",
      role: "핵심",
      teaches: "정렬 대신 크기 K 힙 유지하기",
    },
    {
      title: "K개 정렬 리스트 병합",
      role: "핵심",
      teaches: "힙으로 여러 스트림을 동시에 다루기",
    },
    {
      title: "스트림 중앙값",
      role: "도전",
      teaches: "두 개의 힙으로 절반씩 나눠 유지하기",
    },
  ],
  selfCheck: [
    "힙이 완전 정렬보다 싼 이유를 '지켜야 할 규칙'으로 설명할 수 있는가?",
    "상위 K개를 구할 때 정렬 대신 힙을 쓰면 무엇이 좋아지는가? 반대로 언제 정렬이 나은가?",
    "JavaScript 힙에 `[거리, 노드]`를 그냥 넣으면 무슨 일이 일어나는가?",
  ],
};
