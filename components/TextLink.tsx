import type { ReactNode } from "react";

type Props = { href: string; external?: boolean; children: ReactNode };

export default function TextLink({ href, external, children }: Props) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-ink underline"
    >
      {children}
    </a>
  );
}
