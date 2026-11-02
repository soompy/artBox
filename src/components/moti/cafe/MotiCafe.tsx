'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EndScreen } from '../EndScreen';
import { Layer, inRect, rectStyle, type Rect } from '../Layer';
import { RETURN_URL, appStoreLink, openedFromApp } from '../links';
import { SoundToggle } from '../SoundToggle';
import { useSession } from '../useSession';
import { Rain, type RainHandle } from './Rain';
import {
  BOOK_PAGE,
  EYES,
  GLASS,
  LAYERS,
  MOTI,
  MOTI_HEAD,
  MUG,
  MUG_REST,
  RAIN_SOUND_SRC,
  SCENE_SUMMARY,
  STEAM,
  STREET,
  TAIL,
  TAP_ANNOUNCE,
  TAP_ORDER,
  UMBRELLA_SIZE,
  WINDOW,
  type TapTarget,
} from './scene';

const TITLE = '모티의 쉬는 날 · 창가 자리';
const APP_STORE_CT = 'artbox_cafe';
/** 약 60초 — 책장을 넘기고, 창밖에 노란 우산이 지나간다 */
const PAGE_TURN_AT = 60;
/** 약 100초 — 하품·꾸벅, 빗발이 가늘어진다 */
const NOD_AT = 100;
const SIP_EVERY_MS = 14000;
const RAIN_VOLUME = 0.5;

/** inner 를 outer 안의 % 로 바꾼다(겹친 레이어용) */
function within(outer: Rect, inner: Rect): Rect {
  return {
    left: ((inner.left - outer.left) / outer.width) * 100,
    top: ((inner.top - outer.top) / outer.height) * 100,
    width: (inner.width / outer.width) * 100,
    height: (inner.height / outer.height) * 100,
  };
}

const STREET_IN_WINDOW = within(WINDOW, STREET);
const UMBRELLA_IN_WINDOW = {
  top: STREET_IN_WINDOW.top + 8,
  width: (UMBRELLA_SIZE.width / WINDOW.width) * 100,
  height: (UMBRELLA_SIZE.height / WINDOW.height) * 100,
};

/**
 * «모티의 쉬는 날 · 창가 자리» — 브리프 §3.
 * 지금은 그림 자리를 회색 빈 상자로 잡아 둔 틀이다. 그림이 오면 scene.ts 의 LAYERS 에 src 만 채운다.
 */
