"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import { contact, contactLimits } from "@/content/contact";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(response.statusText);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field
        label={contact.form.name}
        name="name"
        maxLength={contactLimits.name}
        autoComplete="name"
      />
      <Field
        label={contact.form.email}
        name="email"
        maxLength={contactLimits.email}
        type="email"
        autoComplete="email"
      />
      <Field
        label={contact.form.message}
        name="message"
        maxLength={contactLimits.message}
        multiline
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <Button
        variant="accent"
        type="submit"
        disabled={status === "sending"}
        className="self-start"
      >
        {status === "sending" ? contact.form.sending : contact.form.submit}
      </Button>
      <p role="status">
        {status === "success" && contact.form.success}
        {status === "error" && contact.form.error}
      </p>
    </form>
  );
}
