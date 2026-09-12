import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllProjects } from "@/src/lib/content";
import { siteUrl } from "@/src/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/blog", "/news", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
  }));
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(`${project.date}T00:00:00`),
  }));
  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}