import AuthProvider from "@/components/Context/Auth";
import CartProvider from "@/components/Context/Cart";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
