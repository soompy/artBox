'use client';

import { useEffect } from 'react';
import { performanceMonitor } from '@/utils/performance';
import { webglManager } from '@/utils/webglManager';
import { p5Manager } from '@/utils/p5Manager';

export default function PerformanceInit() {
  useEffect(() => {
    // 성능 모니터링 초기화
    performanceMonitor.init();
    
    // WebGL 매니저 메모리 모니터링 시작
    webglManager.monitorMemory();
    
    // p5 매니저 메모리 모니터링 시작
    p5Manager.monitorMemory();
    
    // 성능 경고 시스템 시작
    const warningInterval = setInterval(() => {
      performanceMonitor.checkPerformanceWarnings();
    }, 5000); // 5초마다 성능 체크
    
    return () => {
      clearInterval(warningInterval);
    };
  }, []);

  return null; // 렌더링하지 않음
}