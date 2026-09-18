"use client";

import { useState } from "react";
import type { Project } from "@/src/types/content";

interface ProjectPickerProps {
  projects: Project[];
  initialFeaturedSlugs: string[];
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function compareByPushedAt(first: Project, second: Project) {
  return Date.parse(second.pushedAt ?? "") - Date.parse(first.pushedAt ?? "");
}

export default function ProjectPicker({ projects, initialFeaturedSlugs }: ProjectPickerProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(() => new Set(initialFeaturedSlugs));
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const sortedProjects = [...projects].sort((first, second) => {
    const firstIsSelected = selectedSlugs.has(first.slug);
    const secondIsSelected = selectedSlugs.has(second.slug);

    if (firstIsSelected !== secondIsSelected) return firstIsSelected ? -1 : 1;
    return compareByPushedAt(first, second);
  });

  const initialSlugs = new Set(initialFeaturedSlugs);
  const hasSelectionChanged =
    selectedSlugs.size !== initialSlugs.size || [...selectedSlugs].some((slug) => !initialSlugs.has(slug));

  function toggleProject(slug: string) {
    setSelectedSlugs((currentSlugs) => {
      const nextSlugs = new Set(currentSlugs);
      if (nextSlugs.has(slug)) {
        nextSlugs.delete(slug);
      } else {
        nextSlugs.add(slug);
      }
      return nextSlugs;
    });
    setSaveMessage(null);
  }

  async function saveChanges() {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch("/api/admin/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: Array.from(selectedSlugs) }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save changes");
      }

      setSaveMessage("Saved — homepage updated");
      window.setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="mt-12 max-w-4xl" aria-labelledby="project-picker-heading">
      <h2 id="project-picker-heading" className="sr-only">
        Select top projects
      </h2>
      <div className="space-y-3">
        {sortedProjects.map((project) => (
          <label
            key={project.slug}
            className="flex cursor-pointer gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-accent/50"
          >
            <input
              type="checkbox"
              checked={selectedSlugs.has(project.slug)}
              onChange={() => toggleProject(project.slug)}
              className="mt-1 size-4 accent-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold text-accent">{project.title}</span>
                <span className="text-sm text-muted">
                  {project.pushedAt ? dateFormatter.format(new Date(project.pushedAt)) : "Date unavailable"}
                </span>
              </span>
              <span className="mt-1 block text-sm leading-6 text-muted">{project.shortDescription}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={saveChanges}
          disabled={isSaving || !hasSelectionChanged}
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        {saveMessage && (
          <p className="text-sm text-accent" role="status">
            {saveMessage}
          </p>
        )}
      </div>
    </section>
  );
}
