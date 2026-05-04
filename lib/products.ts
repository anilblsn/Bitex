import "server-only";
import type { ProductCategoryId } from "@/lib/categories";
import type { Product } from "@/lib/product-types";
import { promises as fs } from "node:fs";
import path from "node:path";

const productsFilePath = path.join(process.cwd(), "data", "products.json");

const defaultProducts: Product[] = [
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

async function readProductsFromFile(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(productsFilePath, "utf8");
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed)) return defaultProducts;
    return parsed;
  } catch {
    return defaultProducts;
  }
}

async function writeProductsToFile(items: Product[]): Promise<void> {
  await fs.mkdir(path.dirname(productsFilePath), { recursive: true });
  await fs.writeFile(productsFilePath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export async function getProducts(): Promise<Product[]> {
  return readProductsFromFile();
}

export async function getProductsByCategory(category: ProductCategoryId): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

/** Ana sayfadaki öne çıkan grid sırası: sabit seed ile karışık, her derlemede aynı */
export async function getFeaturedProductsOrdered(): Promise<Product[]> {
  const products = await getProducts();
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

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}

type CreateProductInput = {
  name: string;
  description: string;
  longDescription: string;
  priceTry: number;
  category: ProductCategoryId;
  imageSrc?: string;
};

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const products = await getProducts();
  const maxId = products.reduce((acc, item) => Math.max(acc, Number(item.id) || 0), 0);
  const baseSlug = slugify(input.name);
  const slug = products.some((item) => item.slug === baseSlug) ? `${baseSlug}-${Date.now()}` : baseSlug;

  const product: Product = {
    id: String(maxId + 1),
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    longDescription: input.longDescription.trim(),
    priceTry: input.priceTry,
    imageSrc: input.imageSrc?.trim() || "/product-placeholder.svg",
    category: input.category,
  };

  await writeProductsToFile([...products, product]);
  return product;
}

export async function deleteProductById(id: string): Promise<boolean> {
  const products = await getProducts();
  const nextProducts = products.filter((item) => item.id !== id);
  if (nextProducts.length === products.length) {
    return false;
  }
  await writeProductsToFile(nextProducts);
  return true;
}
