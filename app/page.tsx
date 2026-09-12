import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/src/components/sections/Hero";
import ProjectCarousel from "@/src/components/sections/ProjectCarousel";
import { getAllBlogPosts, getFeaturedProjects, getRecentProjects } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Dinesh Narada",
  description: "A personal space for thoughtful interfaces, small tools, and the work behind them.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
}

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentProjects = getRecentProjects();
  const blogPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="border-b border-white/10 py-16 md:py-20" aria-labelledby="hot-projects-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="hot-projects-heading" className="text-3xl font-semibold tracking-tight">
            Hot Projects
          </h2>
          <Link
            href="/projects"
            className="shrink-0 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See All Projects -&gt;
          </Link>
        </div>
        <ProjectCarousel variant="hot" projects={featuredProjects} />
      </section>

      <section className="border-b border-white/10 py-16 md:py-20" aria-labelledby="recent-projects-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="recent-projects-heading" className="text-3xl font-semibold tracking-tight">
            Recent Projects
          </h2>
          <Link
            href="/projects"
            className="shrink-0 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See All Projects -&gt;
          </Link>
        </div>
        <ProjectCarousel variant="recent" projects={recentProjects} />
      </section>

      <section className="py-16 md:py-20" aria-labelledby="blog-preview-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="blog-preview-heading" className="text-3xl font-semibold tracking-tight">
            From the Blog
          </h2>
          <Link
            href="/blog"
            className="shrink-0 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See All Posts -&gt;
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border-l border-accent/50 pl-5">
              <time dateTime={post.date} className="text-sm text-accent">
                {formatDate(post.date)}
              </time>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
