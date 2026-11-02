import type { Metadata } from "next";
import { Inter, Black_Han_Sans } from "next/font/google";
import "./globals.css";

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

// 메타 주소는 Vercel 프리뷰가 아니라 momenttune.com — basePath('/moti')는 메타 주소에 붙지 않으니 경로에 직접 쓴다
export const metadata: Metadata = {
  metadataBase: new URL("https://momenttune.com"),
  title: {
    default: "모티의 쉬는 날 | 모먼트튠",
    template: "%s | 모먼트튠",
  },
  description: "모티가 좋아하는 곳에 2분 같이 앉아 있어요. 설치 없이 링크 하나로.",
  authors: [{ name: "모먼트튠" }],
  creator: "모먼트튠",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/moti",
    siteName: "모먼트튠",
    title: "모티의 쉬는 날",
    description: "모티가 좋아하는 곳에 2분 같이 앉아 있어요. 설치 없이 링크 하나로.",
  },
  twitter: {
    card: "summary_large_image",
    title: "모티의 쉬는 날",
    description: "모티가 좋아하는 곳에 2분 같이 앉아 있어요. 설치 없이 링크 하나로.",
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
