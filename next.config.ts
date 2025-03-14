import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
  },

  images: {
    domains: ['morales-tech.net', 'via.placeholder.com'],
  },
};

export default nextConfig;
