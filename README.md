# Narrows — Astro Site

## Project structure

```
src/
├── components/
│   ├── BaseHead.astro     ← favicon, meta tags, OG — edit once, applies everywhere
│   ├── Nav.astro          ← site navigation — one file, all pages
│   └── Footer.astro       ← site footer — one file, all pages
├── layouts/
│   ├── BaseLayout.astro   ← wrapper for all marketing / standard pages
│   └── ArticleLayout.astro ← wrapper for all analysis / research articles
├── pages/
│   ├── index.astro        ← homepage
│   ├── model.astro        ← The model page
│   ├── methodology.astro  ← Methodology page
│   ├── about.astro        ← About page
│   └── analysis/
│       ├── index.astro    ← Analysis index (lists all articles)
│       └── kra-land-bridge.astro  ← Example article
└── styles/
    └── global.css         ← ALL design tokens and shared component styles
```

## Design system

All colours, spacing, typography, and component patterns are in `src/styles/global.css`.
Never hardcode colour values or font sizes — always reference a CSS custom property (`var(--navy)`, `var(--s3)`, etc.).

The full token reference is in `/narrows_css.md` at the project root.

## Adding a new analysis article

1. Create `src/pages/analysis/your-slug.astro`
2. Use `ArticleLayout` as the wrapper
3. Pass `title`, `description`, `eyebrow`, `publishDate`, `readTime` as props
4. Add a `<div slot="stat-bar">` for the key numbers strip (optional but standard)
5. Add a `<div slot="cta">` for the bottom CTA strip
6. Add the article to `src/pages/analysis/index.astro`

```astro
---
import ArticleLayout from '../../layouts/ArticleLayout.astro';
---

<ArticleLayout
  title="Your headline here"
  description="One sentence subhead."
  eyebrow="Hormuz · June 2026"
  publishDate="June 2026"
  readTime="8 min read"
>
  <!-- stat bar slot, article body, cta slot -->
</ArticleLayout>
```

## Adding a new marketing page

1. Create `src/pages/your-page.astro`
2. Use `BaseLayout` as the wrapper
3. Write page content inside — CSS tokens and global components are auto-available

## Deployment

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Cloudflare Pages picks up pushes to `main` automatically.

## CSS token reference

| Token | Value | Use |
|---|---|---|
| `--navy` | #0A2540 | Headings, footer bg, dark surfaces |
| `--blue` | #1565A8 | CTAs, links, eyebrow text |
| `--blue-light` | #2E86D4 | Italic accent text |
| `--gold` | #F0B429 | Accent rule, card top borders, live dot |
| `--surface` | #F6F8FB | Alternating section backgrounds |
| `--text-secondary` | #4A6078 | Body copy |
| `--text-tertiary` | #8FA5BB | Meta labels, muted text |
| `--s1`–`--s6` | 8–80px | Spacing scale |
| `--max-w` | 1120px | Marketing page max width |
| `--max-w-article` | 900px | Article page max width | 



