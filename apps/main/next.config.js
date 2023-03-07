/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: false,
  experimental: {
    transpilePackages: ["ui"],
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
