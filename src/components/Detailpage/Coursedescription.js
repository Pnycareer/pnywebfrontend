"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "@/utils/axiosInstance";
import { generateHeadingsAndHTML } from "@/utils/htmlHeadingsParser";
import RichTextRenderer from "../RichTextRenderer/RichTextRenderer";

// PropTypes for better development experience
const Coursedescription = ({ coursedesc }) => {
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Memoize the parsed HTML and headings to avoid recalculation
  const { html: updatedHtml, headings } = useMemo(() => {
    if (!coursedesc?.Course_Description) {
      return { html: "", headings: [] };
    }
    return generateHeadingsAndHTML(coursedesc.Course_Description);
  }, [coursedesc?.Course_Description]);

  // Memoize related courses to avoid unnecessary re-renders
  const displayedRelatedCourses = useMemo(() => {
    if (!relatedCourses.length) return [];
    return relatedCourses
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [relatedCourses]);

  // Memoize the fetch function to prevent unnecessary re-creation
  const fetchRelatedCourses = useCallback(async () => {
    if (!coursedesc?.category_Name) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `/courses/getoncategory/${coursedesc.category_Name}`
      );

      const { courses } = response.data;
      
      if (Array.isArray(courses)) {
        setRelatedCourses(courses);
      } else {
        setRelatedCourses([]);
      }
    } catch (error) {
      console.error("Error fetching related courses:", error);
      setError("Failed to load related courses");
      setRelatedCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [coursedesc?.category_Name]);

  useEffect(() => {
    fetchRelatedCourses();
  }, [fetchRelatedCourses]);

  // Memoize the course click handler
  const handleCourseClick = useCallback((slug) => {
    if (!slug) return;
    router.push(`/${slug}`);
  }, [router]);

  // Memoize the heading click handler
  const handleHeadingClick = useCallback((headingId) => {
    const targetElement = document.getElementById(headingId);
    
    if (!targetElement) return;

    // Remove previous highlights
    document.querySelectorAll("h1, h2, h3").forEach((heading) => {
      heading.classList.remove("text-red-600", "underline");
    });

    // Scroll to target and apply highlight
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    targetElement.classList.add("text-red-600", "underline");
  }, []);

  // Early return for invalid props
  if (!coursedesc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No course description available</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-[#acb8d1] p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Course Description Container */}
        <div className="col-span-12 md:col-span-8">
          <div className="rounded-2xl overflow-hidden">
            {updatedHtml ? (
              <RichTextRenderer html={updatedHtml} />
            ) : (
              <div className="bg-white p-6 rounded-2xl">
                <p className="text-gray-500">No course description available</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4">
          {/* Table of Contents */}
          {coursedesc.showtoc && headings.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-5 text-blue-800">
                Table of Contents
              </h3>
              <nav aria-label="Table of contents">
                <ul className="list-disc pl-6 space-y-3 text-sm text-gray-800">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <button
                        onClick={() => handleHeadingClick(heading.id)}
                        className="text-left hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
                        aria-label={`Jump to section: ${heading.text}`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Related Courses */}
          {coursedesc.category !== "academia" && (
          <aside className="sticky top-28 h-fit space-y-4 rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-md backdrop-blur-md">
            <h3 className="mb-6 text-2xl font-bold text-gray-800">
              Related Courses
            </h3>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-sm text-red-500 mb-2">{error}</p>
                <button
                  onClick={fetchRelatedCourses}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : displayedRelatedCourses.length > 0 ? (
              <div className="space-y-4">
                {displayedRelatedCourses.map((course) => (
                  <article
                    key={course._id}
                    className="group cursor-pointer rounded-xl border border-white/30 bg-white/20 p-4 shadow-lg backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:shadow-xl hover:border-white/50 hover:bg-white/30 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
                    onClick={() => handleCourseClick(course.url_Slug)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCourseClick(course.url_Slug);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${course.course_Name}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/90 to-blue-600/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2 leading-tight">
                          {course.course_Name}
                        </h3>
                        {course?.Short_Description && (
                          <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {course.Short_Description.slice(0, 80)}
                            {course.Short_Description.length > 80 && "..."}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="inline-flex items-center text-xs font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                            View Course
                            <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                          <div className="w-2 h-2 bg-blue-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No related courses found.
              </p>
            )}
          </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coursedescription;
