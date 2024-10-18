import { parseCookies, verifyJwt } from "@/utils";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Layout from "@/components/Layout";
import { AUTH_COOKID } from "@/const";
import { TUserInfo } from "@/type/user";
import "@/styles/globals.css";
import { UserContext } from "@/store/context";

export default function MyApp({
  Component,
  pageProps,
  router,
  userInfo,
}: AppProps & { userInfo: TUserInfo | null }) {
  const { pathname } = router;
  return (
    <UserContext.Provider value={{ userInfo: userInfo }}>
      <Layout pathname={pathname}>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  let cookieString = "";
  if (context.ctx.req) {
    cookieString = context.ctx.req?.headers.cookie || "";
  } else {
    cookieString = document.cookie;
  }
  const cookies = parseCookies(cookieString || "");
  const userInfo = await verifyJwt<TUserInfo>(cookies[AUTH_COOKID]);

  return { ...ctx, userInfo };
};
