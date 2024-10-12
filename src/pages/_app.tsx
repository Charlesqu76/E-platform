import RetailerLayout from "@/components/RetailerLayout";
import { isRetailer } from "@/utils";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;
  if (isRetailer(pathname)) {
    return (
      <RetailerLayout pathname={pathname}>
        {<Component {...pageProps} />}
      </RetailerLayout>
    );
  }
  return <Component {...pageProps} />;
}
