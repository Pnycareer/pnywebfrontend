"use client";
import React from "react";
import CourseCard from "@/components/cards/CourseCard";
import HeaderSection from "@/components/HeaderSection/Headersection";
import Link from "next/link";
import InstructorCard from "@/components/cards/InstructorCard";
import { motion } from "framer-motion";

const Courses = ({ slug, subcategory, instructors }) => {
  const toURL = (path) =>
    `${process.env.NEXT_PUBLIC_API_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    <>
      {/* Banner Section */}
      <HeaderSection
        pagetitle={
          subcategory
            ? `Courses in ${subcategory.category_Name}`
            : `No Courses Available`
        }
        shortdescription={
          subcategory
            ? subcategory.category_Description
            : `No courses found under "${slug}".`
        }
      />

      {/* Courses Section */}
      <section className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-100 w-full animate-fade-in">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {subcategory?.courses?.filter(
            (course) => course.View_On_Web && course.bootcamp === false
          )?.length > 0 ? (
            subcategory.courses
              .filter(
                (course) => course.View_On_Web && course.bootcamp === false
              )
              .map((course) => (
                <Link
                  key={course._id}
                  href={`/${course.url_Slug}`}
                  className="cursor-pointer"
                >
                  <CourseCard
                    name={course.course_Name}
                    alt={course.course_Image_Alt}
                    image={toURL(course.course_Image)}
                    shortdescription={course.Short_Description}
                    description={`Instructor: ${
                      course.Instructor?.name || "N/A"
                    }, Fee: Rs ${course.Monthly_Fee || "N/A"}`}
                    urlslug={course.url_Slug}
                  />
                </Link>
              ))
          ) : (
            <p className="text-xl text-gray-600">No courses available</p>
          )}
        </div>
      </section>

      {/* Meet Your Instructors Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950 py-16 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/20 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-20 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
        />

        <div className="relative mx-auto flex w-11/12 max-w-6xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-300/70 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-100/80 shadow-lg shadow-blue-500/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-blue-300" />
            Faculty spotlight
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Meet your instructors
          </h2>

          <motion.div
            className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300 shadow shadow-blue-200/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
            Learn from practitioners who have launched products across fintech,
            design, data, and growth. Every instructor stays embedded with
            student squads to deliver feedback that accelerates real outcomes.
          </p>
        </div>
      </section>

      {/* Instructors Cards Section with soft gradient */}
      <section className="flex flex-wrap justify-center gap-6 p-10 bg-gradient-to-br from-[#f8f9fb] via-[#eef1f6] to-[#f4f7fa]">
        {instructors?.filter(
          (i) =>
            i?.in_View === true ||
            i?.in_View === "true" ||
            i?.View_On_Web === true ||
            i?.View_On_Web === "true"
        ).length > 0 ? (
          instructors
            .filter(
              (i) =>
                i?.in_View === true ||
                i?.in_View === "true" ||
                i?.View_On_Web === true ||
                i?.View_On_Web === "true"
            )
            .map((instructor) => (
              <InstructorCard
                key={instructor._id}
                name={instructor.name}
                photo={toURL(instructor.photo)}
                otherInfo={instructor.other_info}
              />
            ))
        ) : (
          <p className="text-xl text-gray-600">No instructors available</p>
        )}
      </section>
    </>
  );
};

export default Courses;
