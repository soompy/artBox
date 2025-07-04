'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface StarTrailProps {
  className?: string;
}

export default function StarTrail({ className = '' }: StarTrailProps) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let stars: Star[] = [];
      let constellations: Constellation[] = [];
      let mouseHistory: { x: number; y: number; time: number }[] = [];

      class Star {
        x: number;
        y: number;
        size: number;
        alpha: number;
        maxAlpha: number;
        birthTime: number;
        lifespan: number;
        twinkleOffset: number;
        color: p5.Color;

        constructor(x: number, y: number) {
          this.x = x + p.random(-15, 15);
          this.y = y + p.random(-15, 15);
          this.size = p.random(2, 6);
          this.maxAlpha = p.random(150, 255);
          this.alpha = this.maxAlpha;
          this.birthTime = p.millis();
          this.lifespan = p.random(2000, 4000);
          this.twinkleOffset = p.random(0, p.TWO_PI);
          this.color = p.color(
            p.random(200, 255),
            p.random(200, 255),
            p.random(150, 255)
          );
        }

        update() {
          const age = p.millis() - this.birthTime;
          const lifeRatio = age / this.lifespan;
          
          if (lifeRatio < 0.1) {
            // Fade in
            this.alpha = p.map(lifeRatio, 0, 0.1, 0, this.maxAlpha);
          } else if (lifeRatio > 0.7) {
            // Fade out
            this.alpha = p.map(lifeRatio, 0.7, 1, this.maxAlpha, 0);
          } else {
            // Twinkle
            const twinkle = p.sin(p.frameCount * 0.05 + this.twinkleOffset);
            this.alpha = this.maxAlpha * (0.7 + 0.3 * twinkle);
          }
        }

        display() {
          p.push();
          
          // Star glow
          p.fill(
            p.red(this.color),
            p.green(this.color),
            p.blue(this.color),
            this.alpha * 0.3
          );
          p.noStroke();
          p.ellipse(this.x, this.y, this.size * 3);
          
          // Star core
          p.fill(
            p.red(this.color),
            p.green(this.color),
            p.blue(this.color),
            this.alpha
          );
          p.ellipse(this.x, this.y, this.size);
          
          // Star sparkle
          p.stroke(255, this.alpha * 0.8);
          p.strokeWeight(1);
          const sparkleSize = this.size * 1.5;
          p.line(this.x - sparkleSize, this.y, this.x + sparkleSize, this.y);
          p.line(this.x, this.y - sparkleSize, this.x, this.y + sparkleSize);
          
          p.pop();
        }

        isDead() {
          return p.millis() - this.birthTime > this.lifespan;
        }
      }

      class Constellation {
        stars: Star[];
        connections: { from: number; to: number }[];
        alpha: number;
        birthTime: number;
        lifespan: number;

        constructor(mousePos: { x: number; y: number }[]) {
          this.stars = [];
          this.connections = [];
          this.alpha = 255;
          this.birthTime = p.millis();
          this.lifespan = 3000;

          // Create stars based on mouse positions
          for (let i = 0; i < mousePos.length; i++) {
            this.stars.push(new Star(mousePos[i].x, mousePos[i].y));
          }

          // Create connections between nearby stars
          for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
              const dist = p.dist(
                this.stars[i].x, this.stars[i].y,
                this.stars[j].x, this.stars[j].y
              );
              if (dist < 100 && p.random() < 0.4) {
                this.connections.push({ from: i, to: j });
              }
            }
          }
        }

        update() {
          const age = p.millis() - this.birthTime;
          const lifeRatio = age / this.lifespan;
          
          if (lifeRatio > 0.6) {
            this.alpha = p.map(lifeRatio, 0.6, 1, 255, 0);
          }

          // Update stars
          for (let star of this.stars) {
            star.update();
          }
        }

        display() {
          p.push();
          
          // Draw connections
          p.stroke(200, 220, 255, this.alpha * 0.3);
          p.strokeWeight(1);
          for (let connection of this.connections) {
            const starA = this.stars[connection.from];
            const starB = this.stars[connection.to];
            if (starA && starB) {
              p.line(starA.x, starA.y, starB.x, starB.y);
            }
          }
          
          // Draw stars
          for (let star of this.stars) {
            star.display();
          }
          
          p.pop();
        }

        isDead() {
          return p.millis() - this.birthTime > this.lifespan;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(sketchRef.current!);
      };

      p.draw = () => {
        p.clear();
        
        // Update mouse history
        if (p.mouseX > 0 && p.mouseY > 0) {
          mouseHistory.push({
            x: p.mouseX,
            y: p.mouseY,
            time: p.millis()
          });
        }
        
        // Remove old mouse positions
        mouseHistory = mouseHistory.filter(pos => p.millis() - pos.time < 500);
        
        // Create constellation when mouse moves
        if (mouseHistory.length > 3 && p.frameCount % 10 === 0) {
          const recentPositions = mouseHistory.slice(-8);
          if (recentPositions.length >= 3) {
            constellations.push(new Constellation(recentPositions));
          }
        }
        
        // Update and display constellations
        for (let i = constellations.length - 1; i >= 0; i--) {
          constellations[i].update();
          constellations[i].display();
          
          if (constellations[i].isDead()) {
            constellations.splice(i, 1);
          }
        }
        
        // Update and display individual stars
        for (let i = stars.length - 1; i >= 0; i--) {
          stars[i].update();
          stars[i].display();
          
          if (stars[i].isDead()) {
            stars.splice(i, 1);
          }
        }
        
        // Add ambient stars occasionally
        if (p.frameCount % 120 === 0 && stars.length < 20) {
          stars.push(new Star(p.random(p.width), p.random(p.height)));
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
  }, []);

  return (
    <div 
      ref={sketchRef} 
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1000 }}
    />
  );
}