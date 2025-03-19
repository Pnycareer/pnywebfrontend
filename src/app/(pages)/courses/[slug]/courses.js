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

  // Hide loader after fetching data
  useEffect(() => {
    if (!loading) {
      setTimeout(() => setShowLoader(false), 1000); // Add a smooth transition
    }
  }, [loading]);

  return (
    <>
      {/* Show Loader When Fetching Data */}
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {/* Banner Section */}
          <section className="relative flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px] xl:h-[300px] w-full bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f] -z-50">
            <div className="absolute inset-0 backdrop-blur-md rounded-xl w-11/12 md:w-10/12 lg:w-8/12 mx-auto flex flex-col items-center justify-center p-6 md:p-10">
              <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-white text-center">
                Courses Offered in{" "}
                {slug
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>
              <p className="text-lg md:text-xl lg:text-xl text-gray-200 text-center mt-4 max-w-4xl">
                {subcategory?.description || "No Description Found"}
              </p>
            </div>
          </section>

          {/* Main Content with White Background */}
          <section className="relative flex flex-col items-center justify-center p-6 md:p-10 bg-gray-200">
            {/* Error Handling */}
            {error && (
              <h1 className="text-xl md:text-3xl font-semibold text-red-500 relative">
                {error}
              </h1>
            )}

            {/* Display Courses or Show "No Data Available" */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {subcategory?.category_courses?.length > 0 ? (
                subcategory.category_courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    name={course.course_id?.course_Name || "No Name"}
                    image={course.course_id?.course_Image || "/default-course.jpg"}
                    description={`Instructor: ${course.teacher || "N/A"}, Fee: $${course.monthly_tution_fee || "N/A"}`}
                    urlslug={course.course_id?.url_Slug}
                  />
                ))
              ) : (
                <p className="text-xl text-gray-600">No courses available</p>
              )}
            </div>

            {/* Category Instructors Section */}
            <InstructorSection />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {subcategory?.category_instructors?.length > 0 ? (
                subcategory.category_instructors.map((instructor) => (
                  instructor.instructor_id ? ( // Check if instructor_id exists
                    <InstructorCard
                      key={instructor.instructor_id._id}
                      name={instructor.instructor_id.name || "No Name"}
                      photo={instructor.instructor_id.photo || "/default-instructor.jpg"}
                      info={instructor.instructor_id.other_info || "No additional info available"}
                    />
                  ) : null
                ))
              ) : (
                <p className="text-xl text-gray-600">No instructors available</p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Courses;
