# J Siddharth: Portfolio

My personal portfolio. A single page with Experience, Skills and Contact sections, light and dark themes, and a downloadable resume.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, with every design value in `app/tokens.css`
- No UI kits, icon packs or animation libraries

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

- `app/`: layout, page, design tokens and icons
- `components/`: shared UI components and the page sections
- `content/`: all text on the site. Edit these files to change what the site says.
- `public/`: resume and static files

## Docs

- [PROJECT.md](PROJECT.md): scope, decisions and the done checklist
- [DESIGN.md](DESIGN.md): what each design token is for
- [AGENTS.md](AGENTS.md): coding conventions, also read by AI coding agents
