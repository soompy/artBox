'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface InteractiveCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function InteractiveCanvas({ className = '', interactive = false }: InteractiveCanvasProps) {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      let brushStrokes: BrushStroke[] = [];
      let isDrawing = false;
      let currentStroke: BrushStroke | null = null;
      let fadeTimer = 0;

      class BrushStroke {
        points: { x: number; y: number; pressure: number }[];
        color: p5.Color;
        alpha: number;
        birthTime: number;

        constructor(x: number, y: number) {
          this.points = [{ x, y, pressure: 1 }];
          this.color = p.color(
            p.random(150, 255),
            p.random(100, 200),
            p.random(200, 255)
          );
          this.alpha = p.random(80, 150);
          this.birthTime = p.millis();
        }

        addPoint(x: number, y: number, pressure: number = 1) {
          this.points.push({ x, y, pressure });
        }

        display() {
          if (this.points.length < 2) return;

          p.push();
          p.noFill();
          p.strokeCap(p.ROUND);
          p.strokeJoin(p.ROUND);

          for (let i = 1; i < this.points.length; i++) {
            const prev = this.points[i - 1];
            const curr = this.points[i];
            
            const weight = p.map(curr.pressure, 0, 1, 2, 15);
            const alpha = this.alpha * p.map(i, 0, this.points.length, 0.3, 1);
            
            p.stroke(
              p.red(this.color),
              p.green(this.color),
              p.blue(this.color),
              alpha
            );
            p.strokeWeight(weight);
            p.line(prev.x, prev.y, curr.x, curr.y);
          }
          p.pop();
        }

        fade() {
          const age = p.millis() - this.birthTime;
          if (age > 5000) {
            this.alpha = p.max(0, this.alpha - 2);
          }
        }

        isDead() {
          return this.alpha <= 0;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(sketchRef.current!);
        p.background(0, 0);
      };

      p.draw = () => {
        p.clear();
        
        // Update and display brush strokes
        for (let i = brushStrokes.length - 1; i >= 0; i--) {
          brushStrokes[i].fade();
          brushStrokes[i].display();
          
          if (brushStrokes[i].isDead()) {
            brushStrokes.splice(i, 1);
          }
        }

        // Add ambient particles
        if (p.frameCount % 60 === 0) {
          for (let i = 0; i < 3; i++) {
            const ambientStroke = new BrushStroke(
              p.random(p.width),
              p.random(p.height)
            );
            ambientStroke.addPoint(
              ambientStroke.points[0].x + p.random(-20, 20),
              ambientStroke.points[0].y + p.random(-20, 20),
              p.random(0.3, 0.7)
            );
            ambientStroke.alpha = 30;
            brushStrokes.push(ambientStroke);
          }
        }

        fadeTimer++;
        if (fadeTimer > 300) {
          fadeTimer = 0;
        }
      };

      p.mousePressed = () => {
        if (!interactive) return;
        
        isDrawing = true;
        currentStroke = new BrushStroke(p.mouseX, p.mouseY);
        brushStrokes.push(currentStroke);
      };

      p.mouseDragged = () => {
        if (!interactive || !isDrawing || !currentStroke) return;
        
        const speed = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        const pressure = p.map(speed, 0, 20, 1, 0.3);
        
        currentStroke.addPoint(p.mouseX, p.mouseY, pressure);
      };

      p.mouseReleased = () => {
        isDrawing = false;
        currentStroke = null;
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
  }, [interactive]);

  return (
    <div 
      ref={sketchRef} 
      className={`absolute inset-0 ${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}
      style={{ zIndex: interactive ? 10 : 1 }}
    />
  );
}