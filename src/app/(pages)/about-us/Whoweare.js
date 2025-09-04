"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Rocket,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Whoweare({
  title = "Who we are?",
  highlight = "PNY Trainings: A renowned IT training institute in Pakistan since 2014",
  description = `Offering professional IT diplomas and short courses for students and professionals seeking career growth. With top-level industry instructors and multiple branches nationwide, we help you unlock your potential in the world of tech.`,
  points = [
    { icon: <ShieldCheck className="w-5 h-5" />, text: "Industry-vetted curriculum" },
    { icon: <Users className="w-5 h-5" />, text: "10,000+ learners trained" },
    { icon: <Award className="w-5 h-5" />, text: "Recognized certifications" },
  ],
  cta = { label: "Explore Programs", href: "/courses" },
  image = "./test.jpg", // replace with your asset
}) {
  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-b from-slate-50 via-white to-slate-50
        border-y border-slate-100
      "
    >
      {/* soft background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* text */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h2>

            <p className="mt-4 text-xl font-semibold leading-snug">
              {highlight}
            </p>

            <p className="mt-5 text-slate-600 leading-relaxed">
              {description}
            </p>

            <ul className="mt-6 space-y-3">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm">
                    {p.icon}
                  </span>
                  <span className="text-slate-700">{p.text}</span>
                </li>
              ))}
            </ul>

            {cta?.label && (
              <Link
                href={cta.href}
                className="
                  group mt-8 inline-flex items-center gap-2 rounded-xl
                  bg-slate-900 px-5 py-3 text-white font-medium shadow
                  hover:bg-slate-800 active:scale-[0.99] transition
                "
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </motion.div>

          {/* image / glass card */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="
              relative
              rounded-3xl border border-white/60 bg-white/60 backdrop-blur
              shadow-[0_10px_40px_-10px_rgba(2,6,23,0.15)]
              p-2 sm:p-3
            "
          >
            {/* subtle stacked cards shadow effect */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-white/40 shadow-2xl" />
            <div className="absolute -inset-12 -z-20 rounded-3xl bg-white/30 shadow-xl" />

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt="PNY Training Award"
                width={1280}
                height={900}
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                priority
                unoptimized
              />

              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="
                  absolute top-4 left-4
                  inline-flex items-center gap-2 rounded-full
                  bg-white/90 px-3 py-1.5 backdrop-blur border border-slate-200 text-slate-700
                "
              >
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Training Award</span>
              </motion.div>

              {/* corner glow */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-teal-300/30 blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* tiny stats row (optional, looks pro) */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="
            mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: "Years", value: "10+" },
            { label: "Campuses", value: "6" },
            { label: "Courses", value: "120+" },
            { label: "Alumni", value: "10k+" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white/60 p-5 backdrop-blur shadow-sm mt-2"
            >
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="mt-1 text-xs tracking-wide text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
