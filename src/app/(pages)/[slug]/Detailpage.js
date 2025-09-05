"use client";
import React from "react";
import CourseFeature from "@/components/Detailpage/Module";
import Coursedescription from "@/components/Detailpage/Coursedescription";
import InstructorOverview from "@/components/Detailpage/Instructor";
import BenefitsSection from "@/components/Detailpage/Benefits";
import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";
import CourseHero from "@/components/Detailpage/CourseSection";
import ScrollToTopEffect from "@/components/ScrollToTop/ScrolltoTopeffect";

const CourseSection = ({ course }) => {
  if (!course) return <p className="text-white p-10">Course not found</p>;

  const brochurePath = course.Brochure
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.Brochure.replace(
        /\\/g,
        "/"
      )}`
    : "";

  return (
    <>
      <ScrollToTopEffect />
      <CourseHero course={course} brochurePath={brochurePath} />

      <div className="relative min-h-screen overflow-hidden bg-slate-50">
        {/* Professional gradient system */}
        {/* Primary gradient - sophisticated blue-purple */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-blue-600/50 via-indigo-500/30 to-transparent" />

        {/* Secondary gradient - elegant teal */}
        <div className="pointer-events-none absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full blur-3xl opacity-35 bg-gradient-to-bl from-teal-500/40 via-cyan-400/25 to-transparent" />

        {/* Accent gradient - refined violet */}
        <div className="pointer-events-none absolute bottom-20 left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-violet-500/35 via-purple-400/20 to-transparent" />

        {/* Subtle highlight gradient - warm amber */}
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-amber-400/30 via-orange-300/15 to-transparent" />

        {/* Depth gradient - deep blue for depth */}
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full blur-3xl opacity-20 bg-gradient-to-tl from-slate-700/25 via-slate-600/15 to-transparent" />

        {/* Additional gradient spots for richer effect */}
        {/* Top center gradient - soft pink */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full blur-3xl opacity-20 bg-gradient-to-b from-pink-400/25 via-rose-300/15 to-transparent" />

        {/* Center right gradient - mint green */}
        <div className="pointer-events-none absolute top-1/4 right-1/3 h-[200px] w-[200px] rounded-full blur-3xl opacity-30 bg-gradient-to-l from-emerald-400/30 via-green-300/20 to-transparent" />

        {/* Bottom left gradient - soft yellow */}
        <div className="pointer-events-none absolute bottom-10 left-10 h-[180px] w-[180px] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-yellow-300/25 via-amber-200/15 to-transparent" />

        {/* Middle center gradient - subtle blue */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-15 bg-gradient-to-r from-blue-300/20 via-sky-200/10 to-transparent" />

        {/* Top right corner gradient - lavender */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-[150px] w-[150px] rounded-full blur-3xl opacity-20 bg-gradient-to-bl from-lavender-400/25 via-purple-300/15 to-transparent" />

        {/* Bottom right gradient - coral */}
        <div className="pointer-events-none absolute bottom-5 right-5 h-[220px] w-[220px] rounded-full blur-3xl opacity-25 bg-gradient-to-tl from-coral-400/20 via-orange-300/15 to-transparent" />

        {/* content */}
        {course?.courseModule?.lectures?.length > 0 && (
          <CourseFeature
            Modules={course.courseModule}
            className="bg-transparent"
          />
        )}
        <BenefitsSection className="bg-transparent -mt-px" />

        {course.Instructor && (
          <InstructorOverview Instructor={course.Instructor} />
        )}
      </div>

      <Coursedescription coursedesc={course} />

      <CourseAccordion faqs={course.faqs} />

      {/* <AdmissionSection /> */}
    </>
  );
};

export default CourseSection;
