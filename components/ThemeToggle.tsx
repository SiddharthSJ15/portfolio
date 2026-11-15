"use client";

import { useLayoutEffect } from "react";
import Button from "@/components/Button";
import { ui } from "@/content/site";

export default function ThemeToggle() {
  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <Button
      variant="surface"
      type="button"
      onClick={toggle}
      aria-label={ui.themeToggle}
      title={ui.themeToggle}
    >
      ◐
    </Button>
  );
}
