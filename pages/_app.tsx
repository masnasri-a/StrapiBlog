import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <script async src="//cdn.iframe.ly/embed.js" />
      <Component {...pageProps} />
    </>
  );
}
