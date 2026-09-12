import type { BlogPost } from "@/src/types/content";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-a-useful-portfolio",
    title: "Building a Useful Portfolio",
    coverImage: "/images/placeholder.svg",
    excerpt: "A few principles for making a portfolio helpful to the people who visit it.",
    content: `# Start with context

  A portfolio should make the work easy to understand before it tries to make an impression. The most useful project pages answer **why the work exists** as clearly as they show what it looks like.

  ## A small checklist

  - Give each project enough context to understand the problem.
  - Show the decisions that shaped the result.
  - Leave room for the work to speak for itself.

  Clarity is not a lack of personality. It is what gives personality somewhere to land.`,
    tags: ["Portfolio", "Process"],
    date: "2026-08-25",
  },
  {
    slug: "notes-on-small-tools",
    title: "Notes on Small Tools",
    coverImage: "/images/placeholder.svg",
    excerpt: "Why small, focused tools can be a better place to learn than large rewrites.",
    content: `# Keep the loop short

  Small tools create room for quick feedback. They are a useful place to learn because the distance between an idea and a working experiment stays manageable.

  ## What makes a tool finishable?

  The first version should have one clear job. Everything else can wait until the useful path feels good. **A narrow scope is a design decision**, not an apology.

  That constraint makes iteration easier and leaves more energy for the details that matter.`,
    tags: ["Tools", "Learning"],
    date: "2026-03-09",
  },
  {
    slug: "a-quieter-interface",
    title: "A Quieter Interface",
    coverImage: "/images/placeholder.svg",
    excerpt: "Exploring interfaces that give content more room to breathe.",
    content: `# Let the content breathe

  Good interfaces do not need to compete with the content they present. Spacing, contrast, and restraint are practical tools for making the important parts easier to notice.

  > Quiet does not mean empty. It means the interface knows when to step aside.

  The result is an interface that feels considered without asking to be admired before it can be used.`,
    tags: ["Design", "Frontend"],
    date: "2025-09-17",
  },
];
