'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { shareableUrl } from './links';

interface EndScreenProps {
  reduceMotion: boolean;
  /** 위에 놓을 그림(조는 모티 등) */
  art?: ReactNode;
  /** 한 일만 말한다 — 효과를 말하지 않는다 */
  message: string;
  suggestion: string;
  primary: { label: string; href: string };
  onReplay: () => void;
}

/** 끝 화면 — 천천히 올라오고, 뜨면 포커스를 옮긴다 */
export function EndScreen({ reduceMotion, art, message, suggestion, primary, onReplay }: EndScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // 기기 공유 시트로 작품 주소 하나만 — 우리 문구를 덧붙이지 않는다. 공유 시트가 없으면 주소 복사.
  const share = async () => {
    const url = shareableUrl();
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch {
        // 사용자가 공유 시트를 닫았다
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareNote('주소를 복사했어요');
    } catch {
      setShareNote(url);
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="end-message"
      className="absolute inset-0 z-20 flex items-center justify-center bg-[#f7f1e6]/90 backdrop-blur-sm"
      initial={reduceMotion ? false : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="flex w-full max-w-sm flex-col items-center px-6 text-center text-[#3d3029]">
        {art}
        <h2 id="end-message" ref={headingRef} tabIndex={-1} className="mt-6 text-2xl focus:outline-none">
          {message}
        </h2>
        <p className="mt-6 text-lg">{suggestion}</p>
        <a
          href={primary.href}
          rel="noopener"
          className="mt-4 w-full rounded-full bg-[#6a473a] px-6 py-3 text-base text-[#fbf5e9] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d9a465]"
        >
          {primary.label}
        </a>
        <div className="mt-4 flex items-center gap-2 text-base">
          <button
            type="button"
            onClick={onReplay}
            className="min-h-11 rounded-full px-4 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d9a465]"
          >
            한 번 더 앉아 있기
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={share}
            className="min-h-11 rounded-full px-4 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d9a465]"
          >
            친구에게
          </button>
        </div>
        <p role="status" className="mt-1 min-h-5 break-all text-sm opacity-75">
          {shareNote}
        </p>
        <p className="mt-8 text-xs opacity-60">모먼트튠이 만든 곳</p>
      </div>
    </motion.div>
  );
}
