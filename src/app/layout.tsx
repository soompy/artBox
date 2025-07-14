import type { Metadata } from "next";
import { Inter, Black_Han_Sans } from "next/font/google";
import "./globals.css";
import ClientOnly from "@/components/ClientOnly";
import PerformanceInit from "@/components/PerformanceInit";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://artbox-lxtk9yrte-suris-projects.vercel.app'),
  title: "Interactive Art Gallery | Digital Art Exhibition",
  description: "몰입감 있는 인터랙티브 웹 아트 전시장. 디지털 아트와 기술이 만나는 공간에서 새로운 예술 경험을 만나보세요.",
  keywords: ["interactive art", "web art", "digital art", "exhibition", "gallery", "인터랙티브 아트", "웹 아트", "디지털 아트"],
  authors: [{ name: "Interactive Art Gallery" }],
  creator: "Interactive Art Gallery",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://artbox-lxtk9yrte-suris-projects.vercel.app",
    siteName: "Interactive Art Gallery",
    title: "Interactive Art Gallery | Digital Art Exhibition",
    description: "몰입감 있는 인터랙티브 웹 아트 전시장",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Art Gallery | Digital Art Exhibition",
    description: "몰입감 있는 인터랙티브 웹 아트 전시장",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.variable} ${blackHanSans.variable} font-sans antialiased`}>
        <ClientOnly>
          <PerformanceInit />
        </ClientOnly>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
