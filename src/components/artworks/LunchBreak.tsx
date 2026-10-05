'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Artwork } from '@/types/artwork';
import { webglManager } from '@/utils/webglManager';

interface LunchBreakProps {
  artwork: Artwork;
}

/** 작품 길이. 화면을 보고 있는 시간만 센다(다른 앱으로 나가 있으면 멈춘다). */
const SESSION_SECONDS = 120;
/** 손을 대지 않으면 해가 이 주기로 천천히 하늘을 돈다(초). */
const DRIFT_PERIOD = 40;
const RETURN_URL = 'momenttune://';
const MARQUEE_TEXT = 'HAPPY LUNCH TIME ✨ HAPPY LUNCH TIME ✨ ';

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float sunRays(vec2 st, vec2 center, float time) {
    vec2 dir = st - center;
    float angle = atan(dir.y, dir.x);
    float dist = length(dir);
    float rays = sin(angle * 6.0 + time * 2.0) * 0.5 + 0.5;
    rays *= smoothstep(0.8, 0.0, dist);
    return rays;
  }

  float clouds(vec2 st, float time) {
    vec2 q = st * 3.0;
    float f = 0.0;
    f += 0.5 * smoothNoise(q + time * 0.1);
    f += 0.25 * smoothNoise(q * 2.0 + time * 0.2);
    f += 0.125 * smoothNoise(q * 4.0 + time * 0.3);
    return smoothstep(0.3, 0.8, f);
  }

  vec3 warmGradient(vec2 st, float time) {
    float y = st.y + sin(st.x * 2.0 + time * 0.5) * 0.1;
    vec3 skyBlue = vec3(0.6, 0.8, 1.0);
    vec3 warmOrange = vec3(1.0, 0.8, 0.4);
    vec3 lightYellow = vec3(1.0, 0.95, 0.7);
    vec3 color = mix(skyBlue, warmOrange, smoothstep(0.3, 0.7, y));
    color = mix(color, lightYellow, smoothstep(0.6, 1.0, y));
    return color;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;

    float slowTime = u_time * 0.3;
    vec2 sunCenter = vec2(u_mouse.x * aspect, 1.0 - u_mouse.y);

    vec3 color = warmGradient(st, slowTime);
    color += sunRays(st, sunCenter, slowTime) * vec3(1.0, 0.9, 0.6) * 0.3;
    color = mix(color, vec3(1.0), clouds(st, slowTime) * 0.32);
    float sun = smoothstep(0.15, 0.05, distance(st, sunCenter));
    color += sun * vec3(1.0, 0.95, 0.8);
    color = mix(color, vec3(1.0, 0.9, 0.7), 0.1);
    float vignette = smoothstep(0.8, 0.2, distance(st, vec2(0.5 * aspect, 0.5)));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

/** 앱(모먼트튠)에서 열었는지 — 끝 화면의 «돌아가기» 대상만 바꾼다. 아무것도 기록하지 않는다. */
function openedFromApp(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('from') === 'momenttune';
}

export function LunchBreak({ artwork }: LunchBreakProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sunRef = useRef({ x: 0.5, y: 0.35 });
  const touchedRef = useRef(false);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const reduceMotion = useReducedMotion() ?? false;

  const [isReady, setIsReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [fromApp, setFromApp] = useState(false);
  const [runId, setRunId] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setFromApp(openedFromApp());
  }, []);

  // WebGL — 한 번만 만들고, 해 위치·시간은 ref 로 넘긴다(React 다시 그리기 없이).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) {
      setWebglFailed(true);
      setIsReady(true);
      return;
    }

    const program = webglManager.getOrCreateShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      setWebglFailed(true);
      setIsReady(true);
      return;
    }
    webglManager.registerContext('lunch-break', gl);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // 배경 효과라 1배율로 그린다 — 휴대폰 발열을 줄인다.
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let frame = 0;
    let last = 0;
    let shaderTime = 0;
    const speed = reduceMotion ? 0.25 : 1;

    const render = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;

      if (!pausedRef.current) {
        shaderTime += dt * speed;
        if (!touchedRef.current) {
          const a = (shaderTime / DRIFT_PERIOD) * Math.PI * 2;
          sunRef.current = { x: 0.5 + Math.cos(a) * 0.28, y: 0.32 + Math.sin(a) * 0.08 };
        }
      }

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, shaderTime);
      gl.uniform2f(mouseLocation, sunRef.current.x, sunRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    setIsReady(true);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frame);
      setWebglFailed(true);
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.deleteBuffer(positionBuffer);
      webglManager.cleanup('lunch-break');
    };
  }, [reduceMotion]);

  // 화면을 보고 있는 시간만 센다. 다 되면 끝 화면.
  useEffect(() => {
    if (finished) return;
    let last = performance.now();
    const tick = setInterval(() => {
      const now = performance.now();
      if (!pausedRef.current) {
        elapsedRef.current += (now - last) / 1000;
        setProgress(Math.min(elapsedRef.current / SESSION_SECONDS, 1));
        if (elapsedRef.current >= SESSION_SECONDS) setFinished(true);
      }
      last = now;
    }, 500);
    return () => clearInterval(tick);
  }, [finished, runId]);

  // 다른 앱·탭으로 나가면 멈춘다(배터리·시간).
  useEffect(() => {
    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // 손가락·마우스 모두 pointer 로. 화면을 쓸어도 페이지가 스크롤되지 않게 touch-action: none.
  const moveSun = (e: React.PointerEvent<HTMLDivElement>) => {
    if (finished) return;
    const rect = e.currentTarget.getBoundingClientRect();
    touchedRef.current = true;
    sunRef.current = {
      x: Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1),
      y: Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1),
    };
  };

  const replay = () => {
    elapsedRef.current = 0;
    touchedRef.current = false;
    setProgress(0);
    setFinished(false);
    setRunId((n) => n + 1);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300 select-none"
      style={{ height: '100dvh', touchAction: 'none' }}
      onPointerDown={moveSun}
      onPointerMove={(e) => {
        if (e.pointerType === 'mouse' || e.buttons > 0) moveSun(e);
      }}
    >
      {!webglFailed && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true" />
      )}

      {/* 흐르는 글자 — 줄 단위로만 움직인다(글자마다 애니메이션을 걸면 휴대폰에서 끊긴다). 움직임 줄이기 설정이면 숨긴다. */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute whitespace-nowrap font-bold"
              style={{
                top: `${22 + i * 22}%`,
                fontSize: 'clamp(2rem, 9vw, 3.75rem)',
                color: 'rgba(255, 140, 0, 0.5)',
                textShadow: '2px 2px 0 rgba(255, 140, 0, 0.45), 4px 4px 0 rgba(200, 80, 0, 0.25)',
                fontFamily: 'Arial Black, sans-serif',
                letterSpacing: '0.2em',
                willChange: 'transform',
              }}
              initial={{ x: '100vw' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 34 + i * 6, repeat: Infinity, ease: 'linear', delay: i * 5 }}
            >
              {MARQUEE_TEXT}
            </motion.div>
          ))}
        </div>
      )}

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-orange-200/80">
          <p className="text-orange-800 font-black-han-sans text-xl">햇빛을 준비하고 있어요</p>
        </div>
      )}

      {/* 안내 */}
      {!finished && (
        <motion.div
          className="absolute left-6 right-6 text-orange-900/90 font-black-han-sans pointer-events-none"
          style={{ top: 'calc(env(safe-area-inset-top) + 4.5rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 9, delay: 1.5, times: [0, 0.15, 0.8, 1] }}
        >
          <p className="text-base mb-1">화면을 쓸어 해의 자리를 옮겨 보세요</p>
          <p className="text-sm opacity-75">가만히 두면 해가 천천히 하늘을 돌아요</p>
        </motion.div>
      )}

      {/* 작품 제목 */}
      <div
        className="absolute left-6 text-orange-900 pointer-events-none"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 1.75rem)' }}
      >
        <h1 className="text-3xl font-bold font-black-han-sans mb-1">{artwork.title}</h1>
        <p className="text-base opacity-80 font-black-han-sans">따뜻한 낮빛 속 잠깐의 틈</p>
      </div>

      {/* 남은 시간 — 숫자 대신 가는 선 하나 */}
      <div
        className="absolute left-0 right-0 h-[3px] bg-orange-900/10"
        style={{ bottom: 'env(safe-area-inset-bottom)' }}
        aria-hidden="true"
      >
        <div className="h-full bg-orange-900/40" style={{ width: `${progress * 100}%`, transition: 'width 0.5s linear' }} />
      </div>

      {/* 끝 화면 */}
      {finished && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-orange-50/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2 }}
          onPointerDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="작품이 끝났어요"
        >
          <div className="mx-6 max-w-sm text-center text-orange-950 font-black-han-sans">
            <p className="text-2xl mb-2">잠깐의 틈, 다 봤어요</p>
            <p className="text-base opacity-75 mb-8">오늘 볕은 어땠나요</p>
            <div className="flex flex-col gap-3">
              {fromApp && (
                <a
                  href={RETURN_URL}
                  className="rounded-full bg-[#6A473A] px-6 py-3 text-base text-[#FBF5E9] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
                >
                  모먼트튠으로 돌아가기
                </a>
              )}
              <button
                type="button"
                onClick={replay}
                className="rounded-full border border-orange-900/30 px-6 py-3 text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
              >
                한 번 더 보기
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
