import { ProblemBrowser, type ProblemSummary } from "@/components/ProblemBrowser";
import { allTags, problems } from "@/lib/problems";

// Only the list-facing fields cross to the client — descriptions, test cases
// and solutions stay on the problem page's own bundle.
const items: ProblemSummary[] = problems.map((p) => ({
  slug: p.slug,
  title: p.title,
  difficulty: p.difficulty,
  tags: p.tags,
  summary: p.summary,
}));

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:py-14">
      <section className="mb-10 sm:mb-14">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand ring-1 ring-brand/25">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          설치 없이 브라우저에서 바로 채점
        </p>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          코딩테스트, 매일 한 문제씩 훈련하세요
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-muted">
          JavaScript와 Python 코드를 브라우저 안에서 실행하고 테스트 케이스로
          채점합니다. 로그인도, 서버도 필요 없습니다.
        </p>
      </section>

      <ProblemBrowser items={items} tags={allTags} />
    </main>
  );
}
