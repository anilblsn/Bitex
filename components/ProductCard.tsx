import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/product-types";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const formatted = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(product.priceTry);

  const href = `/urunler/${product.slug}`;

  return (
    <Link
      href={href}
      className="group block rounded-2xl outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow group-hover:shadow-md">
        <div className="relative aspect-square w-full bg-slate-50">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4 sm:p-5">
          <h3 className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-slate-600">{product.description}</p>
          <p className="mt-auto pt-3 text-lg font-bold text-emerald-800">{formatted}</p>
          <span className="text-xs font-medium text-emerald-700">Detayları gör →</span>
        </div>
      </article>
    </Link>
  );
}
