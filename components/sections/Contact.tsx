import Card from "@/components/Card";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import TextLink from "@/components/TextLink";
import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import { sections } from "@/content/site";

export default function Contact() {
  return (
    <Section id={sections.contact.id} title={sections.contact.title}>
      <Card>
        <p>{contact.note}</p>
        <ContactForm />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-line pt-4">
          <li>
            <TextLink href={`mailto:${profile.email}`}>
              {contact.emailLabel}
            </TextLink>
          </li>
          {profile.links
            .filter((link) => link.sections.includes("contact"))
            .map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} external>
                  {link.label}
                </TextLink>
              </li>
            ))}
        </ul>
      </Card>
    </Section>
  );
}
