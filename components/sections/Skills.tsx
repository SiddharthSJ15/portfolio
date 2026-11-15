import Card from "@/components/Card";
import Section from "@/components/Section";
import { sections } from "@/content/site";
import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <Section id={sections.skills.id} title={sections.skills.title}>
      <Card>
        {skills.map((group) => (
          <div key={group.label}>
            <h3 className="font-bold">{group.label}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="bg-pop px-2 py-1 text-sm font-medium text-on-pop"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </Section>
  );
}
