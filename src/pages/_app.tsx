import { getFirstPathSegment, parseCookies, verifyJwt } from "@/utils";
import type { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import { Store } from "@reduxjs/toolkit";
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
  const firstPath = getFirstPathSegment(pathname) as keyof typeof store;
  return (
    <UserContext.Provider value={{ userInfo: userInfo }}>
      <Provider store={store[firstPath] as Store}>
        <Layout pathname={pathname}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
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
