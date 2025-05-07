import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl.pathname;

    if (url.startsWith("/sitemap.xml")) {
        const response = NextResponse.next();
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        return response;
    }

    return NextResponse.next();
}
