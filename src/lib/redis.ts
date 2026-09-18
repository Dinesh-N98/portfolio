import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_KV_REST_API_URL!,
  token: process.env.REDIS_KV_REST_API_TOKEN!,
});

const FEATURED_KEY = "portfolio:featured-project-slugs";

export async function getFeaturedSlugs(): Promise<string[]> {
  try {
    const slugs = await redis.get<string[]>(FEATURED_KEY);
    return slugs ?? [];
  } catch (error) {
    console.error("Failed to read featured slugs from Redis:", error);
    return [];
  }
}

export async function setFeaturedSlugs(slugs: string[]): Promise<void> {
  await redis.set(FEATURED_KEY, slugs);
}
