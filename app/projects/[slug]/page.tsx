import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return project
    ? createPageMetadata(`${project.title} | Dinesh Narada`, project.shortDescription)
    : createPageMetadata("Project Not Found | Dinesh Narada", "The requested project could not be found.");
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="py-12 md:py-20">
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center rounded-md text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        &lt;- Back to Projects
      </Link>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        <div className="relative aspect-[16/9] bg-white/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1152px) 72rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <time dateTime={project.date}>{project.date}</time>
            <span aria-hidden="true">/</span>
            <span>{project.status}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted">{project.fullDescription}</p>

          <div className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.techStack.map((technology) => (
              <span key={technology} className="rounded-full border border-accent/30 px-3 py-1.5 text-sm text-accent">
                {technology}
              </span>
            ))}
          </div>

          {(project.links?.demo || project.links?.repo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target={project.links.demo.startsWith("http") ? "_blank" : undefined}
                  rel={project.links.demo.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View Demo
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target={project.links.repo.startsWith("http") ? "_blank" : undefined}
                  rel={project.links.repo.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View Repository
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}