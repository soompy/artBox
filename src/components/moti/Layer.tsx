import type { CSSProperties, ReactNode } from 'react';

/** 장면 안 자리 — 장면(9:16) 너비·높이에 대한 % */
export interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function rectStyle(r: Rect): CSSProperties {
  return { left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` };
}

export function inRect(x: number, y: number, r: Rect): boolean {
  return x >= r.left && x <= r.left + r.width && y >= r.top && y <= r.top + r.height;
}

interface LayerProps {
  /** 그림 파일 이름 — 그림이 오기 전엔 회색 상자에 이 이름을 적는다 */
  name: string;
  /** 그림 주소. 없으면 같은 자리·크기의 회색 빈 상자 */
  src?: string | null;
  rect?: Rect;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** 그림 레이어 하나. 그림이 오면 src 만 채우면 된다. 장식이라 화면 읽기에서 뺀다. */
export function Layer({ name, src, rect, className = '', style, children }: LayerProps) {
  const position = rect ? { ...rectStyle(rect), position: 'absolute' as const } : undefined;

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- 정적 export 라 next/image 최적화를 쓰지 않는다
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`pointer-events-none select-none object-contain ${className}`}
        style={{ ...position, ...style }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none rounded-md border border-dashed border-stone-400/80 bg-stone-300/35 ${className}`}
      style={{ ...position, ...style }}
    >
      <span className="absolute left-1 top-0.5 text-[10px] leading-tight text-stone-500">{name}</span>
      {children}
    </div>
  );
}
