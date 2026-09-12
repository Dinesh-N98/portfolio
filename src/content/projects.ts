import type { Project } from "@/src/types/content";

export const projects: Project[] = [
  {
    slug: "portfolio-system",
    title: "Portfolio System",
    image: "/images/placeholder.svg",
    shortDescription: "A focused portfolio experience for sharing selected work and ideas.",
    fullDescription:
      "A personal portfolio system designed to make projects, writing, and ongoing experiments easy to discover. The foundation emphasizes clear content structures, responsive layouts, and a calm reading experience.",
    tags: ["Portfolio", "Design System"],
    featured: true,
    date: "2026-08-18",
    status: "Ongoing",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      repo: "https://github.com/Dinesh-N98",
    },
  },
  {
    slug: "insight-dashboard",
    title: "Insight Dashboard",
    image: "/images/placeholder.svg",
    shortDescription: "A compact dashboard for turning operational data into useful signals.",
    fullDescription:
      "An analytics dashboard concept that brings key metrics, trends, and recent activity into one readable workspace. The project explores information hierarchy and practical data visualization patterns.",
    tags: ["Dashboard", "Data"],
    featured: true,
    date: "2026-05-12",
    status: "Completed",
    techStack: ["React", "TypeScript", "Charts"],
    links: {
      repo: "https://github.com/Dinesh-N98",
    },
  },
  {
    slug: "community-notes",
    title: "Community Notes",
    image: "/images/placeholder.svg",
    shortDescription: "A lightweight space for collecting and sharing useful notes.",
    fullDescription:
      "A collaborative notes concept built around quick publishing, thoughtful organization, and lightweight discovery. Its content model supports short entries without losing room for context.",
    tags: ["Community", "Content"],
    featured: false,
    date: "2025-11-03",
    status: "Completed",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    links: {
      repo: "https://github.com/Dinesh-N98",
    },
  },
  {
    slug: "automation-lab",
    title: "Automation Lab",
    image: "/images/placeholder.svg",
    shortDescription: "An evolving collection of small tools for reducing repetitive work.",
    fullDescription:
      "An ongoing playground for testing automation ideas, scripts, and integrations. Each experiment is kept deliberately small so the useful parts can be carried into larger projects.",
    tags: ["Automation", "Experiments"],
    featured: false,
    date: "2025-07-21",
    status: "Ongoing",
    techStack: ["Node.js", "TypeScript", "APIs"],
  },
  {
    slug: "local-first-journal",
    title: "Local-First Journal",
    image: "/images/placeholder.svg",
    shortDescription: "A private journaling prototype that keeps personal writing close at hand.",
    fullDescription:
      "A local-first journaling prototype exploring offline access, simple search, and durable personal data. The interface stays intentionally quiet so writing remains the primary activity.",
    tags: ["Productivity", "Privacy"],
    featured: true,
    date: "2024-12-14",
    status: "Completed",
    techStack: ["React", "IndexedDB", "CSS"],
  },
];
