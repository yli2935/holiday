"use client";

import { motion } from "motion/react";
import { TIPS } from "@/lib/data";
import { EASE, SPRING_SOFT } from "@/lib/anim";
import Section from "./Section";

export default function Tips() {
  return (
    <Section
      id="tips"
      eyebrow="Good to know"
      title="温馨提示"
      desc="出发前 60 秒速读，少踩坑多快乐。"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIPS.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.09, ease: EASE }}
            whileHover={{ y: -6, rotate: 0.4 }}
          >
            <motion.div transition={SPRING_SOFT} className="h-full rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <motion.span
                className="inline-block text-3xl"
                whileHover={{ scale: 1.25, rotate: -10 }}
                transition={SPRING_SOFT}
              >
                {t.emoji}
              </motion.span>
              <h4 className="mt-2.5 font-extrabold text-slate-800">{t.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
