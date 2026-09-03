"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CHECKLIST } from "@/lib/data";
import { EASE } from "@/lib/anim";
import Section from "./Section";

const STORAGE_KEY = "gb2026-checklist";

const CONFETTI = ["🎉", "✨", "🏖️", "🌊", "🍓", "☀️", "🎊", "🥳"];

// 打包完成时的撒花
function ConfettiBurst() {
  const particles = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const dist = 80 + (i % 3) * 34;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.7 - 30,
      rotate: ((i * 47) % 360) - 180,
      emoji: CONFETTI[i % CONFETTI.length],
      delay: (i % 5) * 0.03,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.2, rotate: p.rotate }}
          transition={{ duration: 1.15, delay: p.delay, ease: "easeOut" }}
          className="absolute text-xl"
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default function Checklist() {
  const allItems = CHECKLIST.flatMap((g) => g.items);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [burst, setBurst] = useState(0);
  const prevPct = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // 本地存储不可用时静默降级
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // 忽略写入失败
    }
  }, [checked, loaded]);

  const done = allItems.filter((i) => checked[i]).length;
  const pct = allItems.length ? Math.round((done / allItems.length) * 100) : 0;

  // 首次拉满时撒花
  useEffect(() => {
    if (loaded && prevPct.current < 100 && pct === 100) {
      setBurst((b) => b + 1);
    }
    prevPct.current = pct;
  }, [pct, loaded]);

  const toggle = (item: string) =>
    setChecked((c) => ({ ...c, [item]: !c[item] }));

  return (
    <Section
      id="checklist"
      eyebrow="Pack your bags"
      title="打包清单"
      desc="点一下打勾，进度条拉满就能出发（勾选状态保存在本机浏览器）。"
    >
      <div className="relative mx-auto mb-9 max-w-md">
        {burst > 0 ? <ConfettiBurst key={burst} /> : null}
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>打包进度</span>
          <span className="tabular-nums">
            {done}/{allItems.length} · {pct}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200/70">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
          />
        </div>
        {pct === 100 ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 text-center text-sm font-black text-emerald-500"
          >
            ✅ 全部搞定，可以出发了！
          </motion.p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CHECKLIST.map((group, gi) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: gi * 0.12, ease: EASE }}
            className="rounded-3xl bg-white p-5 shadow-lg shadow-emerald-100/40 ring-1 ring-slate-100 sm:p-6"
          >
            <h3 className="mb-4 text-lg font-extrabold text-slate-800">
              {group.emoji} {group.group}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const on = !!checked[item];
                return (
                  <li key={item}>
                    <motion.button
                      type="button"
                      onClick={() => toggle(item)}
                      whileTap={{ scale: 0.97 }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        on
                          ? "bg-emerald-50 text-slate-400 line-through decoration-emerald-300 decoration-2"
                          : "bg-slate-50 text-slate-600 hover:bg-amber-50"
                      }`}
                    >
                      <motion.span
                        animate={
                          on
                            ? { scale: [1, 1.4, 1], rotate: [0, 12, 0] }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.35, ease: EASE }}
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-black ring-2 transition-colors ${
                          on
                            ? "bg-emerald-400 text-white ring-emerald-400"
                            : "bg-white text-transparent ring-slate-300"
                        }`}
                      >
                        ✓
                      </motion.span>
                      {item}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
