"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Target, Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16 md:py-24">
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* left: cards */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Vision */}
            <div className="group rounded-2xl border border-slate-200 bg-white/70 p-6 md:p-7 shadow-md backdrop-blur hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Eye className="h-5 w-5" />
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Our Vision
                </h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To build a world where every young individual has the skills and
                knowledge to thrive in the digital era—acting as a catalyst for
                innovation and socio-economic growth.
              </p>
            </div>

            {/* Mission */}
            <div className="group rounded-2xl border border-slate-200 bg-white/70 p-6 md:p-7 shadow-md backdrop-blur hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <Target className="h-5 w-5" />
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                  Our Mission
                </h3>
              </div>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Empower youth through accessible, high-quality digital training.
                We foster lifelong learning, spark innovation, and open doors to
                personal and professional growth.
              </p>
            </div>
          </motion.div>

          {/* right: image + headline */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-white/60 bg-white/60 p-2 sm:p-3 shadow-[0_10px_40px_-10px_rgba(2,6,23,0.15)] backdrop-blur">
              {/* stacked card illusion */}
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-white/40 shadow-xl" />
              <div className="absolute -inset-12 -z-20 rounded-3xl bg-white/30 shadow" />

              {/* keep aspect ratio consistent */}
              <div className="relative aspect-[3/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="./test1.jpg" // put your asset in /public/images
                  alt="Digital Pakistan"
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
                {/* floating badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-slate-700 border border-slate-200 backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Digital Pakistan</span>
                </div>
              </div>
            </div>

          
          </motion.div>
        </div>
      </div>
    </section>
  );
}
