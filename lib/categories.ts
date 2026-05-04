export type ProductCategoryId = "peptitler" | "tablet-steroidler" | "enjeksiyon-steroidler";

export const categoryOrder: ProductCategoryId[] = [
  "peptitler",
  "tablet-steroidler",
  "enjeksiyon-steroidler",
];

export const categoryLabels: Record<ProductCategoryId, string> = {
  peptitler: "Peptitler",
  "tablet-steroidler": "Tablet steroidler",
  "enjeksiyon-steroidler": "Enjeksiyon steroidler",
};

export const categoryAnchors: Record<ProductCategoryId, string> = {
  peptitler: "kategori-peptitler",
  "tablet-steroidler": "kategori-tablet-steroidler",
  "enjeksiyon-steroidler": "kategori-enjeksiyon-steroidler",
};

/** Kısa tanıtım metinleri (ana sayfa kategori bandı) */
export const categoryIntros: Record<ProductCategoryId, { title: string; text: string }> = {
  peptitler: {
    title: "Peptitler",
    text: "Araştırma ve laboratuvar kullanımına yönelik peptit çeşitleri; şeffaf etiket ve parti takibi.",
  },
  "tablet-steroidler": {
    title: "Tablet steroidler",
    text: "Oral formda sunulan ürün grupları; saklama ve kullanım bilgileri ürün sayfalarında yer alır.",
  },
  "enjeksiyon-steroidler": {
    title: "Enjeksiyon steroidler",
    text: "Enjeksiyon formları; yasal mevzuat ve reçete gereklilikleri için ürün bilgilendirmelerine mutlaka uyunuz.",
  },
};
