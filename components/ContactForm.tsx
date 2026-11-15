"use client";

import Button from "@/components/Button";
import Field from "@/components/Field";
import { contact } from "@/content/contact";

export default function ContactForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-4"
    >
      <Field label={contact.form.name} name="name" autoComplete="name" />
      <Field
        label={contact.form.email}
        name="email"
        type="email"
        autoComplete="email"
      />
      <Field label={contact.form.message} name="message" multiline />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <Button variant="accent" type="submit" className="self-start">
        {contact.form.submit}
      </Button>
    </form>
  );
}
