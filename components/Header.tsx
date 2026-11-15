import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import TextLink from "@/components/TextLink";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/content/profile";
import { navSections, sections } from "@/content/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-line bg-page">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href={`#${sections.hero.id}`}
          className="flex items-center gap-2 font-bold text-ink"
        >
          <Logo />
          {profile.name}
        </a>
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden gap-6 md:flex">
            {navSections.map((section) => (
              <TextLink key={section.id} href={`#${section.id}`}>
                {section.title}
              </TextLink>
            ))}
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
