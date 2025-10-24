"use client";
import CourseCard from "@/components/cards/CourseCard";
import HeaderSection from "@/components/HeaderSection/Headersection";
import { useMemo } from "react";

function stripHtml(html) {
  if (!html) return "";
  // quick + dirty: remove tags & decode common entities
  const txt = html.replace(/<[^>]*>/g, " ");
  return txt
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export default function AcademiaCourses({ courses = [], error = null }) {
  const cleaned = useMemo(
    () =>
      (courses || []).map((c) => ({
        ...c,
        shortClean: stripHtml(c.short),
      })),
    [courses]
  );

  if (error) {
    return (
      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
        {error}
      </p>
    );
  }

  if (!cleaned.length) {
    return (
      <p className="text-slate-600">
        No courses found. Double-check your API or `viewOnWeb` flags.
      </p>
    );
  }

  return (
    <>
      <HeaderSection
        pagetitle={"PNY Academia"}
        shortdescription={
          "PNY Academia provides quality education with expert teachers and modern learning methods. Our focus is on student growth, success, and excellence."
        }
      />
      {/* <HeaderSection
        image="/academia.jpg"
        fullScreen={false}
      /> */}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-10">
        {cleaned.map((c) => (
          <CourseCard
            key={c.id}
            name={c.name}
            alt={c.alt}
            image={c.image}
            urlslug={`academia/${c.slug}`}
            shortdescription={c.shortClean}
          />
        ))}
      </section>
    </>
  );
}
