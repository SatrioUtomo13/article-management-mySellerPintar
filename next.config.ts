import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      domains: ["s3.sellerpintar.com"], // tambahkan domain ini agar Image Next.js bisa menampilkannya
  },
};

export default nextConfig;
