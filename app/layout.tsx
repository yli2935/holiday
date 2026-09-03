import type { Metadata, Viewport } from "next";
import { Ma_Shan_Zheng, Noto_Sans_SC, Pacifico } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const mashan = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mashan",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#bae6fd",
};

export const metadata: Metadata = {
  title: "Grand Bend 2026 · Labour Day 之旅",
  description:
    "2026 加拿大 Labour Day 长周末：Grand Bend 海滩 + 小伦敦两日游行程 —— 车队安排、时间线、玩乐地图与打包清单。",
  appleWebApp: {
    capable: true,
    title: "Grand Bend 2026",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${noto.variable} ${pacifico.variable} ${mashan.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
