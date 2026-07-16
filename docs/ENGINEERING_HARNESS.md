# ArtBox Engineering Harness

## Goal

New content must never break the existing platform.

Content can be experimental. The system must remain predictable.

## Folder Structure

```txt
src/
  app/
    content/[slug]/page.tsx
  components/
    content/
      ContentViewer.tsx
      ContentShell.tsx
      ContentControls.tsx
      ContentFallback.tsx
    artworks/
      {slug}/
        Artwork.tsx
        Artwork.preview.tsx
        Artwork.config.ts
        Artwork.test.tsx
  data/
    artworks.ts
    categories.ts
    emotion-tags.ts
  types/
    artwork.ts
    recommendation.ts
    analytics.ts
  engines/
    canvas/
    webgl/
    three/
    p5/
    audio/
```

## Coding Rule

- Use TypeScript.
- Avoid `any`.
- Keep artwork rendering separate from recommendation and analytics.
- Do not hardcode slugs outside the registry.
- Browser APIs must be guarded.
- Every artwork must clean up its resources.

## Component Rule

Artwork components handle rendering and local interaction only.

They must not:

- Route users.
- Compute global recommendations.
- Own shared controls.
- Mutate global audio policies.
- Call analytics directly without the shared event layer.

## Animation Rule

- Use `requestAnimationFrame`.
- Support pause and resume.
- Support reduced motion.
- Avoid rapid flashing.
- Avoid per-frame React state updates.

## Performance Rule

- Lazy load heavy artwork engines.
- Keep initial load under 3 seconds.
- Target 60fps desktop and 30fps mobile.
- Clean up WebGL, audio, timers, and listeners.
- Provide fallback for unsupported engines.

## Accessibility Rule

- Sound must be optional.
- Reduced motion must be supported.
- Exit and Pause must always be available.
- WebGL fallback must exist when WebGL is required.
- Color alone must not communicate state.

## Naming Rule

- Slug: `calm-flow`
- Component: `CalmFlow`
- Config: `calmFlowConfig`
- Events: `content_started`, `content_completed`, `content_exited`

## Testing Rule

Required checks:

- Config schema validation
- Component render
- Cleanup
- Fallback render
- Accessibility smoke test
- Build

## Git Rule

Branch naming:

- `codex/content-{slug}`
- `codex/engine-{feature}`
- `codex/fix-{issue}`
- `codex/docs-{topic}`

Commit naming:

- `feat: add calm flow content`
- `fix: cleanup webgl resources`
- `docs: add design system`

## PR Rule

Every PR must include:

- Summary
- Emotional goal
- Content or engine changes
- Interaction type
- Rendering engine
- Accessibility notes
- Performance notes
- Test result
- Preview screenshot or recording when visual

## Review Rule

Block merge if:

- Build fails.
- Metadata is missing.
- Cleanup is missing.
- Mobile is broken.
- Reduced motion is unsupported.
- Sound is forced.
- Existing content breaks.

## Documentation Rule

Every content item must document:

- Purpose
- Emotional shift
- Recommendation metadata
- Interaction type
- Duration
- Difficulty
- Rendering engine
- Accessibility
- Performance notes
