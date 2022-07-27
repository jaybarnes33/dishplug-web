import AuthProvider from "@/components/Context/Auth";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import store from "@/redux/store";
import "@/styles/bootstrap.css";
import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
