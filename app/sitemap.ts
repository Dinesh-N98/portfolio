import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/src/lib/content";
import { siteUrl } from "@/src/lib/metadata";

function parseDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/projects", "/blog", "/news", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
  }));
  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
  }));

  return [...staticRoutes, ...blogRoutes];
}