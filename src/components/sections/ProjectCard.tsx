import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/src/types/content";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-accent/60">
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {project.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">{project.shortDescription}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-accent/30 px-2.5 py-1 text-xs text-accent">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-11 w-fit items-center rounded-md border border-white/15 px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View More
          <span aria-hidden="true" className="ml-2">
            -&gt;
          </span>
        </Link>
      </div>
    </article>
  );
}