import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { ProductCategoryId } from "@/lib/categories";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { createProduct } from "@/lib/products";

function isCategory(value: string): value is ProductCategoryId {
  return value === "peptitler" || value === "tablet-steroidler" || value === "enjeksiyon-steroidler";
}

async function saveProductImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const sanitizedName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-");
  const extension = path.extname(sanitizedName) || ".jpg";
  const filename = `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "ok";
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const longDescription = String(formData.get("longDescription") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "");
  const priceRaw = String(formData.get("priceTry") ?? "0");
  const priceTry = Number(priceRaw);
  const image = formData.get("image");

  if (!name || !description || !longDescription || !isCategory(categoryRaw) || !Number.isFinite(priceTry) || priceTry <= 0) {
    return NextResponse.redirect(new URL("/admin?productError=1", request.url), 303);
  }

  let imageSrc: string | undefined;
  if (image instanceof File && image.size > 0) {
    const isImage = image.type.startsWith("image/");
    const maxBytes = 5 * 1024 * 1024;
    if (!isImage || image.size > maxBytes) {
      return NextResponse.redirect(new URL("/admin?productError=1", request.url), 303);
    }
    imageSrc = await saveProductImage(image);
  }

  await createProduct({
    name,
    description,
    longDescription,
    category: categoryRaw,
    priceTry: Math.round(priceTry),
    imageSrc,
  });

  return NextResponse.redirect(new URL("/admin?productSaved=1", request.url), 303);
}
