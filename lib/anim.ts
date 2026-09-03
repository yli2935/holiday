// 全站统一的动画参数
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const SPRING_POP = { type: "spring" as const, stiffness: 300, damping: 18 };

export const SPRING_SOFT = { type: "spring" as const, stiffness: 160, damping: 22 };
