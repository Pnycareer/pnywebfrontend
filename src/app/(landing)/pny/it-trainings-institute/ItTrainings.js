// Updated ItTrainings component without background animation
// HeroSection now uses a single banner image instead

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Lightbulb, BookOpen, Rocket } from "lucide-react";
import CoursesShowcase from "./CoursesShowcase";
import Achievements from "./CountsAchievments";
import Form from "./Form";
import PnyLogo from "@/assets/logo/Pnylogo.png";

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

const getNextNovemberDeadline = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const target = new Date(currentYear, 10, 25, 23, 59, 59);

  if (now > target) {
    target.setFullYear(currentYear + 1);
  }

  return target;
};

const calculateTimeLeft = (targetDate) => {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const format = (value) => String(value).padStart(2, "0");

  return {
    days: format(days),
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
  };
};

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const ticker = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(ticker);
  }, [targetDate]);

  return timeLeft;
};

const PromoCountdown = () => {
  const targetDate = useMemo(() => getNextNovemberDeadline(), []);
  const timeLeft = useCountdown(targetDate);

  const countdownUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-8 w-full max-w-2xl rounded-2xl bg-white/10 p-6 text-white backdrop-blur">
      <p className="text-lg font-semibold uppercase tracking-[0.25em] text-emerald-200">
        Hurry! 30% OFF - Offer Ends Soon!
      </p>
      <p className="mt-2 text-sm text-white/80">
        Offer ends on November 25th. Secure your seat before the timer hits zero.
      </p>
      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-4 text-center md:justify-start"
        aria-live="polite"
      >
        {countdownUnits.map(({ label, value }) => (
          <div
            key={label}
            className="flex min-w-[80px] flex-col items-center rounded-2xl bg-white/15 px-5 py-4 shadow-inner shadow-black/10"
          >
            <span className="text-3xl font-bold text-white">{value}</span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  <section className="relative z-10 mx-auto -mt-16  px-4 pb-20 sm:px-8 md:-mt-20 lg:-mt-24 xl:px-12">
    <div className="grid md:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featureCards.map(({ id, icon: Icon, ...card }) => (
        <FeatureCard key={id} Icon={Icon} {...card} />
      ))}
    </div>
  </section>
);

const HeroSection = () => (
  <section
    className="relative overflow-hidden text-white bg-slate-950 md:bg-[url('/landing/banner.png')] bg-cover bg-center bg-no-repeat min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px] pb-10 md:pb-16 lg:pb-24"
  >
    <div className="absolute inset-0 bg-slate-950/40" aria-hidden="true" />
    <div className="relative mx-auto flex w-full flex-col gap-10 px-4 pt-24 sm:px-8 md:flex-row md:items-center lg:px-12 xl:px-16">
      <div className="w-full max-w-2xl text-center md:basis-1/2 md:text-left">
        <div className="flex justify-center md:justify-start">
          <Image
            src={PnyLogo}
            alt="PNY Trainings logo"
            className="h-24 w-auto object-contain relative bottom-10"
            priority
          />
        </div>
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
        <PromoCountdown />
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
