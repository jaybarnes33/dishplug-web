import AuthProvider from "@/components/Context/Auth";
import AvailabilityProvider from "@/components/Context/Availability";
import CartProvider from "@/components/Context/Cart";
import font-semiboldovider from "@/components/Context/Location";
import SearchProvider from "@/components/Context/Search";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Layout/Footer";

import Header from "@/components/Layout/Header";

import "@/styles/globals.css";
import localforage from "localforage";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect } from "react";

export const referrerdb = localforage.createInstance({
  name: "dishplugv2",
  storeName: "referrer",
  description: "referrals"
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    localforage.config({
      name: "dishplugv2",
      storeName: "local-cart",
      description: "store cart for anonymous users"
    });

    const referrer = new URLSearchParams(window.location.search).get(
      "referrer"
    );

    if (referrer) {
      referrerdb.setItem("referrer", referrer);
      router.push("/register?redirect=/");
    }
  }, [router]);

  return (
    <>
      <ErrorBoundary>
          <font-semiboldovider>
        <AuthProvider>
            <SearchProvider>
              <AvailabilityProvider>
                <CartProvider>
                  <Header />
                  <div className="px-3 md:px-7 text-neutral-700">
                    <Component {...pageProps} />
                  </div>
                  <Footer />
                </CartProvider>
              </AvailabilityProvider>
            </SearchProvider>
        </AuthProvider>
          </font-semiboldovider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
