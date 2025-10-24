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
    return relatedCourses.sort(() => Math.random() - 0.5).slice(0, 4);
  }, [relatedCourses]);

  const fetchRelatedCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let categoryName = coursedesc?.category_Name;

      // if category is academia pick a random one from the pool
      if ((coursedesc?.category || "").toLowerCase() === "academia") {
        const pool = [
          "diploma",
          "development",
          "marketing",
          "multimedia",
          "designing",
          "business",
          "it-and-software",
        ];
        categoryName = pool[Math.floor(Math.random() * pool.length)];
      }

      if (!categoryName) {
        setRelatedCourses([]);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`/courses/getoncategory/${categoryName}`);
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
  }, [coursedesc?.category, coursedesc?.category_Name]);

  useEffect(() => {
    fetchRelatedCourses();
  }, [fetchRelatedCourses]);

  // Memoize the course click handler
  const handleCourseClick = useCallback(
    (slug) => {
      if (!slug) return;
      router.push(`/${slug}`);
    },
    [router]
  );

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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">No course description available</p>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] -z-10 rounded-full opacity-60 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,165,233,0.28), rgba(56,189,248,0.22), rgba(45,212,191,0.18), rgba(16,185,129,0.12), transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-44 -right-40 h-[700px] w-[700px] -z-10 rounded-full opacity-55 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(125,211,252,0.26), rgba(56,189,248,0.18), rgba(34,197,94,0.14), rgba(74,222,128,0.1), transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(45,212,191,0.14), rgba(14,165,233,0.1), transparent)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 md:items-start">
        <div className="col-span-12 md:col-span-8 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto md:pr-3 lg:max-h-[calc(100vh-10rem)] lg:pr-6">
          <div className="rounded-3xl border border-white/30 bg-white/85 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            {updatedHtml ? (
              <RichTextRenderer html={updatedHtml} />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-500">
                No course description available
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          {coursedesc.showtoc && headings.length > 0 ? (
            <div className="mb-6 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600">
                  #
                </span>
                <h3 className="text-xl font-semibold text-slate-900">
                  Table of Contents
                </h3>
              </div>
              <nav aria-label="Table of contents">
                <ul className="space-y-3 text-sm text-slate-700">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <button
                        onClick={() => handleHeadingClick(heading.id)}
                        className="w-full rounded-xl bg-slate-50/60 px-3 py-2 text-left transition-colors duration-200 hover:bg-sky-50 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white"
                        aria-label={`Jump to section: ${heading.text}`}
                      >
                        {heading.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : null}

          <aside className="sticky top-20 h-fit space-y-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {(coursedesc?.category || "").toLowerCase() === "academia"
                  ? "Trending in Other Categories"
                  : "Related Courses"}
              </h3>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/10 text-sm font-medium text-sky-600">
                {displayedRelatedCourses.length}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Curated picks to keep your learning momentum strong.
            </p>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="mb-2 h-4 rounded bg-slate-200/80" />
                    <div className="h-3 w-3/4 rounded bg-slate-200/70" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-4 text-center">
                <p className="mb-2 text-sm text-red-500">{error}</p>
                <button
                  onClick={fetchRelatedCourses}
                  className="text-sm font-medium text-sky-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : displayedRelatedCourses.length > 0 ? (
              <div className="space-y-4">
                {displayedRelatedCourses.map((course) => (
                  <article
                    key={course._id}
                    className="group cursor-pointer rounded-2xl border border-white/30 bg-white/40 p-4 shadow-lg backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/60 hover:shadow-xl focus-within:ring-2 focus-within:ring-sky-400/60 focus-within:ring-offset-2 focus-within:ring-offset-white"
                    onClick={() => handleCourseClick(course.url_Slug)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleCourseClick(course.url_Slug);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${course.course_Name}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/90 to-emerald-500/90 text-white shadow-md">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-sky-600">
                          {course.course_Name}
                        </h3>
                        {course?.Short_Description ? (
                          <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                            {course.Short_Description.slice(0, 80)}
                            {course.Short_Description.length > 80 && "..."}
                          </p>
                        ) : null}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="inline-flex items-center text-xs font-medium text-sky-600 transition-colors duration-200 group-hover:text-sky-700">
                            View Course
                            <svg
                              className="ml-1 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                          <div className="h-2 w-2 rounded-full bg-sky-500/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-slate-500">
                No related courses found.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Coursedescription;
