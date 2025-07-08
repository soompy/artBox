'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Artwork } from '@/types/artwork';
import { audioManager } from '@/utils/audioManager';

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

const sectionTitles = [
  '출근의 리듬',
  '도시의 리듬', 
  '감정의 흐트러짐',
  '다시 일상으로',
  '당신의 오늘 아침 감정은?'
];

export function RhythmOfCommute({ }: RhythmOfCommuteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [emotionEffect, setEmotionEffect] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(800);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

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

  // 배경색 보간
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      '#374151', // 인트로 - 새벽 연한 회색
      '#1e3a8a', // 도시의 리듬 - 파란색
      '#FFF8DC', // 감정의 흐트러짐 - 아이보리색 (대낮)
      '#581c87', // 다시 일상으로 - 보라색
      '#111827', // 엔딩 - 회색
      '#111827'  // 끝점 - 회색 유지
    ]
  );

  // 윈도우 크기 추적
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  // 현재 섹션 추적
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < 0.2) setCurrentSection(0);
      else if (progress < 0.4) setCurrentSection(1);
      else if (progress < 0.6) setCurrentSection(2);
      else if (progress < 0.8) setCurrentSection(3);
      else setCurrentSection(4);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // 캔버스 애니메이션
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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

  // 오디오 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initAudio = async () => {
      await audioManager.init();
      
      // 합성음 사용으로 오디오 초기화 완료
      setAudioInitialized(true);
    };
    
    initAudio();
  }, []);
  
  // 섹션별 합성음 재생
  useEffect(() => {
    if (!audioInitialized) return;
    
    const synthAudioMap = {
      0: { name: 'morning-ambience', frequency: 220, duration: 5 }, // 아침 - 낮은 A음
      1: { name: 'city-traffic', frequency: 440, duration: 3 }, // 도시 - 높은 A음
      2: { name: 'peaceful-nature', frequency: 330, duration: 4 }, // 평온 - E음
      3: { name: 'evening-crowd', frequency: 294, duration: 3 }, // 저녁 - D음
      4: { name: 'emotional-ambient', frequency: 523, duration: 2 } // 감정 - 높은 C음
    };
    
    const audioConfig = synthAudioMap[currentSection as keyof typeof synthAudioMap];
    
    if (audioConfig && audioConfig.name !== currentAudio) {
      if (currentAudio) {
        audioManager.stopAudio(currentAudio);
      }
      audioManager.playSynthAudio(audioConfig.name, audioConfig.frequency, audioConfig.duration, 0.1);
      setCurrentAudio(audioConfig.name);
    }
  }, [currentSection, audioInitialized, currentAudio]);
  
  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      audioManager.stopAllAudio();
    };
  }, []);

  // 파티클 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * windowWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: '#ffffff'
      });
    }
    setParticles(newParticles);
  }, [windowWidth]);

  // 감정 선택 핸들러
  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setEmotionEffect(emotion.name);
    
    // 감정 선택시 특별 사운드 효과
    if (audioInitialized) {
      audioManager.playSynthAudio('emotional-effect', 660, 1, 0.2);
    }
    
    // 파티클 색상 변경
    setParticles(prev => prev.map(particle => ({
      ...particle,
      color: emotion.color,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4
    })));

    // 효과를 5초 후에 제거
    setTimeout(() => {
      setEmotionEffect(null);
    }, 5000);
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
      particles.forEach((particle) => {
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

  // 섹션별 컨텐츠 렌더링 함수
  const renderSectionContent = () => {
    switch (currentSection) {
      case 0: // 출근의 리듬
        return (
          <motion.div
            key="section-0"
            className="relative w-full h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* 거대한 도시 실루엣 - 화면 전체 배경 */}
            <motion.div
              className="absolute inset-0 flex items-end justify-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <div 
                className="w-full h-80 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 opacity-70" 
                style={{ 
                  clipPath: 'polygon(0 100%, 5% 60%, 12% 80%, 18% 45%, 25% 70%, 32% 30%, 38% 65%, 45% 25%, 52% 75%, 58% 35%, 65% 80%, 72% 20%, 78% 60%, 85% 40%, 92% 85%, 100% 50%, 100% 100%)'
                }} 
              />
            </motion.div>

            {/* 대형 교통수단들이 도시를 가로지름 */}
            <motion.div className="absolute inset-0">
              {/* 거대한 버스 1 */}
              <motion.div
                className="absolute bottom-60 w-32 h-16 bg-yellow-500 rounded-lg shadow-lg"
                style={{ 
                  background: 'linear-gradient(45deg, #EAB308, #F59E0B)',
                  boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)'
                }}
                animate={{
                  x: [-150, windowWidth / 2 - 64, windowWidth / 2 - 64, windowWidth + 50]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1]
                }}
              >
                {/* 버스 창문 */}
                <div className="flex space-x-2 mt-2 ml-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3 h-8 bg-blue-300 opacity-60 rounded-sm" />
                  ))}
                </div>
                {/* 버스 바퀴 */}
                <motion.div
                  className="absolute -bottom-3 left-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1]
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 right-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1]
                  }}
                />
              </motion.div>
              
              {/* 거대한 버스 2 */}
              <motion.div
                className="absolute bottom-80 w-32 h-16 bg-yellow-500 rounded-lg shadow-lg"
                style={{ 
                  background: 'linear-gradient(45deg, #EAB308, #F59E0B)',
                  boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)'
                }}
                animate={{
                  x: [-150, windowWidth / 2 - 64, windowWidth / 2 - 64, windowWidth + 50]
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1],
                  delay: 7
                }}
              >
                {/* 버스 창문 */}
                <div className="flex space-x-2 mt-2 ml-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-3 h-8 bg-blue-300 opacity-60 rounded-sm" />
                  ))}
                </div>
                {/* 버스 바퀴 */}
                <motion.div
                  className="absolute -bottom-3 left-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1],
                    delay: 7
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 right-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1],
                    delay: 7
                  }}
                />
              </motion.div>
              
              {/* 거대한 지하철 1 */}
              <motion.div
                className="absolute bottom-40 w-40 h-12 bg-green-600 rounded-lg shadow-lg"
                style={{ 
                  background: 'linear-gradient(45deg, #16A34A, #22C55E)',
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
                }}
                animate={{
                  x: [windowWidth + 50, windowWidth / 2 - 80, windowWidth / 2 - 80, -200]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1]
                }}
              >
                {/* 지하철 창문 */}
                <div className="flex space-x-1 mt-2 ml-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-blue-200 opacity-70 rounded-sm" />
                  ))}
                </div>
              </motion.div>
              
              {/* 거대한 지하철 2 */}
              <motion.div
                className="absolute bottom-20 w-40 h-12 bg-green-600 rounded-lg shadow-lg"
                style={{ 
                  background: 'linear-gradient(45deg, #16A34A, #22C55E)',
                  boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
                }}
                animate={{
                  x: [windowWidth + 50, windowWidth / 2 - 80, windowWidth / 2 - 80, -200]
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1],
                  delay: 5
                }}
              >
                {/* 지하철 창문 */}
                <div className="flex space-x-1 mt-2 ml-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2 h-6 bg-blue-200 opacity-70 rounded-sm" />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* 거대한 군중 실루엣 - 화면 하단 전체 */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 w-full h-32"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gray-600 rounded-full opacity-80 shadow-lg"
                  style={{
                    left: `${Math.random() * 90 + 5}%`,
                    bottom: `${Math.random() * 40}px`,
                    width: `${8 + Math.random() * 6}px`,
                    height: `${30 + Math.random() * 25}px`,
                    background: `linear-gradient(to bottom, #4B5563, #374151)`,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}
                  animate={{
                    x: [0, Math.random() * 60 - 30, Math.random() * 40 - 20, 0],
                    scaleY: [1, 1.2, 0.9, 1.1, 1],
                    scaleX: [1, 0.8, 1.1, 0.9, 1],
                    y: [0, -5, 0, -3, 0]
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* 움직이는 사람들 - 중간 레이어 */}
            <motion.div className="absolute inset-0">
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`walking-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 95 + 2.5}%`,
                    bottom: `${Math.random() * 120 + 10}px`,
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ 
                    x: [0, 80 + Math.random() * 40, 60 + Math.random() * 50, 0],
                    y: [0, -2, 0, -1, 0],
                    opacity: [0, 1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="w-4 h-12 bg-gray-500 rounded-full opacity-60"
                    style={{
                      background: 'linear-gradient(to bottom, #6B7280, #4B5563)',
                      boxShadow: '0 1px 5px rgba(0,0,0,0.2)'
                    }}
                    animate={{
                      scaleY: [1, 1.1, 0.9, 1.05, 1],
                      scaleX: [1, 0.95, 1.05, 0.98, 1]
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {/* 중앙 텍스트 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div className="text-center from-slate-600/60 via-gray-500/50 to-sky-600/60 p-8 rounded-2xl">
                <motion.p
                  className="text-4xl text-sky-100 font-black-han-sans"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.5 }}
                >
                  도시 속 개인의 감정 여행
                </motion.p>
              </div>
            </motion.div>

            {/* 떠다니는 감정 버블들 */}
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`bubble-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 70 + 15}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        );

      case 1: // 도시의 리듬
        return (
          <motion.div
            key="section-1"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            {/* 교통수단 애니메이션 */}
            <div className="relative w-full max-w-4xl mx-auto h-40 mb-8">
              {/* 버스 1 */}
              <motion.div
                className="absolute top-10 w-16 h-8 bg-yellow-500 rounded"
                animate={{
                  x: [0, 200, 200, 400]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1]
                }}
              >
                {/* 버스 바퀴 */}
                <motion.div
                  className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1]
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1]
                  }}
                />
              </motion.div>
              
              {/* 버스 2 */}
              <motion.div
                className="absolute top-30 w-16 h-8 bg-yellow-500 rounded"
                animate={{
                  x: [0, 200, 200, 400]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1],
                  delay: 4
                }}
              >
                {/* 버스 바퀴 */}
                <motion.div
                  className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1],
                    delay: 4
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600"
                  animate={{
                    rotate: [0, 0, 0, 360]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.4, 0.6, 1],
                    delay: 4
                  }}
                />
              </motion.div>
              
              {/* 지하철 1 */}
              <motion.div
                className="absolute top-50 w-20 h-6 bg-green-500 rounded"
                animate={{
                  x: [400, 200, 200, -80]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1]
                }}
              />
              
              {/* 지하철 2 */}
              <motion.div
                className="absolute top-70 w-20 h-6 bg-green-500 rounded"
                animate={{
                  x: [400, 200, 200, -80]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1],
                  delay: 3
                }}
              />
              
              {/* 발걸음 애니메이션 */}
              <div className="absolute bottom-0 flex space-x-4 left-1/2 transform -translate-x-1/2">
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
              className="text-lg text-gray-300 font-black-han-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              반복되는 움직임 속에서 찾는 나만의 템포
            </motion.p>
          </motion.div>
        );

      case 2: // 감정의 흐트러짐
        return (
          <motion.div
            key="section-2"
            className="text-center relative w-full h-full"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.8 }}
          >
            {/* 중앙 인물 강조 */}
            <motion.div
              className="relative mx-auto mb-8"
              initial={{ scale: 1 }}
              animate={{ scale: 1.5 }}
              transition={{ duration: 1 }}
            >
              <div className="w-8 h-16 bg-white rounded-full mx-auto relative shadow-lg border-2 border-orange-300">
              </div>
            </motion.div>
            
            {/* 꽃 효과 */}
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`flower-${i}`}
                  className="absolute text-2xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: ['#FF8C00', '#FFA500', '#FFB84D', '#FF7F50', '#FF6347'][Math.floor(Math.random() * 5)]
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.2, 1, 1.5, 0],
                    opacity: [0, 0.8, 1, 0.6, 0],
                    rotate: [0, 90, 180, 270, 360],
                    y: [0, -30, -60, -90]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                >
                  🌸
                </motion.div>
              ))}
              
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`flower2-${i}`}
                  className="absolute text-xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: ['#FFD700', '#FFA500', '#FF8C00', '#FF4500'][Math.floor(Math.random() * 4)]
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0.8, 1.2, 0],
                    opacity: [0, 1, 0.8, 1, 0],
                    rotate: [0, -45, 0, 45, 0],
                    y: [0, -20, -40, -60]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeOut"
                  }}
                >
                  🌺
                </motion.div>
              ))}
              
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`flower3-${i}`}
                  className="absolute text-lg"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: ['#FFE4B5', '#FFDEAD', '#F4A460', '#DEB887'][Math.floor(Math.random() * 4)]
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.3, 0.9, 1.1, 0],
                    opacity: [0, 0.9, 1, 0.7, 0],
                    rotate: [0, 120, 240, 360],
                    y: [0, -25, -50, -75]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                >
                  🌼
                </motion.div>
              ))}
            </motion.div>

            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.p
                className="text-4xl text-orange-800 font-black-han-sans font-semibold text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                군중 속에서 일어나는 개인의 감정적 순간
              </motion.p>
            </motion.div>
          </motion.div>
        );

      case 3: // 다시 일상으로
        return (
          <motion.div
            key="section-3"
            className="text-center relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            {/* 색 번짐 효과 */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-purple-500 via-blue-500 to-transparent opacity-30"
              initial={{ scale: 0 }}
              animate={{ scale: 2, opacity: 0.6 }}
              transition={{ duration: 2 }}
            />
            
            {/* 군중으로 다시 합쳐지는 애니메이션 */}
            <motion.div className="flex justify-center space-x-1 mb-8">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-6 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                />
              ))}
            </motion.div>
            
            <motion.p
              className="text-lg text-gray-300 font-black-han-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              개인의 감정이 집단의 리듬과 하나가 되는 순간
            </motion.p>
          </motion.div>
        );

      case 4: // 감정 선택
        return (
          <motion.div
            key="section-4"
            className="text-center"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
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
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <h3 className="text-lg font-semibold mb-2 font-black-han-sans">{emotion.name}</h3>
                  <p className="text-sm text-gray-400 font-black-han-sans">{emotion.description}</p>
                </motion.button>
              ))}
            </motion.div>
            
            {selectedEmotion && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl mb-4 font-black-han-sans" style={{ color: selectedEmotion.color }}>
                  {selectedEmotion.name}을 선택하셨군요.
                </p>
                <p className="text-gray-300 font-black-han-sans">
                  당신의 감정이 도시의 리듬과 어우러져 새로운 이야기를 만들어갑니다.
                </p>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // 감정별 효과 컴포넌트
  const renderEmotionEffect = () => {
    if (!emotionEffect) return null;

    switch (emotionEffect) {
      case '평온함':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 물결 효과 */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-blue-300 rounded-full opacity-20"
                style={{
                  width: '200vw',
                  height: '200vw',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{ 
                  scale: [0, 1.5, 2],
                  opacity: [0.4, 0.2, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        );

      case '설렘':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 하트 효과 */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-50px',
                  color: '#F59E0B'
                }}
                initial={{ y: 0, opacity: 1, scale: 0.5 }}
                animate={{ 
                  y: -window.innerHeight - 100,
                  opacity: [1, 1, 0],
                  scale: [0.5, 1, 0.8],
                  rotate: [0, 10, -5, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        );

      case '불안':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 지그재그 번개 효과 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 bg-red-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  height: '200px',
                  transformOrigin: 'top center'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ 
                  scaleY: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotateZ: [0, Math.random() * 30 - 15, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
            {/* 화면 진동 효과 */}
            <motion.div
              className="fixed inset-0 bg-red-900 opacity-10"
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 2, -2, 0]
              }}
              transition={{
                duration: 0.3,
                repeat: 8,
                ease: "easeInOut"
              }}
            />
          </div>
        );

      case '희망':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 별 반짝임 효과 */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: '#10B981'
                }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1, 1.2, 0],
                  opacity: [0, 1, 0.8, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            ))}
            {/* 빛줄기 효과 */}
            <motion.div
              className="fixed inset-0 bg-gradient-to-t from-transparent via-green-200 to-transparent opacity-20"
              initial={{ y: window.innerHeight }}
              animate={{ y: -window.innerHeight }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            />
          </div>
        );

      case '우울':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 빗방울 효과 */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-blue-400 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: `${Math.random() * 40 + 20}px`,
                  top: '-50px'
                }}
                initial={{ y: 0, opacity: 0.6 }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: [0.6, 0.8, 0.2, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: i * 0.1,
                  ease: "linear",
                  repeat: 1
                }}
              />
            ))}
            {/* 구름 효과 */}
            <motion.div
              className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-600 to-transparent opacity-40"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 0.4 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        );

      case '활력':
        return (
          <div className="fixed inset-0 pointer-events-none z-20">
            {/* 폭죽 효과 */}
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={`${i}-${j}`}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0.5, 0],
                      x: Math.cos((j * 30) * Math.PI / 180) * 100,
                      y: Math.sin((j * 30) * Math.PI / 180) * 100,
                      opacity: [1, 1, 0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            ))}
            {/* 에너지 파장 */}
            <motion.div
              className="fixed inset-0 bg-gradient-radial from-orange-400 via-transparent to-transparent opacity-20"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 3, 1.5] }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="relative w-full h-[500vh] text-white overflow-hidden"
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* 감정 효과 렌더링 */}
      {renderEmotionEffect()}

      {/* 고정된 중앙 컨테이너 */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-10" style={{ transform: 'translateY(-100px)' }}>
        {/* 제목 */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSection}
              className="text-6xl font-bold font-black-han-sans text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {sectionTitles[currentSection]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* 섹션별 컨텐츠 */}
        <div className="flex-1 flex items-center justify-center w-full max-w-6xl px-8">
          <AnimatePresence mode="wait">
            {renderSectionContent()}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}