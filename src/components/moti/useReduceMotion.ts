'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * 움직임 줄이기 설정. 정적 HTML 은 «줄이지 않음» 으로 만들어지므로 첫 렌더는 그에 맞추고,
 * 화면에 붙은 뒤에 실제 설정을 따른다 — 첫 렌더부터 설정을 읽으면 HTML 과 어긋나
 * React 가 페이지를 통째로 다시 그린다(hydration 오류 #418, 제목이 0.75초 늦게 뜸).
 */
export function useReduceMotion(): boolean {
  const prefers = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && prefers;
}
