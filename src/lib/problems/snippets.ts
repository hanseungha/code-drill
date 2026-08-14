/**
 * Code handed to the solver inside a starter, rather than left to be retyped.
 *
 * The rule is "implement it once, then receive it". Python ships `heapq`, so a
 * heap problem there is three lines; JavaScript has no built-in heap, so the
 * same problem would open with the same forty lines every time. Week 19's first
 * problem (`min-heap`) is where that class gets written by hand — after that it
 * arrives in the starter, the way a real submission would paste a known
 * snippet, and the exercise moves on to the algorithm that needs it.
 *
 * MIN_HEAP_JS also backs the reference solution for `min-heap`, so `npm run
 * verify` executes this exact source on every run.
 *
 * The comparator matters: later problems queue pairs like `[distance, node]`,
 * and JavaScript compares arrays with `<` by turning them into strings, which
 * silently orders `[10, x]` before `[9, x]`. Passing an explicit comparator is
 * how that stays correct, so the shared copy takes one and only falls back to
 * natural ordering for plain numbers.
 */
export const MIN_HEAP_JS = `class MinHeap {
  /** @param {(a: any, b: any) => number} [compare] 음수면 a가 먼저 나옵니다. */
  constructor(compare) {
    this.items = [];
    this.compare = compare ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  get size() {
    return this.items.length;
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  push(value) {
    const a = this.items;
    a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(a[parent], a[i]) <= 0) break;
      [a[parent], a[i]] = [a[i], a[parent]];
      i = parent;
    }
  }

  pop() {
    const a = this.items;
    if (a.length === 0) return null;
    const top = a[0];
    const last = a.pop();
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let small = i;
        if (l < a.length && this.compare(a[l], a[small]) < 0) small = l;
        if (r < a.length && this.compare(a[r], a[small]) < 0) small = r;
        if (small === i) break;
        [a[small], a[i]] = [a[i], a[small]];
        i = small;
      }
    }
    return top;
  }
}`;

/** Prefix a starter with the shared heap, kept below the function being solved. */
export function withMinHeap(starter: string): string {
  return `${starter}
// ── 아래는 18주차에서 직접 만들어 본 최소 힙입니다. 그대로 쓰세요. ──
// 값을 그냥 넣으면 오름차순, 짝을 넣을 때는 비교자를 주세요.
//   const heap = new MinHeap((a, b) => a[0] - b[0]);
${MIN_HEAP_JS}
`;
}
