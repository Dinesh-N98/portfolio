import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/src/types/content";

interface BlogPostCardProps {
  post: BlogPost;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-accent/60">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <time dateTime={post.date} className="text-sm text-accent">
            {formatDate(post.date)}
          </time>
          <h2 className="mt-3 text-xl font-semibold tracking-tight">
            <Link
              href={`/blog/${post.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2" aria-label={`${post.title} tags`}>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-accent/30 px-2.5 py-1 text-xs text-accent">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex w-fit items-center rounded-md border border-white/15 px-3 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Read More
          <span aria-hidden="true" className="ml-2">
            -&gt;
          </span>
        </Link>
      </div>
    </article>
  );
}