import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { ProductCategoryId } from "@/lib/categories";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { createProduct } from "@/lib/products";

function isCategory(value: string): value is ProductCategoryId {
  return value === "peptitler" || value === "tablet-steroidler" || value === "enjeksiyon-steroidler";
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "ok";
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url));
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const longDescription = String(formData.get("longDescription") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "");
  const priceRaw = String(formData.get("priceTry") ?? "0");
  const priceTry = Number(priceRaw);

  if (!name || !description || !longDescription || !isCategory(categoryRaw) || !Number.isFinite(priceTry) || priceTry <= 0) {
    return NextResponse.redirect(new URL("/admin?productError=1", request.url));
  }

  await createProduct({
    name,
    description,
    longDescription,
    category: categoryRaw,
    priceTry: Math.round(priceTry),
  });

  return NextResponse.redirect(new URL("/admin?productSaved=1", request.url));
}
