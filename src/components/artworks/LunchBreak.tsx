'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '@/types/artwork';
import { webglManager } from '@/utils/webglManager';

interface LunchBreakProps {
  artwork: Artwork;
}

export function LunchBreak({ artwork }: LunchBreakProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [time, setTime] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  // 따뜻한 낮빛 효과를 위한 버텍스 셰이더
  const vertexShaderSource = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    
    varying vec2 v_texCoord;
    
    void main() {
      gl_Position = a_position;
      v_texCoord = a_texCoord;
    }
  `;

  // 따뜻한 낮빛과 평온함을 표현하는 프래그먼트 셰이더
  const fragmentShaderSource = `
    precision mediump float;
    
    varying vec2 v_texCoord;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    // 노이즈 함수
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
    
    // 태양 광선 효과
    float sunRays(vec2 st, vec2 center, float time) {
      vec2 dir = st - center;
      float angle = atan(dir.y, dir.x);
      float dist = length(dir);
      
      float rays = sin(angle * 6.0 + time * 2.0) * 0.5 + 0.5;
      rays *= smoothstep(0.8, 0.0, dist);
      
      return rays;
    }
    
    // 부드러운 구름 효과
    float clouds(vec2 st, float time) {
      vec2 q = st * 3.0;
      float f = 0.0;
      f += 0.5 * smoothNoise(q + time * 0.1);
      f += 0.25 * smoothNoise(q * 2.0 + time * 0.2);
      f += 0.125 * smoothNoise(q * 4.0 + time * 0.3);
      
      return smoothstep(0.3, 0.8, f);
    }
    
    // 따뜻한 그라데이션
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
      st.x *= u_resolution.x / u_resolution.y;
      
      // 시간 기반 애니메이션
      float slowTime = u_time * 0.3;
      
      // 마우스 위치를 태양 중심으로 사용
      vec2 sunCenter = vec2(u_mouse.x, 1.0 - u_mouse.y);
      
      // 기본 따뜻한 배경 그라데이션
      vec3 color = warmGradient(st, slowTime);
      
      // 태양 광선 효과
      float rays = sunRays(st, sunCenter, slowTime);
      color += rays * vec3(1.0, 0.9, 0.6) * 0.3;
      
      // 부드러운 구름
      float cloudLayer = clouds(st, slowTime);
      vec3 cloudColor = vec3(1.0, 1.0, 1.0) * 0.8;
      color = mix(color, cloudColor, cloudLayer * 0.4);
      
      // 태양 자체
      float sunDist = distance(st, sunCenter);
      float sun = smoothstep(0.15, 0.05, sunDist);
      color += sun * vec3(1.0, 0.95, 0.8);
      
      // 전체적인 따뜻한 톤 증가
      color = mix(color, vec3(1.0, 0.9, 0.7), 0.1);
      
      // 부드러운 비네팅
      float vignette = smoothstep(0.8, 0.2, distance(st, vec2(0.5, 0.5)));
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // 마우스 움직임 핸들러 최적화
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: e.clientX / windowWidth,
      y: e.clientY / (typeof window !== 'undefined' ? window.innerHeight : 800)
    });
  }, [windowWidth]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // WebGL 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // 캔버스 크기 설정
    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      gl.viewport(0, 0, innerWidth, innerHeight);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // WebGL 매니저를 사용하여 셰이더 프로그램 생성/캐싱
    const program = webglManager.getOrCreateShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    // 컨텍스트 등록
    webglManager.registerContext('lunch-break', gl);

    programRef.current = program;

    // 정점 데이터 설정
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]);

    // 버퍼 설정
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // 속성 위치 가져오기
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordAttributeLocation = gl.getAttribLocation(program, 'a_texCoord');

    // 유니폼 위치 가져오기
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');

    // 렌더링 함수
    const render = (timestamp: number) => {
      const seconds = timestamp * 0.001;
      setTime(seconds);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // 위치 속성 설정
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // 텍스처 좌표 속성 설정
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(texCoordAttributeLocation);
      gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // 유니폼 설정
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, seconds);
      gl.uniform2f(mouseUniformLocation, mousePos.x, mousePos.y);

      // 그리기
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    setIsReady(true);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // WebGL 리소스 정리
      webglManager.cleanup('lunch-break');
    };
  }, [mousePos]);

  // 마우스 움직임 추적 및 윈도우 크기 추적
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleResize]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ cursor: 'none' }}
      />
      
      {/* 흐르는 텍스트 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute whitespace-nowrap text-6xl font-bold select-none"
            style={{
              top: `${15 + i * 20}%`,
              color: 'rgba(255, 140, 0, 0.6)',
              textShadow: `
                1px 1px 0px rgba(255, 165, 0, 0.9),
                2px 2px 0px rgba(255, 140, 0, 0.7),
                3px 3px 0px rgba(255, 100, 0, 0.5),
                4px 4px 0px rgba(200, 80, 0, 0.4),
                5px 5px 0px rgba(150, 60, 0, 0.3),
                0px 0px 10px rgba(255, 140, 0, 0.4)
              `,
              fontFamily: 'Arial Black, sans-serif',
              letterSpacing: '0.2em',
              WebkitTextStroke: '1px rgba(255, 100, 0, 0.6)'
            }}
            animate={{
              x: [windowWidth + 100, -1500],
              y: [0, -10, 0, 10, 0],
              scale: [1, 1.05, 1, 1.02, 1],
              rotateZ: [0, 1, 0, -1, 0],
              textShadow: [
                `1px 1px 0px rgba(255, 165, 0, 0.9),
                 2px 2px 0px rgba(255, 140, 0, 0.7),
                 3px 3px 0px rgba(255, 100, 0, 0.5),
                 4px 4px 0px rgba(200, 80, 0, 0.4),
                 5px 5px 0px rgba(150, 60, 0, 0.3),
                 0px 0px 10px rgba(255, 140, 0, 0.4)`,
                `1px 1px 0px rgba(255, 165, 0, 1),
                 2px 2px 0px rgba(255, 140, 0, 0.8),
                 3px 3px 0px rgba(255, 100, 0, 0.6),
                 4px 4px 0px rgba(200, 80, 0, 0.5),
                 5px 5px 0px rgba(150, 60, 0, 0.4),
                 0px 0px 20px rgba(255, 140, 0, 0.6)`,
                `1px 1px 0px rgba(255, 165, 0, 0.9),
                 2px 2px 0px rgba(255, 140, 0, 0.7),
                 3px 3px 0px rgba(255, 100, 0, 0.5),
                 4px 4px 0px rgba(200, 80, 0, 0.4),
                 5px 5px 0px rgba(150, 60, 0, 0.3),
                 0px 0px 10px rgba(255, 140, 0, 0.4)`
              ]
            }}
            transition={{
              x: {
                duration: 25 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 4
              },
              y: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              },
              scale: {
                duration: 4 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8
              },
              rotateZ: {
                duration: 6 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.2
              },
              textShadow: {
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }
            }}
          >
            {("HAPPY LUNCH TIME ✨ HAPPY LUNCH TIME ✨ HAPPY LUNCH TIME ✨").split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  color: char === '✨' ? 'rgba(255, 215, 0, 0.9)' : 'inherit'
                }}
                animate={{
                  color: char === '✨' ? [
                    'rgba(255, 215, 0, 0.9)',
                    'rgba(255, 140, 0, 0.9)',
                    'rgba(255, 100, 0, 0.9)',
                    'rgba(255, 215, 0, 0.9)'
                  ] : [
                    'rgba(255, 140, 0, 0.6)',
                    'rgba(255, 100, 0, 0.8)',
                    'rgba(200, 80, 0, 0.7)',
                    'rgba(255, 140, 0, 0.6)'
                  ],
                  y: [0, -3, 0, 3, 0],
                  scale: char === '✨' ? [1, 1.3, 1, 1.1, 1] : [1, 1.05, 1],
                  rotateZ: char === '✨' ? [0, 10, 0, -10, 0] : [0, 1, 0, -1, 0]
                }}
                transition={{
                  color: {
                    duration: 2 + charIndex * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: charIndex * 0.05
                  },
                  y: {
                    duration: 1.5 + charIndex * 0.02,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: charIndex * 0.03
                  },
                  scale: {
                    duration: char === '✨' ? 1.2 : 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: charIndex * 0.04
                  },
                  rotateZ: {
                    duration: char === '✨' ? 1.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: charIndex * 0.06
                  }
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>
      
      {/* 로딩 상태 */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-orange-200/80">
          <motion.div
            className="text-orange-800 font-black-han-sans text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            따뜻한 햇빛이 준비되고 있습니다...
          </motion.div>
        </div>
      )}

      {/* 인터랙션 가이드 */}
      <motion.div
        className="absolute top-20 left-8 text-orange-800/90 font-black-han-sans"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-sm mb-2 font-semibold">마우스를 움직여 태양의 위치를 변경해보세요</p>
        <p className="text-xs opacity-70">따뜻한 낮빛이 당신의 움직임에 반응합니다</p>
      </motion.div>

      {/* 작품 제목 */}
      <motion.div
        className="absolute bottom-8 left-8 text-orange-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h1 className="text-3xl font-bold font-black-han-sans mb-2">점심의 틈</h1>
        <p className="text-lg opacity-80 font-black-han-sans">따뜻한 낮빛 속에서 찾는 평온한 순간</p>
      </motion.div>

      {/* 시간 표시 */}
      <motion.div
        className="absolute top-8 right-8 text-orange-700/70 font-black-han-sans text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        시간: {time.toFixed(1)}초
      </motion.div>

      {/* 마우스 커서 효과 */}
      <motion.div
        className="absolute pointer-events-none w-8 h-8 rounded-full bg-orange-600/30 backdrop-blur-sm border border-orange-400/40"
        style={{
          left: mousePos.x * windowWidth - 16,
          top: mousePos.y * (typeof window !== 'undefined' ? window.innerHeight : 800) - 16,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}