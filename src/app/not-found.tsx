import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">
        문제를 찾을 수 없습니다
      </h1>
      <p className="max-w-sm text-pretty text-secondary">
        주소가 잘못되었거나 아직 준비되지 않은 문제입니다.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent/85"
      >
        문제 목록으로
      </Link>
    </main>
  );
}
