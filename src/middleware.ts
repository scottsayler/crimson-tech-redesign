import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "crimsontech.co";
const WWW_HOST = `www.${APEX_HOST}`;

/**
 * Consolidate hostname variants onto the apex domain so Google does not see
 * www and non-www as indexable duplicates of the same pages.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === WWW_HOST) {
    const url = request.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip Next.js internals and static assets; redirect everything else
     * from www → apex, including the homepage.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
