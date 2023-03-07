/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  experimental: {
    transpilePackages: ["ui"],
    runtime: "edge",
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/signup/1",
        destination: "https://postcode.map.daum.net/:path*/",
      },
      {
        source: "/notice/write",
        destination: "https://postcode.map.daum.net/:path*/",
      },
      {
        source: "/notice/edit/:path*/",
        destination: "https://postcode.map.daum.net/:path*/",
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
