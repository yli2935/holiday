"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/anim";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  desc?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20 ${className}`}
    >
      <div className="mb-10 text-center sm:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="font-display text-lg text-orange-400 sm:text-xl"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          className="mt-1 text-3xl font-black tracking-tight text-slate-800 sm:text-4xl"
        >
          {title}
        </motion.h2>
        <motion.svg
          viewBox="0 0 120 10"
          className="mx-auto mt-3 h-2.5 w-28 text-orange-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          aria-hidden
        >
          <motion.path
            d="M3 6 C 20 1, 35 9, 55 5 S 95 2, 117 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeInOut", delay: 0.25 },
              },
            }}
          />
        </motion.svg>
        {desc ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base"
          >
            {desc}
          </motion.p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
