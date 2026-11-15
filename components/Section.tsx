import type { ReactNode } from "react";

type Props = { id: string; title?: string; children: ReactNode };

export default function Section({ id, title, children }: Props) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-3xl scroll-mt-16 px-4 py-12 md:px-6 md:py-16"
    >
      {title && <h2 className="mb-8 text-2xl font-bold md:text-3xl">{title}</h2>}
      {children}
    </section>
  );
}
