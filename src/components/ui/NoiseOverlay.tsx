'use client';

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

interface NoiseOverlayProps {
  isVisible: boolean;
  className?: string;
}

export default function NoiseOverlay({ isVisible, className = '' }: NoiseOverlayProps) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!sketchRef.current) return;

    const updateDimensions = () => {
      if (sketchRef.current) {
        const rect = sketchRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!sketchRef.current || !isVisible || dimensions.width === 0) return;

    const sketch = (p: p5) => {
      let noiseOffset = 0;
      let particles: Particle[] = [];
      let glitchLines: GlitchLine[] = [];

      class Particle {
        x: number;
        y: number;
        baseX: number;
        baseY: number;
        size: number;
        alpha: number;
        noiseOffset: number;

        constructor() {
          this.baseX = p.random(p.width);
          this.baseY = p.random(p.height);
          this.x = this.baseX;
          this.y = this.baseY;
          this.size = p.random(1, 3);
          this.alpha = p.random(50, 150);
          this.noiseOffset = p.random(1000);
        }

        update() {
          // 노이즈 기반 흔들림
          const noiseX = p.noise(this.noiseOffset, p.frameCount * 0.01) * 20 - 10;
          const noiseY = p.noise(this.noiseOffset + 1000, p.frameCount * 0.01) * 20 - 10;
          
          this.x = this.baseX + noiseX;
          this.y = this.baseY + noiseY;
          
          this.noiseOffset += 0.01;
        }

        display() {
          p.push();
          p.fill(255, 255, 255, this.alpha);
          p.noStroke();
          p.ellipse(this.x, this.y, this.size);
          p.pop();
        }
      }

      class GlitchLine {
        x: number;
        y: number;
        length: number;
        angle: number;
        alpha: number;
        speed: number;
        thickness: number;

        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.length = p.random(20, 60);
          this.angle = p.random(p.TWO_PI);
          this.alpha = p.random(100, 200);
          this.speed = p.random(0.02, 0.08);
          this.thickness = p.random(1, 3);
        }

        update() {
          this.angle += this.speed;
          this.alpha *= 0.98;
          
          // 노이즈로 위치 흔들기
          const noiseShake = p.noise(p.frameCount * 0.05) * 5 - 2.5;
          this.x += noiseShake;
          this.y += noiseShake * 0.5;
        }

        display() {
          p.push();
          p.stroke(255, 255, 255, this.alpha);
          p.strokeWeight(this.thickness);
          p.strokeCap(p.ROUND);
          
          const endX = this.x + p.cos(this.angle) * this.length;
          const endY = this.y + p.sin(this.angle) * this.length;
          
          p.line(this.x, this.y, endX, endY);
          p.pop();
        }

        isDead() {
          return this.alpha < 10;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(dimensions.width, dimensions.height);
        canvas.parent(sketchRef.current!);
        
        // 초기 파티클 생성
        for (let i = 0; i < 30; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        p.clear();
        
        // 배경 노이즈 효과
        p.push();
        p.fill(255, 255, 255, 5);
        p.noStroke();
        
        for (let x = 0; x < p.width; x += 20) {
          for (let y = 0; y < p.height; y += 20) {
            const noiseVal = p.noise(x * 0.01, y * 0.01, p.frameCount * 0.005);
            if (noiseVal > 0.6) {
              p.rect(x, y, 20, 20);
            }
          }
        }
        p.pop();

        // 파티클 업데이트 및 표시
        for (let particle of particles) {
          particle.update();
          particle.display();
        }

        // 글리치 라인 생성
        if (p.frameCount % 5 === 0 && glitchLines.length < 15) {
          glitchLines.push(new GlitchLine());
        }

        // 글리치 라인 업데이트 및 표시
        for (let i = glitchLines.length - 1; i >= 0; i--) {
          glitchLines[i].update();
          glitchLines[i].display();
          
          if (glitchLines[i].isDead()) {
            glitchLines.splice(i, 1);
          }
        }

        // 전체적인 노이즈 오버레이
        p.push();
        p.loadPixels();
        for (let i = 0; i < p.pixels.length; i += 4) {
          if (p.random() < 0.05) {
            const noise = p.random(0, 50);
            p.pixels[i] = 255;     // R
            p.pixels[i + 1] = 255; // G
            p.pixels[i + 2] = 255; // B
            p.pixels[i + 3] = noise; // A
          }
        }
        p.updatePixels();
        p.pop();

        noiseOffset += 0.01;
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [isVisible, dimensions]);

  if (!isVisible) return null;

  return (
    <div 
      ref={sketchRef} 
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
}