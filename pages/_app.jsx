import "@/styles/globals.css";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress showOnShallow={true} height={5} color="#576CBC" />
      <Component {...pageProps} />
      <Script src="https://kit.fontawesome.com/8c31414ffe.js" crossorigin="anonymous" defer></Script>
    </SessionProvider>
  );
}
