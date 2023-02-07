import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/wa/") &&
    !req.nextUrl.pathname.endsWith("/wa/")
  ) {
    const phoneNumber = req.nextUrl.pathname.split("/").pop();
    if (phoneNumber) {
      const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
      return NextResponse.redirect(WHATSAPP_URL);
    }
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/url/${slug || ""}`);
  if (slugFetch.status === 404) {
    return;
  }
  const data = (await slugFetch.json()) as { url: string };

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|teensies).*)"],
};
