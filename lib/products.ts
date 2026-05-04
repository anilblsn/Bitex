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

export const products: Product[] = [
  {
    id: "1",
    slug: "whey-protein-konsantre",
    name: "Whey Protein Konsantre",
    description: "Yüksek biyolojik değerli protein kaynağı.",
    longDescription:
      "Bitex Whey Protein Konsantre, günlük protein ihtiyacınızı pratik şekilde desteklemek için formüle edilmiştir. Antrenman sonrası veya öğün aralarında kullanıma uygundur. Etiket üzerindeki kullanım önerisine uyunuz.",
    priceTry: 899,
    imageSrc: "/product-placeholder.svg",
    category: "peptitler",
  },
  {
    id: "2",
    slug: "omega-3-balik-yagi",
    name: "Omega-3 Balık Yağı",
    description: "EPA ve DHA ile günlük destek.",
    longDescription:
      "EPA ve DHA içeren balık yağı ile günlük beslenmenize omega-3 desteği ekleyin. Ürün ambalajında parti numarası ve son kullanma tarihi yer alır; saklama koşullarına dikkat ediniz.",
    priceTry: 449,
    imageSrc: "/product-placeholder.svg",
    category: "peptitler",
  },
  {
    id: "3",
    slug: "magnezyum-citrat",
    name: "Magnezyum Sitrat",
    description: "Kas ve sinir sistemi için formül.",
    longDescription:
      "Magnezyum sitrat formu, günlük magnezyum alımınızı desteklemek amacıyla sunulur. Takviye edici gıdalar normal beslenmenin yerine geçmez; dengeli ve çeşitli beslenme önemlidir.",
    priceTry: 279,
    imageSrc: "/product-placeholder.svg",
    category: "tablet-steroidler",
  },
  {
    id: "4",
    slug: "d3k2-vitamini",
    name: "D3 + K2 Vitamini",
    description: "Kemik ve bağışıklık desteği.",
    longDescription:
      "D vitamini ve K2 vitamini bir arada; kemik sağlığı ve bağışıklık sisteminize katkı sunmayı hedefleyen takviye edici gıda. Aşırı dozdan kaçının; hamilelik ve emzirme döneminde doktorunuza danışınız.",
    priceTry: 329,
    imageSrc: "/product-placeholder.svg",
    category: "tablet-steroidler",
  },
  {
    id: "5",
    slug: "probiyotik-kompleks",
    name: "Probiyotik Kompleks",
    description: "Bağırsak florası için çoklu suş.",
    longDescription:
      "Çeşitli probiyotik suşları içeren kompleks formül, bağırsak floranızı desteklemeye yardımcı olur. Soğuk zincir gerektirmeyen formülasyonlarda oda sıcaklığında kuru yerde saklayınız.",
    priceTry: 519,
    imageSrc: "/product-placeholder.svg",
    category: "enjeksiyon-steroidler",
  },
  {
    id: "6",
    slug: "kreatin-monohidrat",
    name: "Kreatin Monohidrat",
    description: "Performans odaklı saf kreatin.",
    longDescription:
      "Saf kreatin monohidrat ile kısa süreli, yüksek yoğunluklu fiziksel performansın artmasına katkı sağlayan takviye edici gıda. Yeterli sıvı alımı ile birlikte kullanılması önerilir.",
    priceTry: 399,
    imageSrc: "/product-placeholder.svg",
    category: "enjeksiyon-steroidler",
  },
];

export function getProductsByCategory(category: ProductCategoryId): Product[] {
  return products.filter((p) => p.category === category);
}

/** Ana sayfadaki öne çıkan grid sırası: sabit seed ile karışık, her derlemede aynı */
export function getFeaturedProductsOrdered(): Product[] {
  const list = [...products];
  let s = 2166136261;
  for (let i = 0; i < "bitex-featured-v1".length; i++) {
    s = Math.imul(s ^ "bitex-featured-v1".charCodeAt(i), 16777619);
  }
  const next01 = () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(next01() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/** Navbar / hash bağlantıları için */
export const featuredProductsSectionId = "one-cikan-urunler" as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
