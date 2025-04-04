'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Coursedescription = ({ coursedesc }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${coursedesc.course_Category}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setRelatedCourses(data);
        }
      } catch (error) {
        console.error("Error fetching related courses:", error);
      }
    };

    if (coursedesc?.course_Category) {
      fetchRelatedCourses();
    }
  }, [coursedesc.course_Category]);

  const handleCourseClick = (slug) => {
    router.push(`/${slug}`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-[#acb8d1] p-6">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Course Description Container */}
        <div className="col-span-12 md:col-span-8">
          <div className="rounded-2xl overflow-hidden">
            <div
              className="course-description max-h-[80vh] overflow-y-scroll bg-white/50 shadow-xl p-6 text-justify leading-7 transition-all duration-300 ease-in-out 
                backdrop-blur-md border border-gray-200
                scrollbar-thin scrollbar-thumb-[#abc2e6] scrollbar-track-transparent
                [&>h1]:text-[34px] [&>h1]:font-semibold
                [&>h2]:text-[30px] [&>h2]:font-medium
                [&>h3]:text-[24px] [&>h3]:font-medium
                [&>a]:cursor-pointer
                [&>p]:mt-5 
                [&>ul]:list-disc [&>ul]:pl-6
                [&>ol]:list-decimal [&>ol]:pl-6
                [&>ul>li]:mt-2
                [&>ol>li]:mt-2"
              dangerouslySetInnerHTML={{
                __html: coursedesc.Course_Description || "",
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4 h-full bg-white/50 rounded-2xl shadow-md p-6 backdrop-blur-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Courses
          </h2>

          {relatedCourses.length > 0 ? (
            <div className="space-y-4">
              {relatedCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => handleCourseClick(course.url_Slug)}
                  className="cursor-pointer group rounded-xl border border-gray-300 bg-white/70 p-4 shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:border-blue-400"
                >
                  <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition">
                    {course.course_Name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {course?.Short_Description?.slice(0, 70) || "Learn more..."}
                  </p>
                  <div className="flex items-center mt-2 text-blue-500 text-sm font-medium group-hover:underline">
                    View Details →
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No related courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coursedescription;
