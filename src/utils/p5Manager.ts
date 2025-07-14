import p5 from 'p5';

class P5Manager {
  private static instance: P5Manager;
  private instances: Map<string, p5> = new Map();

  static getInstance(): P5Manager {
    if (!P5Manager.instance) {
      P5Manager.instance = new P5Manager();
    }
    return P5Manager.instance;
  }

  createInstance(id: string, sketch: (p: p5) => void, container?: HTMLElement): p5 {
    // 기존 인스턴스가 있으면 제거
    if (this.instances.has(id)) {
      this.removeInstance(id);
    }

    const instance = new p5(sketch, container);
    this.instances.set(id, instance);
    return instance;
  }

  removeInstance(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.remove();
      this.instances.delete(id);
    }
  }

  getInstance(id: string): p5 | undefined {
    return this.instances.get(id);
  }

  cleanup(id?: string): void {
    if (id) {
      this.removeInstance(id);
    } else {
      // 모든 인스턴스 정리
      this.instances.forEach((instance, id) => {
        instance.remove();
      });
      this.instances.clear();
    }
  }

  // 메모리 사용량 모니터링
  getInstanceCount(): number {
    return this.instances.size;
  }

  // 개발 환경에서만 작동하는 메모리 모니터링
  monitorMemory(): void {
    if (process.env.NODE_ENV === 'development') {
      const monitor = () => {
        console.log('P5 Instances:', this.instances.size);
        console.log('Active instances:', Array.from(this.instances.keys()));
      };
      
      setInterval(monitor, 15000); // 15초마다 모니터링
    }
  }
}

export const p5Manager = P5Manager.getInstance();