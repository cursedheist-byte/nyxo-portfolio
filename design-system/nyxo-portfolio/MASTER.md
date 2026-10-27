# NYXO — Design System Master File

**Project:** Varun — NYXO portfolio
**Theme:** Liquid glass on a deep-space aurora
**Stack:** Vite + React 19, Tailwind CSS v4, Motion, Lenis, WebGL aurora
**Source of truth:** `src/styles/tokens.json` → `src/styles/tokens.css`

> Build rules live here. Page-level overrides belong in `pages/[page-name].md`.

---

## 1. Brand Core

| Field | Value |
| --- | --- |
| Name | Varun |
| Brand | NYXO |
| Role | High school student — AI web & app developer |
| Promise | Interfaces that feel alive |
| Proof | Real repositories, built in public |
| Location of truth | https://github.com/cursedheist-byte/ |

**Voice:** first person, short sentences, confident but not boastful. Show the work instead of
describing it. No corporate filler, no fake client logos, no invented metrics.

**Signature phrases:** "built in public", "real commits", "motion that hits different",
"the internet should be less boring".

---

## 2. Color

Palette is dark-first; color comes from light, not fills.

| Role | Token | Value |
| --- | --- | --- |
| Background | `--color-bg` | `#05060A` |
| Elevated surface | `--color-bg-elevated` | `#07080F` |
| Body text | `--color-fg` | `#F1F5F9` |
| Muted text | `--color-muted-fg` | `#94A3B8` |
| Primary | `--color-primary` | `#8B5CF6` (violet) |
| Secondary | `--color-secondary` | `#22D3EE` (cyan) |
| Accent | `--color-accent` | `#F472B6` (pink) |
| Success / live | `--color-success` | `#34D399` |
| Borders | `--color-border` | `rgba(255,255,255,.10)` |
| Strong borders | `--color-border-strong` | `rgba(255,255,255,.20)` |

**Iridescent text:** `linear-gradient(100deg, #F4F1FF 4%, #C4B5FD 34%, #67E8F9 62%, #F9A8D4 92%)`
(`.text-iridescent`). Use on one phrase per heading, never on body copy.

**Rules**
- Never place body text on the animated aurora without a glass panel behind it.
- Violet leads, cyan supports, pink accents. Keep the trio under ~15% of any viewport.
- Minimum text contrast 4.5:1; muted text is the floor, not a suggestion.

---

## 3. Typography

| Role | Family | Usage |
| --- | --- | --- |
| Display | Space Grotesk | Headings, buttons, labels |
| Body | Archivo | Paragraphs, descriptions |
| Mono | JetBrains Mono | Eyebrows, metadata, handles, indices |
| Signature | Caveat | Handwritten annotations only |

**Scale (fluid where noted):**
`display-xl` clamp(2.8rem, 7vw, 5.6rem) · `display-lg` clamp(2.2rem, 4.6vw, 3.6rem) ·
`display-md` clamp(1.7rem, 3vw, 2.4rem) · body 0.95–1.05rem · mono labels 0.5–0.62rem with
`0.16–0.24em` tracking, uppercase.

**Rules**
- Headlines: `letter-spacing: -0.04em` to `-0.05em`, `line-height: 0.95–1.05`.
- Max two typefaces visible per component.
- Mono is metadata, never paragraphs.
- Eyebrows follow the pattern: `NN — LABEL` with a hairline divider.

---

## 4. Liquid Glass Recipe

Glass needs three layers to read as material rather than a gray box:

1. **Body** — diagonal translucent gradient (10% → 2.8% → 5.5% white).
2. **Blur** — `backdrop-filter: blur(26px) saturate(165%)`; strong variant 34px / 180%.
3. **Light** — inset top highlight (`inset 0 1px 0 rgba(255,255,255,.16)`), inset bottom
   shade, an ambient shadow, plus a `::before` radial sheen from the top-left.

| Class | Use |
| --- | --- |
| `.glass` | Default panels, nav pill, cards |
| `.glass-strong` | Hero cards, contact panel, repo panel |
| `.glass-border-gradient` | Feature frames — gradient border via `padding-box` / `border-box` |
| `.glass-card` | Hoverable card (lift + violet glow on hover) |
| `.spotlight` | Pointer-following radial highlight |

