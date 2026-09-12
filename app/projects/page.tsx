import type { Metadata } from "next";
import ProjectsGrid from "@/src/components/sections/ProjectsGrid";
import { getAllProjects } from "@/src/lib/content";
import { getGlobalLanguageStats } from "@/src/lib/github";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Projects | Dinesh Narada",
  "Selected projects, experiments, and systems by Dinesh Narada.",
);

export default async function ProjectsPage() {
  const [projects, languageStats] = await Promise.all([getAllProjects(), getGlobalLanguageStats()]);
  const tags = [...new Set(projects.flatMap((project) => project.tags))].sort();

  return (
    <div className="py-16 md:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">Selected work</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Projects</h1>
        <p className="mt-4 text-base leading-7 text-muted">A collection of practical builds, experiments, and ideas in progress.</p>
      </header>
      <ProjectsGrid projects={projects} tags={tags} languageStats={languageStats} />
    </div>
  );
}