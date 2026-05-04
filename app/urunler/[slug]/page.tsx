import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { buildProductDetailJsonLd } from "@/lib/json-ld";
import { featuredProductsSectionId } from "@/lib/product-constants";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Sadece tanımlı slug’lar; bilinmeyen URL’ler 404 */
export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "Ürün bulunamadı" };
  }

  const url = `/urunler/${product.slug}`;
  const title = `${product.name} | Bitex`;
  const description = `${product.description} ${product.longDescription}`.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: "Bitex",
      title,
      description: product.description,
      images: [{ url: product.imageSrc, width: 400, height: 400, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = buildProductDetailJsonLd(product);
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(product.priceTry);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav className="mb-8 text-sm text-slate-600" aria-label="Sayfa konumu">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-emerald-800">
                Ana Sayfa
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/#${featuredProductsSectionId}`} className="hover:text-emerald-800">
                Öne çıkan ürünler
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-square w-full max-w-lg justify-self-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 lg:max-w-none lg:justify-self-start">
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              priority
              className="object-contain p-8 sm:p-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-emerald-800">{formatted}</p>
            <p className="mt-2 text-sm text-slate-500">Fiyatlara KDV dahildir.</p>

            <p className="mt-8 text-base leading-relaxed text-slate-700 sm:text-lg">{product.description}</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              {product.longDescription.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-950">
              <strong className="font-semibold">Önemli:</strong> Bu sayfa tanıtım amaçlıdır. Kullanım, mevzuat ve etiket
              bilgilerine tabidir; sağlık kararlarınız için hekiminize danışınız.
            </div>

            <Link
              href={`/#${featuredProductsSectionId}`}
              className="mt-10 inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
            >
              Öne çıkanlara dön
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Bitex</p>
      </footer>
    </div>
  );
}
