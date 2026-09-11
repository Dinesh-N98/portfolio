import { blogPosts } from "@/src/content/blog";
import { newsEntries } from "@/src/content/news";
import { projects } from "@/src/content/projects";
import type { BlogPost, NewsEntry, Project } from "@/src/types/content";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getRecentProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getProjectBySlug(slug: string): Project | undefined {
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
