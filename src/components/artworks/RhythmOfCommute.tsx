'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Artwork } from '@/types/artwork';

interface RhythmOfCommuteProps {
  artwork: Artwork;
}

gsap.registerPlugin(ScrollTrigger);

export function RhythmOfCommute({ artwork }: RhythmOfCommuteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [emotionLevel, setEmotionLevel] = useState(0.5);

  const scenes = [
    {
      title: "집을 나서며",
      description: "새로운 하루의 시작, 설렘과 불안이 교차하는 순간",
      emotion: "anticipation",
      color: "#4F46E5"
    },
    {
      title: "지하철 플랫폼",
      description: "수많은 사람들 사이에서 느끼는 고독과 연결감",
      emotion: "isolation",
      color: "#7C3AED"
    },
    {
      title: "출근길 풍경",
      description: "창 밖을 스쳐가는 도시의 리듬, 반복되는 일상",
      emotion: "rhythm",
      color: "#2563EB"
    },
    {
      title: "사무실 도착",
      description: "목적지에 도착한 안도감과 새로운 도전에 대한 각오",
      emotion: "determination",
      color: "#059669"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const sceneIndex = Math.floor(progress * scenes.length);
            const sceneProgress = (progress * scenes.length) % 1;
            
            setCurrentScene(Math.min(sceneIndex, scenes.length - 1));
            setEmotionLevel(0.3 + (Math.sin(progress * Math.PI * 4) * 0.4 + 0.4) * 0.7);
          }
        }
      });

      scenes.forEach((scene, index) => {
        tl.to('.scene-background', {
          backgroundColor: scene.color,
          duration: 0.25
        }, index / scenes.length);
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scenes.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentSceneData = scenes[currentScene];
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, `${currentSceneData.color}20`);
      gradient.addColorStop(1, `${currentSceneData.color}05`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx * emotionLevel;
        particle.y += particle.vy * emotionLevel;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * emotionLevel, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * emotionLevel})`;
        ctx.fill();

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );

        if (distance < 100 * emotionLevel) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * emotionLevel})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentScene, emotionLevel, scenes]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[400vh] overflow-hidden"
    >
      <div className="scene-background fixed inset-0 transition-colors duration-1000" />
      
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-2xl px-8">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {scenes[currentScene]?.title}
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              {scenes[currentScene]?.description}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-sm text-white/60">감정 강도</span>
              <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${emotionLevel * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-sm text-white/60">
                {Math.round(emotionLevel * 100)}%
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-none">
        {scenes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentScene ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-8 right-8 text-white/60 text-sm pointer-events-none">
        <p>스크롤하여 이야기를 탐험하세요</p>
      </div>
    </div>
  );
}