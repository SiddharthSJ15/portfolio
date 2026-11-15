type Section = { id: string; title: string };

export const sections = {
  hero: { id: "hero" },
  experience: { id: "experience", title: "Experience" },
  skills: { id: "skills", title: "Skills" },
  contact: { id: "contact", title: "Contact" },
};

export const navSections: Section[] = [
  sections.experience,
  sections.skills,
  sections.contact,
];

export const ui = {
  openMenu: "Menu",
  closeMenu: "Close",
  themeToggle: "Toggle dark mode",
};
