import type { BlogPost } from "@/src/types/content";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-a-useful-portfolio",
    title: "Building a Useful Portfolio",
    coverImage: "/images/blog/placeholder-1.jpg",
    excerpt: "A few principles for making a portfolio helpful to the people who visit it.",
    content:
      "A portfolio should make the work easy to understand before it tries to make an impression. This is a short placeholder post about context, clarity, and showing the decisions behind a project.",
    tags: ["Portfolio", "Process"],
    date: "2026-08-25",
  },
  {
    slug: "notes-on-small-tools",
    title: "Notes on Small Tools",
    coverImage: "/images/blog/placeholder-2.jpg",
    excerpt: "Why small, focused tools can be a better place to learn than large rewrites.",
    content:
      "Small tools create room for quick feedback. This placeholder post collects a few observations about scope, iteration, and keeping experiments easy to finish.",
    tags: ["Tools", "Learning"],
    date: "2026-03-09",
  },
  {
    slug: "a-quieter-interface",
    title: "A Quieter Interface",
    coverImage: "/images/blog/placeholder-3.jpg",
    excerpt: "Exploring interfaces that give content more room to breathe.",
    content:
      "Good interfaces do not need to compete with the content they present. This placeholder post looks at spacing, contrast, and restraint as practical design tools.",
    tags: ["Design", "Frontend"],
    date: "2025-09-17",
  },
];
