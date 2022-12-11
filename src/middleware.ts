import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.get("city")) {
    return NextResponse.next();
  }

  request.nextUrl.searchParams.set("city", request.geo?.city || "Takoradi");
  return NextResponse.rewrite(new URL(request.nextUrl, request.url));
}
