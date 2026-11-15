# Portfolio: PROJECT.md

Last updated: 2026-11-16

What we are building and where it stands. General coding rules live in AGENTS.md. This file is about this site only. Update it when a decision changes.

## Goal

A minimal single-page personal portfolio. A sticky header jumps to each section. It works on mobile, tablet and desktop. One design system keeps the look consistent. The resume can be downloaded. A free contact form sends mail. Total running cost: zero.

## Out of scope (ask before adding)

- About, Projects and Education sections (education, certifications and languages are in the resume PDF)
- Sidebar or navigation rail
- Blog, CMS, database, login
- Animation libraries, UI kits, icon packs

## Decisions

- Sections, in order: Hero, Experience, Skills, Contact.
- Light and dark themes follow the system setting until the visitor picks one with the header toggle. The choice is kept in `localStorage` (`theme`) and set as `data-theme` on `<html>` by an inline script before first paint. `tokens.css` holds both values of each token (`light-dark()`), so components use tokens only.
- Header: logo/name on the left. Links to Experience, Skills and Contact, then the theme toggle. Links show inline from `md` up. Below `md` they collapse into a simple dropdown menu, with the theme toggle just before the menu button. No library.
- Hero: name, title, short summary, GitHub and LinkedIn links, resume button.
- Skills: one compact block of labelled groups.
- Section ids: `hero`, `experience`, `skills`, `contact`.
- Resume: `public/Siddharth-Resume.pdf`, linked with the `download` attribute.
- Design: Tangerine and navy. Values live only in `app/tokens.css`. What each token is for, and the offset-shadow style, are in `DESIGN.md`.
- Content is kept apart from UI. All visible text lives in `content/`: one file per section, plus `site.ts` for section ids, titles, nav order and UI labels.

## Folder structure

```
app/
  layout.tsx        fonts, metadata, header shell
  page.tsx          only puts the sections in order
  globals.css       @import "tailwindcss" + @import "./tokens.css"
  tokens.css        every color, the hard shadow and the font mapping
  icon.svg          SJ logo, browser tab icon; follows the browser's light/dark setting
  apple-icon.tsx    180x180 home-screen PNG generated from icon.svg
components/
  Header.tsx        logo + nav links (server)
  MobileMenu.tsx    "use client", open/close toggle only
  ThemeToggle.tsx   "use client", flips and stores the theme only
  ContactForm.tsx   "use client", form state only
  Section.tsx       section shell + optional heading
  Card.tsx          bordered card with the hard shadow
  Button.tsx        accent / surface buttons (+ buttonVariants for links)
  TextLink.tsx      underlined ink link, optional external
  Field.tsx         labelled input or textarea
  Logo.tsx          SJ logo in theme tokens, used in the header (same shape as app/icon.svg; change both together)
  sections/
    Hero.tsx
    Experience.tsx
    Skills.tsx
    Contact.tsx
content/
  site.ts           section ids, titles, nav order, UI labels
  profile.ts
  experience.ts
  skills.ts
  contact.ts        contact note, email label, form labels
public/
  Siddharth-Resume.pdf
  favicon.ico       light-only fallback for direct /favicon.ico requests; kept out of app/ so the theme-aware icon.svg is the only advertised tab icon (rebuild from the apple-icon PNG if the logo changes)
```

## Content files

Types live in the same file as the data.

```ts
// content/profile.ts
type Link = { label: string; href: string; sections: ("hero" | "contact")[] };
type Profile = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  links: Link[];
  resumePath: string;
  resumeLabel: string;
};

// content/experience.ts
type Role = { title: string; start: string; end: string; points: string[] };
type Job = { company: string; roles: Role[] }; // one company can have 2 roles

// content/skills.ts
type SkillGroup = { label: string; items: string[] };

// content/site.ts
type Section = { id: string; title: string }; // hero has an id only
// exports: sections, navSections (nav order), ui (menu and theme labels)

// content/contact.ts
type ContactContent = {
  note: string;
  emailLabel: string;
  form: { name: string; email: string; message: string; submit: string };
};
```

## Site rules

- `page.tsx` only composes sections. No logic or text in it.
- Each section reads from its own content file. No hardcoded text in components: headings, labels, button text and aria labels all come from `content/`.
- Repeated UI patterns are shared components (`Section`, `Card`, `Button`, `TextLink`, `Field`). Use them instead of repeating their classes.
- Sections do not import each other.
- Contact details are written once, in `profile.ts`. Hero and Contact both read from there. Each link lists the sections it appears in: Hero shows GitHub and LinkedIn, Contact shows Email, LinkedIn and Instagram.
- Section ids, titles and the nav order are defined once in `content/site.ts`. The header, mobile menu and sections all read them.
- Smooth scrolling is CSS only (off for `prefers-reduced-motion`). Sections use `scroll-margin-top` so the sticky header never covers a title.
- `public/Siddharth-Resume.pdf` is updated by hand when the content files change.
- Contact form: include a hidden spam field and show clear success and error states.

## Done checklist

- [ ] Looks right at phone, tablet and desktop widths
- [x] Every header link scrolls to the right section
- [x] Mobile menu opens, closes and is usable by keyboard
- [ ] Resume downloads
- [ ] Contact form delivers a real test email
- [ ] No hardcoded colors or sizes outside `tokens.css`
- [x] `npm run lint` and `npm run build` pass
- [ ] Deployed to a free static host and checked on a real phone
