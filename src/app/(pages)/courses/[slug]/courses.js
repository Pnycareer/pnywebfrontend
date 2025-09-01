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
      <section className="w-full  py-10 bg-gradient-to-r from-[#1B263B] via-[#3B4A58] to-[#004d40] text-white text-center relative overflow-hidden">
        <div className="absolute -top-16 right-0 h-80 w-80 bg-blue-400/20 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 h-72 w-72 bg-pink-400/20 blur-3xl rounded-full -z-10" />

        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Meet Your Instructors
          </h2>

          <motion.div
            className="h-1 w-20 mt-2 mb-6 mx-auto rounded-full bg-gradient-to-r from-indigo-300 via-white/50 to-pink-300 shadow-sm"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-100">
            Learn from industry experts with years of experience and a passion
            for teaching. Our instructors are dedicated to helping you succeed
            in your learning journey.
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
