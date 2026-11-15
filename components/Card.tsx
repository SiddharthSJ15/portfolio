import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 border-2 border-line bg-surface p-4 shadow-hard md:p-6">
      {children}
    </div>
  );
}
