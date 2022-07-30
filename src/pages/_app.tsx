import AuthProvider from "@/components/Context/Auth";
import CartProvider from "@/components/Context/Cart";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <AuthProvider>
        <CartProvider>
          <Header />
          <div style={{ minHeight: "90vh" }}>
            <Component {...pageProps} />
          </div>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
