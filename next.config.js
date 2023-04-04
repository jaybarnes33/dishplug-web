/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["firebasestorage.googleapis.com"] },
  async redirects() {
    return [
      {
        source: "/foods/*",
        destination: "/dishes/*",
        permanent: true
      },
      {
        source: "/meals/*",
        destination: "/dishes/*",
        permanent: true
      }
    ];
  }
});

// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: { domains: ["firebasestorage.googleapis.com"] },
//   async redirects() {
//     return [
//       {
//         source: "/foods",
//         destination: "/meals",
//         permanent: true
//       }
//     ];
//   }
// };
