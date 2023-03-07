/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    transpilePackages: ["ui"],
  },
  trailingSlash: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/company/signup/1",
  //       destination: "https://postcode.map.daum.net/:path*/",
  //     },
  //   ];
  // },
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
