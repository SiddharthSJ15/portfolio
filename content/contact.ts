type ContactContent = {
  note: string;
  emailLabel: string;
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
};

// Longest accepted value of each form field, in characters. The form and the route both use these.
export const contactLimits = { name: 100, email: 254, message: 5000 };

export const contact: ContactContent = {
  note: "Open to new roles and projects. Send a message or email me directly.",
  emailLabel: "Email",
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
    sending: "Sending...",
    success: "Thanks, your message was sent.",
    error: "Something went wrong. Please try again or email me directly.",
  },
};
