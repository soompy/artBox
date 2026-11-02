import type { Metadata } from "next";
import { Inter, Black_Han_Sans } from "next/font/google";
import "./globals.css";

// next/font 는 빌드할 때 서체를 내려받아 우리 파일로 함께 내보낸다 — 방문자 브라우저가 Google 에 요청하지 않는다(브리프 §2-4)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const SITE_NAME = "모티의 쉬는 날 · 모먼트튠";
const SITE_DESCRIPTION = "수달 모티가 쉬는 날을 보내는 작은 공간들. 설치 없이 링크 하나로 열리는 잠깐 쉬어 가는 짧은 작품이에요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://momenttune.com"),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  authors: [{ name: "MomentTune" }],
  creator: "MomentTune",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/moti",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${blackHanSans.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
