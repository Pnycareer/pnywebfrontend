"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COURSES = [
  {
    id: 1,
    badge: "Admission Going On",
    badgeColor: "bg-emerald-500",
    image: "https://htmldemo.net/glaxdu/glaxdu/assets/img/course/course-5.jpg",
    title: "Apparel Manufacturing",
    description:
      "Magna aliqua. Ut enim ad minim veniam, nisi ut aliquip tempor incid.",
  },
  {
    id: 2,
    badge: "Creative Track",
    badgeColor: "bg-sky-500",
    image: "https://htmldemo.net/glaxdu/glaxdu/assets/img/course/course-1.jpg",
    title: "Graphic Design & Multimedia",
    description:
      "Magna aliqua. Ut enim ad minim veniam, nisi ut aliquip tempor incid.",
  },
  {
    id: 3,
    badge: "Skill Booster",
    badgeColor: "bg-amber-500",
    image: "https://htmldemo.net/glaxdu/glaxdu/assets/img/course/course-3.jpg",
    title: "Computer Engineering",
    description:
      "Magna aliqua. Ut enim ad minim veniam, nisi ut aliquip tempor incid.",
  },
  {
    id: 4,
    badge: "Post Graduation Course",
    badgeColor: "bg-emerald-500",
    image: "https://htmldemo.net/glaxdu/glaxdu/assets/img/course/course-2.jpg",
    title: "Fashion & Technology",
    description:
      "Magna aliqua. Ut enim ad minim veniam, nisi ut aliquip tempor incid.",
  },
];

const CourseCard = ({ course }) => (
  <article className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
    <div className="relative h-64 w-full overflow-hidden">
      <Image
        src={course.image}
        alt={course.title}
        fill
        unoptimized
        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105"
        priority={course.id === 1}
      />
     
    </div>
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {course.description}
      </p>
    </div>
  </article>
);

const CoursesShowcase = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
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
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Our Courses
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Discover Programs Tailored For You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            aria-label="Scroll courses backward"
            onClick={() => handleScroll("prev")}
            className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 text-emerald-600 shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-4 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="snap-start shrink-0 basis-[88%] sm:basis-[55%] lg:basis-[32%] xl:basis-[24%]"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll courses forward"
            onClick={() => handleScroll("next")}
            className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 text-emerald-600 shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesShowcase;

