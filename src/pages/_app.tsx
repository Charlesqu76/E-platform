import RetailerLayout from "@/components/RetailerLayout";
import { isRetailer } from "@/utils";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;
  return (
    <Provider store={store}>
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
