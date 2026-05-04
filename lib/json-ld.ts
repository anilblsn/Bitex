import type { Product } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export function buildHomePageJsonLd(productList: Product[]) {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "Bitex",
        url: base,
        description:
          "Bitex, kaliteli takviye edici gıdalar ve besin destekleri sunan güvenilir bir markadır.",
        logo: `${base}/product-placeholder.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: "Bitex",
        inLanguage: "tr-TR",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "ItemList",
        name: "Bitex öne çıkan ürünleri",
        itemListElement: productList.map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: `${base}${p.imageSrc}`,
            brand: { "@type": "Brand", name: "Bitex" },
            offers: {
              "@type": "Offer",
              priceCurrency: "TRY",
              price: p.priceTry,
              availability: "https://schema.org/InStock",
              url: `${base}/urunler/${p.slug}`,
            },
          },
        })),
      },
    ],
  };
}

export function buildProductDetailJsonLd(product: Product) {
  const base = getSiteUrl();
  const pageUrl = `${base}/urunler/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: product.name,
        description: product.longDescription,
        image: `${base}${product.imageSrc}`,
        brand: { "@type": "Brand", name: "Bitex" },
        sku: product.id,
        offers: {
          "@type": "Offer",
          url: pageUrl,
          priceCurrency: "TRY",
          price: product.priceTry,
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Bitex" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: `${base}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Öne çıkan ürünler",
            item: `${base}/#one-cikan-urunler`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
