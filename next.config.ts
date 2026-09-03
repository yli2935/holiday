import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出（GitHub Pages 用）
  output: "export",
  // 部署到 https://<用户名>.github.io/holiday/ 子路径时由 CI 注入；本地开发为空
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
  // 允许局域网设备（手机）访问 dev server 的资源
  allowedDevOrigins: ["10.0.0.61", "10.0.0.*", "localhost"],
};

export default nextConfig;
