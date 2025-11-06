"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Lightbulb, BookOpen, Rocket } from "lucide-react";
import CoursesShowcase from "./CoursesShowcase";

const featureCards = [
  {
    id: 1,
    title: "Scholarship Facility",
    description:
      "Magna aliqua. Ut enim ad minim veniam conse ctetur adipiscing elit, sed do exercitation.",
    colorClass: "bg-sky-500",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Industry Mentors",
    description:
      "Learn from practitioners who guide you with real-world insights and thoughtful feedback.",
    colorClass: "bg-amber-500",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Project Based",
    description:
      "Build an industry-ready portfolio with guided projects and focused skill assessments.",
    colorClass: "bg-blue-600",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Career Support",
    description:
      "Get interview prep, career counselling, and networking events to launch your IT career.",
    colorClass: "bg-emerald-500",
    icon: Rocket,
  },
];
const FeatureCard = ({ title, description, colorClass, Icon }) => (
  <article
    className={`${colorClass}  p-6 text-white shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl mt-5`}
  >
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
      <Icon className="h-7 w-7 stroke-[1.8]" aria-hidden="true" />
    </div>
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-white/90">{description}</p>
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
  <section className="relative isolate overflow-hidden pb-24 text-white md:pb-52">
    <div className="tech-animation absolute inset-0 -z-40" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div
      className="absolute inset-0 -z-30 bg-slate-950/85"
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.28),_transparent_52%)]"
      aria-hidden="true"
    />
    <div className="mx-auto flex min-h-[54vh] max-w-6xl flex-col-reverse items-center gap-10 px-6 pt-16 md:min-h-[60vh] md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl text-center md:basis-1/2 md:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-200">
          Inspire Your IT Journey
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Make Your Own World
        </h1>
        <p className="mt-5 text-base text-white/80 sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Link
            href="/about-us"
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-emerald-600"
          >
            About Us
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-emerald-600"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center md:mx-auto md:max-w-6xl md:justify-end md:px-6">
      <Image
        src="https://htmldemo.net/glaxdu/glaxdu/assets/img/slider/single-slide-1.png"
        alt="Achievement illustration"
        width={620}
        height={620}
        priority
        unoptimized
        className="w-full max-w-[320px] object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.55)] sm:max-w-[360px] md:max-w-[400px]"
      />
    </div>
    <style jsx>{`
      .tech-animation {
        position: absolute;
        inset: 0;
        background:
      /* subtle grid */ repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px,
            transparent 64px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px,
            transparent 64px
          ),
          #0b0f1a;
        overflow: hidden;
      }

      /* vertical sweep line */
      .tech-animation::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        left: -10%;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.6),
          0 0 24px rgba(255, 255, 255, 0.25);
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
        animation: sweepX 10s linear infinite;
      }

      /* horizontal sweep line */
      .tech-animation::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        top: -10%;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.6),
          0 0 24px rgba(255, 255, 255, 0.25);
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.35));
        animation: sweepY 12s linear infinite;
      }

      /* boxes that "trace" in and out */
      .tech-animation span {
        position: absolute;
        width: 160px;
        height: 120px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 6px;
        box-shadow: 0 0 14px rgba(255, 255, 255, 0.18),
          inset 0 0 10px rgba(255, 255, 255, 0.08);
        opacity: 0;
        transform: translate3d(0, 0, 0) scale(0.96);
        animation: boxTrace 6s ease-in-out infinite;
        backdrop-filter: blur(1px);
      }

      /* positions + stagger for variety */
      .tech-animation span:nth-child(1) {
        left: 10%;
        top: 12%;
        animation-delay: 0s;
      }
      .tech-animation span:nth-child(2) {
        left: 38%;
        top: 22%;
        width: 140px;
        height: 140px;
        animation-delay: 0.8s;
      }
      .tech-animation span:nth-child(3) {
        left: 62%;
        top: 18%;
        width: 180px;
        height: 110px;
        animation-delay: 1.6s;
      }
      .tech-animation span:nth-child(4) {
        left: 22%;
        top: 58%;
        width: 190px;
        height: 130px;
        animation-delay: 2.4s;
      }
      .tech-animation span:nth-child(5) {
        left: 55%;
        top: 65%;
        width: 150px;
        height: 150px;
        animation-delay: 3.2s;
      }
      .tech-animation span:nth-child(6) {
        left: 78%;
        top: 52%;
        width: 170px;
        height: 120px;
        animation-delay: 4s;
      }

      /* animated corner highlights to make it feel "techy" */
      .tech-animation span::before,
      .tech-animation span::after {
        content: "";
        position: absolute;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.85),
          rgba(255, 255, 255, 0)
        );
        height: 2px;
        width: 28%;
        top: -1px;
        left: -1px;
        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
        transform-origin: left;
        animation: cornerGlow 1.6s ease-in-out infinite;
      }
      .tech-animation span::after {
        top: auto;
        bottom: -1px;
        left: auto;
        right: -1px;
        transform-origin: right;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 0.85),
          rgba(255, 255, 255, 0)
        );
        animation-delay: 0.8s;
      }

      @keyframes sweepX {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(120%);
        }
      }
      @keyframes sweepY {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(120%);
        }
      }

      @keyframes boxTrace {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) scale(0.96);
          border-color: rgba(255, 255, 255, 0.1);
        }
        15% {
          opacity: 1;
          border-color: rgba(255, 255, 255, 0.9);
        }
        50% {
          opacity: 0.9;
          transform: translate3d(0, -2px, 0) scale(1);
        }
        85% {
          opacity: 0.15;
          border-color: rgba(255, 255, 255, 0.25);
          transform: translate3d(0, 4px, 0) scale(0.985);
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes cornerGlow {
        0%,
        100% {
          opacity: 0.15;
          transform: scaleX(0.6);
        }
        50% {
          opacity: 1;
          transform: scaleX(1);
        }
      }
    `}</style>
  </section>
);
const ItTrainings = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <FeatureHighlights />
      <CoursesShowcase />
    </main>
  );
};
export default ItTrainings;
