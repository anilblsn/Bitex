import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

type AdminPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = (await searchParams) ?? {};
  const hasError = params.error === "1";

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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Paneli</h1>
          <p className="mt-2 text-slate-600">Yonetim alani hazir. Buraya moduller ekleyebiliriz.</p>
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
          <h2 className="text-lg font-semibold text-slate-900">Urunler</h2>
          <p className="mt-2 text-sm text-slate-600">Urun yonetimi alani icin hazir kart.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Siparisler</h2>
          <p className="mt-2 text-sm text-slate-600">Siparis takip modulu burada olacak.</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ayarlar</h2>
          <p className="mt-2 text-sm text-slate-600">Panel ayarlari icin yer ayrildi.</p>
        </article>
      </section>
    </main>
  );
}
