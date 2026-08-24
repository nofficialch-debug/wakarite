import type { MetadataRoute } from "next";
import { DIAGNOSIS_CONFIGS } from "@/lib/diagnosis-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wakarite.shirume.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const createPages = DIAGNOSIS_CONFIGS.filter((config) => config.createPath !== "/create").map((config) => ({
    url: `${siteUrl}${config.createPath}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/create`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    ...createPages,
    {
      url: `${siteUrl}/guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
