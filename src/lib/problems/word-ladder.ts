import type { Problem } from "@/lib/types";

export const wordLadder: Problem = {
  slug: "word-ladder",
  title: "단어 변환",
  difficulty: "medium",
  tags: ["BFS", "그래프"],
  summary: "한 글자씩 바꿔 단어를 목표로 바꾸는 최소 변환 횟수를 구해요.",
  description: [
    "시작 단어 `begin`, 목표 단어 `target`, 사용할 수 있는 단어 목록 `words`가 주어져요. 모든 단어는 길이가 같아요.",
    "한 번에 **한 글자만** 바꿀 수 있고, 바꾼 단어는 반드시 `words` 안에 있어야 해요. `begin`을 `target`으로 바꾸는 데 필요한 **최소 변환 횟수**를 반환해요. 바꿀 수 없으면 `0`을 반환해요.",
    "여기서 단어 하나하나가 정점이고, '한 글자 차이'가 간선이에요. 지도가 그려져 있지 않을 뿐 BFS로 최단 거리를 구하는 문제와 똑같아요.",
  ],
  examples: [
    {
      input: 'begin = "hit", target = "cog", words = ["hot", "dot", "dog", "lot", "log", "cog"]',
      output: "4",
      explain: "hit → hot → dot → dog → cog, 네 번 바꿔요.",
    },
    {
      input: 'begin = "hit", target = "cog", words = ["hot", "dot", "dog", "lot", "log"]',
      output: "0",
      explain: "목표 cog가 목록에 없어 도달할 수 없어요.",
    },
  ],
  constraints: [
    "1 ≤ 단어 길이 ≤ 10, 모든 단어의 길이가 같아요.",
    "1 ≤ words.length ≤ 5,000",
    "단어는 소문자 알파벳으로만 이루어져요.",
  ],
  entry: { javascript: "wordLadder", python: "word_ladder" },
  starter: {
    javascript: `/**
 * @param {string} begin
 * @param {string} target
 * @param {string[]} words
 * @return {number}
 */
function wordLadder(begin, target, words) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def word_ladder(begin, target, words):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  testCases: [
    { input: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], expected: 4 },
    { input: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], expected: 0 },
    { input: ["a", "c", ["a", "b", "c"]], expected: 1 },
    { input: ["abc", "abc", ["abc"]], expected: 0 },
    { input: ["red", "tax", ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]], expected: 3, hidden: true },
    { input: ["hot", "dog", ["hot", "dog"]], expected: 0, hidden: true },
  ],
  hint: "`words`를 집합에 넣어 두고, `begin`에서 BFS를 시작해요. 각 단어의 모든 자리를 a~z로 하나씩 바꿔 보고, 그 단어가 집합에 있고 아직 방문하지 않았으면 변환 횟수를 1 늘려 큐에 넣어요. `target`에 닿으면 그 횟수가 답이에요.",
  solution: {
    javascript: `function wordLadder(begin, target, words) {
  const set = new Set(words);
  if (!set.has(target)) return 0;
  const dist = new Map([[begin, 0]]);
  const queue = [begin];
  let head = 0;
  while (head < queue.length) {
    const word = queue[head++];
    if (word === target) return dist.get(word);
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c < 123; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (set.has(next) && !dist.has(next)) {
          dist.set(next, dist.get(word) + 1);
          queue.push(next);
        }
      }
    }
  }
  return 0;
}
`,
    python: `from collections import deque


def word_ladder(begin, target, words):
    word_set = set(words)
    if target not in word_set:
        return 0
    dist = {begin: 0}
    queue = deque([begin])
    while queue:
        word = queue.popleft()
        if word == target:
            return dist[word]
        for i in range(len(word)):
            for c in range(97, 123):
                nxt = word[:i] + chr(c) + word[i + 1:]
                if nxt in word_set and nxt not in dist:
                    dist[nxt] = dist[word] + 1
                    queue.append(nxt)
    return 0
`,
  },
};
