type Role = { title: string; start: string; end: string; points: string[] };

type Job = { company: string; roles: Role[] }; // one company can have 2 roles

export const experience: Job[] = [
  {
    company: "Ascimov Technologies Pvt Ltd",
    roles: [
      {
        title: "Software Engineer",
        start: "Apr 2026",
        end: "Present",
        points: [
          "Build and maintain intbox, a cross-platform AI app for iOS, Android, macOS and Windows using Flutter and Supabase",
          "Improved the architecture of the AI extraction feature across the app and backend, making it more reliable across devices",
          "Delivered new features and reusable UI components for mobile and desktop",
          "Working on offline and online AI evals to test and improve the quality of the product's AI features",
        ],
      },
      {
        title: "Flutter Intern",
        start: "Nov 2025",
        end: "Mar 2026",
        points: [
          "Built the messaging interface and AI chat features",
          "Developed login, settings and responsive layouts using Bloc/Cubit",
        ],
      },
    ],
  },
  {
    company: "Portfolix.Tech",
    roles: [
      {
        title: "Flutter Intern",
        start: "Jan 2025",
        end: "Jul 2025",
        points: [
          "Built admin and user-facing screens for a Learning Management System using Flutter for Web",
          "Managed application state with Provider and integrated REST APIs between frontend and backend",
        ],
      },
    ],
  },
];
