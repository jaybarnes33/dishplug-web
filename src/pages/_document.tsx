import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
          <meta name="theme-color" content="#fff" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link
            href="/icon-192x192.png"
            rel="icon"
            type="image/png"
            sizes="192x192"
          />
          <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
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
          <meta name="theme-color" content="#fff" />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_KEY}`}
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
