import Link from 'next/link';

// momenttune.com/moti/ — 입구의 첫 작품(카페)으로 보낸다.
// 옛 갤러리 홈 · /projects · /about · /contact 는 입구에서 쓰지 않아 src/app/_gallery/ 로 옮겼다(밑줄 폴더는 라우팅·정적 export 에서 빠진다).

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <meta httpEquiv="refresh" content={`0;url=${BASE_PATH}/cafe`} />
      <Link href="/cafe" className="underline underline-offset-4">
        모티의 쉬는 날 · 창가 자리로 가기
      </Link>
    </main>
  );
}
