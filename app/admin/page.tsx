import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { categoryLabels, categoryOrder } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { getSiteStats } from "@/lib/stats";

type AdminPageProps = {
  searchParams?: Promise<{
    error?: string;
    productSaved?: string;
    productError?: string;
    productDeleted?: string;
    deleteError?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = (await searchParams) ?? {};
  const hasError = params.error === "1";
  const productSaved = params.productSaved === "1";
  const productError = params.productError === "1";
  const productDeleted = params.productDeleted === "1";
  const deleteError = params.deleteError === "1";

  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "ok";

  if (!isLoggedIn) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-10 sm:px-6">
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin Girişi</h1>
          <p className="mt-2 text-sm text-slate-600">Panele erişmek için şifreyi girin.</p>
          {hasError ? (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Şifre hatalı. Tekrar deneyin.
            </p>
          ) : null}
          <form action="/api/admin/login" method="post" className="mt-5 space-y-4">
            <input type="hidden" name="next" value="/admin" />
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Şifre</span>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
            >
              Giriş yap
            </button>
          </form>
        </section>
      </main>
    );
  }

  const [products, stats] = await Promise.all([getProducts(), getSiteStats()]);
  const lastUpdated = stats.updatedAt ? new Date(stats.updatedAt).toLocaleString("tr-TR") : "Henuz veri yok";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Paneli</h1>
          <p className="mt-2 text-slate-600">Urun yonetimi ve ziyaret istatistikleri.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400"
          >
            Cikis yap
          </button>
        </form>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Toplam ziyaret</h2>
          <p className="mt-2 text-3xl font-bold text-emerald-800">{stats.totalVisits}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Tekil ziyaretci</h2>
          <p className="mt-2 text-3xl font-bold text-emerald-800">{stats.uniqueVisitors}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Son guncelleme</h2>
          <p className="mt-2 text-sm text-slate-600">{lastUpdated}</p>
        </article>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Urun Ekle</h2>
        <p className="mt-1 text-sm text-slate-600">Ekledigin urunler anasayfada ve urun detaylarinda gorunur.</p>
        {productSaved ? (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Urun basariyla eklendi.
          </p>
        ) : null}
        {productError ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Urun kaydedilemedi. Tum alanlari dogru doldur.
          </p>
        ) : null}
        {productDeleted ? (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Urun silindi.
          </p>
        ) : null}
        {deleteError ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Urun silinemedi.
          </p>
        ) : null}
        <form action="/api/admin/products" method="post" encType="multipart/form-data" className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Urun adi</span>
            <input name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Kategori</span>
            <select name="category" required className="w-full rounded-lg border border-slate-300 px-3 py-2">
              {categoryOrder.map((categoryId) => (
                <option key={categoryId} value={categoryId}>
                  {categoryLabels[categoryId]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Fiyat (TRY)</span>
            <input name="priceTry" type="number" min="1" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Kisa aciklama</span>
            <input name="description" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Detay aciklama</span>
            <textarea
              name="longDescription"
              rows={4}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Urun resmi (opsiyonel)</span>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <span className="mt-1 block text-xs text-slate-500">Maksimum 5MB. Bos birakirsan varsayilan gorsel kullanilir.</span>
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
            >
              Urunu kaydet
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Kayitli urunler ({products.length})</h2>
        <ul className="mt-4 space-y-3">
          {products.map((product) => (
            <li key={product.id} className="rounded-lg border border-slate-200 px-4 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-600">
                    {categoryLabels[product.category]} - {new Intl.NumberFormat("tr-TR").format(product.priceTry)} TRY
                  </p>
                  <p className="text-xs text-slate-500">{product.imageSrc}</p>
                </div>
                <form action="/api/admin/products/delete" method="post">
                  <input type="hidden" name="id" value={product.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
                  >
                    Sil
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
