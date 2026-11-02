import type { Metadata } from 'next';

// 카페 작품 «모티의 쉬는 날 · 창가 자리» — momenttune.com/moti/cafe
// 지금은 주소와 메타만 잡아 둔 자리다. 장면 · 두드림 · 120초 흐름 · 끝 화면은 브리프 §5-3 «카페 작품 틀» 에서 채운다.

const TITLE = '모티의 쉬는 날 · 창가 자리';
const DESCRIPTION = '비 오는 날 카페 창가에서 코코아를 마시는 모티 곁에 2분 같이 앉아 있어요. 설치 없이 바로 열려요.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/moti/cafe' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/moti/cafe',
    siteName: '모티의 쉬는 날 · 모먼트튠',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CafePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-12">
      <div
        role="img"
        aria-label="비 오는 날 카페 창가에서 모티가 코코아를 마시고 있어요"
        className="w-full max-w-sm aspect-[9/16] rounded-2xl bg-[#d9d2c7] border border-border"
      />
      <h1 className="text-lg font-medium">{TITLE}</h1>
      <p className="text-sm text-muted">준비 중이에요</p>
    </main>
  );
}
