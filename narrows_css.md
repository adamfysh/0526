# Narrows — CSS Rulebook

Use this document when prompting edits to any Narrows page or component. Always apply these rules exactly as specified.

---

## 1. Design Tokens (CSS Custom Properties)

Always declare these variables on `:root`. Do not hardcode any colour, spacing, or font value — reference a token instead.

```css
:root {
  /* Colour */
  --white:          #FFFFFF;
  --page-bg:        #FFFFFF;
  --surface:        #F6F8FB;       /* light grey section background */
  --border:         #E4EAF2;
  --navy:           #0A2540;       /* primary brand dark */
  --blue:           #1565A8;       /* primary action colour */
  --blue-light:     #2E86D4;       /* italic / accent text */
  --blue-pale:      #EAF3FB;       /* blue tinted chip/badge background */
  --gold:           #F0B429;       /* accent / highlight */
  --gold-pale:      #FEF9EC;       /* gold tinted chip background */

  /* Text */
  --text-primary:   #0A2540;
  --text-secondary: #4A6078;
  --text-tertiary:  #8FA5BB;

  /* Typography */
  --font: 'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif;

  /* Spacing scale */
  --s1: 0.5rem;   /*  8px */
  --s2: 1rem;     /* 16px */
  --s3: 1.5rem;   /* 24px */
  --s4: 2rem;     /* 32px */
  --s5: 3rem;     /* 48px */
  --s6: 5rem;     /* 80px */

  /* Rules (borders) */
  --rule-gold:  2px solid var(--gold);
  --rule-light: 1px solid var(--border);

  /* Layout */
  --max-w: 1120px;

  /* Easing */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 2. Typography

| Use | Font size | Weight | Notes |
|---|---|---|---|
| Body default | 16px | 300 | line-height 1.7 |
| Hero headline | clamp(34px, 4.5vw, 54px) | 700 | letter-spacing −0.02em, line-height 1.1 |
| Section title | clamp(26px, 3vw, 38px) | 700 | letter-spacing −0.02em, line-height 1.15 |
| Eyebrow label | 11px | 600 | uppercase, letter-spacing 0.14em |
| Nav links | 13px | 400 | letter-spacing 0.04em |
| Card body | 14px | 300 | line-height 1.65 |
| Stat value (large) | 32–36px | 700 | letter-spacing −0.02em |
| Small label / meta | 12px | 400 | |
| Footer tagline | 13px | 300 | |

**Italic text** (e.g. in headlines and CTAs) uses `font-style: italic; font-weight: 400; color: var(--blue-light)`.

---

## 3. Colour Usage Rules

- **Navy (`--navy`)** — page text, headings, card headers, footer background, primary button fallback.
- **Blue (`--blue`)** — CTA buttons, links, eyebrow text, badge text.
- **Gold (`--gold`)** — accent rule on card tops, left-border accents, bullet marks before eyebrows, live-tag dot, footer column labels.
- **Surface (`--surface`)** — alternating section backgrounds, stat row backgrounds.
- **White** — card backgrounds, page background, text on dark surfaces.
- **Text secondary** — body copy, descriptions, supporting text.
- **Text tertiary** — meta labels, units, placeholder text, muted footer copy.

---

## 4. Spacing & Layout

- Max content width: `--max-w` (1120px), centred with `margin: 0 auto`.
- Section padding: `var(--s6) var(--s4)` (80px top/bottom, 32px horizontal).
- Standard grid gap: `var(--s3)` (24px).
- Hero / split-section gap: `80px`.
- Use CSS Grid for all multi-column layouts (not flexbox for page structure).

---

## 5. Component Patterns

### Eyebrow
Small uppercase label above a heading. Gold line prepended via `::before`.
```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--blue); margin-bottom: var(--s2);
}
.eyebrow::before { content: ''; width: 20px; height: 2px; background: var(--gold); display: inline-block; }
```

### Buttons
All buttons: `font-family: var(--font); font-size: 13px; font-weight: 600; letter-spacing: 0.04em; padding: 13px 26px; border-radius: 4px; border: none; transition: background 0.15s, transform 0.12s;`  
On hover: `transform: translateY(-1px)`.

| Variant | Background | Text |
|---|---|---|
| `.btn-navy` | `--navy` | white |
| `.btn-blue` | `--blue` | white, hover → `--navy` |
| `.btn-gold` | `--gold` | `--navy` |
| `.btn-ghost` | none (inline link) | `--blue`, arrow `→` suffix |

### Cards
- White background, `border: var(--rule-light)`, `border-radius: 6–8px`.
- Top accent: `border-top: 3px solid var(--gold)` (output cards, stat card header bottom).
- Left accent: `border-left: 3px solid var(--gold)` (stat rows, live stats, coverage items).
- Hover lift: `transform: translateY(-3px); box-shadow: 0 12px 32px rgba(10,37,64,0.08)`.

### Stat / Data Cards (dark header variant)
- Header: `background: var(--navy)`, bottom border `3px solid var(--gold)`.
- Eyebrow in header: 10px, uppercase, `color: var(--text-tertiary)`.
- Scenario text: `color: rgba(255,255,255,0.65)`, with gold `<strong>`.

### Tables
- Dark header: `background: var(--navy)`.
- Column labels: col 1 = `rgba(255,255,255,0.35)`, col 2 = `rgba(255,255,255,0.55)`, col 3 = `var(--gold)`.
- Row hover: `background: var(--blue-pale)`.
- Cell borders: `var(--rule-light)`.

### Badges / Chips
- Blue chip: `background: var(--blue-pale); color: var(--blue); border-radius: 4px; padding: 7–10px 12–14px; font-size: 12px; font-weight: 500`.
- Gold live-tag: `background: var(--gold-pale); border: 1px solid rgba(240,180,41,0.4); border-radius: 20px; color: var(--navy); font-weight: 700`.

---

## 6. Navigation

- Fixed, full-width. `background: rgba(255,255,255,0.95)` with `backdrop-filter: blur(12px)`.
- Bottom border: `var(--rule-light)`.
- Height: 64px. Logo: navy, wordmark uppercase 17px 700, letter-spacing 0.06em.
- Nav links: 13px, 400 weight, `var(--text-secondary)`, hover → `var(--navy)`.
- CTA button in nav: 13px, 600, blue background, 4px radius.

---

## 7. Footer

- Background: `var(--navy)`.
- 3-column grid (`1.4fr 1fr 1fr`), separated from bottom bar by `1px solid rgba(255,255,255,0.08)`.
- Column labels: gold, 10px uppercase, letter-spacing 0.14em.
- Links: `rgba(255,255,255,0.45)`, hover → white, 13px 300.
- Tagline: `rgba(255,255,255,0.4)`, 13px 300.
- Bottom bar text: `rgba(255,255,255,0.25)`, 12px 300.

---

## 8. Animations

- Fade-up on scroll via `.fade-up` / `.fade-up.visible`:
  ```css
  .fade-up { opacity: 0; transform: translateY(16px); transition: opacity 0.55s var(--ease), transform 0.55s var(--ease); }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  ```
- Stagger: children 2–4 get `transition-delay` of 0.08s, 0.16s, 0.24s respectively.
- Live pulse dot: keyframe `pulse` — scale 1→0.8, opacity 1→0.5, 2s infinite.

---

## 9. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 900px` | Hero → single column; hide `.hero-right`; output/audience grids → 1 col; split sections → 1 col; footer → 1 col; coverage → 2 col |
| `max-width: 600px` | Nav padding reduced; hide nav links; hero top padding → 96px |

---

## 10. Tone & Style Notes

- Minimal, data-forward aesthetic. No gradients, no drop shadows except subtle card lifts.
- Gold is used sparingly as a pure accent — never for large filled areas.
- All body copy is weight 300 (light). Bold is reserved for numbers, headings, and labels.
- Transitions are fast (0.12–0.2s) with the custom `--ease` curve.
- Border-radius is kept small (4–8px) — this is a professional B2B product, not a consumer app.
