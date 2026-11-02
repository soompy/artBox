/**
 * momenttune.com/moti/… 로 내보내기 — 브리프 §5-6.
 *
 * momenttune.com 은 momenttune-web 레포가 만든 정적 파일을 Cloudflare Workers 로 내준다.
 * 그래서 이 레포의 빌드 결과(out/, basePath '/moti')를 momenttune-web 의 public/moti/ 에
 * 통째로 넣고, momenttune-web 쪽에서 평소처럼 `npm run deploy` 한다.
 *
 *   npm run export:web                       # ../momenttune-web 로
 *   MOMENTTUNE_WEB=/path/to/web npm run export:web
 *
 * 이 스크립트는 파일만 옮긴다. 커밋 · PR · 배포는 momenttune-web 에서 사람이 한다(배포는 창업자 승인).
 */
import { execFileSync } from 'node:child_process'
import { cp, rm, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const WEB = path.resolve(ROOT, process.env.MOMENTTUNE_WEB ?? '../momenttune-web')
const DEST = path.join(WEB, 'public/moti')

if (process.env.VERCEL) {
  console.error('VERCEL 이 켜져 있으면 basePath 가 비어 /moti 로 내보낼 수 없습니다')
  process.exit(1)
}
await stat(path.join(WEB, 'wrangler.jsonc')).catch(() => {
  console.error(`momenttune-web 을 찾지 못했습니다 — ${WEB}`)
  process.exit(1)
})

execFileSync('npx', ['next', 'build'], { cwd: ROOT, stdio: 'inherit' })

await rm(DEST, { recursive: true, force: true })
await cp(path.join(ROOT, 'out'), DEST, { recursive: true })
console.log(`\n→ ${path.relative(ROOT, DEST)} 에 넣었습니다. momenttune-web 에서 커밋 · PR 후 배포하세요.`)
