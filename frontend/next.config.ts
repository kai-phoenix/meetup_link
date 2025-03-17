import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'proxy',
        port: '80',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
