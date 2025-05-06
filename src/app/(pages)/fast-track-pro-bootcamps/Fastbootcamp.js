"use client";
import React from "react";
import Link from "next/link";
import HeaderSection from "@/components/HeaderSection/Headersection";

const Fastbootcamp = ({ bootcampCourses }) => {
  if (!bootcampCourses || bootcampCourses.length === 0) {
    return (
      <div className="text-center py-10">No bootcamp courses available</div>
    );
  }

  // Group courses by category name
  const groupedByCategory = bootcampCourses.reduce((acc, course) => {
    const key = course.category_Name || "Uncategorized";
    if (!acc[key]) {
      acc[key] = {
        category_Description: course.category_Description || "",
        courses: [],
      };
    }
    acc[key].courses.push(course);
    return acc;
  }, {});

  return (
    <>
      <HeaderSection 
      image="https://www.admin777.pny-trainings.com/assets/images/fast-track-boot-camp.png"/>
      <div className="p-6">
        {Object.entries(groupedByCategory).map(([category, group]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">
              Top Courses in <span className="text-blue-600">{category}</span>
            </h2>

            {/* Courses Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.courses
                .filter((course) => course.View_On_Web === true)
                .map((course) => (
                  <Link
                    href={`/${course.url_Slug}`}
                    key={course._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_API_URL
                      }/${course.course_Image.replace(/\\/g, "/")}`}
                      alt={course.course_Name}
                      className="w-full h-52 object-cover rounded-t-xl"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {course.course_Name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                        {course.Short_Description}
                      </p>

                      <button
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold
                      hover:cursor-pointer"
                      >
                        More Details
                      </button>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Fastbootcamp;
