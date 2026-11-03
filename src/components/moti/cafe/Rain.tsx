'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, type MutableRefObject } from 'react';

export interface RainHandle {
  /** 유리에 빗방울 하나 — x·y 는 캔버스 안 0~1 */
  addDrop: (x: number, y: number) => void;
}

interface RainProps {
  /** 빗발 세기 0~1 — 끝으로 갈수록 가늘어진다 */
  levelRef: MutableRefObject<number>;
  pausedRef: MutableRefObject<boolean>;
  /** 움직임 줄이기 — 비·빗방울을 멈춘 한 장면으로 */
  still: boolean;
  className?: string;
}

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
}

interface Drop {
  x: number;
  y: number;
  r: number;
  vy: number;
  sliding: boolean;
  trail: { x: number; y: number }[];
}

const MAX_STREAKS = 70;
const MAX_DROPS = 28;
/** 저전력 — 초당 30장까지만 그린다 */
const FRAME_MS = 33;

/** 창밖 빗줄기와 유리에 맺혔다 흘러내리는 빗방울 — 캔버스 2D. 빠른 깜빡임 없음. */
export const Rain = forwardRef<RainHandle, RainProps>(function Rain({ levelRef, pausedRef, still, className }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const drawRef = useRef<() => void>(() => {});

  useImperativeHandle(ref, () => ({
    addDrop(x, y) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      dropsRef.current.push({
        x: x * canvas.width,
        y: y * canvas.height,
        r: 4 + Math.random() * 2,
        vy: still ? 0 : 0.6,
        sliding: !still,
        trail: [],
      });
      if (dropsRef.current.length > MAX_DROPS) dropsRef.current.shift();
      if (still) drawRef.current();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let streaks: Streak[] = [];
    const newStreak = (anywhere: boolean): Streak => ({
      x: Math.random() * canvas.width,
      y: anywhere ? Math.random() * canvas.height : -20,
      len: 10 + Math.random() * 14,
      speed: 5 + Math.random() * 3,
    });

    // 1배율로 그린다 — 휴대폰 발열을 줄인다
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      streaks = Array.from({ length: MAX_STREAKS }, () => newStreak(true));
    };
    resize();
    window.addEventListener('resize', resize);

    if (dropsRef.current.length === 0) {
      dropsRef.current = Array.from({ length: 12 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2 + Math.random() * 3,
        vy: 0,
        sliding: false,
        trail: [],
      }));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const count = Math.round(MAX_STREAKS * levelRef.current);

      ctx.strokeStyle = 'rgba(110, 120, 132, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const s = streaks[i];
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - 2, s.y + s.len);
      }
      ctx.stroke();

      for (const d of dropsRef.current) {
        if (d.trail.length > 1) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
          ctx.lineWidth = d.r * 0.6;
          ctx.beginPath();
          ctx.moveTo(d.trail[0].x, d.trail[0].y);
          for (const p of d.trail) ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(90, 100, 112, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    drawRef.current = draw;

    if (still) {
      draw();
      // 멈춘 장면이어도 빗발이 가늘어지는 것(약 100초·끝)은 보여 준다 — 움직임 없이 다시 한 장
      let drawnLevel = levelRef.current;
      const id = setInterval(() => {
        if (levelRef.current === drawnLevel) return;
        drawnLevel = levelRef.current;
        draw();
      }, 1000);
      return () => {
        clearInterval(id);
        window.removeEventListener('resize', resize);
      };
    }

    let frame = 0;
    let last = 0;
    let spawnAt = 0;

    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      if (pausedRef.current || now - last < FRAME_MS) return;
      last = now;

      const level = levelRef.current;
      for (const s of streaks) {
        s.y += s.speed;
        if (s.y > canvas.height) Object.assign(s, newStreak(false));
      }

      // 빗방울이 맺히고, 가끔 하나씩 흘러내린다
      if (now > spawnAt && level > 0) {
        spawnAt = now + 500 / level;
        dropsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8,
          r: 2 + Math.random() * 3,
          vy: 0,
          sliding: false,
          trail: [],
        });
        const resting = dropsRef.current.filter((d) => !d.sliding);
        if (resting.length > 3 && Math.random() < 0.35) {
          resting[Math.floor(Math.random() * resting.length)].sliding = true;
        }
      }

      for (const d of dropsRef.current) {
        if (!d.sliding) continue;
        d.vy = Math.min(d.vy + 0.08, 2.4);
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 14) d.trail.shift();
        d.y += d.vy;
        d.x += (Math.random() - 0.5) * 0.6;
      }
      dropsRef.current = dropsRef.current.filter((d) => d.y - d.r < canvas.height).slice(-MAX_DROPS);

      draw();
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [still, levelRef, pausedRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
});
