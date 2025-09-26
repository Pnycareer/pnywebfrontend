"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { useMemo } from "react";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

function absoluteImage(src) {
  if (!src) return "";
  return src.startsWith("http")
    ? src
    : `${process.env.NEXT_PUBLIC_API_URL}/${src}`;
}

function stripHtml(html) {
  if (!html) return "";
  const txt = html.replace(/<[^>]*>/g, " ");
  return txt
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CourseDetail({ course, error }) {
  const shortText = useMemo(() => stripHtml(course?.shortHtml), [course]);



  if (error) {
    return (
      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
        {error}
      </p>
    );
  }

  if (!course) {
    return <p className="text-slate-600">No course found.</p>;
  }

  const img = absoluteImage(course.image);

  return (
    <article className="rounded-2xl border border-white/30 bg-white/30 backdrop-blur-md shadow-lg overflow-hidden">
      {/* Cover / Image */}
      {img ? (
        <div className="relative w-full">
          <Image
            src={img}
            alt={course.alt || "Course image"}
            width={1600}
            height={800}
            priority
            unoptimized
            className="object-contain bg-white"
          />
        </div>
      ) : null}

      {/* Content */}
      <div className="p-6 space-y-4">
        <h1 className={`${poppins.className} text-2xl font-bold`}>
          {course.name}
        </h1>

        {/* You said you want title + short description shown.
            Short description is HTML in your API; we render a clean text preview here. */}
        {shortText ? (
          <p className="text-slate-700">{shortText}</p>
        ) : null}

        {/* Full HTML description (optional on detail page) */}
        {course.descriptionHtml ? (
          <div
            className="prose max-w-none prose-p:my-3 prose-headings:mt-6 prose-headings:mb-2"
            dangerouslySetInnerHTML={{ __html: course.descriptionHtml }}
          />
        ) : null}
      </div>
    </article>
  );
}
