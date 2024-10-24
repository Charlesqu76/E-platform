import { NextRequest } from "next/server";
import { getFirstPathSegment, verifyJwt } from "./utils";
import { NEED_LOGIN_PATH, AUTH_MAP } from "./const";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstPath = getFirstPathSegment(pathname);

  if (NEED_LOGIN_PATH.includes(pathname)) {
    const token = AUTH_MAP[firstPath as keyof typeof AUTH_MAP];
    const jwt = request.cookies.get(token)?.value;
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
