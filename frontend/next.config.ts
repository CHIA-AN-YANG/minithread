import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "media.cnn.com",
        port: '',
        pathname: '/api/**',
        search: '',
      },
    ],
  },
  compiler: {
    //  removeConsole: true,
  }
};

export default nextConfig;
