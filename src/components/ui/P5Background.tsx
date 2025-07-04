'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface P5BackgroundProps {
  variant?: 'particles' | 'lines' | 'dots' | 'paint';
  className?: string;
}

export default function P5Background({ variant = 'particles', className = '' }: P5BackgroundProps) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let mousePressed = false;
      let paintStrokes: PaintStroke[] = [];
      let lines: Line[] = [];
      let dots: Dot[] = [];

      class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
        color: p5.Color;
        life: number;
        maxLife: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
          this.vx = p.random(-1, 1);
          this.vy = p.random(-1, 1);
          this.size = p.random(1, 3);
          this.alpha = p.random(50, 150);
          this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(200, 255));
          this.life = 0;
          this.maxLife = p.random(200, 400);
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.life++;
          this.alpha = p.map(this.life, 0, this.maxLife, 150, 0);
          
          if (this.x < 0 || this.x > p.width) this.vx *= -1;
          if (this.y < 0 || this.y > p.height) this.vy *= -1;
        }

        display() {
          p.push();
          p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), this.alpha);
          p.noStroke();
          p.ellipse(this.x, this.y, this.size);
          p.pop();
        }

        isDead() {
          return this.life > this.maxLife;
        }
      }

      class PaintStroke {
        points: { x: number; y: number; size: number }[];
        color: p5.Color;
        alpha: number;

        constructor(x: number, y: number) {
          this.points = [{ x, y, size: p.random(5, 15) }];
          this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(200, 255));
          this.alpha = p.random(30, 80);
        }

        addPoint(x: number, y: number) {
          this.points.push({ x, y, size: p.random(5, 15) });
        }

        display() {
          p.push();
          p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), this.alpha);
          p.noStroke();
          for (let point of this.points) {
            p.ellipse(point.x, point.y, point.size);
          }
          p.pop();
        }
      }

      class Line {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        alpha: number;
        color: p5.Color;

        constructor() {
          this.x1 = p.random(p.width);
          this.y1 = p.random(p.height);
          this.x2 = p.random(p.width);
          this.y2 = p.random(p.height);
          this.alpha = p.random(20, 60);
          this.color = p.color(p.random(150, 255), p.random(150, 255), p.random(200, 255));
        }

        display() {
          p.push();
          p.stroke(p.red(this.color), p.green(this.color), p.blue(this.color), this.alpha);
          p.strokeWeight(p.random(0.5, 2));
          p.line(this.x1, this.y1, this.x2, this.y2);
          p.pop();
        }
      }

      class Dot {
        x: number;
        y: number;
        size: number;
        alpha: number;
        color: p5.Color;
        pulseSpeed: number;
        pulseOffset: number;

        constructor() {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.size = p.random(2, 8);
          this.alpha = p.random(50, 150);
          this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(200, 255));
          this.pulseSpeed = p.random(0.01, 0.03);
          this.pulseOffset = p.random(0, p.TWO_PI);
        }

        update() {
          this.alpha = 50 + 100 * p.sin(p.frameCount * this.pulseSpeed + this.pulseOffset);
        }

        display() {
          p.push();
          p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), this.alpha);
          p.noStroke();
          p.ellipse(this.x, this.y, this.size);
          p.pop();
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(sketchRef.current!);
        
        // Initialize based on variant
        if (variant === 'particles') {
          for (let i = 0; i < 50; i++) {
            particles.push(new Particle(p.random(p.width), p.random(p.height)));
          }
        } else if (variant === 'lines') {
          for (let i = 0; i < 20; i++) {
            lines.push(new Line());
          }
        } else if (variant === 'dots') {
          for (let i = 0; i < 30; i++) {
            dots.push(new Dot());
          }
        }
      };

      p.draw = () => {
        p.clear();
        
        if (variant === 'particles') {
          // Update and display particles
          for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].display();
            
            if (particles[i].isDead()) {
              particles.splice(i, 1);
            }
          }
          
          // Add new particles occasionally
          if (p.frameCount % 20 === 0 && particles.length < 50) {
            particles.push(new Particle(p.random(p.width), p.random(p.height)));
          }
        } else if (variant === 'paint') {
          // Display paint strokes
          for (let stroke of paintStrokes) {
            stroke.display();
          }
        } else if (variant === 'lines') {
          // Display lines
          for (let line of lines) {
            line.display();
          }
        } else if (variant === 'dots') {
          // Update and display dots
          for (let dot of dots) {
            dot.update();
            dot.display();
          }
        }
      };

      p.mousePressed = () => {
        mousePressed = true;
        if (variant === 'paint') {
          paintStrokes.push(new PaintStroke(p.mouseX, p.mouseY));
        }
      };

      p.mouseReleased = () => {
        mousePressed = false;
      };

      p.mouseDragged = () => {
        if (variant === 'paint' && mousePressed && paintStrokes.length > 0) {
          paintStrokes[paintStrokes.length - 1].addPoint(p.mouseX, p.mouseY);
        }
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
  }, [variant]);

  return (
    <div 
      ref={sketchRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}