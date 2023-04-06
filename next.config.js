/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
});

// module.exports = withPWA({
//   reactStrictMode: true,
//   swcMinify: true,
//   images: { domains: ["firebasestorage.googleapis.com"] },
//   async redirects() {
//     return [
//       {
//         source: "/foods/:slug*",
//         destination: "/dishes/:slug*",
//         permanent: true
//       },
//       {
//         source: "/meals/:slug*",
//         destination: "/dishes/:slug*",
//         permanent: true
//       }
//     ];
//   }
// });

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["firebasestorage.googleapis.com"] },
  async redirects() {
    return [
      {
        source: "/foods/:slug*",
        destination: "/dishes/:slug*",
        permanent: true
      },
      {
        source: "/meals/:slug*",
        destination: "/dishes/:slug*",
        permanent: true
      }
    ];
  }
};
