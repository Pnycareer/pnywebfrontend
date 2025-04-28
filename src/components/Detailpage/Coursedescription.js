"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Coursedescription = ({ coursedesc }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/getoncategory/${coursedesc.category_Name}`
        );
        const data = await response.json();
    
        if (data && Array.isArray(data.courses)) {
          setRelatedCourses(data.courses);
        } else {
          setRelatedCourses([]);
        }
      } catch (error) {
        console.error("Error fetching related courses:", error);
      }
    };
    
  
    
      fetchRelatedCourses();
    
  }, []);
  

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
              className="course-description  bg-white/50 shadow-xl p-6 text-justify leading-7 transition-all duration-300 ease-in-out 
                backdrop-blur-md border border-gray-200
                scrollbar-thin scrollbar-thumb-[#abc2e6] scrollbar-track-transparent
                [&>h1]:text-[34px] [&>h1]:font-semibold
                [&>h1]:leading-9
                [&>h2]:text-[30px] [&>h2]:font-medium
                [&>h3]:text-[24px] [&>h3]:font-medium
                [&>a]:cursor-pointer
                [&>p]:mt-5 
                [&>ul]:list-disc [&>ul]:pl-6
                [&>ol]:list-decimal [&>ol]:pl-6
                [&>ul>li]:mt-2
                [&>ol>li]:mt-2
                course-description ql-editor [&_iframe]:w-full [&_iframe]:h-[400px] [&_iframe]:rounded-xl
                [&_.ql-align-center]:text-center
                [&_.ql-align-right]:text-right"
                
              dangerouslySetInnerHTML={{
                __html: coursedesc.Course_Description || "",
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4">
          {/* make THIS element sticky, not the grid column itself */}
          <aside
            className="
      sticky top-28    /* stays 7rem (28 × 0.25rem) from the top */
      h-fit                /* height = content height, so it can stick */
      space-y-4
      rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-md
      backdrop-blur-md
    "
          >
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
