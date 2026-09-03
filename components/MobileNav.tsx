"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SPRING_POP } from "@/lib/anim";

const ITEMS = [
  { id: "convoy", emoji: "🚗", label: "车队" },
  { id: "timeline", emoji: "📅", label: "行程" },
  { id: "spots", emoji: "🗺️", label: "地图" },
  { id: "checklist", emoji: "🎒", label: "清单" },
  { id: "tips", emoji: "💡", label: "贴士" },
];

// 底部悬浮章节导航：滚动高亮当前章节，点击快速跳转
export default function MobileNav() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("convoy");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.nav
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 64 }}
          transition={SPRING_POP}
          className="fixed inset-x-0 z-40 flex justify-center px-3"
          style={{ bottom: "max(0.9rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-0.5 rounded-full bg-white/90 p-1.5 shadow-xl shadow-slate-400/25 ring-1 ring-slate-200/70 backdrop-blur-md sm:gap-1">
            {ITEMS.map((item) => {
              const on = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-label={item.label}
                  className={`relative flex h-10 items-center justify-center gap-1 rounded-full px-2.5 text-lg transition-colors sm:px-3 ${
                    on ? "text-white" : "text-slate-500 active:bg-slate-100"
                  }`}
                >
                  {on ? (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING_POP}
                      className="absolute inset-0 rounded-full bg-slate-800"
                    />
                  ) : null}
                  <span className="relative">{item.emoji}</span>
                  {on ? (
                    <span className="relative whitespace-nowrap text-xs font-bold">
                      {item.label}
                    </span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
}
