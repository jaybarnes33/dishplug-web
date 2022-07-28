import AuthProvider from "@/components/Context/Auth";
import CartProvider from "@/components/Context/Cart";
import ItemsProvider from "@/components/Context/Items";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ItemsProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </CartProvider>
      </ItemsProvider>
    </AuthProvider>
  );
}

export default MyApp;
