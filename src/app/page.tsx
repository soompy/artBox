'use client';

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/pages/HomePage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white font-black-han-sans text-xl">갤러리를 준비하고 있습니다...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return <HomePage />;
}
