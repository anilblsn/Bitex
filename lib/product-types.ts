import type { ProductCategoryId } from "@/lib/categories";

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Detay sayfası ve zengin snippet için daha uzun metin */
  longDescription: string;
  priceTry: number;
  imageSrc: string;
  slug: string;
  category: ProductCategoryId;
};
