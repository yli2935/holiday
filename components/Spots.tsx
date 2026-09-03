"use client";

import { motion } from "motion/react";
import { SPOTS, gmaps } from "@/lib/data";
import { EASE } from "@/lib/anim";
import Section from "./Section";
import Tilt from "./Tilt";

export default function Spots() {
  return (
    <Section
      id="spots"
      eyebrow="Highlights"
      title="玩乐地图"
      desc="这趟旅程的 7 个关键词，点卡片直接打开地图导航。"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SPOTS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.09, ease: EASE }}
            className="h-full"
          >
            <a
              href={gmaps(s.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="group block h-full transition-transform duration-150 active:scale-[0.98]"
            >
              <Tilt className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-amber-100/50 ring-1 ring-slate-100">
                <div
                  className={`shine relative flex h-28 shrink-0 items-center justify-center bg-gradient-to-br ${s.gradient}`}
                >
                  <span className="text-5xl drop-shadow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-125">
                    {s.emoji}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    📍 打开地图
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="text-base font-extrabold text-slate-800">{s.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-400">{s.en}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-100"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
