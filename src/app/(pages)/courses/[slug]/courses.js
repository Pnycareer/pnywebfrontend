"use client";
import React, { useEffect, useState } from "react";

import useSubCategory from "@/hooks/useSubCategory";
import CourseCard from "@/components/cards/CourseCard";
import InstructorCard, { InstructorSection } from "@/components/cards/InstructorCard";
import Loader from "@/components/loader/Loader";

const Courses = ({ params }) => {
  const slug = params.slug;
  const { subcategory, loading, error } = useSubCategory(slug);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowLoader(false), 500); // smoother fade
    }
  }, [loading]);

  const toURL = (path) =>
    `${process.env.NEXT_PUBLIC_API_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    <>
      {showLoader && <Loader />}

      {!showLoader && (
        <>
          {/* Banner Section */}
          <section className="relative flex items-center justify-center h-[300px] md:h-[400px] xl:h-[300px] w-full bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f]">
            <div className="absolute inset-0 backdrop-blur-md rounded-xl w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
              <h1 className="text-2xl md:text-5xl font-bold text-white text-center uppercase">
                Courses in {subcategory?.category_Name || slug}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 text-center mt-4 max-w-4xl">
                {subcategory?.category_Description || "No description found."}
              </p>
            </div>
          </section>

          {/* Courses Section */}
          <section className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-100 w-full">
            {/* Error */}
            {error && (
              <h1 className="text-xl md:text-3xl font-semibold text-red-500">
                {error}
              </h1>
            )}

            {/* Courses Grid */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {subcategory?.courses?.length > 0 ? (
                subcategory.courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    name={course.course_Name}
                    image={toURL(course.course_Image)}
                    description={`Instructor: ${course.Instructor?.name || "N/A"}, Fee: Rs ${course.Monthly_Fee || "N/A"}`}
                    urlslug={course.url_Slug}
                  />
                ))
              ) : (
                <p className="text-xl text-gray-600">No courses available</p>
              )}
            </div>

            {/* Instructor Section Title */}
            {subcategory?.courses?.some((c) => c.Instructor) && <InstructorSection />}

            {/* Instructors Grid */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
              {subcategory?.courses?.filter((c) => c.Instructor).length > 0 ? (
                subcategory.courses
                  .filter((course) => course.Instructor)
                  .map((course) => (
                    <InstructorCard
                      key={course.Instructor._id}
                      name={course.Instructor.name}
                      photo={toURL(course.Instructor.photo)}
                      info={course.Instructor.other_info || "No additional info"}
                    />
                  ))
              ) : (
                <p className="text-xl text-gray-600">No instructors found</p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Courses;
