"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axiosInstance";
import { generateHeadingsAndHTML } from "@/utils/htmlHeadingsParser";

const Coursedescription = ({ coursedesc }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        const response = await axios.get(
          `/courses/getoncategory/${coursedesc.category_Name}`
        );

        const data = response.data;

        if (data && Array.isArray(data.courses)) {
          setRelatedCourses(data.courses);
        } else {
          setRelatedCourses([]);
        }
      } catch (error) {
        console.error("Error fetching related courses:", error);
        setRelatedCourses([]);
      }
    };

    if (coursedesc?.category_Name) {
      fetchRelatedCourses();
    }
  }, [coursedesc?.category_Name]);

  const handleCourseClick = (slug) => {
    router.push(`/${slug}`);
  };

  const { html: updatedHtml, headings } = generateHeadingsAndHTML(
    coursedesc.Course_Description
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-[#acb8d1] p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Course Description Container */}
        <div className="col-span-12 md:col-span-8">
          <div className="rounded-2xl overflow-hidden">
            <div
              className="course-description bg-white/50 shadow-xl p-6 text-justify leading-7 transition-all duration-300 ease-in-out 
    backdrop-blur-md border border-gray-200
    scrollbar-thin scrollbar-thumb-[#abc2e6] scrollbar-track-transparent
    ql-editor
    [&>h1]:text-[34px] [&>h1]:font-semibold [&>h1]:leading-9 [&>h1]:scroll-mt-28
    [&>h2]:text-[30px] [&>h2]:font-medium [&>h2]:scroll-mt-28
    [&>h3]:text-[24px] [&>h3]:font-medium [&>h3]:scroll-mt-28
    [&>a]:cursor-pointer
    [&>p]:mt-5 
    [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mt-2
    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mt-2
    [&_iframe]:w-full [&_iframe]:h-[400px] [&_iframe]:rounded-xl
    [&_.ql-align-center]:text-center
    [&_.ql-align-right]:text-right"
              dangerouslySetInnerHTML={{ __html: updatedHtml || "" }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4">
          {headings.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-12 border border-gray-200">
              <h3 className="text-xl font-bold mb-5 text-blue-800">
                Table of Contents
              </h3>
              <ul className="list-disc pl-6  space-y-3 text-sm text-gray-800 ">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <button
                      onClick={() => {
                        const el = document.getElementById(heading.id);

                        // Remove previous highlights
                        document.querySelectorAll("h1, h2, h3").forEach((h) => {
                          h.classList.remove("text-red-600", "underline");
                        });

                        // Scroll & apply highlight
                        if (el) {
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });

                          el.classList.add("text-red-600", "underline");
                        }
                      }}
                      className="text-left hover:text-blue-600 transition-colors duration-200"
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* make THIS element sticky, not the grid column itself */}
          <aside className="sticky top-28 h-fit space-y-4 rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-md backdrop-blur-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Related Courses
            </h2>

            {relatedCourses.length ? (
              relatedCourses
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
                .map((course) => (
                  <div
                    key={course._id}
                    onClick={() => handleCourseClick(course.url_Slug)}
                    className="cursor-pointer rounded-xl border border-gray-300 bg-white/70 p-4 shadow transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-700 transition group-hover:text-blue-600">
                      {course.course_Name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {course?.Short_Description?.slice(0, 70) ||
                        "Learn more..."}
                    </p>
                    <div className="mt-2 flex items-center text-sm font-medium text-blue-500 group-hover:underline">
                      View Details →
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500">No related courses found.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Coursedescription;
