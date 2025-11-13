"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DownloadBrochureForm from "@/components/DownloadBrochureForm/DownloadBrochureForm";
import {
  MessageCircle,
  PlayCircle,
  Clock,
  SignalHigh,
  Wallet,
} from "lucide-react";

export default function CourseHero({ course, brochurePath }) {
  if (!course) return null;

  const videoId = course.video_Id;
  const courseImageSrc = course?.course_Image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.course_Image
        .replace(/\\/g, "/")
        .replace(/^\/+/, "")}`
    : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse gap-10 px-6 py-16 md:px-10 lg:flex-row lg:items-center lg:py-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full space-y-6 lg:w-1/2"
        >
          {/* Badge + category */}
          <div className="flex flex-wrap items-center gap-3">
            {course.category && (
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-100/80">
                {course.category}
              </span>
            )}
            <span className="text-xs text-slate-300/70">
              Learn from industry experts • Hands-on training
            </span>
          </div>

          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl">
            {course.course_Name}
          </h1>

          {course.Short_Description && (
            <div
              className="prose prose-invert max-w-none text-sm text-slate-100/80 md:text-base"
              dangerouslySetInnerHTML={{ __html: course.Short_Description }}
            />
          )}

          {/* Meta info row */}
          <div className="grid gap-3 text-sm text-slate-100/90 sm:grid-cols-3">
            {course.Monthly_Fee && (
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur">
                <Wallet className="h-4 w-4 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Course Fee
                  </p>
                  <p className="font-semibold">
                    Rs {course.Monthly_Fee.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            )}

            {course.Duration_Months && (
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur">
                <Clock className="h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Duration
                  </p>
                  <p className="font-semibold">
                    {course.Duration_Months} Months
                  </p>
                </div>
              </div>
            )}

            {course.Skill_Level && (
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 backdrop-blur">
                <SignalHigh className="h-4 w-4 shrink-0 text-violet-400" />
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Skill Level
                  </p>
                  <p className="font-semibold">{course.Skill_Level}</p>
                </div>
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            {/* Primary CTA (depends on category) */}
            {course.category === "academia" ? (
              <a
                href="https://wa.me/+923101111774"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to Counsellor
                </motion.button>
              </a>
            ) : (
              <a
                href="https://lms.pnytraining.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-slate-800/80 
             border border-white/10 px-6 py-3 text-sm font-semibold 
             text-white hover:bg-slate-700/80 transition-all duration-200 
             shadow-sm shadow-black/20 backdrop-blur"
                >
                  <PlayCircle className="h-4 w-4 opacity-80" />
                  Enroll Now
                </motion.button>
              </a>
            )}

            {/* Brochure */}
            {course.Brochure && (
              <div className="inline-flex">
                <DownloadBrochureForm
                  brochureUrl={brochurePath}
                  courseName={course.course_Name}
                />
              </div>
            )}
          </div>

          {/* Tiny reassurance text */}
          <p className="text-xs text-slate-400">
            Just real skills, projects, and mentorship.
          </p>
        </motion.div>

        {/* RIGHT: Video / Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full lg:w-1/2"
        >
          <div className="relative w-full h-92 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl shadow-slate-900/80 backdrop-blur">
            {videoId ? (
              <div className="relative aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative aspect-video">
                {courseImageSrc ? (
                  <Image
                    src={courseImageSrc}
                    alt={course.course_Name}
                    fill
                    className="object-fit"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-900/60 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Image coming soon
                  </div>
                )}
              </div>
            )}

            {/* Overlay gradient + subtle label */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-slate-100/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live & Recorded Sessions
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
