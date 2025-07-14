'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LunchBreakPreviewProps {
  className?: string;
}

export default function LunchBreakPreview({ className = '' }: LunchBreakPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [time, setTime] = useState(0);

  // 간소화된 WebGL 셰이더 (미리보기용)
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
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      float time = u_time * 0.5;
      
      // 따뜻한 그라데이션 배경
      vec3 color = vec3(0.9, 0.7, 0.4); // 따뜻한 오렌지
      color = mix(color, vec3(1.0, 0.9, 0.6), st.y); // 위쪽으로 밝은 노란색
      
      // 태양 효과
      vec2 sunPos = vec2(0.7, 0.8);
      float sunDist = distance(st, sunPos);
      float sun = smoothstep(0.1, 0.05, sunDist);
      color += sun * vec3(1.0, 0.95, 0.8);
      
      // 광선 효과
      float angle = atan(st.y - sunPos.y, st.x - sunPos.x);
      float rays = sin(angle * 8.0 + time * 2.0) * 0.5 + 0.5;
      rays *= smoothstep(0.3, 0.0, sunDist);
      color += rays * vec3(1.0, 0.9, 0.6) * 0.2;
      
      // 구름 효과
      float cloud = noise(st * 4.0 + time * 0.1);
      cloud = smoothstep(0.5, 0.8, cloud);
      color = mix(color, vec3(1.0, 1.0, 1.0) * 0.9, cloud * 0.3);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // 셰이더 컴파일
  const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  // 프로그램 생성
  const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // 캔버스 크기 설정
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    gl.viewport(0, 0, rect.width, rect.height);

    // 셰이더 컴파일
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // 프로그램 생성
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // 정점 데이터
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    // 렌더링 함수
    const render = (timestamp: number) => {
      const seconds = timestamp * 0.001;
      setTime(seconds);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, seconds);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* WebGL 캔버스 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* 떠다니는 입자들 */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* 중앙 텍스트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.h3 
            className="text-xs font-bold text-white/90 mb-1 font-black-han-sans"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(255,255,255,0.3)",
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 5px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            점심의 틈
          </motion.h3>
          <motion.div 
            className="w-8 h-0.5 bg-white/50 mx-auto"
            animate={{ 
              backgroundColor: [
                "rgba(255,255,255,0.5)",
                "rgba(255,255,255,0.8)",
                "rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* 태양 표시 */}
      <motion.div
        className="absolute w-3 h-3 bg-white/80 rounded-full"
        style={{
          right: '25%',
          top: '20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 구름 효과 */}
      <motion.div
        className="absolute w-8 h-2 bg-white/20 rounded-full"
        style={{
          left: '20%',
          top: '30%',
        }}
        animate={{
          x: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-6 h-1.5 bg-white/15 rounded-full"
        style={{
          right: '30%',
          top: '25%',
        }}
        animate={{
          x: [0, -8, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 재생 아이콘 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}