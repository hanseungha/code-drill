import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "code-drill — 브라우저에서 바로 푸는 코딩테스트 연습",
    template: "%s · code-drill",
  },
  description:
    "JavaScript와 Python 코드를 브라우저에서 바로 실행하고 채점하는 코딩테스트 연습 사이트. 설치도 로그인도 필요 없습니다.",
  openGraph: {
    title: "code-drill",
    description:
      "JavaScript와 Python 코드를 브라우저에서 바로 실행하고 채점하는 코딩테스트 연습 사이트.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-[15px] font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-md bg-brand/15 text-brand ring-1 ring-brand/30 transition group-hover:bg-brand/25"
              >
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <path
                    d="M8 6 3 12l5 6M16 6l5 6-5 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              code-drill
            </Link>
            <nav className="ml-auto flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-muted transition hover:bg-elevated hover:text-ink"
              >
                문제
              </Link>
              <a
                href="https://github.com/hanseungha/code-drill"
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-1.5 text-muted transition hover:bg-elevated hover:text-ink"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
