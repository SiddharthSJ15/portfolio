import { buttonVariants } from "@/components/Button";
import Section from "@/components/Section";
import TextLink from "@/components/TextLink";
import { profile } from "@/content/profile";
import { sections } from "@/content/site";

export default function Hero() {
  return (
    <Section id={sections.hero.id}>
      <p className="text-muted">{profile.location}</p>
      <h1 className="mt-2 text-4xl font-bold md:text-6xl">{profile.name}</h1>
      <p className="mt-4 text-xl md:text-2xl">
        <span className="bg-pop px-1 text-on-pop">{profile.title}</span>
      </p>
      <p className="mt-6 max-w-2xl">{profile.summary}</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        {profile.links
          .filter((link) => link.sections.includes("hero"))
          .map((link) => (
            <TextLink key={link.href} href={link.href} external>
              {link.label}
            </TextLink>
          ))}
        <a
          href={profile.resumePath}
          download
          className={buttonVariants.accent}
        >
          {profile.resumeLabel}
        </a>
      </div>
    </Section>
  );
}
