"use client";
import React from "react";
import CourseCard from "@/components/cards/CourseCard";
// import InstructorCard, { InstructorSection } from "@/components/cards/InstructorCard";

const Courses = ({ slug, subcategory }) => {
  console.log(subcategory, "test");

  const toURL = (path) =>
    `${process.env.NEXT_PUBLIC_API_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    <>
      {/* Banner Section */}
      <section className="relative flex items-center justify-center h-[300px] md:h-[400px] xl:h-[300px] w-full bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f] animate-fade-in">
        <div className="absolute inset-0 backdrop-blur-md rounded-xl w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
          <h1 className="text-2xl md:text-5xl font-bold text-white text-center">
            Courses in {subcategory?.category_Name || slug}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 text-center mt-4 max-w-4xl">
            {subcategory?.category_Description || "No description found."}
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-100 w-full animate-fade-in">
        {/* Courses Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {subcategory?.courses?.filter((course) => course.View_On_Web)
            ?.length > 0 ? (
            subcategory.courses
              .filter((course) => course.View_On_Web)
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
