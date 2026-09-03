"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TRIP } from "@/lib/data";
import { EASE } from "@/lib/anim";

const pad = (n: number) => String(n).padStart(2, "0");

// 单个时间单位卡片：数字变化时向上翻页
function Unit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const text = pad(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className="flex w-14 flex-col items-center rounded-2xl bg-white/85 px-1.5 py-2.5 shadow-lg shadow-sky-100/70 ring-1 ring-white backdrop-blur sm:w-20 sm:px-2 sm:py-4"
    >
      <span className="relative block h-7 w-full overflow-hidden sm:h-9">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="absolute inset-0 text-center text-xl font-black tabular-nums text-slate-800 sm:text-3xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-0.5 text-[10px] font-bold text-slate-400 sm:text-xs">{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // 挂载前渲染占位，避免服务端/客户端时间不一致
  if (now === null) {
    return <div className="h-[74px] sm:h-[104px]" aria-hidden />;
  }

  const start = new Date(TRIP.departAt).getTime();
  const end = new Date(TRIP.endAt).getTime();

  if (now >= start && now <= end) {
    return (
      <motion.p
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl bg-white/85 px-6 py-4 text-lg font-black text-orange-500 shadow-lg backdrop-blur"
      >
        🎉 旅程进行中 —— 玩得开心！
      </motion.p>
    );
  }

  if (now > end) {
    return (
      <motion.p
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl bg-white/85 px-6 py-4 text-lg font-black text-sky-500 shadow-lg backdrop-blur"
      >
        📸 旅程已圆满结束，回忆保鲜中
      </motion.p>
    );
  }

  let diff = start - now;
  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const units: [number, string][] = [
    [days, "天"],
    [hours, "时"],
    [mins, "分"],
    [secs, "秒"],
  ];

  return (
    <div className="flex items-end justify-center gap-1.5 sm:gap-3">
      {units.map(([v, label], i) => (
        <Unit key={label} value={v} label={label} delay={0.7 + i * 0.1} />
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pb-1 text-lg sm:text-2xl"
      >
        🚀
      </motion.span>
    </div>
  );
}
