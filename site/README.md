# cedrus site

Marketing site for [cedrus](https://github.com/sachncs/cedrus), built with
[Astro](https://astro.build/), [React](https://react.dev/) islands, and
[Tailwind CSS](https://tailwindcss.com/).

The page is a static product landing — no docs are rendered from markdown.
All copy lives in `src/lib/data.ts`.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321/cedrus
```

## Build

```bash
npm run build        # outputs dist/
```

The site is served under `/cedrus` to match the GitHub Pages project URL.

## Deploy

The GitHub Actions workflow at `.github/workflows/pages.yml` builds this
folder and publishes `dist/` to GitHub Pages on every push to `main`.

## Structure

```
src/
  components/        # React + Astro UI components
  layouts/           # Page shells
  lib/data.ts        # All page copy (single source of truth)
  pages/             # Astro routes
  styles/global.css  # Design tokens + base styles
public/              # Static assets (logo, favicon)
```
