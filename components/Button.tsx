import type { ComponentProps } from "react";

const base = "border-2 border-line font-bold shadow-hard";

export const buttonVariants = {
  accent: `${base} bg-accent px-5 py-3 text-on-accent`,
  surface: `${base} bg-surface px-3 py-1 text-ink`,
};

type Props = ComponentProps<"button"> & {
  variant: keyof typeof buttonVariants;
};

export default function Button({ variant, className, ...props }: Props) {
  return (
    <button
      className={`${buttonVariants[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
