import type { Problem } from "@/lib/types";

export const groupAnagrams: Problem = {
  slug: "group-anagrams",
  title: "애너그램 묶기",
  difficulty: "medium",
  tags: ["해시", "문자열", "정렬"],
  summary: "같은 글자로 이루어진 단어끼리 묶어요.",
  description: [
    "문자열 배열 `strs`가 주어져요. 애너그램끼리 묶어 2차원 배열로 반환해요.",
    "애너그램은 글자 구성이 같고 순서만 다른 단어예요. 예를 들어 `\"eat\"`, `\"tea\"`, `\"ate\"`는 서로 애너그램이에요.",
    "그룹의 순서와 그룹 안 단어의 순서는 채점에 영향을 주지 않아요.",
  ],
  examples: [
    {
      input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
      output: '[["eat","tea","ate"], ["tan","nat"], ["bat"]]',
      explain: "글자 구성이 같은 것끼리 묶었어요. 순서는 달라도 돼요.",
    },
    { input: 'strs = [""]', output: '[[""]]' },
    { input: 'strs = ["a"]', output: '[["a"]]' },
  ],
  constraints: [
    "1 ≤ strs.length ≤ 10,000",
    "0 ≤ strs[i].length ≤ 100",
    "strs[i]는 영소문자로만 이루어져 있어요.",
  ],
  entry: { javascript: "groupAnagrams", python: "group_anagrams" },
  starter: {
    javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  // 여기에 코드를 작성하세요
}
`,
    python: `def group_anagrams(strs):
    # 여기에 코드를 작성하세요
    pass
`,
  },
  compare: "unordered-deep",
  testCases: [
    {
      input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
      expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
    },
    { input: [[""]], expected: [[""]] },
    { input: [["a"]], expected: [["a"]] },
    {
      input: [["abc", "cba", "bac", "xyz", "zyx"]],
      expected: [
        ["abc", "cba", "bac"],
        ["xyz", "zyx"],
      ],
      hidden: true,
    },
    {
      input: [["ddddddddddd", "dddddddddddd"]],
      expected: [["ddddddddddd"], ["dddddddddddd"]],
      hidden: true,
    },
  ],
  hint: "각 단어의 글자를 정렬한 문자열을 키로 쓰면 애너그램끼리 같은 키를 가져요. 글자 개수 26칸 배열을 키로 만들어도 돼요.",
  solution: {
    javascript: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const word of strs) {
    const key = word.split("").sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}
`,
    python: `def group_anagrams(strs):
    groups = {}
    for word in strs:
        key = "".join(sorted(word))
        groups.setdefault(key, []).append(word)
    return list(groups.values())
`,
  },
};
