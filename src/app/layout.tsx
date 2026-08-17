import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppFrame } from "@/components/AppFrame";
import { ColorModeScript } from "@/components/ColorModeScript";
import { Providers } from "./providers";
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
    "JavaScript와 Python 코드를 브라우저에서 바로 실행하고 채점하는 코딩테스트 연습 사이트. 설치도 로그인도 필요 없어요.",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ColorModeScript />
      </head>
      <body>
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
