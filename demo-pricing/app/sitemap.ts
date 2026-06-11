import type { MetadataRoute } from "next";
import "./showcase/examples";
import { listShowcase } from "@/lib/showcase";

const BASE = "https://styleseed-demo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/showcase`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/motion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/motion/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/why`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/interactions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const showcaseRoutes: MetadataRoute.Sitemap = listShowcase().map((e) => ({
    url: `${BASE}/showcase/${e.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...showcaseRoutes];
}
