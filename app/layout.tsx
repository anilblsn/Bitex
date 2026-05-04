import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

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
  return (
    <html lang="tr" className={`${geistSans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900">{children}</body>
    </html>
  );
}
