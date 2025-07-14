'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Artwork } from '@/types/artwork';
import { RhythmOfCommute } from './RhythmOfCommute';
import { LunchBreak } from './LunchBreak';
import '@/styles/projects.scss';

interface ArtworkViewerProps {
  artwork: Artwork;
}

const ArtworkComponents: Record<string, React.ComponentType<{ artwork: Artwork }>> = {
  'rhythm-of-the-commute': RhythmOfCommute,
  'lunch-break': LunchBreak,
};

export default function ArtworkViewer({ artwork }: ArtworkViewerProps) {
  const ArtworkComponent = ArtworkComponents[artwork.slug];

  if (!ArtworkComponent) {
    return (
      <div className="coming-soon">
        <div className="coming-soon-content">
          <h1 className="coming-soon-title font-black-han-sans">작품을 준비 중입니다</h1>
          <p className="coming-soon-description font-black-han-sans">이 작품은 현재 개발 중입니다.</p>
          <Link
            href="/"
            className="back-button"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-black-han-sans">갤러리로 돌아가기</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artwork-viewer">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="back-nav"
      >
        <Link
          href="/"
          className="nav-link"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="nav-text font-black-han-sans">갤러리</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="artwork-info"
      >
        <div className="info-panel">
          <h3 className="artwork-title">{artwork.title}</h3>
          {artwork.titleEn && (
            <p className="artwork-title-en">{artwork.titleEn}</p>
          )}
          <p className="artwork-year">{artwork.year}</p>
        </div>
      </motion.div>

      <ArtworkComponent artwork={artwork} />
    </div>
  );
}