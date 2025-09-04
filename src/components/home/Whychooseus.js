"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";


const benefits = [
  "Money Making Skills",
  "Hands on Experience during Training",
  "Internship & Job Opportunities",
  "On-campus & Online Classes with Recorded Lectures",
  "Highly Experienced Instructors",
  "Professional Learning Environment",
  "Learning Management System",
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left — content */}
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-2xl font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-200/60">
              Why Choose Us
            </p>

            <h2 className="relative mb-4 text-xl font-extrabold leading-tight text-gray-900">
              Invest in skills that actually pay off
              <span className="absolute left-0 -bottom-2 block h-1 w-40 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            </h2>

            <p className="mb-8 max-w-prose text-gray-600">
              Real instructors. Real projects. Real results. No fluff—just the
              things that move your career forward.
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white/70 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      <Check size={18} />
                    </span>
                    <p className="font-medium text-gray-900">{benefit}</p>
                  </div>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </li>
              ))}
            </ul>
          </div>

          {/* Right — image */}
          <div className="relative isolate">
            {/* decorative halo */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-2xl" />

            <div className="relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-xl">
              <Image
                src='./whychooseus/whychooseus.jpg'
                alt="Why Choose Us"
                unoptimized
                width={600}
                height={600}
                priority
                className="h- w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                
              />

              {/* subtle top gradient for contrast */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
            </div>

            {/* small caption / trust note (optional) */}
            <p className="mt-3 text-center text-sm text-gray-500">
              Built for outcomes — not just certificates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
