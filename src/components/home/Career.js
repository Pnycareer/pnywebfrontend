"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Award,
  Building,
  GraduationCap,
  Users,
  BookOpen,
  Handshake,
} from "lucide-react";

const FEATURES = [
  { icon: Globe, title: "International Collaborations" },
  { icon: Award, title: "Awarded by USA Education 2.0" },
  { icon: Building, title: "Multiple Branches in Pakistan" },
  { icon: GraduationCap, title: "Affiliated with Govt. (PSDA & PBTE)" },
  { icon: Users, title: "100K Alumni" },
  { icon: BookOpen, title: "100+ Professional Programs" },
  { icon: Users, title: "300+ Instructors" },
  { icon: Handshake, title: "100+ MoU's Signed" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function CareerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-[#f7f9fc] to-[#eef3ff] py-10">
      {/* light ambient radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.12),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Build Your Future Career with PNY Trainings in Pakistan
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At PNY Trainings Pakistan, we go beyond theory by offering 100+
            market-driven courses, hands-on internships, and real career
            support. Our training is designed to sharpen your skills and prepare
            you for success in today’s competitive job market.
          </p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map(({ icon: Icon, title }) => (
            <motion.div
              key={title}
              variants={item}
              className="group relative rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-white hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)]"
            >
              {/* badge */}
              <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-400/20 ring-1 ring-gray-200 h-12 w-12">
                <Icon className="h-6 w-6 text-sky-600" />
              </div>

              {/* title */}
              <h3 className="text-[15px] font-semibold leading-snug text-gray-800">
                {title}
              </h3>

              {/* underline on hover */}
              <div className="bg-gradient-to-r from-sky-400/50 to-indigo-400/30 transition-all duration-300 group-hover:w-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
