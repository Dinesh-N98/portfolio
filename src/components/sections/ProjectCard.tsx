import Badge from "@/src/components/ui/Badge";
import ProjectThumbnail from "@/src/components/ui/ProjectThumbnail";
import type { Project } from "@/src/types/content";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  languageStats?: Record<string, number>;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project, languageStats = {} } = props;
  const repositoryUrl = project.links?.repo;
  const repositoryLabel = `View ${project.title} repository on GitHub`;
  const primaryLanguage = project.primaryLanguage ?? project.tags[0];

  const thumbnail = (
    <div className="relative block aspect-[16/10] overflow-hidden bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <ProjectThumbnail title={project.title} image={project.image} primaryLanguage={primaryLanguage} />
    </div>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-accent/60">
      {repositoryUrl ? (
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={repositoryLabel}
          className="relative block aspect-[16/10] overflow-hidden bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {thumbnail}
        </a>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">{thumbnail}</div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={repositoryLabel}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {project.title}
            </a>
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.shortDescription}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} percentage={languageStats[tag]} />
          ))}
        </div>

        {repositoryUrl && (
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={repositoryLabel}
            className="inline-flex min-h-11 w-fit items-center rounded-md border border-white/15 px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View Repository
            <span aria-hidden="true" className="ml-2">
              -&gt;
            </span>
          </a>
        )}
      </div>
    </article>
  );
}