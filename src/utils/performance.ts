class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // 컴포넌트 렌더링 시간 측정
  measureRenderTime(componentName: string): () => void {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = end - start;
      this.metrics.set(componentName, duration);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      }
    };
  }

  // 페이지 로드 시간 측정
  measurePageLoad(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        this.metrics.set('pageLoad', loadTime);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
        }
      });
    }
  }

  // 메모리 사용량 모니터링
  monitorMemory(): void {
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      const monitor = () => {
        const memory = (window as any).performance.memory;
        const memoryData = {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        };
        
        this.metrics.set('memoryUsed', memoryData.used);
        this.metrics.set('memoryTotal', memoryData.total);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Memory Usage:', memoryData);
        }
      };
      
      setInterval(monitor, 10000); // 10초마다 모니터링
    }
  }

  // FPS 측정
  measureFPS(): void {
    if (typeof window !== 'undefined') {
      let frames = 0;
      let lastTime = performance.now();
      
      const countFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          this.metrics.set('fps', fps);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`FPS: ${fps}`);
          }
          
          frames = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(countFPS);
      };
      
      requestAnimationFrame(countFPS);
    }
  }

  // 성능 메트릭 가져오기
  getMetric(key: string): number | undefined {
    return this.metrics.get(key);
  }

  // 모든 메트릭 가져오기
  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // 초기화
  init(): void {
    if (process.env.NODE_ENV === 'development') {
      this.measurePageLoad();
      this.monitorMemory();
      this.measureFPS();
    }
  }

  // 성능 경고 시스템
  checkPerformanceWarnings(): void {
    const memoryUsed = this.metrics.get('memoryUsed');
    const fps = this.metrics.get('fps');
    
    if (memoryUsed && memoryUsed > 200) {
      console.warn(`High memory usage detected: ${memoryUsed}MB`);
    }
    
    if (fps && fps < 30) {
      console.warn(`Low FPS detected: ${fps}`);
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();