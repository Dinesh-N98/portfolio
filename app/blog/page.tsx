import type { Metadata } from "next";
import BlogPostCard from "@/src/components/sections/BlogPostCard";
import EmptyState from "@/src/components/ui/EmptyState";
import { getAllBlogPosts } from "@/src/lib/content";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Blog | Dinesh Narada",
  "Notes on design, tools, interfaces, and the process behind useful work.",
);

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-16 md:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">Notes and observations</p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Blog</h1>
        <p className="mt-4 text-base leading-7 text-muted">Thoughts on making things, shaping interfaces, and learning in public.</p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      ) : (
        <EmptyState message="No posts yet - check back soon." />
      )}
    </div>
  );
}