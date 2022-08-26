import AuthProvider from "@/components/Context/Auth";
import AvailabilityProvider from "@/components/Context/Availability";
import CartProvider from "@/components/Context/Cart";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import localforage from "localforage";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localforage.config({
      name: "dishplug",
      storeName: "local-cart",
      version: 2.5
    });
  }, []);

  return (
    <SSRProvider>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          href="/icon-192x192.png"
          rel="icon"
          type="image/png"
          sizes="192x192"
        />
        <link
          href="/icon-256x256.png"
          rel="icon"
          type="image/png"
          sizes="256x256"
        />
        <link
          href="/icon-384x384.png"
          rel="icon"
          type="image/png"
          sizes="384x384"
        />
        <link
          href="/icon-512x512.png"
          rel="icon"
          type="image/png"
          sizes="512x512"
        />
      </Head>
      <div style={{ minHeight: "90vh" }}>
        <ErrorBoundary>
          <AuthProvider>
            <AvailabilityProvider>
              <CartProvider>
                <Header />
                <Component {...pageProps} />
              </CartProvider>
            </AvailabilityProvider>
          </AuthProvider>
        </ErrorBoundary>
      </div>
      <Footer />
    </SSRProvider>
  );
}

export default MyApp;
