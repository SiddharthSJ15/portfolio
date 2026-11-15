<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Personal portfolio site.

See [PROJECT.md](PROJECT.md) for goals, scope, decisions, the folder structure and the done checklist.

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS v4, configured in CSS (`app/globals.css` imports Tailwind and `app/tokens.css`, which holds `@theme inline`). There is no `tailwind.config` file.
- Fonts: Geist and Geist Mono via `next/font/google`, exposed as `--font-geist-sans` and `--font-geist-mono`
- ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next` (core-web-vitals and typescript)
- Package manager: npm (`package-lock.json`)

## Commands

```bash
npm run dev     # next dev (Turbopack)
npm run build   # production build; also type-checks and prerenders
npm run start   # serve the production build
npm run lint    # eslint
```

There is no test runner configured. Verify changes with `npm run lint` and `npm run build`.

## Layout

- `app/`: layout, page, styles, tokens and icons
- `components/`: shared UI components, plus `sections/` for the page sections
- `content/`: all visible text
- `public/`: static files served as is
- The full folder tree is in PROJECT.md.
- `next.config.ts`: Next config. It enables Cache Components and Partial Prefetching and routes `*.css` through `@tailwindcss/turbopack`.
- Path alias: `@/*` maps to the project root (not `src/`).

## Conventions

- **Cache Components is on** (`cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`). This changes the Next.js caching model:
  - Data fetching is dynamic by default. Opt in to caching with the `"use cache"` directive.
  - Uncached data access (`fetch`, `cookies()`, `headers()`, `connection()`, and so on) outside a `<Suspense>` boundary fails the prerender. Wrap it in `<Suspense>`, cache it, or restructure.
  - The `runtime` route segment config is not supported. Do not add `export const runtime`.
  - Navigation uses React `<Activity>`, so previous routes stay mounted and hidden. Client state persists across navigation and effects are cleaned up and recreated.
  - Do not assume Next.js 14/15 caching behaviour. Read the docs under `node_modules/next/dist/docs/01-app/` (start with `01-getting-started/08-caching.md` and `03-api-reference/05-config/01-next-config-js/cacheComponents.md`).
- Routes are App Router only. Components are Server Components by default; add `"use client"` only where interactivity requires it.
- Use the global `PageProps<"/route">` and `LayoutProps<"/route">` type helpers (see `app/layout.tsx`) instead of hand-written props types.
- Use `next/image` for images and `next/font` for fonts.
- Style with Tailwind utility classes. Define theme tokens in `app/tokens.css` under `@theme inline`. Light and dark values live together in each token (`light-dark()`), chosen by the system setting or the `data-theme` attribute set by the header toggle.
- Prefer the `@/` alias over deep relative imports.
- Keep `AGENTS.md` and `CLAUDE.md` consistent. Edit shared guidance here, not in `CLAUDE.md`.

# Project conventions

Last updated: 2026-11-15

Read `DESIGN.md` before touching styles. Read `PROJECT.md` before starting a task. It defines the scope, decisions and folder structure. If a task conflicts with it or is out of scope, ask first.

## Code

- Write the simplest code that works. No clever tricks and no "just in case" branches, options or fallbacks.
- No workarounds (for example `!important` or custom CSS to override Tailwind). Fix the cause at the source, or ask.
- Server components by default. Add `"use client"` only when a file needs state, effects or browser APIs.
- One component per file. Import files directly.
- No barrel `index` files, registries, factories, wrapper functions, extra parameters or layers unless the change genuinely needs one.
- No new dependencies unless the change needs one. Say why.
- Keep diffs small and targeted. Do not rewrite a file for a small change and do not touch unrelated code.

## Clean up after every change

- When removing something, remove everything that only existed for it: imports, components, content entries, tokens, styles, types, files, and the links or references pointing to it.
- When changing a function, find every place that uses it. If another place wraps or adapts the old behavior and the change makes that wrapper unnecessary, delete the wrapper and use the single function directly.
- Leave no dead code, commented-out code, unused exports or old names kept "for compatibility". This repo has no outside users.
- Before finishing, search the repo to confirm nothing still references what was removed. Lint catches unused imports, not unused files or tokens.

## Styling

- Tailwind v4. Every design value lives in `app/tokens.css`.
- Light and dark themes are handled in `tokens.css`. No `dark:` classes in components.
- No hex colors and no arbitrary values (`bg-[#111]`, `p-[13px]`) in components. If a value is missing, add a token first.
- Mobile first: base styles for phones, `md` for tablet, `lg` for desktop.
- Respect `prefers-reduced-motion`.
- When changing how something looks, edit the existing classes. Do not add new classes on top of old ones.
- No conflicting or redundant utilities on one element (`p-4 p-6`, or a `md:` value equal to the base value). Delete classes that no longer have any effect.

## Secrets

- Never commit keys or tokens. Use `.env.local` (git-ignored).

## Before finishing

- Run `npm run lint` and `npm run build` and report the real result.

## Keeping AGENTS.md and PROJECT.md current

- Each file has one `Last updated: YYYY-MM-DD` line near the top. Change the date whenever the file changes.
- When told a rule or decision is no longer valid, or has changed, edit the text directly: delete it or replace it. Do not keep, soften or annotate the old text, and do not write why.
- No changelog or notes about old versions in these files. Put what changed in the commit message. Do not read old versions: the files as they are now are the truth.
