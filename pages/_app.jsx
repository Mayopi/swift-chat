import "@/styles/globals.css";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Script src="https://kit.fontawesome.com/8c31414ffe.js" crossorigin="anonymous" defer></Script>
    </SessionProvider>
  );
}
