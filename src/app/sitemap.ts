import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wc2026.uza.uz";

  const staticRoutes = [
    { url: `${base}/`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${base}/news`, priority: 0.9, changeFrequency: "hourly" as const },
    { url: `${base}/articles`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${base}/results`, priority: 0.9, changeFrequency: "hourly" as const },
    { url: `${base}/standings`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${base}/teams`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/stadiums`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/videos`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${base}/photos`, priority: 0.7, changeFrequency: "daily" as const },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  return staticRoutes;
}
