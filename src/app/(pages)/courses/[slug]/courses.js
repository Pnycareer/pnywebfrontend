"use client";
import React from "react";
import CourseCard from "@/components/cards/CourseCard";
import HeaderSection from "@/components/HeaderSection/Headersection";
// import InstructorCard, { InstructorSection } from "@/components/cards/InstructorCard";

const Courses = ({ slug, subcategory }) => {
  const toURL = (path) =>
    `${process.env.NEXT_PUBLIC_API_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    <>
      {/* Banner Section */}
      <HeaderSection
        pagetitle={`Courses in ${subcategory?.category_Name || slug}`}
        shortdescription={
          subcategory?.category_Description || "No description found."
        }
      />

      {/* Courses Section */}
      <section className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-100 w-full animate-fade-in">
        {/* Courses Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {subcategory?.courses?.filter(
            (course) => course.View_On_Web && course.bootcamp === false
          )?.length > 0 ? (
            subcategory.courses
              .filter(
                (course) => course.View_On_Web && course.bootcamp === false
              )
              .map((course) => (
                <CourseCard
                  key={course._id}
                  name={course.course_Name}
                  image={toURL(course.course_Image)}
                  description={`Instructor: ${
                    course.Instructor?.name || "N/A"
                  }, Fee: Rs ${course.Monthly_Fee || "N/A"}`}
                  urlslug={course.url_Slug}
                />
              ))
          ) : (
            <p className="text-xl text-gray-600">No courses available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
