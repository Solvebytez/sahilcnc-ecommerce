import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.sahilcnc.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sahil-machines-web.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
