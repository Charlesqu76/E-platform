import { getFirstPathSegment, parseCookies, verifyJwt } from "@/utils";
import type { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import { Store } from "@reduxjs/toolkit";
import App from "next/app";
import Layout from "@/components/Layout";
import { UserContext } from "@/store/context";
import { AUTH_COOKID } from "@/const";
import "@/styles/globals.css";

export default function MyApp({
  Component,
  pageProps,
  router,
  id,
}: AppProps & { id: number }) {
  const { pathname } = router;
  const firstPath = getFirstPathSegment(pathname) as keyof typeof store;
  return (
    <UserContext.Provider value={{ id }}>
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
  const cookieString = context.ctx.req?.headers.cookie;
  const cookies = parseCookies(cookieString || "");
  const authToken = cookies[AUTH_COOKID];
  const id = authToken && cookies["id"];
  return { ...ctx, id };
};
