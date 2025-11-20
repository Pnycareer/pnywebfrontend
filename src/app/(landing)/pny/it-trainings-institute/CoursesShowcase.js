"use client";

import React from "react";
import Image from "next/image";

const COURSES = [
  {
    id: 1,
    badge: "Admission Going On",
    badgeColor: "bg-emerald-500",
    image: "/landing/web-development.webp",
    title: "Certified Full Stack Web Development with Advanced AI (6 Months)",
    description:
      "Advance your web development career with our Full-Stack Web Developer Master’s Program. Master front-end and back-end development skills and become an expert in the MEAN Stack.",
    pdfUrl: "/pdf/web.pdf",
    videoUrl: "https://www.youtube.com/embed/4XDSNkCkLjQ",
  },
  {
    id: 2,
    badge: "Creative Track",
    badgeColor: "bg-sky-500",
    image: "/landing/graphic.webp",
    title:
      "Become A Full Stack Graphic Designer (Basic to Intermediate Level) With AI",
    description:
      "Learn Adobe Photoshop, CorelDRAW, InDesign, Illustrator, Figma, Premiere Pro, and After Effects to build professional graphic design and video editing skills.",
    pdfUrl: "/pdf/graphics.pdf",
    videoUrl: "https://www.youtube.com/embed/BB_0LN7jZag",
  },
  {
    id: 3,
    badge: "Skill Booster",
    badgeColor: "bg-amber-500",
    image: "/landing/didital.webp",
    title:
      "Certified Digital Media Marketing Skills with AI Enhanced Course (6 Months)",
    description:
      "Master SEO, social media marketing, PPC, content strategy, and all essential digital marketing skills to boost your career in the fast-growing digital media industry.",
    pdfUrl: "/pdf/digital.pdf",
    videoUrl: "https://www.youtube.com/embed/h6ITRUbhu2U",
  },
  {
    id: 4,
    badge: "Post Graduation Course",
    badgeColor: "bg-emerald-500",
    image: "/landing/agentic-ai.webp",
    title: "Agentic AI 1-Year Diploma",
    description:
      "Hands-on training in advanced AI tools and automation systems. Learn to build intelligent workflows, use generative AI, and integrate automation into real-world projects to boost productivity and innovation.",
    pdfUrl: "/pdf/agentic.pdf",
    videoUrl: "https://www.youtube.com/embed/rlqXNJJbksU",
  },
];

const CourseCard = ({ course, onEnroll }) => (
  <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
    {/* Image */}
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={course.image}
        alt={course.title}
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-105"
        priority={course.id === 1}
      />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${course.badgeColor}`}
      >
        {course.badge}
      </span>

      <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 sm:text-lg md:text-xl">
        {course.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {course.description}
      </p>

      {course.videoUrl && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-indigo-50 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <div className="relative aspect-[9/16] sm:aspect-[4/5] lg:aspect-[9/16]">
            <iframe
              src={course.videoUrl}
              title={`${course.title} video overview`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onEnroll}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold uppercase text-white transition hover:bg-emerald-500 sm:w-auto"
        >
          Enroll Now
        </button>

        {course.pdfUrl && (
          <a
            href={course.pdfUrl}
            download
            className="inline-flex w-full items-center justify-center rounded-full border border-emerald-600 px-4  py-2.5 text-xs font-semibold uppercase  text-emerald-700 transition hover:bg-emerald-50 sm:w-auto"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  </article>
);

const CoursesShowcase = () => {
  const scrollToEnrollForm = () => {
    const formSection = document.getElementById("enroll-form");
    if (!formSection) return;
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-[linear-gradient(135deg,#f5f9fc_0%,#ffffff_55%,#eef5ff_100%)] py-16 sm:py-20 lg:py-24">
      {/* Subtle BG Shape */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <Image
          src="https://htmldemo.net/glaxdu/glaxdu/assets/img/bg/shape-bg.png"
          alt=""
          fill
          unoptimized
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500 sm:text-sm">
            Our Professional Courses
          </p>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            Discover Skill-Focused Programs Designed for Your Success
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            Build in-demand digital skills with our expert-led courses. Whether
            you want to become a developer, designer, marketer, or AI
            specialist, our programs help you learn, grow, and achieve your
            career goals.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COURSES.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={scrollToEnrollForm}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesShowcase;
