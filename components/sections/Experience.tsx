import Card from "@/components/Card";
import Section from "@/components/Section";
import { experience } from "@/content/experience";
import { sections } from "@/content/site";

export default function Experience() {
  return (
    <Section id={sections.experience.id} title={sections.experience.title}>
      <div className="flex flex-col gap-6">
        {experience.map((job) => (
          <Card key={job.company}>
            <h3 className="text-xl font-bold">{job.company}</h3>
            {job.roles.map((role) => (
              <div key={role.title + role.start}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <h4 className="font-bold">{role.title}</h4>
                  <p className="text-muted">
                    {role.start} – {role.end}
                  </p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  );
}
