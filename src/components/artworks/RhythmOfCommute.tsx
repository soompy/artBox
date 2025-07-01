'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Artwork } from '@/types/artwork';

interface RhythmOfCommuteProps {
  artwork: Artwork;
}

interface Emotion {
  name: string;
  color: string;
  description: string;
}

const emotions: Emotion[] = [
  { name: '평온함', color: '#3B82F6', description: '고요한 아침의 시작' },
  { name: '설렘', color: '#F59E0B', description: '새로운 하루에 대한 기대' },
  { name: '불안', color: '#EF4444', description: '알 수 없는 걱정과 두려움' },
  { name: '희망', color: '#10B981', description: '더 나은 내일을 향한 마음' },
  { name: '우울', color: '#6366F1', description: '무거운 마음의 무게' },
  { name: '활력', color: '#F97316', description: '에너지 넘치는 생동감' }
];

export function RhythmOfCommute({ artwork }: RhythmOfCommuteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [showEmotionSelector, setShowEmotionSelector] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sectionTitles = [
    '출근의 리듬',
    '도시의 리듬', 
    '감정의 흐트러짐',
    '다시 일상으로',
    '당신의 오늘 아침 감정은?'
  ];

  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 스크롤 진행도에 따른 섹션 계산
  const section1Progress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const section2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const section3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const section4Progress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const section5Progress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // 배경색 보간
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#000000', // 인트로 - 검은색
      '#1e3a8a', // 도시의 리듬 - 파란색
      '#7c2d12', // 감정의 흐트러짐 - 빨간색
      '#581c87', // 다시 일상으로 - 보라색
      '#111827', // 엔딩 - 회색
      '#111827'  // 끝점 - 회색 유지
    ]
  );

  // 현재 섹션 추적
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < 0.2) setCurrentSection(0);
      else if (progress < 0.4) setCurrentSection(1);
      else if (progress < 0.6) setCurrentSection(2);
      else if (progress < 0.8) setCurrentSection(3);
      else if (progress < 0.85) setCurrentSection(4); // 0.85에서 제목 사라짐
      else setCurrentSection(-1); // -1일 때 제목 숨김

      // 감정 선택기 표시 시점 조정
      if (progress >= 0.85) {
        setShowEmotionSelector(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // 캔버스 애니메이션
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // 파티클 초기화
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: '#ffffff'
      });
    }
    setParticles(newParticles);
  }, []);

  // 감정 선택 핸들러
  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    // 파티클 색상 변경
    setParticles(prev => prev.map(particle => ({
      ...particle,
      color: emotion.color,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4
    })));
  };

  // 캔버스 렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 파티클 업데이트 및 렌더링
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 화면 경계 처리
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 파티클 그리기
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particles]);

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full min-h-[500vh] text-white overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* 중앙 고정 제목 */}
      {currentSection !== -1 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSection}
              className="text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {sectionTitles[currentSection]}
            </motion.h1>
          </AnimatePresence>
        </div>
      )}

      {/* 섹션 1: 인트로 - 회색 도시 + 실루엣 군중 이동 */}
      <motion.section
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="text-center relative mt-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-50"
          />
          
          {/* 도시 실루엣 */}
          <motion.div
            className="relative mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <div className="w-full h-32 bg-gradient-to-t from-gray-700 to-gray-500 opacity-60 mb-4" 
                 style={{ clipPath: 'polygon(0 100%, 10% 80%, 20% 90%, 30% 70%, 40% 85%, 50% 60%, 60% 75%, 70% 55%, 80% 80%, 90% 65%, 100% 85%, 100% 100%)' }} />
          </motion.div>

          {/* 군중 실루엣 애니메이션 */}
          <motion.div className="flex justify-center space-x-2 mb-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-8 bg-gray-600 rounded-full opacity-70"
                animate={{
                  x: [0, Math.random() * 20 - 10, 0],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            도시 속 개인의 감정 여행
          </motion.p>
        </div>
      </motion.section>

      {/* 섹션 2: 도시의 리듬 - 버스, 지하철, 발걸음 */}
      <motion.section className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center mt-32">
          
          {/* 교통수단 애니메이션 */}
          <div className="relative w-full max-w-4xl mx-auto h-40 mb-8">
            {/* 버스 */}
            <motion.div
              className="absolute top-0 w-16 h-8 bg-yellow-500 rounded"
              animate={{
                x: [0, window.innerWidth - 64, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* 지하철 */}
            <motion.div
              className="absolute top-12 w-20 h-6 bg-green-500 rounded"
              animate={{
                x: [window.innerWidth, -80]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* 발걸음 애니메이션 */}
            <div className="absolute bottom-0 flex space-x-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.p
            className="text-lg text-gray-300"
            style={{ opacity: section2Progress }}
          >
            반복되는 움직임 속에서 찾는 나만의 템포
          </motion.p>
        </div>
      </motion.section>

      {/* 섹션 3: 감정의 흐트러짐 - 한 사람 강조 + particle/noise */}
      <motion.section className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center relative mt-32">
          
          {/* 중앙 인물 강조 */}
          <motion.div
            className="relative mx-auto mb-8"
            style={{
              scale: useTransform(section3Progress, [0, 1], [1, 1.5]),
              opacity: section3Progress
            }}
          >
            <div className="w-8 h-16 bg-white rounded-full mx-auto relative">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-red-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>
          
          {/* 감정 파티클 */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: section3Progress }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 60}%`,
                  top: `${50 + (Math.random() - 0.5) * 60}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [(Math.random() - 0.5) * 100],
                  y: [(Math.random() - 0.5) * 100]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
          
          <motion.p
            className="text-lg text-gray-300"
            style={{ opacity: section3Progress }}
          >
            군중 속에서 일어나는 개인의 감정적 순간
          </motion.p>
        </div>
      </motion.section>

      {/* 섹션 4: 다시 일상으로 - 군중 속 감정 스며들기 + 색 번짐 */}
      <motion.section className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center relative mt-32">
          
          {/* 색 번짐 효과 */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-purple-500 via-blue-500 to-transparent opacity-30"
            style={{
              scale: useTransform(section4Progress, [0, 1], [0, 2]),
              opacity: useTransform(section4Progress, [0, 1], [0, 0.6])
            }}
          />
          
          {/* 군중으로 다시 합쳐지는 애니메이션 */}
          <motion.div className="flex justify-center space-x-1 mb-8">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-6 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full"
                style={{
                  opacity: section4Progress,
                  scale: useTransform(section4Progress, [0, 1], [0.5, 1])
                }}
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
          
          <motion.p
            className="text-lg text-gray-300"
            style={{ opacity: section4Progress }}
          >
            개인의 감정이 집단의 리듬과 하나가 되는 순간
          </motion.p>
        </div>
      </motion.section>

      {/* 섹션 5: 엔딩 인터랙션 - 감정 선택 */}
      <motion.section 
        className="sticky top-0 h-screen flex items-center justify-center"
      >
        <div className="text-center">
          
          {/* 감정 선택 영역의 제목 */}
          {showEmotionSelector && (
            <motion.h2
              className="text-5xl font-bold mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              당신의 오늘 아침 감정은?
            </motion.h2>
          )}
          
          {showEmotionSelector && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {emotions.map((emotion, index) => (
                <motion.button
                  key={emotion.name}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedEmotion?.name === emotion.name
                      ? 'border-white bg-white/10'
                      : 'border-gray-600 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundColor: selectedEmotion?.name === emotion.name 
                      ? `${emotion.color}20` 
                      : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEmotionSelect(emotion)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <h3 className="text-lg font-semibold mb-2">{emotion.name}</h3>
                  <p className="text-sm text-gray-400">{emotion.description}</p>
                </motion.button>
              ))}
            </motion.div>
          )}
          
          {selectedEmotion && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl mb-4" style={{ color: selectedEmotion.color }}>
                {selectedEmotion.name}을 선택하셨군요.
              </p>
              <p className="text-gray-300">
                당신의 감정이 도시의 리듬과 어우러져 새로운 이야기를 만들어갑니다.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}