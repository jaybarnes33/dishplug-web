// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true
// });

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["firebasestorage.googleapis.com"] },
  async redirects() {
    return [
      {
        source: "/foods",
        destination: "/meals",
        permanent: true
      }
    ];
  }
};
