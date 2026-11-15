type ContactContent = {
  note: string;
  emailLabel: string;
  form: { name: string; email: string; message: string; submit: string };
};

export const contact: ContactContent = {
  note: "Open to new roles and projects. Send a message or email me directly.",
  emailLabel: "Email",
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
  },
};
