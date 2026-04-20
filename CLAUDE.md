# CLAUDE.md

Project guidance for Claude Code working in this repo.

## What this is

Personal website for Светлана Орлова (wine writer). Single static page deployed via GitHub Pages at https://uncorkedwine.work/.

## Structure

- `index.html` — markup only; references external assets
- `styles/main.css` — all styles
- `scripts/content.js` — site copy / text content (Russian)
- `scripts/app.js` — render and init logic
- `assets/` — images
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `CNAME` — static configuration

## Local development

Run from the repo root, then open http://localhost:8000:

    npx --registry=https://registry.npmjs.org http-server -p 8000

(The explicit `--registry` flag bypasses corporate npm proxies that may block the default registry.)

## Deploy

Push to `main` — GitHub Pages deploys automatically. No build step.

## Rules

- **Language:** site content is in Russian. Documentation (`README.md`, `CLAUDE.md`, spec files, code comments) is in English.
- No build system or bundler — keep the site as plain static files.
- Do not modify `CNAME` or `robots.txt` without explicit request.
- When editing `index.html`, preserve SEO tags: `<title>`, `meta description`, Open Graph, Twitter Card, JSON-LD.
- Update `sitemap.xml` `lastmod` when page content changes meaningfully.
- Keep separation: text content in `scripts/content.js`, render logic in `scripts/app.js`, styles in `styles/main.css`. Do not inline CSS/JS into HTML.
- `.superpowers/` and `docs/superpowers/` are gitignored **intentionally** — Superpowers brainstorm and plan artifacts are local-only and must not be committed.
- **Never add Claude as a co-author in commit messages.** Do not include `Co-Authored-By: Claude` or any similar attribution in any commit.
