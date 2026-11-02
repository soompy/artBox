import type { Rect } from '../Layer';

/**
 * 카페 장면의 자리 — 세로(9:16) 장면 기준 %.
 * 그림(브리프 §4)이 오면 각 레이어의 src 를 채우고, 그림에 맞춰 자리를 다시 맞춘다.
 * 웹용은 WebP 로 구워 public/artworks/moti-cafe/ 에 둔다 → asset('/artworks/moti-cafe/cafe-bg.webp')
 */

export const WINDOW: Rect = { left: 8, top: 7, width: 84, height: 44 };
/** 유리창 — 창의 위쪽. 두드리면 빗방울 */
export const GLASS: Rect = { left: 8, top: 7, width: 84, height: 27 };
/** 창밖 거리 — 창의 아래쪽. 두드리면 우산이 지나간다 */
export const STREET: Rect = { left: 8, top: 34, width: 84, height: 17 };

export const MOTI: Rect = { left: 18, top: 47, width: 44, height: 27 };
export const MOTI_HEAD: Rect = { left: 26, top: 46, width: 24, height: 13 };
/** 깜빡임 — 눈꺼풀은 코드로 그린다(그림이 오면 눈 자리·털 색에 맞춘다) */
export const EYES: Rect = { left: 31, top: 51, width: 14, height: 3 };
/** 꼬리 흔들림 — 코드로 */
export const TAIL: Rect = { left: 12, top: 66, width: 10, height: 5 };

export const MUG: Rect = { left: 56, top: 58, width: 12, height: 9 };
/** 끝에 머그를 내려놓는 자리(선반 위) */
export const MUG_REST: Rect = { left: 64, top: 64, width: 12, height: 9 };
export const STEAM: Rect = { left: 57, top: 47, width: 10, height: 11 };

/** 펼친 책은 배경 그림에 있다 — 넘어가는 책장 한 장만 코드로 */
export const BOOK_PAGE: Rect = { left: 72, top: 66, width: 9, height: 5 };

/** 우산 크기 — 창밖 거리를 가로질러 지나간다 */
export const UMBRELLA_SIZE = { width: 16, height: 7 };

/** 그림 7장(브리프 §4). null 이면 회색 빈 상자 */
export const LAYERS = {
  bg: { name: 'cafe-bg', src: null as string | null },
  outside: { name: 'cafe-outside', src: null as string | null },
  motiSit: { name: 'cafe-moti-sit', src: null as string | null },
  motiHeadTurn: { name: 'cafe-moti-head-turn', src: null as string | null },
  motiDoze: { name: 'cafe-moti-doze', src: null as string | null },
  mug: { name: 'cafe-mug', src: null as string | null },
  umbrella: { name: 'cafe-umbrella', src: null as string | null },
};

/** 빗소리 파일 — 아직 없다(웹 배포·반복 재생을 허용하는 라이선스로 고르고 출처를 적는다, 브리프 §3-4) */
export const RAIN_SOUND_SRC: string | null = null;

/** 두드리는 곳 — 키보드(스페이스)는 이 순서로 차례로 */
export const TAP_ORDER = ['glass', 'mug', 'moti', 'street'] as const;
export type TapTarget = (typeof TAP_ORDER)[number];

/** 화면 읽기에 짧게 알려 준다 */
export const TAP_ANNOUNCE: Record<TapTarget, string> = {
  glass: '빗방울 하나가 유리를 타고 흘러내려요',
  mug: '머그잔에서 김이 피어올라요',
  moti: '모티가 이쪽을 보고 눈을 감았다 떠요',
  street: '창밖으로 우산 하나가 지나가요',
};

export const SCENE_SUMMARY = '비 오는 날 카페 창가에서 모티가 코코아를 마시고 있어요.';
