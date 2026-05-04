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
    slug: "bpc-157-peptit",
    name: "BPC-157 Peptit",
    description: "Peptit kategorisinde liyofilize form.",
    longDescription:
      "BPC-157 peptit ürünü, peptitler grubunda sunulur. Ambalaj üzerindeki parti numarası, son kullanma tarihi ve saklama koşullarına uyunuz; ürün bilgilerini etiketten doğrulayınız.",
    priceTry: 899,
    imageSrc: "/product-placeholder.svg",
    category: "peptitler",
  },
  {
    id: "2",
    slug: "ghrp-6-peptit",
    name: "GHRP-6 Peptit",
    description: "Büyüme hormonu salınımına yönelik peptit analogları sınıfı.",
    longDescription:
      "GHRP-6 peptit ürünü peptitler kategorisindedir. Seri ve SKT bilgileri ambalajda yer alır; oda sıcaklığından uzak, kuru ve çocukların erişemeyeceği yerde saklayınız.",
    priceTry: 449,
    imageSrc: "/product-placeholder.svg",
    category: "peptitler",
  },
  {
    id: "3",
    slug: "oxandrolon-tablet",
    name: "Oxandrolon Tablet",
    description: "Oral tablet steroid formu.",
    longDescription:
      "Oxandrolon içeren tablet steroid ürünü, tablet steroidler grubundadır. Kullanım ve dozaj yalnızca etiket ve mevzuata uygun şekilde değerlendirilmelidir; şüphe halinde hekiminize danışınız.",
    priceTry: 279,
    imageSrc: "/product-placeholder.svg",
    category: "tablet-steroidler",
  },
  {
    id: "4",
    slug: "stanozolol-tablet",
    name: "Stanozolol Tablet",
    description: "Tablet steroid, oral uygulama.",
    longDescription:
      "Stanozolol tablet steroid ürünü tablet steroidler kategorisinde listelenir. Parti takibi ve saklama talimatları için kutudaki bilgilere başvurunuz.",
    priceTry: 329,
    imageSrc: "/product-placeholder.svg",
    category: "tablet-steroidler",
  },
  {
    id: "5",
    slug: "testosteron-enanthate-enjeksiyon",
    name: "Testosteron Enanthate Enjeksiyon",
    description: "Enjeksiyonluk steroid çözeltisi.",
    longDescription:
      "Testosteron enanthate enjeksiyon formu, enjeksiyon steroidler grubundadır. Steril uygulama ve depolama kurallarına uyunuz; kullanım öncesi ambalaj ve insert bilgilerini okuyunuz.",
    priceTry: 519,
    imageSrc: "/product-placeholder.svg",
    category: "enjeksiyon-steroidler",
  },
  {
    id: "6",
    slug: "boldenon-undecilenat-enjeksiyon",
    name: "Boldenon Undecilenat Enjeksiyon",
    description: "Uzun ester enjeksiyon steroid.",
    longDescription:
      "Boldenon undecilenat enjeksiyon ürünü enjeksiyon steroidler kategorisindedir. Işıktan koruyarak, talimatta belirtilen sıcaklıkta saklayınız; son kullanma tarihini kontrol ediniz.",
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
