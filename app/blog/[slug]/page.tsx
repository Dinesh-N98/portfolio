import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllBlogPosts, getBlogPostBySlug } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/metadata";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(`${date}T00:00:00`));
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return post
    ? createPageMetadata(`${post.title} | Dinesh Narada`, post.excerpt)
    : createPageMetadata("Post Not Found | Dinesh Narada", "The requested blog post could not be found.");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="py-12 md:py-20">
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center rounded-md text-sm text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        &lt;- Back to Blog
      </Link>

      <header className="mx-auto mt-8 max-w-3xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1152px) 48rem, 100vw"
            className="object-cover"
          />
        </div>
        <time dateTime={post.date} className="mt-8 block text-sm text-accent">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{post.title}</h1>
        <div className="mt-5 flex flex-wrap gap-2" aria-label={`${post.title} tags`}>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-accent/30 px-3 py-1.5 text-sm text-accent">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert prose-lg mx-auto mt-12 max-w-3xl prose-headings:tracking-tight prose-a:text-accent prose-strong:text-foreground">
        <ReactMarkdown components={{ h1: "h2", h2: "h3" }}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}