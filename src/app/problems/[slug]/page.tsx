import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Workspace } from "@/components/Workspace";
import { getAdjacent, getProblem, problems } from "@/lib/problems";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/problems/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) return { title: "문제를 찾을 수 없어요" };
  return {
    title: problem.title,
    description: problem.summary,
  };
}

export default async function ProblemPage({
  params,
}: PageProps<"/problems/[slug]">) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <Workspace
      problem={problem}
      prev={prev && { slug: prev.slug, title: prev.title }}
      next={next && { slug: next.slug, title: next.title }}
    />
  );
}
