"use client";
import React from "react";
import CourseCard from "@/components/cards/CourseCard";
import HeaderSection from "@/components/HeaderSection/Headersection";
import Link from "next/link";
import InstructorCard from "@/components/cards/InstructorCard";

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
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
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
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Meet Your Instructors</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Learn from industry experts with years of experience and a passion for
          teaching. Our instructors are dedicated to helping you succeed in your
          learning journey.
        </p>
        <hr className="border-t-2 border-white w-20 mx-auto mb-8" />
      </section>

      {/* Instructors Section */}
      <section className="flex flex-wrap justify-center gap-6 p-6 bg-white">
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
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
