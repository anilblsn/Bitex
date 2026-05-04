/**
 * Production’da gerçek alan adınızı .env ile verin: NEXT_PUBLIC_SITE_URL=https://siteniz.com
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  return "https://bitex.com";
}
