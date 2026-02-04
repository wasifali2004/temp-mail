import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
};

export default nextConfig;
