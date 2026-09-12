import type { Project } from "@/src/types/content";

const EXCLUDED_REPOS: string[] = [];
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

interface GitHubRepository {
  name: string;
  description: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  language: string | null;
  created_at: string;
  pushed_at: string;
  updated_at: string;
  html_url: string;
  homepage: string | null;
}

function titleCaseRepoName(name: string) {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ");
}

function getStatus(updatedAt: string): Project["status"] {
  const updatedTime = Date.parse(updatedAt);
  return Number.isFinite(updatedTime) && Date.now() - updatedTime <= NINETY_DAYS ? "Ongoing" : "Completed";
}

export async function getGitHubProjects(): Promise<Project[]> {
  const username = process.env.GITHUB_USERNAME;

  if (!username) return [];

  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!response.ok) return [];

    const repositories = (await response.json()) as GitHubRepository[];

    return repositories
      .filter(
        (repo) => !repo.fork && !repo.archived && !EXCLUDED_REPOS.includes(repo.name.toLowerCase()),
      )
      .map((repo) => {
        const tags = repo.topics ?? [];
        const techStack = [...new Set([repo.language, ...tags].filter((item): item is string => Boolean(item)))];

        return {
          slug: repo.name.toLowerCase(),
          title: titleCaseRepoName(repo.name),
          image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
          shortDescription: repo.description?.trim() || "No description yet.",
          fullDescription: repo.description?.trim() || "No description yet.",
          tags,
          featured: false,
          date: repo.created_at,
          pushedAt: repo.pushed_at,
          status: getStatus(repo.updated_at),
          techStack,
          links: { repo: repo.html_url, demo: repo.homepage || undefined },
        } satisfies Project;
      });
  } catch {
    return [];
  }
}