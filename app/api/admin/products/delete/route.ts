import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { deleteProductById } from "@/lib/products";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "ok";
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin?error=1", request.url));
  }

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return NextResponse.redirect(new URL("/admin?deleteError=1", request.url));
  }

  const deleted = await deleteProductById(id);
  if (!deleted) {
    return NextResponse.redirect(new URL("/admin?deleteError=1", request.url));
  }

  return NextResponse.redirect(new URL("/admin?productDeleted=1", request.url));
}
