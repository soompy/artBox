'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RhythmOfCommutePreviewProps {
  className?: string;
}

export default function RhythmOfCommutePreview({ className = '' }: RhythmOfCommutePreviewProps) {
  const [currentSection, setCurrentSection] = useState(0);
  
  const sectionTitles = [
    '출근의 리듬',
    '도시의 리듬', 
    '감정의 흐트러짐',
    '다시 일상으로'
  ];

  const sectionColors = [
    '#374151', // 회색
    '#1e3a8a', // 파란색
    '#FFF8DC', // 아이보리
    '#581c87'  // 보라색
  ];

  // 자동으로 섹션 변경 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 파티클 생성
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2
  }));

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 배경 그라데이션 */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: sectionColors[currentSection]
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10" />
      
      {/* 파티클 애니메이션 */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* 이동하는 교통수단 */}
      <motion.div
        className="absolute bottom-4 w-8 h-2 bg-yellow-400 rounded-sm"
        animate={{
          x: [-20, 120, -20]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-8 w-10 h-2 bg-green-400 rounded-sm"
        animate={{
          x: [120, -20, 120]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
      
      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          key={currentSection}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xs font-bold text-white/80 mb-1 font-black-han-sans">
            {sectionTitles[currentSection]}
          </h3>
          <div className="w-6 h-0.5 bg-white/40 mx-auto" />
        </motion.div>
      </div>
      
      {/* 움직이는 사람들 (작은 점들) */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`person-${i}`}
          className="absolute w-1 h-3 bg-white/20 rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            bottom: '6px'
          }}
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 재생 아이콘 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}