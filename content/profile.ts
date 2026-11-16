type Link = { label: string; href: string; sections: ("hero" | "contact")[] };

type Profile = {
  name: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  email: string;
  links: Link[];
  resumePath: string;
  resumeLabel: string;
};

export const profile: Profile = {
  name: "J Siddharth",
  title: "Software Engineer",
  summary:
    "Software Engineer with 1.5 years of experience shipping cross-platform apps with Flutter. Currently building an AI product across mobile and desktop, owning features from the interface to the backend. Experienced in Supabase and API integration.",
  description:
    "Software Engineer in Kochi building cross-platform apps with Flutter and Supabase.",
  location: "Kochi, Kerala, India",
  email: "jsiddharth.dev@gmail.com",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/SiddharthSJ15",
      sections: ["hero"],
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/j-siddharth-b1a4b8238",
      sections: ["hero", "contact"],
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/siddharth_jayakumar",
      sections: ["contact"],
    },
  ],
  resumePath: "/Siddharth-Resume.pdf",
  resumeLabel: "Download resume",
};
