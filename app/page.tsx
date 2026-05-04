import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";
import { categoryAnchors, categoryIntros, categoryOrder } from "@/lib/categories";
import { buildHomePageJsonLd } from "@/lib/json-ld";
import { featuredProductsSectionId } from "@/lib/product-constants";
import { getFeaturedProductsOrdered } from "@/lib/products";

const heroFeatures = [
  {
    title: "Hızlı kargo",
    text: "Siparişleriniz kısa sürede hazırlanır ve yola çıkar.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M14 18h-2M14 18h8l-2-5h3V9h-6M6 18a2 2 0 1 0 4 0M16 18a2 2 0 1 0 4 0" />
      </svg>
    ),
  },
  {
    title: "Yurtdışı kargo gönderimi",
    text: "Uluslararası adreslere güvenli gönderim seçenekleri.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "EFT / havale",
    text: "Banka havalesi ve EFT ile kolay ödeme imkânı.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M7 15h.01M11 15h2" />
      </svg>
    ),
  },
  {
    title: "Güvenli alışveriş",
    text: "Kişisel verileriniz ve ödeme bilgileriniz korunur.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Ürün özellikleri",
    text: "İçerik, kullanım ve etiket bilgileri şeffaf şekilde sunulur.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sporcu Besinleri ve Vucut Gelistirme Takviyeleri",
  description:
    "Bulk ve definasyon hedeflerine uygun sporcu besinleri, peptit ve steroid kategorileriyle Bitex'te.",
  keywords: [
    "sporcu besinleri",
    "vucut gelistirme takviyeleri",
    "bulk urunleri",
    "definasyon urunleri",
    "peptit urunleri",
    "steroid urunleri",
  ],
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredProducts = await getFeaturedProductsOrdered();
  const jsonLd = buildHomePageJsonLd(featuredProducts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <section
          id="anasayfa"
          className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <h1
              id="hero-heading"
              className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              Bitex — neden biz?
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
              Sporcu besinleri, bulk ve definasyon odaklı ürün alışverişinizde kargo, ödeme ve şeffaflık önceliğimizdir.
            </p>

            <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {heroFeatures.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-col rounded-2xl border border-emerald-100/80 bg-white/90 p-5 shadow-sm ring-1 ring-slate-900/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    {item.icon}
                  </span>
                  <span className="mt-4 text-base font-semibold text-slate-900">{item.title}</span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex justify-center">
              <a
                href={`/#${featuredProductsSectionId}`}
                className="inline-flex items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Öne çıkanları incele
              </a>
            </div>
          </div>
        </section>

        <section id="kategoriler" className="border-b border-slate-100 bg-white py-14 sm:py-16" aria-labelledby="categories-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="categories-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Kategoriler
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Ürünlerimiz peptitler, tablet steroidler ve enjeksiyon steroidler olarak gruplandırılmıştır.
            </p>
            <ul className="mt-10 grid list-none gap-6 md:grid-cols-3">
              {categoryOrder.map((catId) => {
                const intro = categoryIntros[catId];
                const anchor = categoryAnchors[catId];
                return (
                  <li key={catId} id={anchor} className="scroll-mt-24">
                    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-slate-900">{intro.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{intro.text}</p>
                      <a
                        href={`/#${featuredProductsSectionId}`}
                        className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-900"
                      >
                        Öne çıkan ürünlere git →
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          id={featuredProductsSectionId}
          className="scroll-mt-20 bg-slate-50 py-14 sm:py-16 lg:py-20"
          aria-labelledby="products-heading"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <h2 id="products-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Öne çıkan ürünler
              </h2>
              <p className="mt-3 text-slate-600">
                Peptit ve steroid ürünleri karışık sırada listelenir; karttan detay sayfasına gidebilirsiniz.
              </p>
            </div>

            <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <li key={product.id} id={`urun-${product.slug}`}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-white py-14 sm:py-16" aria-labelledby="goals-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="goals-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Bulk ve definasyon hedeflerine uygun ürün seçimi
            </h2>
            <p className="mt-4 max-w-4xl text-slate-600">
              Bitex, vücut geliştirme sürecinde farklı dönem ihtiyaçlarına odaklanır. Bulk döneminde hacim ve performans
              hedeflerine, definasyon döneminde ise daha kontrollü beslenme planlarına eşlik edebilecek ürün kategorileri
              sunar. Ürünleri kategori, içerik ve fiyat bazında karşılaştırarak kendi antrenman planınıza uygun seçim yapabilirsiniz.
            </p>
          </div>
        </section>

        <section id="iletisim" className="bg-white py-14 sm:py-16" aria-labelledby="contact-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="contact-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              İletişim
            </h2>
            <p className="mt-4 text-slate-600">
              Sorularınız için{" "}
              <a href="mailto:info@bitex.com" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
                info@bitex.com
              </a>{" "}
              adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-6xl px-4">
          <p>© {new Date().getFullYear()} Bitex. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </>
  );
}