**Rules**
- Radius scale: cards `1.5rem`, panels `2rem`, pills `9999px`.
- Never stack more than two glass layers; use spacing and light instead.
- No glass on text blocks shorter than ~3 lines — the blur reads as noise.
- `prefers-reduced-transparency: reduce` flattens glass to solid surfaces.

---

## 5. Motion

| Token | Value | Use |
| --- | --- | --- |
| `--motion-fast` | 160ms | Hover, focus, taps |
| `--motion-base` | 280ms | Reveals, nav underline |
| `--motion-slow` | 600ms | Section reveals |
| `--motion-cinematic` | 1100ms | Hero entrance, preloader |
| `--motion-ease-out` | `cubic-bezier(.22,1,.36,1)` | Entrances |
| `--motion-spring` | `cubic-bezier(.34,1.56,.64,1)` | Playful accents |

**System**
- Preloader: 1.5s max, then hands control to the hero.
- Scroll reveals: 16–24px rise + fade, staggered 60–80ms, once per element.
- Nav: `layoutId` underline; `aria-current="page"` follows IntersectionObserver.
- Ambient: WebGL aurora with pointer parallax, capped at DPR 1.6; CSS aurora fallback.
- Hover: ≤6px lift, border brightens, glow appears. Nothing bounces on hover.

**Reduced motion**
- `useReducedMotion` disables reveals, marquee drift and the preloader.
- The aurora renders one static frame instead of a RAF loop.
- Transitions collapse to opacity only. No parallax, no autoplay loops.

---

## 6. Components

**Buttons** — pill, min height 44px, one primary per view. Primary is light-on-dark
(`#F1F5F9` → `#05060A` text) with a bottom inner shade. Ghost is glass with a white border.
Every button needs a visible `:focus-visible` ring (`2px` violet, `2px` offset).

**Cards** — glass body, 1px border, 1.5rem radius, 24px inner padding (mobile 16–20px).
Hover = 4–6px lift + border brighten, never a color inversion.

**Navigation** — floating glass pill, 4.5rem tall. Mobile: full-screen glass overlay with
`role="dialog"`, `aria-modal`, focus trap, Escape to close, focus returned to the toggle.

**GitHub panel** — live profile + latest repos from the REST API, skeleton rows while
loading, graceful fallback data offline. Status pill reads Live / Syncing / Profile.

**Contact** — one primary CTA (DM on GitHub), one copy-handle button with `Handle copied`
feedback (clipboard API with legacy fallback), availability row in mono.

---

## 7. Accessibility

- Single `h1`; headings descend without skips.
- Skip link to `#main` is the first tab stop.
- All interactive elements are real `button` / `a` elements; no clickable divs.
- Icon-only controls have `aria-label`; decorative icons are `aria-hidden`.
- External links: `target="_blank" rel="noreferrer"`.
- Motion, transparency and contrast preferences are all honored.
- Mobile menu locks body scroll and traps Tab; Escape restores focus.
- Copy controls confirm success in text, not color alone.

---

## 8. Assets

| Asset | Path | Size |
| --- | --- | --- |
| Social / OG banner | `public/og-nyxo.png` | 1200 × 630 |
| Banner source | `assets/banners/og/glass-1200x630.html` | — |
| Favicon | `public/favicon.svg` | — |

**Banner direction:** glassmorphism — dark aurora, violet/cyan/pink light, one glass code
panel, oversized display headline, light pill CTA. Text stays inside the central safe zone.

---

## 9. Do / Don't

**Do**
- Lead with shipped work and links to real repositories.
- Use one iridescent phrase per heading.
- Keep the aurora behind glass, never behind paragraphs.
- Prefer 3–4 strong sections over 12 thin ones.

**Don't**
- Invent clients, testimonials, years of experience or metrics.
- Use more than one CTA style in the same view.
- Animate anything the user did not trigger, beyond ambient background light.
- Add a glass panel just to fill space.
