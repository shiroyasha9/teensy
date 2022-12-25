import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (
    req.nextUrl.pathname.startsWith("/wa/") &&
    !req.nextUrl.pathname.endsWith("/wa/")
  ) {
    const phoneNumber = req.nextUrl.pathname.split("/").pop();
    const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    return NextResponse.redirect(WHATSAPP_URL);
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);
  if (slugFetch.status === 404) {
    return;
  }
  const data = await slugFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: ["/:slug*", "/wa/:number*"],
};
