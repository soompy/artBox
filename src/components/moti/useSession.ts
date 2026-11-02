'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** 작품 길이(초) — «점심의 틈» 과 같다 */
export const SESSION_SECONDS = 120;

/**
 * 작품 시간. 화면을 보고 있는 시간만 센다(다른 앱·탭으로 나가 있으면 멈추고, 돌아오면 이어진다).
 * 아무것도 기록하지 않는다 — 새로 고치면 처음부터.
 */
export function useSession(seconds: number = SESSION_SECONDS) {
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (finished) return;
    let last = performance.now();
    const tick = setInterval(() => {
      const now = performance.now();
      if (!pausedRef.current) {
        elapsedRef.current = Math.min(elapsedRef.current + (now - last) / 1000, seconds);
        setElapsed(elapsedRef.current);
        if (elapsedRef.current >= seconds) setFinished(true);
      }
      last = now;
    }, 500);
    return () => clearInterval(tick);
  }, [finished, runId, seconds]);

  /** 언제든 나가기 — 끝 화면으로 */
  const finish = useCallback(() => setFinished(true), []);

  const replay = useCallback(() => {
    elapsedRef.current = 0;
    setElapsed(0);
    setFinished(false);
    setRunId((n) => n + 1);
  }, []);

  return { elapsed, progress: elapsed / seconds, finished, finish, replay, runId, pausedRef };
}
