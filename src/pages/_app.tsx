import { parseCookies, verifyJwt } from "@/utils";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Layout from "@/components/Layout";
import { AUTH_COOKID } from "@/const";
import { TUserInfo } from "@/type/user";
import { Context, init, TStoreApi } from "@/store";
import { useRef } from "react";
import "@/styles/globals.css";

export default function MyApp({
  Component,
  pageProps,
  router,
  userInfo,
}: AppProps & { userInfo: TUserInfo | null }) {
  const ref = useRef<TStoreApi>();
  if (!ref.current) {
    ref.current = init({ userInfo });
  }
  const { pathname } = router;
  return (
    <Context.Provider value={ref.current}>
      <Layout pathname={pathname}>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
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
