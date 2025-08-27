"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck, Rocket, Timer } from "lucide-react";

const programs = [
  {
    title: "1 Year Professional Diploma Programs",
    description:
      "Deep, career-track learning in software, graphics, web, and digital marketing with portfolio-grade outcomes.",
    icon: GraduationCap,
    accent: "from-teal-500 to-emerald-500",
  },
  {
    title: "6 Months Certified Courses",
    description:
      "In-depth, hands-on specialization to transition roles or level up efficiently with mentor feedback.",
    icon: BadgeCheck,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    title: "3–2 Months Certified Courses",
    description:
      "Fast-track certifications to add marketable skills quickly and unlock new professional lanes.",
    icon: Timer,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Professional Boot Camp",
    description:
      "High-intensity, industry-simulated bootcamps to ship real projects and build pragmatic confidence.",
    icon: Rocket,
    accent: "from-rose-500 to-orange-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ProfessionalDevelopment() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-white via-[#f7f9fc] to-[#eef3ff] py-10">
      {/* light ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.12),transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Professional Development Timeline
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Choose a track that fits your pace and ambition. From immersive
            diplomas to rapid bootcamps — every path is engineered for outcomes.
          </p>
        </div>

        {/* timeline */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-6xl lg:grid-cols-2"
        >
          {/* vertical connector for small screens */}
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gray-200 sm:left-8 lg:hidden" />

          {programs.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.title}
                variants={item}
                className="group relative flex gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)]"
              >
                {/* bullet / icon */}
                <div className="relative shrink-0">
                  {/* connector dot for mobile timeline */}
                  <span className="absolute -left-6 top-2 hidden h-3 w-3 rounded-full bg-gray-300 sm:-left-7 lg:hidden" />
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.accent} shadow-lg ring-1 ring-black/10`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* content */}
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {p.description}
                  </p>

                  {/* subtle underline on hover */}
                  <div className="mt-4 h-px w-0 bg-gradient-to-r from-gray-300 to-transparent transition-all duration-300 group-hover:w-32" />
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
