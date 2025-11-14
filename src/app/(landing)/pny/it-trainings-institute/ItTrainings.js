// Updated ItTrainings component without background animation
// HeroSection now uses a single banner image instead

"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Lightbulb, BookOpen, Rocket } from "lucide-react";
import CoursesShowcase from "./CoursesShowcase";
import Achievements from "./CountsAchievments";
import Form from "./Form";

const featureCards = [
  {
    id: 1,
    title: "International Collaborations",
    description:
      "Partnered with global institutions to ensure world-class learning and international exposure.",
    colorClass: "bg-emerald-500",
    icon: Rocket,
  },
  {
    id: 2,
    title: "Awarded by USA Education 2.0",
    description:
      "Recognized for quality education and excellence under the prestigious Education 2.0 framework.",
    colorClass: "bg-sky-500",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Multiple Branches in Pakistan",
    description:
      "Expanding nationwide with accessible campuses across major cities of Pakistan.",
    colorClass: "bg-amber-500",
    icon: Lightbulb,
  },
  {
    id: 4,
    title: "Affiliated with Govt. (PSDA & PBTE)",
    description:
      "Officially accredited by Pakistan’s leading government bodies ensuring trusted certification.",
    colorClass: "bg-blue-600",
    icon: BookOpen,
  },
];

const FeatureCard = ({ title, description, colorClass, Icon }) => (
  <article
    className={`${colorClass} p-6 text-white shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl mt-5`}
  >
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
      <Icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-white/90">
      {description}
    </p>
  </article>
);

const FeatureHighlights = () => (
  <section className="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-20">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featureCards.map(({ id, icon: Icon, ...card }) => (
        <FeatureCard key={id} Icon={Icon} {...card} />
      ))}
    </div>
  </section>
);

const HeroSection = () => (
  <section
    className="relative overflow-hidden text-white bg-slate-950 md:bg-[url('/landing/banner.png')] bg-cover bg-center bg-no-repeat min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px] pb-16 md:pb-24 lg:pb-72"
  >
    <div className="absolute inset-0 bg-slate-950/40" aria-hidden="true" />
    <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-28 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl text-center md:basis-1/2 md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-200">
          Inspire Your IT Journey
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-5xl">
          Learn the Skills That Empower Your Future
        </h1>
        <p className="mt-5 text-base text-white/80 sm:text-lg">
          Unlock new opportunities with expert-led courses designed to help you
          create, innovate, and grow. Build real-world skills, master modern
          tools, and shape the career you’ve always imagined.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          {/* <Link
            href="/about-us"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-emerald-600"
          >
            About Us
          </Link> */}
          {/* <Link
            href="https://wa.me/923001234567" // replace with your actual WhatsApp number in international format
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-emerald-600"
          >
            Contact Us
          </Link> */}
        </div>
      </div>
    </div>
  </section>
);

const ItTrainings = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeatureHighlights />
      <CoursesShowcase />
      <Achievements />
      <Form />
    </main>
  );
};

export default ItTrainings;
