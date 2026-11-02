import Link from 'next/link';
import { BASE_PATH } from '@/components/moti/links';

// 입구에는 갤러리 홈이 없다 — /moti 는 지금 작품(카페)으로 보낸다.
// 정적 파일이라 서버 리디렉트가 없다: meta refresh(JS 없이도) + 링크
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=${BASE_PATH}/cafe`} />
      <Link href="/cafe">모티의 쉬는 날 · 창가 자리</Link>
    </main>
  );
}
