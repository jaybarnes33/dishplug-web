import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
