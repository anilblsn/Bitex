"use client";

import Link from "next/link";
import { useState } from "react";

import { categoryAnchors, categoryLabels, categoryOrder } from "@/lib/categories";
import { featuredProductsSectionId } from "@/lib/products";

/** Kök + hash: alt sayfadayken göreli `#` ana sayfadaki bölüme gitmez */
const staticLinks = [
  { href: "/#anasayfa", label: "Ana Sayfa" },
  { href: `/#${featuredProductsSectionId}`, label: "Öne çıkan ürünler" },
] as const;

const categoryLinks = categoryOrder.map((id) => ({
  href: `/#${categoryAnchors[id]}`,
  label: categoryLabels[id],
}));

const tailLinks = [{ href: "/#iletisim", label: "İletişim" } as const];

const links = [...staticLinks, ...categoryLinks, ...tailLinks];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#anasayfa"
          className="text-lg font-bold tracking-tight text-emerald-900 sm:text-xl"
          onClick={() => setOpen(false)}
        >
          Bitex
        </Link>

        <nav
          className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-x-3 md:gap-y-1.5 lg:gap-x-5"
          aria-label="Ana menü"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-xs font-medium text-slate-700 transition-colors hover:text-emerald-800 sm:text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menü</span>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-slate-100 bg-white md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobil menü">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-emerald-50"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
