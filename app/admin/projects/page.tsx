import ProjectPicker from "@/src/components/admin/ProjectPicker";
import { getAllProjects } from "@/src/lib/content";
import { getFeaturedSlugs } from "@/src/lib/redis";

export default async function AdminProjectsPage() {
  const [projects, initialFeaturedSlugs] = await Promise.all([getAllProjects(), getFeaturedSlugs()]);

  return (
    <div className="py-16 md:py-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Manage Top Projects</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Selected projects appear in Top Projects on the homepage and are excluded from Recent Projects.
        </p>
      </header>

      <ProjectPicker projects={projects} initialFeaturedSlugs={initialFeaturedSlugs} />
    </div>
  );
}
