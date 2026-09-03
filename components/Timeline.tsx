"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { DAYS, type Day } from "@/lib/data";
import { EASE, SPRING_POP } from "@/lib/anim";
import MapChip from "./MapChip";
import Section from "./Section";

const tagColors: Record<string, string> = {
  行: "bg-sky-100 text-sky-600",
  住: "bg-violet-100 text-violet-600",
  玩: "bg-emerald-100 text-emerald-600",
  吃: "bg-orange-100 text-orange-600",
  景: "bg-rose-100 text-rose-600",
};

// 单日时间线：竖线随滚动逐渐"画"出来
function DayBlock({ day }: { day: Day }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.78", "end 0.62"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div id={day.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={SPRING_POP}
        className={`mx-auto mb-9 w-fit rounded-2xl bg-gradient-to-r ${day.gradient} px-7 py-3.5 text-center text-white shadow-lg`}
      >
        <p className="text-lg font-black">
          {day.label} · {day.date}
        </p>
        <p className="mt-0.5 text-xs font-medium text-white/85">{day.theme}</p>
      </motion.div>

      <div ref={ref} className="relative mx-auto max-w-2xl">
        {/* 底轨 + 进度线 */}
        <div className="absolute bottom-2 left-[25px] top-2 w-[3px] rounded-full bg-slate-200/70" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-2 left-[25px] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-sky-400 via-amber-400 to-rose-400"
        />

        <ul className="space-y-6">
          {day.activities.map((a, i) => (
            <li key={`${day.id}-${i}`} className="relative pl-16">
              <motion.span
                initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ ...SPRING_POP, delay: 0.05 }}
                whileHover={{ scale: 1.15, rotate: 8 }}
                className="absolute left-0 top-0 grid h-[52px] w-[52px] place-items-center rounded-2xl bg-white text-2xl shadow-md ring-1 ring-slate-100"
              >
                {a.emoji}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: -34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: 0.04 * (i % 3), ease: EASE }}
                whileHover={{ x: 4 }}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-bold tabular-nums text-white">
                    {a.time}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-800">
                    {a.title}
                  </h4>
                  {a.tag ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${tagColors[a.tag]}`}
                    >
                      {a.tag}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {a.desc}
                </p>
                {a.mapQuery ? (
                  <MapChip
                    query={a.mapQuery}
                    label="在地图中打开"
                    size="md"
                    className="mt-2.5"
                  />
                ) : null}
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="48 hours"
      title="两日行程"
    >
      <div className="mb-10 flex justify-center gap-3">
        {DAYS.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            className={`rounded-full bg-gradient-to-r ${d.gradient} px-4 py-2 text-xs font-black text-white shadow-md transition active:scale-95 sm:text-sm`}
          >
            {d.label} · {d.date.split(" · ")[0]}
          </a>
        ))}
      </div>

      <div className="space-y-16">
        {DAYS.map((day) => (
          <DayBlock key={day.id} day={day} />
        ))}
      </div>
    </Section>
  );
}
