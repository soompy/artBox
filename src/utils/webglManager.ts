class WebGLManager {
  private static instance: WebGLManager;
  private shaderCache: Map<string, WebGLProgram> = new Map();
  private contexts: Map<string, WebGLRenderingContext> = new Map();

  static getInstance(): WebGLManager {
    if (!WebGLManager.instance) {
      WebGLManager.instance = new WebGLManager();
    }
    return WebGLManager.instance;
  }

  // 셰이더 프로그램 캐싱 및 재사용
  getOrCreateShaderProgram(
    gl: WebGLRenderingContext,
    vertexSource: string,
    fragmentSource: string
  ): WebGLProgram | null {
    const key = `${vertexSource}-${fragmentSource}`;
    
    if (this.shaderCache.has(key)) {
      return this.shaderCache.get(key)!;
    }

    const program = this.createProgram(gl, vertexSource, fragmentSource);
    if (program) {
      this.shaderCache.set(key, program);
    }
    
    return program;
  }

  // 셰이더 컴파일 최적화
  private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  // 프로그램 생성 최적화
  private createProgram(
    gl: WebGLRenderingContext,
    vertexSource: string,
    fragmentSource: string
  ): WebGLProgram | null {
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    // 셰이더 정리 (링크 후 불필요)
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }

  // 컨텍스트 등록 및 관리
  registerContext(id: string, gl: WebGLRenderingContext): void {
    this.contexts.set(id, gl);
  }

  // 리소스 정리
  cleanup(contextId?: string): void {
    if (contextId && this.contexts.has(contextId)) {
      const gl = this.contexts.get(contextId)!;
      
      // 해당 컨텍스트의 프로그램들 정리
      this.shaderCache.forEach((program, key) => {
        if (gl.isProgram(program)) {
          gl.deleteProgram(program);
        }
      });
      
      this.contexts.delete(contextId);
    } else {
      // 모든 리소스 정리
      this.contexts.forEach((gl) => {
        this.shaderCache.forEach((program) => {
          if (gl.isProgram(program)) {
            gl.deleteProgram(program);
          }
        });
      });
      
      this.shaderCache.clear();
      this.contexts.clear();
    }
  }

  // 메모리 사용량 모니터링 (개발 환경에서만)
  monitorMemory(): void {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const monitor = () => {
        console.log('WebGL Cache Size:', this.shaderCache.size);
        console.log('WebGL Contexts:', this.contexts.size);
        
        if ((window as any).performance?.memory) {
          const memory = (window as any).performance.memory;
          console.log('Memory Usage:', {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
          });
        }
      };
      
      setInterval(monitor, 10000); // 10초마다 모니터링
    }
  }
}

export const webglManager = WebGLManager.getInstance();