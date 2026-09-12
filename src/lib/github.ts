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

type GitHubLanguageBreakdown = Record<string, number>;

const LOW_SIGNAL_LANGUAGES = new Set(["css", "html", "scss"]);

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

async function getRepositoryLanguages(
  username: string,
  repositoryName: string,
  headers: HeadersInit,
): Promise<GitHubLanguageBreakdown> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repositoryName)}/languages`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!response.ok) return {};

    const languageBytes = (await response.json()) as GitHubLanguageBreakdown;
    const totalBytes = Object.values(languageBytes).reduce((total, bytes) => total + bytes, 0);

    return totalBytes > 0 ? languageBytes : {};
  } catch {
    return {};
  }
}

function getMeaningfulLanguageNames(languageBytes: GitHubLanguageBreakdown) {
  const totalBytes = Object.values(languageBytes).reduce((total, bytes) => total + bytes, 0);

  if (totalBytes <= 0) return [];

  return Object.entries(languageBytes)
    .map(([language, bytes]) => ({ language, percentage: (bytes / totalBytes) * 100 }))
    .filter(
      ({ language, percentage }) =>
        !LOW_SIGNAL_LANGUAGES.has(language.toLowerCase()) || percentage >= 15,
    )
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2)
    .map(({ language }) => language);
}

async function getGitHubData() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) return { repositories: [], languageBreakdowns: [] };

  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!response.ok) return { repositories: [], languageBreakdowns: [] };

    const repositories = ((await response.json()) as GitHubRepository[]).filter(
      (repo) => !repo.fork && !repo.archived && !EXCLUDED_REPOS.includes(repo.name.toLowerCase()),
    );
    const languageBreakdowns = await Promise.all(
      repositories.map((repo) => getRepositoryLanguages(username, repo.name, headers)),
    );

    return { repositories, languageBreakdowns };
  } catch {
    return { repositories: [], languageBreakdowns: [] };
  }
}

export async function getGitHubProjects(): Promise<Project[]> {
  const username = process.env.GITHUB_USERNAME ?? "";
  const { repositories, languageBreakdowns } = await getGitHubData();

  return repositories.map((repo, index) => {
      const languageNames = getMeaningfulLanguageNames(languageBreakdowns[index] ?? {});
      const tags = [...new Set([...languageNames, ...(repo.topics ?? [])])];
      const techStack = [...tags];

      return {
        slug: repo.name.toLowerCase(),
        title: titleCaseRepoName(repo.name),
        image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
        primaryLanguage: languageNames[0] ?? repo.language ?? undefined,
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
}

export async function getGlobalLanguageStats(): Promise<Record<string, number>> {
  const { languageBreakdowns } = await getGitHubData();
  const languageTotals: Record<string, number> = {};

  for (const breakdown of languageBreakdowns) {
    for (const [language, bytes] of Object.entries(breakdown)) {
      languageTotals[language] = (languageTotals[language] ?? 0) + bytes;
    }
  }

  const grandTotal = Object.values(languageTotals).reduce((total, bytes) => total + bytes, 0);

  if (grandTotal <= 0) return {};

  return Object.fromEntries(
    Object.entries(languageTotals).map(([language, bytes]) => [
      language,
      Number(((bytes / grandTotal) * 100).toFixed(1)),
    ]),
  );
}