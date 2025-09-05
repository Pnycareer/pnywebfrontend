"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import girl from "@/assets/logo/arfatowerhome.png";
import { Sparkles, BadgeCheck, Flame, ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

// Quick animation helpers
const fadeUp = (delay = 0) => ({
  initial: { y: 24, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* light ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.12),transparent_70%)] blur-3xl" />
      {/* ======= Background Layers (light spotted + grid, Vercel‑style) ======= */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft light gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7f9fc] to-[#eef3ff]" />

        {/* Spotted pattern (subtle) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.25) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Soft radial glow to lift center */}
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white blur-3xl opacity-40" />
      </div>

      {/* ======= Top Badge / Eyebrow ======= */}
      <div className="px-4 pt-10 md:pt-14">
        <motion.div
          {...fadeUp(0)}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-gray-900 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium tracking-wide">
            Limited-time Discounts live now
          </span>
        </motion.div>
      </div>

      {/* ======= Main Hero ======= */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 md:grid-cols-2 md:gap-6 md:py-16">
        {/* Copy */}
        <div className="text-center md:text-left">
          <motion.h2
            {...fadeUp(0.05)}
            className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="block">
              PNY <span className="text-gray-800">Trainings</span>
            </span>
            <span className="mt-2 block text-gray-700">
              Pakistan&rsquo;s No.1 IT Training Institute
            </span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.15)}
            className="mt-4 max-w-xl text-base text-gray-700 md:text-lg md:leading-8"
          >
            Recognized as Pakistan’s leading IT training institute, PNY
            Trainings offers certified courses designed to equip you with
            in-demand, money-making skills. Our practical programs empower
            learners to build careers, grow businesses, and secure high-paying
            opportunities worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.25)}
            className="mt-6 flex flex-col items-center gap-3 md:flex-row md:items-stretch"
          >
            <a
              href="https://lms.pnytraining.com/"
              target="_blank"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/10 transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none"
            >
              Enroll Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>

            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 backdrop-blur-md transition-colors hover:bg-gray-50"
            >
              Explore Courses
              <Rocket className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            {...fadeUp(0.35)}
            className="mt-6 flex flex-wrap items-center justify-center gap-6 md:justify-start"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <BadgeCheck className="h-5 w-5" />
              <span className="text-sm">Industry‑vetted curriculum</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Flame className="h-5 w-5" />
              <span className="text-sm">Job‑ready projects</span>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
          }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center md:max-w-lg"
        >
          {/* Card behind image */}
          <div className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-3xl bg-white/70 backdrop-blur-md ring-1 ring-black/10" />

          {/* Floating rings */}
          <motion.div
            aria-hidden
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 -top-6 h-20 w-20 rounded-full border-2 border-black/10"
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="absolute -right-6 bottom-8 h-16 w-16 rounded-full border-2 border-black/10"
          />

          <Image
            src={girl}
            alt="Student illustration"
            priority
            className="select-none drop-shadow-xl"
            unoptimized
          />
        </motion.div>
      </div>

      {/* ======= Promo Bar ======= */}
      <div className="relative z-10 border-t border-gray-200 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <motion.div
            {...fadeUp(0)}
            className="flex items-center gap-2 text-gray-900"
          >
            <Flame className="h-5 w-5" />
            <p className="text-sm md:text-base">
              <span className="font-semibold">Admissions are open</span> — seats
              move fast. Don’t get waitlisted.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center gap-6 text-gray-700"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Cohorts
              </p>
              <p className="text-sm font-semibold">Monthly</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Placement
              </p>
              <p className="text-sm font-semibold">Career Support</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Classes
              </p>
              <p className="text-sm font-semibold">In Campus / Online</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
