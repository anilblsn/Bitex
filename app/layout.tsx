import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";
import { StatsTracker } from "@/components/StatsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bitex | Takviye Edici Gıdalar ve Besin Destekleri",
    template: "%s | Bitex",
  },
  description:
    "Bitex ile protein, vitamin, mineral ve diğer besin desteklerini keşfedin. Kaliteli takviye edici gıdalar, şeffaf içerik ve güvenilir marka.",
  keywords: [
    "Bitex",
    "takviye edici gıda",
    "besin desteği",
    "protein",
    "vitamin",
    "supplement",
    "Türkiye",
  ],
  authors: [{ name: "Bitex" }],
  creator: "Bitex",
  publisher: "Bitex",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Bitex",
    title: "Bitex | Takviye Edici Gıdalar ve Besin Destekleri",
    description:
      "Kaliteli takviye edici gıdalar ve besin destekleri. Bitex ürünleri ile sağlıklı yaşamı destekleyin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitex | Takviye Edici Gıdalar",
    description: "Kaliteli takviye edici gıdalar ve besin destekleri.",
  },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ecfdf5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappUrl = "https://wa.me/905312451057?text=Merhaba";

  return (
    <html lang="tr" className={`${geistSans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900">
        <StatsTracker />
        {children}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile mesaj gönder"
          className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M19.11 17.19c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.47-1.83-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.46h-.51c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.98 2.62 1.12 2.8c.14.18 1.91 2.92 4.63 4.09.65.28 1.16.45 1.56.57.66.21 1.26.18 1.73.11.53-.08 1.58-.64 1.8-1.26.22-.62.22-1.15.15-1.26-.07-.11-.25-.18-.51-.31Z" />
            <path d="M16.02 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.25.59 4.45 1.7 6.38L3 29l6.8-1.78a12.76 12.76 0 0 0 6.21 1.6h.01c7.07 0 12.8-5.73 12.8-12.8S23.09 3.2 16.02 3.2Zm0 23.5h-.01a10.67 10.67 0 0 1-5.44-1.49l-.39-.23-4.03 1.06 1.08-3.93-.25-.4a10.63 10.63 0 0 1-1.64-5.68c0-5.89 4.79-10.68 10.68-10.68 2.85 0 5.53 1.11 7.55 3.13 2.02 2.02 3.12 4.7 3.12 7.55 0 5.89-4.79 10.68-10.67 10.68Z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
