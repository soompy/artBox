interface SoundToggleProps {
  on: boolean;
  onToggle: () => void;
  /** 소리 이름 — 예: «빗소리» */
  label: string;
}

/** 소리 켜고 끄기 — 기본 꺼짐. 누른 사람만 듣는다. 켬/끔은 이 화면 안에서만 기억한다. */
export function SoundToggle({ on, onToggle, label }: SoundToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? `${label} 끄기` : `${label} 켜기`}
      className="flex h-11 min-w-11 items-center justify-center gap-1 rounded-full bg-[#fbf6ec]/85 px-3 text-sm text-[#3d3029] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d9a465]"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        {on ? '🔊' : '🔈'}
      </span>
      {on && <span aria-hidden="true">{label}</span>}
    </button>
  );
}
