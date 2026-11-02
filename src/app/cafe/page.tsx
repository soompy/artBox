import type { Metadata } from 'next';

const TITLE = '모티의 쉬는 날 · 창가 자리';
const DESCRIPTION = '비 오는 날, 카페 창가에서 코코아를 마시는 모티 곁에 2분 같이 앉아 있어요.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    url: '/moti/cafe',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

// 작품 틀(장면 · 두드림 · 120초 흐름 · 끝 화면)은 브리프 §5-3 에서 채운다
export default function CafePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <h1 className="text-xl">{TITLE}</h1>
    </main>
  );
}
