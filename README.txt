# George Website (Eleventy + Markdown Journal)

## Quick start
```bash
cd george-website
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:8080).

## Add a new post (Option A)
Create a file in `src/posts/` named `YYYY-MM-DD-your-title.md` with just:
```md
---
title: "Your Title"
---
Your text here...
```
The journal index at `/journal/` updates automatically.

## Font
Put `AppleKid-Regular.woff2` in `src/fonts/` (optional). The site will try a locally installed font first, then load this file.

## Build for deploy
```bash
npm run build
```
Uploads the static site from `dist/` to your host.
