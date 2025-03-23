import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true, // 画像の最適化を無効化
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        // port: '8000',
        // pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
