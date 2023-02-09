import { type Teensy } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

const IGNORE_MIDDLEWARE_PATHS = [
  "/protected/",
  "/bmc.svg",
  "/icon-",
  "/.well-known/",
  "/manifest.json",
  "/multiple",
  "/wa",
];

export async function middleware(req: NextRequest) {
  const isIgnoredPath = IGNORE_MIDDLEWARE_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

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
  if (isIgnoredPath) {
    return;
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/url/${slug || ""}`);
  if (slugFetch.status === 404) {
    const url = req.nextUrl;
    url.pathname = `/404`;
    return NextResponse.rewrite(url);
  }
  const data = (await slugFetch.json()) as Teensy;
  if (data.password) {
    return NextResponse.redirect(`${req.nextUrl.origin}/protected/${data.id}`);
  }

  return NextResponse.redirect(data.url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|teensies).*)"],
};
