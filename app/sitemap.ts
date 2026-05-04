import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const home = {
    url: base,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const productEntries = products.map((p) => ({
    url: `${base}/urunler/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [home, ...productEntries];
}
