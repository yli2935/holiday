"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// 尊重系统"减弱动态效果"设置：开启时自动禁用位移类动画，仅保留淡入淡出
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
