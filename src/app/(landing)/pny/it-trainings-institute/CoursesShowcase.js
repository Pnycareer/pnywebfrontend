"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COURSES = [
  {
    id: 1,
    badge: "Admission Going On",
    badgeColor: "bg-emerald-500",
    image: "/landing/web-development.webp",
    title: "Certified Full Stack Web Development with Advanced AI (6 Months)",
    description:
      "Advance your web development career with our Full-Stack Web Developer Master’s Program. Master front-end and back-end development skills and become an expert in the MEAN Stack.",
    pdfUrl: "/pdf/web.pdf", // 👈 set your real pdf path
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
  },
];

const CourseCard = ({ course, onEnroll }) => (
  <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
    <div className="relative h-64 w-full overflow-hidden">
      <Image
        src={course.image}
        alt={course.title}
        fill
        unoptimized
        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-105"
        priority={course.id === 1}
      />
    </div>
    <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${course.badgeColor}`}
      >
        {course.badge}
      </span>
      <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 md:text-xl">
        {course.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {course.description}
      </p>

      {/* Buttons */}
      <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <button
          type="button"
          onClick={onEnroll}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-500"
        >
          Enroll Now
        </button>

        {course.pdfUrl && (
          <a
            href={course.pdfUrl}
            download
            className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 transition hover:bg-emerald-50"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  </article>
);

const CoursesShowcase = () => {
  const scrollRef = useRef(null);
  const showArrows = COURSES.length > 4;

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToEnrollForm = () => {
    const formSection = document.getElementById("enroll-form");
    if (!formSection) return;
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-[linear-gradient(135deg,#f5f9fc_0%,#ffffff_55%,#eef5ff_100%)]">
      <div className="absolute inset-0 -z-10 opacity-70">
        <Image
          src="https://htmldemo.net/glaxdu/glaxdu/assets/img/bg/shape-bg.png"
          alt=""
          fill
          unoptimized
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Our Professional Courses
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Discover Skill-Focused Programs Designed for Your Success
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Build in-demand digital skills with our expert-led courses. Whether
            you want to become a developer, designer, marketer, or AI
            specialist, our programs help you learn, grow, and achieve your
            career goals.
          </p>
        </div>

        <div className="mt-12">
          {/* Mobile: vertical list, no horizontal scroll */}
          <div className="space-y-6 md:hidden">
            {COURSES.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={scrollToEnrollForm}
              />
            ))}
          </div>

          {/* Tablet / Desktop: horizontal scroll with arrows */}
          <div className="relative hidden md:block">
            <div className="flex items-center gap-4">
              {showArrows && (
                <button
                  type="button"
                  aria-label="Scroll courses backward"
                  onClick={() => handleScroll("prev")}
                  className="rounded-full bg-white p-3 text-emerald-600 shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div
                ref={scrollRef}
                className="flex flex-1 snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="snap-start shrink-0 basis-[55%] lg:basis-[calc((100%_-_4.5rem)/4)] xl:basis-[calc((100%_-_4.5rem)/4)]"
                  >
                    <CourseCard course={course} onEnroll={scrollToEnrollForm} />
                  </div>
                ))}
              </div>

              {showArrows && (
                <button
                  type="button"
                  aria-label="Scroll courses forward"
                  onClick={() => handleScroll("next")}
                  className="rounded-full bg-white p-3 text-emerald-600 shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesShowcase;
