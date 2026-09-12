"use client";

import { useState } from "react";
import Badge from "@/src/components/ui/Badge";
import EmptyState from "@/src/components/ui/EmptyState";
import ProjectCard from "@/src/components/sections/ProjectCard";
import type { Project } from "@/src/types/content";

type Filter = "all" | "hot" | "recent" | `tag:${string}`;

interface ProjectsGridProps {
  projects: Project[];
  tags: string[];
  languageStats?: Record<string, number>;
}

const filterLabels: Record<Exclude<Filter, `tag:${string}`>, string> = {
  all: "All",
  hot: "Hot",
  recent: "Recent",
};

export default function ProjectsGrid({ projects, tags, languageStats = {} }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredProjects = [...projects]
    .filter((project) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "hot") return project.featured;
      if (activeFilter === "recent") return true;
      return project.tags.includes(activeFilter.slice(4));
    })
    .sort((a, b) => (activeFilter === "recent" ? b.date.localeCompare(a.date) : 0));

  const filters: { label: string; value: Filter }[] = [
    ...Object.entries(filterLabels).map(([value, label]) => ({ value: value as Filter, label })),
    ...tags.map((tag) => ({ label: tag, value: `tag:${tag}` as Filter })),
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          const languagePercentage = languageStats[filter.label];

          if (languagePercentage !== undefined) {
            return (
              <Badge
                key={filter.value}
                label={filter.label}
                percentage={languagePercentage}
                pressed={isActive}
                onClick={() => setActiveFilter(filter.value)}
                className={
                  isActive
                    ? "border-accent bg-accent text-background"
                    : "border-white/15 text-muted hover:border-accent hover:text-accent"
                }
              />
            );
          }

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.value)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-white/15 text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} languageStats={languageStats} />
          ))}
        </div>
      ) : (
        <EmptyState message="No projects match this filter yet." />
      )}
    </>
  );
}