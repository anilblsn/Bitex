import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { featuredProductsSectionId } from "@/lib/product-constants";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Navbar />
      <main className="mx-auto flex max-w-lg flex-1 flex-col justify-center px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Ürün bulunamadı</h1>
        <p className="mt-3 text-slate-600">Aradığınız ürün kaldırılmış veya bağlantı hatalı olabilir.</p>
        <Link
          href={`/#${featuredProductsSectionId}`}
          className="mt-8 inline-flex justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          Öne çıkan ürünlere dön
        </Link>
      </main>
    </div>
  );
}
