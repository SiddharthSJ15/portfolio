"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { navSections, ui } from "@/content/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="md:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Button
        variant="surface"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? ui.closeMenu : ui.openMenu}
      </Button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b-2 border-line bg-surface"
        >
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-ink underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
