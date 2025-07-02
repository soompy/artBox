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

export const metadata: Metadata = {
  title: "Interactive Art Gallery | Digital Art Exhibition",
  description: "몰입감 있는 인터랙티브 웹 아트 전시장. 디지털 아트와 기술이 만나는 공간에서 새로운 예술 경험을 만나보세요.",
  keywords: ["interactive art", "web art", "digital art", "exhibition", "gallery", "인터랙티브 아트", "웹 아트", "디지털 아트"],
  authors: [{ name: "Interactive Art Gallery" }],
  creator: "Interactive Art Gallery",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://interactive-art-gallery.vercel.app",
    siteName: "Interactive Art Gallery",
    title: "Interactive Art Gallery | Digital Art Exhibition",
    description: "몰입감 있는 인터랙티브 웹 아트 전시장",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive Art Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Art Gallery | Digital Art Exhibition",
    description: "몰입감 있는 인터랙티브 웹 아트 전시장",
    images: ["/images/og-image.jpg"],
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
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
