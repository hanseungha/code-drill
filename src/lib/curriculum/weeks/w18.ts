import type { Week } from "@/lib/curriculum/types";

export const w18: Week = {
  week: 18,
  phase: 3,
  title: "힙과 우선순위 큐",
  summary: "항상 가장 작은 것만 빠르게 꺼내는 자료구조.",
  concept: [
    {
      kind: "text",
      body: "힙(우선순위 큐)은 **응급실 접수대**를 떠올리면 쉬워요. 먼저 온 순서대로 부르는 게 아니라, 언제나 **가장 급한 환자를 먼저** 불러요. 새 환자가 와도 대기실 전체를 다시 줄 세우지 않고, 그저 가장 급한 사람만 늘 맨 앞에 있게 유지해요. 힙이 하는 일이 딱 이거예요 — 전체를 정렬하지 않고, '지금 가장 급한 것 하나'만 빠르게 꺼내줘요.",
    },
    {
      kind: "text",
      body: "정렬은 전체 순서를 만들어요. 그런데 많은 문제에서 필요한 건 '지금 가장 작은 것 하나'뿐이에요. 힙은 전체를 정렬하지 않고 최솟값만 `O(log n)`에 꺼내주는 자료구조예요.",
    },
    {
      kind: "text",
      body: "구조는 완전 이진 트리인데, 배열 하나로 표현해요. 인덱스 `i`의 부모는 `(i-1)/2`, 자식은 `2i+1`과 `2i+2`예요. 지켜야 할 규칙은 하나뿐 — **모든 노드가 자기 자식보다 작다**. 형제끼리의 순서는 상관없어요. 그래서 완전 정렬보다 유지 비용이 싸요.",
    },
    {
      kind: "table",
      headers: ["연산", "복잡도", "동작"],
      rows: [
        ["넣기 (push)", "`O(log n)`", "맨 뒤에 넣고 부모보다 작은 동안 위로 올려요"],
        ["꺼내기 (pop)", "`O(log n)`", "뿌리를 빼고 마지막 원소를 올린 뒤 아래로 내려요"],
        ["최솟값 보기 (peek)", "`O(1)`", "뿌리를 그냥 읽어요"],
        ["배열로 힙 만들기", "`O(n)`", "아래에서부터 내려요 — 하나씩 넣는 것보다 빨라요"],
      ],
    },
    {
      kind: "heading",
      body: "직접 따라가 보기: 최소 힙에 넣고 빼기",
    },
    {
      kind: "text",
      body: "빈 최소 힙에 `5, 3, 8, 1`을 차례로 넣어 볼게요. 힙은 배열 하나로 표현해요. 새 값은 항상 **맨 뒤에 넣은 다음**, 부모보다 작으면 부모와 자리를 바꿔 위로 올라가요(sift-up). 부모 인덱스는 `(i-1)/2`(버림)예요. 부모가 더 작거나 자리가 뿌리(index 0)면 멈춰요.",
    },
    {
      kind: "trace",
      caption: "5,3,8,1을 최소 힙에 넣기 — 화살표 뒤가 넣은 뒤의 배열",
      lines: [
        "index :   0  1  2  3",
        "",
        "push 5 ->  5",
        "push 3 ->  3  5              ← 3이 부모 5보다 작아 올림",
        "push 8 ->  3  5  8           ← 8이 부모 3보다 커 그대로",
        "push 1 ->  3  1  8  5        ← 1이 부모 5보다 작아 올림",
        "       ->  1  3  8  5        ← 다시 부모 3보다 작아 또 올림",
        "",
        "final  :   1  3  8  5        ← 루트가 최솟값 1",
      ],
    },
    {
      kind: "text",
      body: "이제 `pop`으로 최솟값 `1`을 꺼내요. 뿌리를 빼고 **맨 뒤 값을 뿌리로 올린 뒤**, 두 자식 중 더 작은 쪽보다 크면 아래로 내려가요(sift-down). 자식 인덱스는 `2i+1`, `2i+2`예요.",
    },
    {
      kind: "trace",
      caption: "pop — 최솟값 1을 꺼내고 재정렬",
      lines: [
        "index :  0  1  2  3",
        "start :  1  3  8  5",
        "",
        "step1 :  5  3  8            ← 1을 빼고 맨뒤 5를 뿌리로",
        "step2 :  3  5  8            ← 자식 3,8 중 작은 3보다 5가 커 내림",
        "                            ← 더 내려갈 자식이 없어 멈춤",
        "",
        "pop 결과 = 1,   힙 = 3 5 8",
      ],
    },
    {
      kind: "heading",
      body: "언어별 사정",
    },
    {
      kind: "text",
      body: "파이썬은 `heapq`가 표준 라이브러리에 있어요. **최소 힙만** 제공하므로 최대 힙이 필요하면 값에 마이너스를 붙여 넣고 꺼낼 때 다시 뒤집어요.",
    },
    {
      kind: "trap",
      title: "JavaScript에는 내장 힙이 없어요",
      body: "직접 만들어야 해요. 이번 주 첫 문제가 그것이고, 그 이후 문제부터는 스타터에 만들어진 힙이 딸려와요. 실전에서도 자기 스니펫을 붙여넣는 게 정상이니, 한 번 제대로 만들어두고 그다음부터는 가져다 써요.",
    },
    {
      kind: "trap",
      title: "짝을 넣을 때 비교 기준을 주지 않으면 조용히 틀려요",
      body: "JavaScript에서 배열끼리 `<`로 비교하면 문자열로 바뀌어 사전순이 돼요. `[10, x]`가 `[9, x]`보다 앞선다고 판단해요. 다익스트라처럼 `[거리, 노드]`를 담을 때 반드시 비교자를 넘겨요. 파이썬은 튜플을 앞에서부터 비교하므로 자연스럽게 동작하지만, 두 번째 원소가 비교 불가능한 객체면 에러가 나요.",
    },
    {
      kind: "heading",
      body: "힙이 답인 문제들",
    },
    {
      kind: "list",
      items: [
        "**상위 K개** — 크기 K인 힙을 유지하며 넘치면 최솟값을 버려요. `O(n log k)`",
        "**여러 정렬 목록 병합** — 각 목록의 맨 앞만 힙에 넣고 하나씩 꺼내요",
        "**스케줄링** — 가장 빨리 끝나는 작업을 반복해서 꺼내요 (9주차 그리디와 결합)",
        "**중앙값 스트림** — 최대 힙과 최소 힙을 반씩 유지해요",
        "**최단 경로** — 가장 가까운 정점을 꺼내는 다익스트라 (21주차)",
      ],
    },
    {
      kind: "text",
      body: "상위 K개에서 힙을 쓰는 이유를 짚어둬요. 전체 정렬은 `O(n log n)`인데 힙은 `O(n log k)`예요. n이 100만이고 k가 10이면 큰 차이예요. 다만 k가 n에 가까우면 그냥 정렬하는 편이 나아요.",
    },
    {
      kind: "trap",
      title: "빈 힙에서 꺼내기 전에 비었는지 확인해요",
      body: "반복문에서 힙이 빌 때까지 꺼내는 코드가 많은데, 빈 힙에 `pop`을 하면 파이썬 `heapq`는 `IndexError`를 던지고, 직접 만든 JavaScript 힙은 `undefined`를 돌려줘 뒤에서 조용히 틀려요. 꺼내기 전에 `while len(heap):`이나 `while (heap.size)`로 **비어 있지 않은지** 먼저 확인해요.",
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

// 최대 힙이 필요하면 비교자를 뒤집어요.
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
      note: "힙 크기를 K로 고정하면 O(n log k)예요.",
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
      slug: "merge-k-lists",
      title: "K개 정렬 리스트 병합",
      role: "핵심",
      teaches: "힙으로 여러 스트림을 동시에 다루기",
    },
    {
      slug: "median-stream",
      title: "스트림 중앙값",
      role: "도전",
      teaches: "두 개의 힙으로 절반씩 나눠 유지하기",
    },
  ],
  selfCheck: [
    "힙이 완전 정렬보다 싼 이유를 '지켜야 할 규칙'으로 설명할 수 있나요?",
    "상위 K개를 구할 때 정렬 대신 힙을 쓰면 무엇이 좋아지나요? 반대로 언제 정렬이 나은가요?",
    "JavaScript 힙에 `[거리, 노드]`를 그냥 넣으면 무슨 일이 일어나나요?",
    "최소 힙에 값을 넣을 때 sift-up이 어디서 멈추는지 말할 수 있나요?",
  ],
};