export function MotiCafe() {
  const reduceMotion = useReducedMotion() ?? false;
  const { elapsed, progress, finished, finish, replay, runId, pausedRef } = useSession();

  const rainRef = useRef<RainHandle>(null);
  const levelRef = useRef(1);
  const firedRef = useRef({ page: false, nod: false });
  const tapIndexRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [fromApp, setFromApp] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [blink, setBlink] = useState(false);
  const [headTurned, setHeadTurned] = useState(false);
  const [sipKey, setSipKey] = useState(0);
  const [nodKey, setNodKey] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [puffs, setPuffs] = useState<number[]>([]);
  const [umbrellas, setUmbrellas] = useState<number[]>([]);
  const [announce, setAnnounce] = useState('');

  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    setFromApp(openedFromApp());
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // 처음(또는 한 번 더): 제목은 첫 3초만
  useEffect(() => {
    firedRef.current = { page: false, nod: false };
    levelRef.current = 1;
    setHeadTurned(false);
    setUmbrellas([]);
    setPuffs([]);
    setTitleVisible(true);
    if (audioRef.current) audioRef.current.volume = RAIN_VOLUME;
    const t = setTimeout(() => setTitleVisible(false), 3000);
    return () => clearTimeout(t);
  }, [runId]);

  const blinkOnce = useCallback(() => {
    setBlink(true);
    later(() => setBlink(false), 160);
  }, [later]);

  const passUmbrella = useCallback(() => {
    setUmbrellas((u) => (u.length >= 2 ? u : [...u, performance.now()]));
  }, []);

  // 천천히 깜빡 — 움직임 줄이기에서도 이것만 남는다
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (!pausedRef.current) blinkOnce();
        loop();
      }, 3500 + Math.random() * 3000);
    };
    loop();
    return () => clearTimeout(t);
  }, [blinkOnce, pausedRef]);

  // 가끔 머그를 들어 한 모금
  useEffect(() => {
    if (reduceMotion || finished) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setSipKey((k) => k + 1);
    }, SIP_EVERY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, finished, pausedRef]);

  // 2분 흐름(브리프 §3-2)
  useEffect(() => {
    if (elapsed >= PAGE_TURN_AT && !firedRef.current.page) {
      firedRef.current.page = true;
      setPageKey((k) => k + 1);
      passUmbrella();
    }
    if (elapsed >= NOD_AT && !firedRef.current.nod) {
      firedRef.current.nod = true;
      setNodKey((k) => k + 1);
      levelRef.current = 0.45;
    }
  }, [elapsed, passUmbrella]);

  // 끝: 빗발·빗소리가 잦아든다
  useEffect(() => {
    if (!finished) return;
    levelRef.current = 0.2;
    setHeadTurned(false);
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    const id = setInterval(() => {
      audio.volume = Math.max(audio.volume - 0.03, 0.12);
      if (audio.volume <= 0.12) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [finished]);

  // 빗소리 — 누르는 순간 재생(자동 재생 없음). 파일이 오기 전엔 버튼만.
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (!RAIN_SOUND_SRC) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(RAIN_SOUND_SRC);
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;
    if (next) {
      audio.volume = finished ? 0.12 : RAIN_VOLUME;
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  };

  // 다른 앱·탭으로 나가면 소리도 멈춘다
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !soundOn) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [soundOn]);

  // 두드리면(브리프 §3-3) — 같은 곳을 여러 번 두드려도 새로 열리는 것은 없다
  const trigger = useCallback(
    (target: TapTarget, at?: { x: number; y: number }) => {
      if (finished) return;
      if (target === 'glass') {
        const x = at ? (at.x - WINDOW.left) / WINDOW.width : 0.2 + Math.random() * 0.6;
        const y = at ? (at.y - WINDOW.top) / WINDOW.height : 0.1 + Math.random() * 0.4;
        rainRef.current?.addDrop(x, y);
      } else if (target === 'mug') {
        setPuffs((p) => [...p.slice(-2), performance.now()]);
      } else if (target === 'moti') {
        if (!headTurned) {
          setHeadTurned(true);
          later(blinkOnce, 700);
          later(() => setHeadTurned(false), 2200);
        }
      } else {
        passUmbrella();
      }
      setAnnounce(TAP_ANNOUNCE[target]);
    },
    [finished, headTurned, later, blinkOnce, passUmbrella],
  );

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    if (inRect(x, y, MUG)) trigger('mug');
    else if (inRect(x, y, MOTI)) trigger('moti');
    else if (inRect(x, y, GLASS)) trigger('glass', { x, y });
    else if (inRect(x, y, STREET)) trigger('street');
  };

  // 키보드: 스페이스로 «두드리기» — 유리 → 머그 → 모티 → 창밖 차례로
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' || finished) return;
      if ((e.target as HTMLElement | null)?.closest('button, a, input, textarea')) return;
      e.preventDefault();
      trigger(TAP_ORDER[tapIndexRef.current % TAP_ORDER.length]);
      tapIndexRef.current += 1;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [trigger, finished]);

  const motiLayer = finished ? LAYERS.motiDoze : LAYERS.motiSit;
  const showEyes = !finished && !headTurned;
  const steaming = !finished;

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#f7f1e6] select-none">
      <h1 className="sr-only">{TITLE}</h1>
      <p className="sr-only">
        {SCENE_SUMMARY} 화면을 두드리거나 스페이스 키를 누르면 장면이 조금 움직여요. 2분 뒤에 끝나요.
      </p>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      {/* 장면 — 세로 9:16. 가로·데스크톱은 가운데에 */}
      <div
        aria-hidden="true"
        className="relative"
        style={{ width: 'min(100vw, calc(100dvh * 9 / 16))', aspectRatio: '9 / 16', touchAction: 'manipulation' }}
        onPointerDown={onPointerDown}
      >
        {/* 창 — 창밖 거리 · 비 · 지나가는 우산 */}
        <div className="absolute overflow-hidden" style={rectStyle(WINDOW)}>
          <Layer name={LAYERS.outside.name} src={LAYERS.outside.src} className="absolute inset-0 h-full w-full" />
          <Rain
            ref={rainRef}
            levelRef={levelRef}
            pausedRef={pausedRef}
            still={reduceMotion}
            className="absolute inset-0 h-full w-full"
          />
          {umbrellas.map((id) => (
            <motion.div
              key={id}
              className="absolute"
              style={{
                top: `${UMBRELLA_IN_WINDOW.top}%`,
                width: `${UMBRELLA_IN_WINDOW.width}%`,
                height: `${UMBRELLA_IN_WINDOW.height}%`,
                left: reduceMotion ? '40%' : undefined,
              }}
              initial={reduceMotion ? { opacity: 0 } : { left: `-${UMBRELLA_IN_WINDOW.width}%` }}
              animate={reduceMotion ? { opacity: [0, 1, 1, 0] } : { left: '100%' }}
              transition={{ duration: reduceMotion ? 4 : 9, ease: 'linear' }}
              onAnimationComplete={() => setUmbrellas((u) => u.filter((v) => v !== id))}
            >
              <Layer
                name={LAYERS.umbrella.name}
                src={LAYERS.umbrella.src}
                className="relative h-full w-full bg-yellow-300/60"
              />
            </motion.div>
          ))}
        </div>

        {/* 창틀 · 나무 선반 · 화분 · 펼친 책 — 창 안쪽은 비어 있다 */}
        <Layer name={LAYERS.bg.name} src={LAYERS.bg.src} className="absolute inset-0 h-full w-full bg-transparent" />

        {/* 넘어가는 책장 한 장(코드) */}
        {pageKey > 0 && !reduceMotion && (
          <motion.div
            key={pageKey}
            className="absolute origin-left rounded-sm border border-stone-300 bg-[#fffaf0]"
            style={{ ...rectStyle(BOOK_PAGE), transformPerspective: 400 }}
            initial={{ rotateY: 0, opacity: 1 }}
            animate={{ rotateY: -180, opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        )}

        {/* 모티 — 꾸벅(약 100초)은 몸 전체를 아래쪽 기준으로 살짝 */}
        <motion.div
          key={`nod-${nodKey}`}
          className="absolute"
          style={{ ...rectStyle(MOTI), transformOrigin: '50% 100%' }}
          initial={{ rotate: 0 }}
          animate={nodKey > 0 && !reduceMotion && !finished ? { rotate: [0, 5, 0, 4, 0] } : { rotate: 0 }}
          transition={{ duration: 3.2, ease: 'easeInOut' }}
        >
          <Layer name={motiLayer.name} src={motiLayer.src} className="absolute inset-0 h-full w-full" />

          {/* 꼬리(코드) */}
          {!reduceMotion && !finished && (
            <motion.div
              className="absolute rounded-full bg-stone-400/50"
              style={{ ...rectStyle(within(MOTI, TAIL)), transformOrigin: '100% 50%' }}
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* 깜빡임(코드) — 그림이 오면 눈꺼풀 자리·색을 맞춘다 */}
          {showEyes && (
            <div className="absolute flex justify-between" style={rectStyle(within(MOTI, EYES))}>
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="block h-full w-[22%] rounded-full bg-stone-600/70"
                  animate={{ scaleY: blink ? 0.1 : 1 }}
                  transition={{ duration: 0.08 }}
                />
              ))}
            </div>
          )}

          {/* 두드리면 이쪽을 보는 고개 */}
          {headTurned && (
            <Layer
              name={LAYERS.motiHeadTurn.name}
              src={LAYERS.motiHeadTurn.src}
              rect={within(MOTI, MOTI_HEAD)}
              className="bg-stone-400/40"
            />
          )}
        </motion.div>

        {/* 머그 — 가끔 한 모금, 끝에는 선반에 내려놓는다 */}
        <div
          className="absolute"
          style={{ ...rectStyle(finished ? MUG_REST : MUG), transition: reduceMotion ? undefined : 'left 1.2s ease, top 1.2s ease' }}
        >
          <motion.div
            key={`sip-${sipKey}`}
            className="h-full w-full"
            animate={sipKey > 0 && !finished ? { y: ['0%', '-35%', '-35%', '0%'], rotate: [0, -12, -12, 0] } : {}}
            transition={{ duration: 3, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
          >
            <Layer name={LAYERS.mug.name} src={LAYERS.mug.src} className="relative h-full w-full" />
          </motion.div>
        </div>

        {/* 김(코드) */}
        {steaming && (
          <div className="pointer-events-none absolute" style={rectStyle(STEAM)}>
            {!reduceMotion &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute bottom-0 block h-1/2 w-[18%] rounded-full bg-white/60 blur-[2px]"
                  style={{ left: `${20 + i * 25}%` }}
                  animate={{ y: ['0%', '-70%'], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
                />
              ))}
            {puffs.map((id) => (
              <motion.span
                key={id}
                className="absolute bottom-0 left-[25%] block h-2/3 w-1/2 rounded-full bg-white/70 blur-[3px]"
                initial={{ y: '0%', opacity: 0 }}
                animate={reduceMotion ? { opacity: [0, 0.8, 0] } : { y: '-80%', opacity: [0, 0.9, 0] }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                onAnimationComplete={() => setPuffs((p) => p.filter((v) => v !== id))}
              />
            ))}
          </div>
        )}
      </div>

      {/* 제목 · 안내 — 첫 3초만 */}
      <AnimatePresence>
        {titleVisible && !finished && (
          <motion.div
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 px-6 text-[#3d3029]"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 2.5rem)', width: 'min(100vw, calc(100dvh * 9 / 16))' }}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
          >
            <p aria-hidden="true" className="text-2xl">
              {TITLE}
            </p>
            <p aria-hidden="true" className="mt-1 text-sm opacity-75">두드리면 무언가 움직여요 · 빗소리는 오른쪽 위에서</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 언제든 나가기 */}
      {!finished && (
        <button
          type="button"
          onClick={finish}
          className="absolute left-3 flex h-11 items-center rounded-full bg-[#fbf6ec]/85 px-4 text-sm text-[#3d3029] shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d9a465]"
          style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
        >
          그만 앉아 있기
        </button>
      )}

      {/* 빗소리 — 끝 화면에서도 보인다 */}
      <div className="absolute right-3 z-30" style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}>
        <SoundToggle on={soundOn} onToggle={toggleSound} label="빗소리" />
      </div>

      {/* 남은 시간 — 숫자 대신 가는 선 하나 */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 h-[3px] bg-[#3d3029]/10"
        style={{ bottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="h-full bg-[#3d3029]/35" style={{ width: `${progress * 100}%`, transition: 'width 0.5s linear' }} />
      </div>

      {finished && (
        <EndScreen
          reduceMotion={reduceMotion}
          art={
            <Layer
              name={LAYERS.motiDoze.name}
              src={LAYERS.motiDoze.src}
              className="relative h-32 w-48"
            />
          }
          message="잠깐 같이 앉아 있었네요"
          suggestion="이번 주말, 이런 카페 하나 어때요?"
          primary={
            fromApp
              ? { label: '모먼트튠으로 돌아가기', href: RETURN_URL }
              : { label: '쉴 곳 지도에서 카페 보기', href: appStoreLink(APP_STORE_CT) }
          }
          onReplay={replay}
        />
      )}
    </div>
  );
}
