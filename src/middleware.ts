import { NextRequest } from "next/server";
import { getFirstPathSegment, verifyJwt } from "./utils";
import { AUTH_COOKID, NEED_LOGIN } from "./const";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstPath = getFirstPathSegment(pathname);
  const jwt = request.cookies.get(AUTH_COOKID)?.value;
  if (NEED_LOGIN.includes(firstPath) && !pathname.includes("login")) {
    const id = await verifyJwt(jwt);
    if (!id) {
      return Response.redirect(
        new URL("/" + firstPath + "/login", request.url)
      );
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
