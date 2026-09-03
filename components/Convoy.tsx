"use client";

import { motion } from "motion/react";
import { CARS } from "@/lib/data";
import { EASE, SPRING_POP } from "@/lib/anim";
import MapChip from "./MapChip";
import Section from "./Section";
import Tilt from "./Tilt";

export default function Convoy() {
  return (
    <Section
      id="convoy"
      eyebrow="On the road"
      title="车队安排"
      desc="三路人马 · 一个目的地 —— 先到的自由活动，人齐了集合！"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {CARS.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className="group h-full"
          >
            <Tilt
              max={5}
              scale={1.015}
              className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-orange-100/60 ring-1 ring-slate-100"
            >
              <div
                className={`shine relative bg-gradient-to-r ${car.gradient} px-5 py-4 text-white`}
              >
                <motion.span
                  className="absolute right-4 top-4 text-3xl drop-shadow"
                  animate={{ x: [0, 8, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  {car.emoji}
                </motion.span>
                <p className="text-xs font-semibold text-white/85">{car.note}</p>
                <h3 className="mt-0.5 text-xl font-extrabold">{car.name}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5 px-5 pt-4">
                {car.members.map((m, mi) => (
                  <motion.span
                    key={m}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING_POP, delay: 0.2 + mi * 0.06 }}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600"
                  >
                    {m}
                  </motion.span>
                ))}
              </div>

              <ol className="relative m-5 mt-4 flex-1 space-y-4 border-l-2 border-dashed border-slate-200 pl-4">
                {car.steps.map((s, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: 0.25 + j * 0.09, ease: EASE }}
                    className="relative"
                  >
                    <span
                      className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${
                        s.drive
                          ? "border-2 border-sky-300 bg-white"
                          : `bg-gradient-to-r ${car.gradient}`
                      }`}
                    />
                    <p
                      className={`text-xs font-black ${
                        s.drive ? "text-sky-500" : "text-orange-500"
                      }`}
                    >
                      {s.drive ? `🛣️ 车程 ${s.time}` : s.time}
                    </p>
                    <p
                      className={`mt-0.5 leading-relaxed ${
                        s.drive ? "text-xs text-slate-400" : "text-sm text-slate-600"
                      }`}
                    >
                      {s.text}
                      {s.mapQuery ? (
                        <MapChip query={s.mapQuery} className="ml-1" />
                      ) : null}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl bg-gradient-to-r from-sky-50 to-amber-50 px-5 py-4 text-center text-sm font-semibold text-slate-600 ring-1 ring-amber-100"
      >
        <span>🎯 会合点：Colonial Hotel & Suites · 1 Main St W, Grand Bend（先到先逛，人齐了酒店集合 · 入住 16:00）</span>
        <MapChip query="Colonial Hotel & Suites Grand Bend" label="打开地图" size="md" />
      </motion.div>
    </Section>
  );
}
