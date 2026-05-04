import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const products = await getProducts();

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
