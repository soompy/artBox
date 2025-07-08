export class AudioManager {
  private audioContext: AudioContext | null = null;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private audioSources: Map<string, AudioBufferSourceNode> = new Map();
  private gainNodes: Map<string, GainNode> = new Map();
  private isInitialized = false;

  async init() {
    if (typeof window === 'undefined') return;
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  async loadAudio(name: string, url: string): Promise<void> {
    if (!this.audioContext) await this.init();
    if (!this.audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(name, audioBuffer);
    } catch (error) {
      console.error(`Failed to load audio: ${name}`, error);
    }
  }

  async playAudio(name: string, loop: boolean = false, volume: number = 1): Promise<void> {
    if (!this.audioContext || !this.audioBuffers.has(name)) return;

    this.stopAudio(name);

    const audioBuffer = this.audioBuffers.get(name)!;
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = audioBuffer;
    source.loop = loop;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    this.audioSources.set(name, source);
    this.gainNodes.set(name, gainNode);

    source.start();
  }

  stopAudio(name: string): void {
    const source = this.audioSources.get(name);
    if (source) {
      source.stop();
      this.audioSources.delete(name);
      this.gainNodes.delete(name);
    }
  }

  setVolume(name: string, volume: number): void {
    const gainNode = this.gainNodes.get(name);
    if (gainNode) {
      gainNode.gain.setValueAtTime(volume, this.audioContext!.currentTime);
    }
  }

  fadeIn(name: string, duration: number = 1): void {
    const gainNode = this.gainNodes.get(name);
    if (gainNode && this.audioContext) {
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + duration);
    }
  }

  fadeOut(name: string, duration: number = 1): void {
    const gainNode = this.gainNodes.get(name);
    if (gainNode && this.audioContext) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
      
      setTimeout(() => {
        this.stopAudio(name);
      }, duration * 1000);
    }
  }

  stopAllAudio(): void {
    this.audioSources.forEach((_, name) => {
      this.stopAudio(name);
    });
  }

  crossFade(fromName: string, toName: string, duration: number = 1): void {
    this.fadeOut(fromName, duration);
    this.fadeIn(toName, duration);
  }

  // 합성음 생성 및 재생
  playSynthAudio(name: string, frequency: number, duration: number = 2, volume: number = 0.1): void {
    if (typeof window === 'undefined') return;
    if (!this.audioContext) return;
    
    // 기존 합성음 정지
    this.stopAudio(name);
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // 저장해서 나중에 정지할 수 있도록
    this.audioSources.set(name, oscillator as any);
    this.gainNodes.set(name, gainNode);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
    
    // 자동으로 정리
    setTimeout(() => {
      this.audioSources.delete(name);
      this.gainNodes.delete(name);
    }, duration * 1000);
  }
}

export const audioManager = new AudioManager();