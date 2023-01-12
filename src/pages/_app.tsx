import AuthProvider from "@/components/Context/Auth";
import AvailabilityProvider from "@/components/Context/Availability";
import CartProvider from "@/components/Context/Cart";
import LocationProvider from "@/components/Context/Location";
import SearchProvider from "@/components/Context/Search";
import ErrorBoundary from "@/components/ErrorBoundary";

import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import localforage from "localforage";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { SSRProvider } from "react-bootstrap";

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
    <SSRProvider>
      <div style={{ minHeight: "90vh" }}>
        <ErrorBoundary>
          <AuthProvider>
            <LocationProvider
              searchedLocation={router.query.city as string | undefined}
            >
              <SearchProvider>
                <AvailabilityProvider>
                  <CartProvider>
                    <Header />
                    <Component {...pageProps} />
                  </CartProvider>
                </AvailabilityProvider>
              </SearchProvider>
            </LocationProvider>
          </AuthProvider>
        </ErrorBoundary>
      </div>
    </SSRProvider>
  );
}

export default MyApp;
