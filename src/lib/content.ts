import { blogPosts } from "@/src/content/blog";
import { newsEntries } from "@/src/content/news";
import { projectOverrides } from "@/src/content/projectOverrides";
import { getGitHubProjects } from "@/src/lib/github";
import type { BlogPost, NewsEntry, Project } from "@/src/types/content";

export async function getAllProjects(): Promise<Project[]> {
  const projects = await getGitHubProjects();
  return projects.map((project) => ({ ...project, ...projectOverrides[project.slug] }));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getRecentProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return [...projects]
    .sort((a, b) => Date.parse(b.pushedAt ?? "") - Date.parse(a.pushedAt ?? ""))
    .slice(0, 6);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllNewsEntries(): NewsEntry[] {
  return [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
}
