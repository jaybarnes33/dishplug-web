import AuthProvider from "@/components/Context/Auth";
import CartProvider from "@/components/Context/Cart";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import localforage from "localforage";
import { AppProps } from "next/app";
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
      <AuthProvider>
        <CartProvider>
          <Header />
          <div style={{ minHeight: "90vh" }}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </div>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
