import { NextRequest } from "next/server";
import { getFirstPathSegment, verifyJwt } from "./utils";
import { AUTH_COOKID, NEED_LOGIN_PATH } from "./const";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (NEED_LOGIN_PATH.includes(pathname)) {
    const jwt = request.cookies.get(AUTH_COOKID)?.value;
    const id = await verifyJwt(jwt);
    if (!id) {
      const firstPath = getFirstPathSegment(pathname);
      return Response.redirect(
        new URL("/" + firstPath + "/login", request.url)
      );
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
