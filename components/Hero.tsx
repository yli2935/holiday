"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Countdown from "./Countdown";
import { TRAVELERS, TRIP } from "@/lib/data";
import { EASE, SPRING_POP } from "@/lib/anim";

const WAVE =
  "M0,64 C90,32 270,32 360,64 S630,96 720,64 S990,32 1080,64 S1350,96 1440,64 L1440,120 L0,120 Z";

function WaveLayer({
  fill,
  height,
  duration,
  reverse = false,
  bob = false,
}: {
  fill: string;
  height: number;
  duration: number;
  reverse?: boolean;
  bob?: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
      style={{ height }}
      animate={bob ? { y: [0, 7, 0] } : undefined}
      transition={bob ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <div
        className="wave-track flex h-full w-[200%]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <svg
          className="h-full w-1/2 shrink-0"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d={WAVE} fill={fill} />
        </svg>
        <svg
          className="h-full w-1/2 shrink-0"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d={WAVE} fill={fill} />
        </svg>
      </div>
    </motion.div>
  );
}

const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.45 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 14, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING_POP },
};

export default function Hero() {
  // 鼠标视差
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const smx = useSpring(mx, { stiffness: 50, damping: 16 });
  const smy = useSpring(my, { stiffness: 50, damping: 16 });
  const sunX = useTransform(smx, [-1, 1], [16, -16]);
  const sunY = useTransform(smy, [-1, 1], [12, -12]);
  const cloudX = useTransform(smx, [-1, 1], [-12, 12]);
  const cloudX2 = useTransform(smx, [-1, 1], [8, -8]);

  // 滚动视差：内容上浮淡出，天空层下沉
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const skyY = useTransform(scrollY, [0, 600], [0, 130]);

  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-40 pt-16 text-center sm:pb-44 sm:pt-20">
      {/* 天空渐变 */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-sky-300/90 via-sky-100/60 to-transparent" />

      {/* 装饰层（滚动视差） */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 -z-20">
        {/* 太阳 */}
        <motion.div
          style={{ x: sunX, y: sunY }}
          className="absolute right-[10%] top-[12%]"
        >
          <motion.div
            className="h-28 w-28 rounded-full bg-gradient-to-br from-amber-200 to-orange-400 shadow-[0_0_90px_35px_rgba(251,191,36,0.4)] sm:h-40 sm:w-40"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* 云 */}
        <motion.div style={{ x: cloudX }} className="absolute left-[5%] top-[16%]">
          <motion.span
            className="block text-5xl opacity-80 sm:text-7xl"
            animate={{ x: [0, 26, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.span>
        </motion.div>
        <motion.div style={{ x: cloudX2 }} className="absolute left-[26%] top-[7%]">
          <motion.span
            className="block text-3xl opacity-60 sm:text-5xl"
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.span>
        </motion.div>
        <motion.div style={{ x: cloudX }} className="absolute right-[24%] top-[28%]">
          <motion.span
            className="block text-4xl opacity-50"
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.span>
        </motion.div>

        {/* 海鸥 */}
        <motion.span
          className="absolute left-0 top-[22%] text-xl opacity-70 sm:text-2xl"
          animate={{ x: ["-8vw", "108vw"], y: [0, -28, 10, -20, 0] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
            repeatDelay: 5,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          🕊️
        </motion.span>
        <motion.span
          className="absolute left-0 top-[31%] text-sm opacity-50 sm:text-lg"
          animate={{ x: ["-6vw", "106vw"], y: [0, 16, -12, 8, 0] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "linear",
            delay: 12,
            repeatDelay: 8,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          🕊️
        </motion.span>

        {/* 帆船 */}
        <motion.span
          className="absolute bottom-[26%] left-[12%] hidden text-4xl opacity-70 sm:block"
          animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ⛵
        </motion.span>
      </motion.div>

      {/* 内容（滚动上浮淡出） */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex flex-col items-center"
      >
        <motion.span
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-full bg-white/75 px-4 py-1.5 text-xs font-bold text-orange-500 shadow-sm ring-1 ring-white/60 backdrop-blur sm:text-sm"
        >
          🍁 {TRIP.subtitle} · 9 人团
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="mt-5 text-[2.7rem] font-black leading-[1.08] tracking-tight text-slate-800 sm:mt-6 sm:text-7xl"
        >
          <span className="font-display text-shimmer block bg-gradient-to-r from-sky-500 via-cyan-500 to-orange-400 bg-clip-text px-3 pb-3 leading-[1.5] text-transparent sm:px-4 sm:pb-4">
            Grand Bend
          </span>
          <span className="mt-2 block sm:mt-3">海滩之旅 🏖️</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-4 text-[13px] font-medium text-slate-600 sm:mt-5 sm:text-lg"
        >
          {TRIP.dates} · 夜宿 Colonial Hotel · 顺游小伦敦
        </motion.p>

        <motion.div
          variants={chipContainer}
          initial="hidden"
          animate="show"
          className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-1.5 sm:mt-6 sm:gap-2"
        >
          {TRAVELERS.map((t) => (
            <motion.span
              key={t.name}
              variants={chipItem}
              whileHover={{ y: -4, scale: 1.1, rotate: -2 }}
              transition={SPRING_POP}
              className="cursor-default rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-sm ring-1 ring-white/70 backdrop-blur sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {t.emoji} {t.name}
            </motion.span>
          ))}
        </motion.div>

        <div className="mt-7 sm:mt-9">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500"
          >
            距出发还有
          </motion.p>
          <Countdown />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          <motion.a
            href="#convoy"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={SPRING_POP}
            className="rounded-full bg-gradient-to-r from-orange-400 to-rose-400 px-5 py-2.5 text-sm sm:px-6 sm:py-3 font-bold text-white shadow-lg shadow-orange-300/50"
          >
            🚗 车队安排
          </motion.a>
          <motion.a
            href="#timeline"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={SPRING_POP}
            className="rounded-full bg-white/85 px-5 py-2.5 text-sm font-bold text-slate-700 sm:px-6 sm:py-3 shadow ring-1 ring-slate-200/70 backdrop-blur"
          >
            📅 两日行程
          </motion.a>
        </motion.div>

        <motion.a
          href="#convoy"
          aria-label="向下滚动"
          className="mt-8 text-2xl text-slate-400 sm:mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ⌄
        </motion.a>
      </motion.div>

      {/* 海浪 */}
      <WaveLayer fill="rgba(56,189,248,0.20)" height={120} duration={26} />
      <WaveLayer fill="rgba(34,211,238,0.28)" height={88} duration={18} reverse bob />
      <WaveLayer fill="rgba(14,165,233,0.30)" height={56} duration={12} />
    </header>
  );
}
