import { NextRequest, NextResponse } from "next/server";
import { getFirstPathSegment, verifyJwt } from "./utils";
import { headerId, NEED_LOGIN } from "./const";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const response = NextResponse.next();
  response.headers.set(headerId, "1");
  return response;
  //   const firstPath = getFirstPathSegment(pathname);
  //   const jwt = request.cookies.get("jwt")?.value;
  //   if (NEED_LOGIN.includes(firstPath) && !pathname.includes("login")) {
  //     const id = await verifyJwt(jwt);

  //     if (!id) {
  //       return Response.redirect(
  //         new URL("/" + firstPath + "/login", request.url)
  //       );
  //     } else {
  //       response.headers.set("x-user-id", id.toString());
  //       return response;
  //     }
  //   }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
