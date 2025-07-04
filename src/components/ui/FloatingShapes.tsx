'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface FloatingShapesProps {
  className?: string;
}

export default function FloatingShapes({ className = '' }: FloatingShapesProps) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let shapes: Shape[] = [];
      let mouseTrail: { x: number; y: number; time: number }[] = [];
      let noiseOffset = 0;

      // 파스텔 컬러 팔레트 (아이보리, 핑크, 하늘색)
      const pastelColors = [
        // 아이보리 계열
        [250, 248, 240],  // 크림 아이보리
        [255, 250, 245],  // 플로랄 화이트
        [248, 248, 240],  // 베이지 아이보리
        
        // 핑크 계열
        [255, 228, 225],  // 미스티 로즈
        [255, 218, 185],  // 피치 퍼프
        [255, 192, 203],  // 라이트 핑크
        [255, 182, 193],  // 라이트 핑크
        
        // 하늘색 계열
        [173, 216, 230],  // 라이트 블루
        [176, 224, 230],  // 파우더 블루
        [230, 230, 250],  // 라벤더
        [240, 248, 255],  // 앨리스 블루
        [224, 255, 255],  // 라이트 시안
      ];

      class Shape {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        rotation: number;
        rotationSpeed: number;
        alpha: number;
        color: number[];
        type: 'circle' | 'triangle' | 'square' | 'pentagon' | 'hexagon';
        noiseOffset: number;
        targetX: number;
        targetY: number;
        birthTime: number;
        lifespan: number;

        constructor(x: number, y: number, followMouse: boolean = false) {
          this.x = x;
          this.y = y;
          this.vx = p.random(-0.5, 0.5);
          this.vy = p.random(-0.5, 0.5);
          this.size = p.random(20, 60);
          this.rotation = p.random(0, p.TWO_PI);
          this.rotationSpeed = p.random(-0.02, 0.02);
          this.alpha = p.random(30, 80);
          this.color = pastelColors[Math.floor(p.random(pastelColors.length))];
          this.type = p.random(['circle', 'triangle', 'square', 'pentagon', 'hexagon']);
          this.noiseOffset = p.random(1000);
          this.targetX = x;
          this.targetY = y;
          this.birthTime = p.millis();
          this.lifespan = followMouse ? p.random(3000, 5000) : Infinity;
        }

        update() {
          // 노이즈 기반 자연스러운 움직임
          const noiseX = p.noise(this.noiseOffset, p.frameCount * 0.005) * 2 - 1;
          const noiseY = p.noise(this.noiseOffset + 1000, p.frameCount * 0.005) * 2 - 1;
          
          this.vx += noiseX * 0.02;
          this.vy += noiseY * 0.02;
          
          // 속도 제한
          this.vx = p.constrain(this.vx, -2, 2);
          this.vy = p.constrain(this.vy, -2, 2);
          
          // 마우스 주변에서 생성된 경우 천천히 떠오르기
          if (this.lifespan !== Infinity) {
            this.vy -= 0.03;
            this.vx *= 0.99;
          }

          this.x += this.vx;
          this.y += this.vy;
          this.rotation += this.rotationSpeed;

          // 화면 경계 처리
          if (this.x < -this.size) this.x = p.width + this.size;
          if (this.x > p.width + this.size) this.x = -this.size;
          if (this.y < -this.size) this.y = p.height + this.size;
          if (this.y > p.height + this.size) this.y = -this.size;

          // 수명 기반 알파 조절
          if (this.lifespan !== Infinity) {
            const age = p.millis() - this.birthTime;
            const lifeRatio = age / this.lifespan;
            if (lifeRatio > 0.7) {
              this.alpha = p.map(lifeRatio, 0.7, 1, 80, 0);
            }
          }

          this.noiseOffset += 0.01;
        }

        display() {
          p.push();
          p.translate(this.x, this.y);
          p.rotate(this.rotation);
          
          // 그림자 효과
          p.fill(0, 0, 0, this.alpha * 0.1);
          p.noStroke();
          p.translate(3, 3);
          this.drawShape();
          
          p.translate(-3, -3);
          
          // 메인 도형
          p.fill(this.color[0], this.color[1], this.color[2], this.alpha);
          p.stroke(255, 255, 255, this.alpha * 0.3);
          p.strokeWeight(1);
          this.drawShape();
          
          p.pop();
        }

        drawShape() {
          switch (this.type) {
            case 'circle':
              p.ellipse(0, 0, this.size);
              break;
            case 'triangle':
              p.triangle(
                -this.size/2, this.size/2,
                this.size/2, this.size/2,
                0, -this.size/2
              );
              break;
            case 'square':
              p.rect(-this.size/2, -this.size/2, this.size, this.size);
              break;
            case 'pentagon':
              this.drawPolygon(5, this.size/2);
              break;
            case 'hexagon':
              this.drawPolygon(6, this.size/2);
              break;
          }
        }

        drawPolygon(sides: number, radius: number) {
          p.beginShape();
          for (let i = 0; i < sides; i++) {
            const angle = (i * p.TWO_PI) / sides;
            const x = radius * p.cos(angle);
            const y = radius * p.sin(angle);
            p.vertex(x, y);
          }
          p.endShape(p.CLOSE);
        }

        isDead() {
          return this.lifespan !== Infinity && p.millis() - this.birthTime > this.lifespan;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(sketchRef.current!);
        
        // 초기 도형들 생성
        for (let i = 0; i < 15; i++) {
          shapes.push(new Shape(p.random(p.width), p.random(p.height)));
        }
      };

      p.draw = () => {
        p.clear();
        
        // 마우스 트레일 업데이트
        if (p.mouseX > 0 && p.mouseY > 0) {
          mouseTrail.push({
            x: p.mouseX,
            y: p.mouseY,
            time: p.millis()
          });
        }
        
        // 오래된 마우스 트레일 제거
        mouseTrail = mouseTrail.filter(trail => p.millis() - trail.time < 1000);
        
        // 마우스 움직임에 따라 새로운 도형 생성
        if (mouseTrail.length > 2 && p.frameCount % 20 === 0) {
          const recentPos = mouseTrail[mouseTrail.length - 1];
          if (shapes.filter(s => s.lifespan !== Infinity).length < 10) {
            shapes.push(new Shape(recentPos.x, recentPos.y, true));
          }
        }
        
        // 도형들 업데이트 및 표시
        for (let i = shapes.length - 1; i >= 0; i--) {
          shapes[i].update();
          shapes[i].display();
          
          if (shapes[i].isDead()) {
            shapes.splice(i, 1);
          }
        }
        
        // 최소 도형 수 유지
        while (shapes.filter(s => s.lifespan === Infinity).length < 12) {
          shapes.push(new Shape(p.random(p.width), p.random(p.height)));
        }
        
        noiseOffset += 0.005;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={sketchRef} 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}