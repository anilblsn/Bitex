import type { Product } from "@/lib/product-types";
import { getSiteUrl } from "@/lib/site";
import { featuredProductsSectionId } from "@/lib/product-constants";

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
          "Bitex, sporcu besinleri, bulk dönemi ve definasyon dönemi odaklı ürünler sunan bir vücut geliştirme mağazasıdır.",
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
        name: "Bitex sporcu besinleri ve öne çıkan ürünler",
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

export function buildHomePageFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Bulk doneminde hangi urunler tercih edilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bulk doneminde hedefe gore kalori ve antrenman planina uyumlu urun secimi yapilir. Urun etiketindeki icerik, kullanim ve porsiyon bilgileri dikkatle incelenmelidir.",
        },
      },
      {
        "@type": "Question",
        name: "Definasyon doneminde urun secimi nasil yapilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Definasyon doneminde hedef, beslenme plani ve antrenman yogunluguna gore urun secimi yapilir. Kategori karsilastirmasi ve etiket bilgileri dogru secim icin onemlidir.",
        },
      },
      {
        "@type": "Question",
        name: "Urun icerik ve saklama bilgilerine nereden ulasabilirim?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Her urun detay sayfasinda aciklama, fiyat, kategori ve etiket odakli bilgilendirme alanlari bulunur. Parti ve saklama bilgileri urun ambalajinda yer alir.",
        },
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
            item: `${base}/#${featuredProductsSectionId}`,
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
