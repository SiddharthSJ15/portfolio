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
  opengraph-image.tsx  1200x630 link preview image: location, name and title
  api/contact/route.ts  sends the contact form message by email (Resend)
components/
  Header.tsx        logo + nav links (server)
  MobileMenu.tsx    "use client", open/close toggle only
  ThemeToggle.tsx   "use client", flips and stores the theme only
  ContactForm.tsx   "use client", form state and the POST to /api/contact
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
  contact.ts        contact note, email label, form labels, status messages and field length limits
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
  description: string; // short line for search results and link previews
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
  form: {
    name: string; email: string; message: string; submit: string;
    sending: string; success: string; error: string;
  };
};
// also exports contactLimits: the longest accepted name, email and message
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
- Contact form: posts to the route handler `app/api/contact/route.ts`, which sends mail through the Resend API (plain `fetch`, no SDK). It sends from Resend's test sender `onboarding@resend.dev` to the address in `profile.ts`, with the visitor's email as reply-to. The test sender only delivers to the email the Resend account was created with, so that must be the `profile.ts` address. The only secret is `RESEND_API_KEY`, set in `.env.local` locally and in the Vercel environment variables. The form has a hidden spam field (`website`, checked on the server) and shows success and error states. Field lengths are capped by `contactLimits` in `content/contact.ts`, in the form and again on the server.
- Link previews: `app/layout.tsx` sets the page title (name and title), the short `description` from `profile.ts`, and the Open Graph and Twitter tags. `app/opengraph-image.tsx` draws the preview image. Absolute URLs use the `VERCEL_PROJECT_PRODUCTION_URL` variable that Vercel sets.
- Hosting: Vercel (free Hobby plan), deployed from GitHub. `next.config.ts` sets the security headers.

## Done checklist

- [ ] Looks right at phone, tablet and desktop widths
- [x] Every header link scrolls to the right section
- [x] Mobile menu opens, closes and is usable by keyboard
- [ ] Resume downloads
- [ ] Contact form delivers a real test email
- [ ] No hardcoded colors or sizes outside `tokens.css`
- [x] `npm run lint` and `npm run build` pass
- [ ] Deployed to Vercel and checked on a real phone
