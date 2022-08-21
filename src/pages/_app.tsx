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
