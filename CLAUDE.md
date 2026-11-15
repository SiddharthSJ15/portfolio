@AGENTS.md
@PROJECT.md
@DESIGN.md

# Claude Code notes

Project guidance (stack, commands, conventions, Next.js warnings) lives in `AGENTS.md`, imported above. Keep shared guidance there so other agents see it too. Put only Claude-specific instructions in this file.

- Before writing Next.js code, read the matching guide under `node_modules/next/dist/docs/`. Training-data knowledge of Next.js is unreliable for this version, particularly for caching (Cache Components) and prefetching.
- After code changes, run `npm run lint` and `npm run build`. The build catches prerender errors from uncached data access outside `<Suspense>`.
- If `npm run dev` is already running for this project, reuse that server. `next dev` records its URL and PID in `.next/dev/lock`.
- Do not edit the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`. `next dev` rewrites it.
- This directory is not a git repository, so there is no history to fall back on. Be careful with deletions and overwrites.
