# Design

Last updated: 2026-11-15

What each design token is for. The values live only in `app/tokens.css`. Do not copy values into this file.

## Tokens

- `page`: page background (`bg-page`)
- `surface`: cards and form blocks (`bg-surface`)
- `ink`: text and links (`text-ink`)
- `muted`: secondary text (`text-muted`)
- `line`: borders (`border-line`)
- `accent`: fill of main buttons and the logo letters (`bg-accent`, `fill-accent`)
- `on-accent`: text on accent (`text-on-accent`)
- `pop`: highlights, such as skill chips and the marker behind a headline word (`bg-pop`)
- `on-pop`: text on pop (`text-on-pop`)
- `shadow-hard`: solid offset shadow with no blur (`shadow-hard`)

## Rules

- `accent` is a fill, never a text color. Links use `text-ink underline`.
- Cards, buttons and form blocks use `border-2 border-line shadow-hard`. Nothing else gets the shadow.
- `accent` is for buttons and the logo only. `pop` is for highlights only.
- Light and dark switch through the tokens. No `dark:` classes.
- To add a color, add the token in both themes in `tokens.css`, then add one line here.
