"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SPRING_POP } from "@/lib/anim";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="回到顶部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          transition={SPRING_POP}
          whileHover={{ y: -4, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 sm:grid place-items-center rounded-full bg-white/90 text-2xl shadow-lg shadow-sky-200/60 ring-1 ring-slate-200 backdrop-blur"
        >
          🏄
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
