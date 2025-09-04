"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CeoMessage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 md:py-24">
      {/* soft background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* header */}
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug"
        >
          Wahab Yunus, as the CEO of PNY Trainings, is unlocking the potential
          in youth to be victorious.
        </motion.h2>

        {/* message card */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.15 }}
          className="mt-12 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur shadow-xl p-8 md:p-12 relative"
        >
          {/* decorative quote icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <Quote className="h-6 w-6" />
          </div>

          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
            Diversity and inclusion of thought, skill, knowledge, and culture
            make PNY Trainings more competitive, more resilient, and better.
            Diversity strengthens us by promoting unique viewpoints and
            challenging each of us, every day, to think beyond our traditional
            frames of reference. We are committed to building a talented and
            diverse workforce, and to creating an environment in which every
            STUDENT has the opportunity to excel based on his or her
            performance. We believe the best way to learn is by putting your
            skills to use. I warmly welcome you to visit by contacting us, and
            discover firsthand what makes PNY Trainings special.
          </p>

          <p className="mt-6 font-semibold text-slate-900">
            — Wahab Yunus (CEO, PNY Trainings)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
