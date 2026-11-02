# mattparker.dev

Personal site and blog, built with React, React Router framework mode and Vite. Every page is pre-rendered to static HTML.

## Commands

- `npm run dev`: start the dev server
- `npm run build`: type check and pre-render the site to `build/client`
- `npm run preview`: serve the built site locally
- `npm run lint`: run oxlint

## Writing a post

Add a markdown file to `content/posts`. The filename becomes the URL slug.

```md
---
title: "Post title"
description: "Shown in post lists, search results and link previews."
date: "2026-01-31T09:00:00+10:00"
keywords: ["C#", ".NET"]
image: "/_blogs/post-slug/preview.webp"
---
```

`keywords` and `image` are optional. Images go in `public/_blogs/<slug>/`.

Markdown and syntax highlighting run at build time, so they add no JavaScript to the browser. GitHub star counts are also fetched at build time, falling back to the values in `src/lib/projects.ts`.
