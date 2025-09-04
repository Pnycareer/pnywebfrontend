"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Put your images in /public/assets/trainerslogo
const badges = [
  { src: "/assets/trainerslogo/adobe.png", label: "Adobe Certified" },
  { src: "/assets/trainerslogo/autodesk.png", label: "Autodesk Certified" },
  { src: "/assets/trainerslogo/google.png", label: "Google Certified" },
  { src: "/assets/trainerslogo/nbc.png", label: "NBC Partner" },
];

export default function TrainerCertification() {
  const [expanded, setExpanded] = useState(false);
  const prefersReduced = useReducedMotion();

  const badgeVariants = {
    hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.9 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" },
    }),
  };

  return (
    <section
      aria-labelledby="pny-title"
      className="relative w-full py-16 sm:py-10"
    >
      {/* soft backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <motion.h2
          id="pny-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-center"
          initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          Our Trainers Are Certified From
        </motion.h2>

        <motion.div
          className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Logos */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 place-items-center">
          {badges.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group flex flex-col items-center"
            >
              <div className="relative w-28 h-20 sm:w-32 sm:h-24">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 112px, 128px"
                  priority={i < 2}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm text-slate-700">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Card with content */}
        <div className="mx-auto mt-8 sm:mt-10 rounded-2xl bg-white/70 backdrop-blur border border-slate-200/70 shadow-[0_10px_40px_-12px_rgba(2,6,23,0.12)] p-6 sm:p-8">
          {/* Intro (always visible) */}
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">
            PNY Trainings is the leading IT training hub in Lahore that offers
            various programs helping young career seekers grasp essential IT
            skills and confidently enter the job market. With a strong focus on
            practical expertise, our trainers are internationally certified and
            committed to shaping the future of tech talent in Pakistan.
          </p>

          {/* Why it matters panel */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(900px_300px_at_100%_-10%,rgba(59,130,246,0.15),transparent)]" />
            <div className="relative p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Why it matters
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                PNY Trainings empowers you with industry-recognized
                certifications and hands-on projects—building a portfolio that
                gets noticed by employers. We focus on real-world skills, not
                just exam preparation.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                  Flexible online & weekend learning options
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-600" />
                  Certified mentors with proven expertise
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-600" />
                  {"Market-driven curriculum designed for today's jobs"}
                </li>
              </ul>
            </div>
          </div>

          {/* Read More — ALL remaining text here */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="prose prose-slate max-w-none mt-6 prose-p:leading-relaxed flex flex-wrap gap-4">
                  <p>
                    PNY Trainings is the leading IT training hub in Lahore, and
                    it conducts different training programs aimed at helping
                    young career seekers understand the basic information
                    technology functioning of the sector and the job role they
                    aspire to take on. Their insight and vision have assisted us
                    in enhancing the knowledge and skills of youngsters to take
                    on modern-day corporate challenges through AI courses in
                    Pakistan. Getting a good start in a career is a cherished
                    dream for every career candidate.
                  </p>
                  <p>
                    However, this is easier said than done, especially in
                    today&apos;s challenging career landscape. To achieve this
                    dream, a basic college education is rarely enough,
                    especially in Pakistan. Today&apos;s highly competitive and
                    demanding employment market is looking for only talented and
                    skilled manpower with enough command of the essentials of
                    the information technology industry. To make a mark, you
                    must have the necessary knowledge, skills, and capability to
                    provide to the specific industry you aspire to enter and
                    grow. This is equally true across domains of Technology,
                    Business, Development, and Design, IT Software Development,
                    Digital Marketing Courses, and many more.
                  </p>
                  <p>
                    One of the ways that you can gain an advantage over your
                    contemporaries is to undergo courses offered by the
                    reputable IT Hub in Lahore. There are so many seats
                    available in Arfa Karim Tower short courses, and all you
                    have to do is enroll in your desired course. PNY Trainings
                    offers different courses in Lahore, Islamabad, Rawalpindi,
                    Karachi, and other major cities of Pakistan.
                  </p>
                  <p>
                    PNY Trainings is one of the promising and Best IT Training
                    institutes in Lahore that comes up with amazing courses for
                    online earning in Pakistan, training, and almost all short
                    courses. We are the introducers to numerous IT trends,
                    courses, and certifications in Lahore. The motive of the PNY
                    Arfa Karim Tower courses list provide the best training with
                    guaranteed results for everyone.
                  </p>
                  <p>
                    With our weekend classes in Lahore, we are the only IT
                    training center in Lahore that allows all professionals and
                    students to learn new skills for online earning. The
                    flexible timings let them be part of new industry trends and
                    improve their skills to get better-paid jobs in our PNY Arfa
                    Karim tower courses. For every single course, we pay
                    attention to the student&apos;s ease and feasibility when it
                    comes to class schedule, timings, course duration, content,
                    and teaching method.
                  </p>
                  <p>
                    PNY Trainings is one of the best online IT training
                    institutes in Arfa Karim Tower, Lahore, Pakistan, that
                    offers you the opportunity to learn new skills online. By
                    accessing the online repository, you will be able to get the
                    course and training from our qualified trainers and mentors.
                    We have an organized system of teaching, coordination,
                    follow-up, and course completion to let you have the
                    ultimate outcomes.
                  </p>
                  <p>
                    We are here when you are looking for the best IT training
                    institute in Lahore, that PNY Trainings all the next-level
                    skill-based IT training centers. Everything is designed
                    precisely from our graphic designing courses to SEO training
                    courses, their content, and even the training sessions. We
                    pay attention to market need, demand, and future scope of
                    the skills while offering a course. Every single course is
                    an addition to your skill set that will pay off in the
                    future.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:bg-blue-700 active:scale-[0.99] transition"
            >
              {expanded ? "Show Less" : "Read More"}
              <svg
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
