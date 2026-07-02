import type { MetadataRoute } from "next";
import { BLOG_POSTS, SEO_PAGES, getSiteUrl } from "@/lib/site-data";

export const revalidate = 3600;

function priorityValue(priority: string) {
  switch (priority) {
    case "Top Priority":
      return 0.92;
    case "High":
      return 0.84;
    case "Medium":
      return 0.74;
    default:
      return 0.66;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const now = new Date();

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = SEO_PAGES.map((page) => ({
    url: `${siteUrl}${page.pageSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: priorityValue(page.priority),
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}${post.pageSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.72,
  }));

  const allRoutes = [...baseRoutes, ...pageRoutes, ...blogRoutes];
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of allRoutes) {
    deduped.set(route.url, route);
  }

  return [...deduped.values()];
}
