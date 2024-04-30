import { NextResponse, type NextRequest } from "next/server";
import type { Teensy, Visit } from "./server/schema";

const IGNORE_MIDDLEWARE_PATHS = [
  "/protected",
  "/bmc.svg",
  "/icon-",
  "/.well-known/",
  "/manifest.json",
  "/multiple",
  "/wa",
  "/_",
  "/api",
  "/teensies",
  "/favicon.ico",
  "/blogs",
];

export async function middleware(req: NextRequest) {
  const isIgnoredPath =
    req.nextUrl.pathname === "/" ||
    IGNORE_MIDDLEWARE_PATHS.some((path) =>
      req.nextUrl.pathname.startsWith(path),
    );

  const phoneNumber = req.nextUrl.searchParams.get("phoneNumber");
  if (phoneNumber) {
    const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    return NextResponse.redirect(WHATSAPP_URL);
  }

  if (isIgnoredPath) {
    return;
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  const params = req.nextUrl.searchParams.toString();
  const slugFetch = await fetch(
    `${req.nextUrl.origin}/api/url?slug=${slug || ""}`,
  );

  if (slugFetch.status === 404) {
    return;
  }

  if (slugFetch.status === 498) {
    const url = req.nextUrl;
    url.pathname = `/498`;
    return NextResponse.rewrite(url);
  }

  const data = (await slugFetch.json()) as Teensy & {
    visits: Visit[];
  };

  if (data.password) {
    const searchParams = params ? `&${params}` : "";
    return NextResponse.redirect(
      `${req.nextUrl.origin}/protected?slug=${data.slug}${searchParams}`,
    );
  }

  const urlWithParams = `${data.url}${params ? `?${params}` : ""}`;
  return NextResponse.redirect(urlWithParams);
}

export const config = {
  matcher: ["/:slug*", "/wa/:number*"],
};
