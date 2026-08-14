# code-drill

브라우저에서 바로 코드를 실행하고 채점하는 코딩테스트 연습 사이트입니다.
JavaScript와 Python을 지원하며, 채점 서버가 없습니다 — 제출한 코드는 사용자의
브라우저 안에서만 실행됩니다.

## 어떻게 서버 없이 채점하나

| 언어 | 실행 방식 |
| --- | --- |
| JavaScript | Web Worker 안에서 `new Function`으로 컴파일해 실행 |
| Python | [Pyodide](https://pyodide.org)(WebAssembly로 컴파일된 CPython 3.14)를 모듈 워커에서 구동 |

워커를 쓰는 이유는 격리가 아니라 **응답성**입니다. 무한 루프가 들어와도 워커
스레드만 멈추고, 메인 스레드가 제한 시간(8초) 뒤에 `terminate()`로 끊어냅니다.

채점은 워커가 반환값을 JSON으로 직렬화해 메인 스레드로 넘기고, 메인 스레드가
비교하는 구조입니다. 두 언어의 결과가 같은 JSON 도메인으로 정규화되므로 파이썬
튜플과 자바스크립트 배열이 동일하게 취급됩니다.

> 브라우저에서 실행된다는 것은 **다른 사람의 코드로부터 서버를 지킬 필요가 없다**는
> 뜻이지, 사용자가 자기 브라우저에서 임의 코드를 실행하지 못한다는 뜻은 아닙니다.
> 이 구조는 개인 연습용입니다. 신뢰할 수 없는 제출을 다루는 대회용 저지로 쓰려면
> 서버 측 샌드박스가 따로 필요합니다.

## 디자인 시스템

UI는 Meta의 [Astryx](https://astryx.atmeta.com) 로 만들었습니다. 화면에 쓰인
모든 요소가 Astryx 컴포넌트이고, Tailwind는 쓰지 않습니다.

브랜드 테마는 `src/theme/codeDrill.ts` 하나로 정의됩니다. Astryx의 neutral
테마를 `extends` 해서 액센트 색과 폰트 두 가지만 바꾸고, 나머지(간격, 반경,
모션, 색상 램프, 문법 하이라이팅 팔레트)는 그대로 물려받습니다.

```bash
npm run theme        # 테마를 CSS/JS로 빌드 (src/theme/code-drill.*)
npm run theme:check  # 산출물이 소스와 어긋나면 실패
```

`src/theme/code-drill.*` 는 생성 파일이므로 직접 고치지 마세요. 색을 바꾸려면
`codeDrill.ts` 를 수정하고 `npm run theme` 를 실행합니다. 라이트/다크는
`light-dark()` 토큰으로 처리되며, 에디터 색상도 `--color-syntax-*` 토큰에서
읽어오므로 모드 전환을 그대로 따라갑니다.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run verify   # 모든 모범 답안을 실제 채점기로 검증
npm run docs     # docs/curriculum.md 의 주차 목록을 커리큘럼 데이터에서 다시 생성
npm run baekjoon # 백준 추천 문제 목록을 다시 받아옴 (결과는 커밋되어 있음)
```

`npm run verify`는 브라우저에 배포되는 워커 코드를 그대로 사용합니다.
`js-runner.js`는 `node:vm`에서, `py-runner.js`의 파이썬 하네스는 로컬
`python3`에서 실행해 모든 문제 × 2개 언어의 테스트 케이스를 확인합니다.
문제를 추가한 뒤에는 반드시 돌려보세요 — 기댓값 오타를 여기서 잡습니다.

## 학습 과정

이 사이트의 중심은 문제 목록이 아니라 [24주 커리큘럼](docs/curriculum.md)입니다.
매주 개념을 먼저 읽고, 언어별 패턴 코드를 한 번 쳐보고, 그 주의 문제 4개로
굳힙니다. 난이도는 1주차부터 24주차까지 올라갑니다.

- `/curriculum` — 4페이즈 24주 지도와 전체 진행률
- `/week/[n]` — 개념 노트, 패턴 코드, 그 주의 문제, 백준 추천 문제, 셀프 체크
- `/` — 문제 전체 목록 (커리큘럼 순서)

주차 콘텐츠는 `src/lib/curriculum/weeks/w01.ts` ~ `w24.ts` 에 있습니다. 개념은
문단·목록·표·함정 네 종류의 블록으로 쓰고, 마크다운 파서 대신 블록 유니온을 쓴
이유는 `src/lib/curriculum/types.ts` 에 적어두었습니다.

커리큘럼이 가리키는 문제 slug가 실제로 존재하는지, 모든 문제가 정확히 한 주차에
배치됐는지는 `npm run verify` 가 함께 검사합니다.

### 백준 추천 문제

주차마다 그 주제로 골라둔 백준 문제 목록이 접힌 채로 붙어 있습니다. 출처는
[tony9402/baekjoon](https://github.com/tony9402/baekjoon)(MIT)이고, 저자가 추천으로
표시한 **372문제**를 23개 분류 → 주차로 매핑해 가져옵니다.

가져오는 것은 **목록뿐입니다** — 문제 번호, 제목, solved.ac 티어. 지문과 채점
데이터는 그 저장소에 없고(표가 전부 acmicpc.net 링크입니다) 백준 저작물이라,
이 사이트는 링크만 겁니다. 채점은 백준에서 하고 체크박스로 표시해 두는 방식입니다.

분류 → 주차 매핑과 예외 목록은 `scripts/fetch-baekjoon.mts` 안에 있습니다.
결과 JSON은 커밋되어 있어서 빌드나 요청 때 네트워크를 타지 않습니다.

주차 구성을 바꿀 때는 `docs/curriculum.md` 의 **필수 주제 커버리지** 표를 먼저 보세요.
코딩 테스트 필수 주제와 담당 주차의 대응표라서, 주차를 옮기다 주제가 통째로 빠지는
일을 막아줍니다. 표 아래의 주차별 목록은 `npm run docs` 로 데이터에서 다시 생성합니다.

## 문제 추가하기

1. `src/lib/problems/<slug>.ts` 를 만들고 `Problem` 타입에 맞춰 작성합니다.
2. `src/lib/problems/index.ts` 의 `problems` 배열에 해당 주차 위치로 넣습니다.
3. `npm run verify` 로 모범 답안이 통과하는지 확인합니다.

핵심 필드만 추리면 이렇습니다.

```ts
export const myProblem: Problem = {
  slug: "my-problem",
  entry: { javascript: "solve", python: "solve" },  // 채점기가 호출할 함수 이름
  starter: { javascript: "...", python: "..." },
  testCases: [
    { input: [[1, 2, 3], 4], expected: [0, 1] },     // input은 인자 목록
    { input: [[1], 1], expected: [0], hidden: true }, // hidden은 제출할 때만 실행
  ],
  compare: "unordered",  // 생략하면 "exact"
  solution: { javascript: "...", python: "..." },
};
```

`compare` 는 반환 순서가 자유로운 문제에 씁니다.

- `exact` (기본값) — 순서까지 일치해야 함
- `unordered` — 최상위 배열의 순서를 무시
- `unordered-deep` — 중첩된 모든 배열의 순서를 무시 (예: 애너그램 묶기)

### 트리를 다루는 문제

테스트 케이스는 JSON이어야 합니다. 같은 케이스가 두 채점기를 함께 돌아야 하고,
Python 쪽은 `json.loads` 로 받기 때문입니다. 트리에는 JSON 표현이 없으므로
**레벨 순서 배열로 쓰고 채점기가 호출 직전에 노드로 되살립니다.**

```ts
argShapes: ["tree"],   // 이 자리 인자를 노드로 바꿔서 넘김
returnShape: "tree",   // 반환한 노드를 다시 레벨 순서 배열로 직렬화
testCases: [
  { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
],
```

`null` 은 자식이 없다는 뜻이고 뒤쪽 `null` 은 생략합니다. `TreeNode` 는 두 언어
모두 전역으로 제공되므로 제출 코드에서 새 노드를 만들 수 있습니다.

### JavaScript 힙

Python은 `heapq` 가 내장이지만 JavaScript에는 내장 힙이 없습니다. 18주차 1번
문제에서 한 번 직접 만들고, 그 이후 문제부터는 `snippets.ts` 의 `MIN_HEAP_JS` 를
`withMinHeap()` 으로 스타터에 붙여 제공합니다.

## 구조

```
src/lib/curriculum/   24주 커리큘럼 (한 파일에 한 주차)
src/lib/baekjoon/     백준 추천 문제 목록 (생성물)
src/lib/problems/     문제 정의 (한 파일에 한 문제)
src/lib/runner.ts     워커 수명 관리, 제한 시간, 결과 매핑
src/lib/compare.ts    정답 비교 및 정규화
src/lib/storage.ts    localStorage 기반 진행률과 코드 임시 저장
src/theme/            브랜드 테마 소스와 생성된 CSS
src/components/       화면 구성 (전부 Astryx 컴포넌트)
public/workers/       브라우저에서 실제로 실행되는 채점기 두 개
```

진행 상황과 작성 중인 코드는 `localStorage`에만 저장됩니다. 계정도 데이터베이스도
없으므로 브라우저를 지우면 기록도 사라집니다.

## 라이선스

MIT
