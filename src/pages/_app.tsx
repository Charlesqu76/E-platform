import RetailerLayout from "@/components/RetailerLayout";
import { getFirstPathSegment, isRetailer } from "@/utils";
import type { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";
import { Store } from "@reduxjs/toolkit";
import "@/styles/globals.css";
import App from "next/app";
import { headerId } from "@/const";

export default function MyApp({
  Component,
  pageProps,
  router,
  ...others
}: AppProps) {
  console.log(others);
  const {} = others;
  const { pathname } = router;
  const firstPath = getFirstPathSegment(pathname) as keyof typeof store;
  const s = store[firstPath] as Store;
  return (
    <Provider store={s}>
      {isRetailer(pathname) ? (
        <RetailerLayout pathname={pathname}>
          {<Component {...pageProps} />}
        </RetailerLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const id = context.ctx.req?.headers[headerId];
  const ctx = await App.getInitialProps(context);
  const userInfo = { id, emial: "sadfasdf" };

  // const { pathname } = context.router;
  // console.log("getInitialProps", pathname);
  // const { req } = context;
  //
  // console.log(req);
  return { ...ctx, userInfo };
};
