import { NextResponse } from "next/server";
import { registerVisit, VISITOR_COOKIE_NAME } from "@/lib/stats";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const hasVisitorCookie = cookieHeader.includes(`${VISITOR_COOKIE_NAME}=`);

  await registerVisit(!hasVisitorCookie);

  const response = NextResponse.json({ ok: true });
  if (!hasVisitorCookie) {
    response.cookies.set({
      name: VISITOR_COOKIE_NAME,
      value: crypto.randomUUID(),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}
