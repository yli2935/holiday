import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许局域网设备（手机）访问 dev server 的资源
  allowedDevOrigins: ["10.0.0.61", "10.0.0.*", "localhost"],
};

export default nextConfig;
