'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Artwork } from '@/types/artwork';
import { RhythmOfCommute } from './RhythmOfCommute';

interface ArtworkViewerProps {
  artwork: Artwork;
}

const ArtworkComponents: Record<string, React.ComponentType<{ artwork: Artwork }>> = {
  'rhythm-of-the-commute': RhythmOfCommute,
};

export default function ArtworkViewer({ artwork }: ArtworkViewerProps) {
  const ArtworkComponent = ArtworkComponents[artwork.slug];

  if (!ArtworkComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">작품을 준비 중입니다</h1>
          <p className="text-muted mb-8">이 작품은 현재 개발 중입니다.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium gallery-transition hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            갤러리로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-4 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 glass-effect rounded-xl text-white/80 hover:text-white gallery-transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">갤러리</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="glass-effect rounded-xl p-4 max-w-xs">
          <h3 className="font-semibold text-white mb-1">{artwork.title}</h3>
          {artwork.titleEn && (
            <p className="text-sm text-white/60 mb-2 italic">{artwork.titleEn}</p>
          )}
          <p className="text-xs text-white/50">{artwork.year}</p>
        </div>
      </motion.div>

      <ArtworkComponent artwork={artwork} />
    </div>
  );
}