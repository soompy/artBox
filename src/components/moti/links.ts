/** next.config.js 의 basePath 와 같게 — <img> 같은 일반 주소에는 basePath 가 붙지 않는다 */
export const BASE_PATH = '/moti';

/** public/ 아래 파일 주소 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** App Store 캠페인 링크 — `/kr/` 이 있어야 웹 브라우저에서 열린다(한국 스토어 전용 앱) */
export function appStoreLink(ct: string): string {
  return `https://apps.apple.com/kr/app/apple-store/id6802705637?pt=129286034&ct=${encodeURIComponent(ct)}&mt=8`;
}

/** 앱에서 열었을 때(`?from=momenttune`)만 쓴다 — 앱이 없으면 Safari 오류가 난다 */
export const RETURN_URL = 'momenttune://';

/** 모먼트튠 앱에서 열었는지. 아무것도 기록하지 않는다. */
export function openedFromApp(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('from') === 'momenttune';
}

/** 친구에게 보낼 작품 주소 — 쿼리(`?from=` 등)는 떼고 보낸다 */
export function shareableUrl(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${window.location.pathname}`;
}
