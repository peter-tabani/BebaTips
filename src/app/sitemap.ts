import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

const publicRoutes = [
  "/",
  "/live-scores",
  "/standings",
  "/accumulators",
  "/jackpots",
  "/blog",
  "/calculator",
  "/premium",
  "/bookmakers",
  "/responsible-gambling",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-14");

  return [
    ...publicRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: path === "/" || path === "/live-scores" ? "daily" as const : "weekly" as const,
      priority: path === "/" ? 1 : path === "/blog" ? 0.9 : 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
