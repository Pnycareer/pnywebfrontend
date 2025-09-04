"use client";

import { useState, useEffect, useMemo } from "react";
import Particle from "@/components/effects/Particles";

export default function CourseFeature({ Modules, className = "" }) {
  // desktop selection
  const [selectedLecture, setSelectedLecture] = useState(null);
  // mobile accordion open item (stores lectureNumber or null)
  const [openMobileLecture, setOpenMobileLecture] = useState(null);
  // mobile: show only 5 initially
  const [showAllMobile, setShowAllMobile] = useState(false);

  const lectures = useMemo(() => {
    return Modules?.lectures?.length > 0
      ? [...Modules.lectures].sort((a, b) => a.lectureNumber - b.lectureNumber)
      : [];
  }, [Modules]);

  useEffect(() => {
    if (lectures.length > 0) setSelectedLecture(lectures[0]); // default for desktop
  }, [lectures]);

  const toggleMobile = (lecture) => {
    setOpenMobileLecture((curr) =>
      curr === lecture.lectureNumber ? null : lecture.lectureNumber
    );
  };

  // mobile list to render (first 5 unless expanded)
  const mobileLectures = showAllMobile ? lectures : lectures.slice(0, 5);

  // if collapsing back to 5 while an expanded item is outside the first 5, close it
  useEffect(() => {
    if (!showAllMobile && openMobileLecture != null) {
      const inFirstFive = lectures
        .slice(0, 5)
        .some((l) => l.lectureNumber === openMobileLecture);
      if (!inFirstFive) setOpenMobileLecture(null);
    }
  }, [showAllMobile, openMobileLecture, lectures]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen overflow-hidden p-4 ${className}`}
    >
      {/* Seam fade at the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 inset-x-0 h-8"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          background:
            "linear-gradient(to bottom, rgba(99,102,241,0.25), rgba(99,102,241,0))",
        }}
      />

      {/* 🔥 Gradient Blobs */}
      <div
        className="absolute -top-32 -left-24 h-96 w-96 -z-10 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.35), rgba(99,102,241,0.2), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-80 w-80 -z-10 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.25), rgba(16,185,129,0.15), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute top-10 right-10 h-72 w-72 -z-10 rounded-full opacity-30 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.3), rgba(147,51,234,0.15), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute top-1/2 left-0 h-72 w-72 -z-10 rounded-full opacity-25 blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.3), rgba(16,185,129,0.15), transparent)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Title & Desc */}
      <div className="absolute top-10 text-center z-20">
        <h3 className="text-sm md:text-4xl font-bold text-gray-900 mb-4">
          Course Modules
        </h3>
        <p className="max-w-3xl mx-auto text-sm md:text-xl text-black px-4">
          Our course modules offer a well-rounded curriculum, combining
          theoretical foundations with hands-on training, ensuring students
          acquire industry-relevant skills and knowledge for future endeavors.
        </p>
      </div>

      {/* Background Particles */}
      <Particle />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-5 border border-gray-200 z-10 mt-52 md:mt-48">
        {/* ---------- MOBILE (accordion w/ show more) ---------- */}
        <div className="md:hidden">
          <h3 className="text-xl font-bold text-black mb-4 text-center">
            📚 Lectures
          </h3>

          <ul className="space-y-3">
            {mobileLectures.map((lecture) => {
              const isOpen = openMobileLecture === lecture.lectureNumber;
              return (
                <li
                  key={lecture.lectureNumber}
                  className="bg-white/60 rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobile(lecture)}
                    className={`w-full flex items-center justify-between px-4 py-3 font-medium transition-all ${
                      isOpen
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-indigo-100 text-gray-800"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`lecture-panel-${lecture.lectureNumber}`}
                  >
                    <span>🎓 Lecture {lecture.lectureNumber}</span>
                    <span
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`lecture-panel-${lecture.lectureNumber}`}
                      className="px-4 pb-4 pt-3 text-gray-900 bg-white"
                    >
                      <p className="text-base font-bold break-words">
                        {lecture.title}
                      </p>
                      <p className="mt-2 text-[15px] text-gray-700">
                        {lecture.content}
                      </p>

                      <div className="mt-4">
                        <h4 className="text-base font-semibold text-indigo-600">
                          Key Topics:
                        </h4>
                        <div className="mt-2">
                          <div
                            className="[&>h1]:text-[28px] [&>h1]:font-semibold
                              [&>h2]:text-[24px] [&>h2]:font-medium
                              [&>h3]:text-[20px] [&>h3]:font-medium
                              [&>a]:cursor-pointer
                              [&>p]:mt-4 
                              [&>ul]:list-disc [&>ul]:pl-6
                              [&>ol]:list-decimal [&>ol]:pl-6
                              [&>ul>li]:mt-2
                              [&>ol>li]:mt-2"
                            dangerouslySetInnerHTML={{
                              __html: lecture.topics,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Show more / less */}
          {lectures.length > 5 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllMobile((v) => !v)}
                className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white shadow border border-gray-200 text-sm font-medium"
              >
                {showAllMobile ? "Show less" : `Show ${lectures.length - 5} more`}
              </button>
            </div>
          )}
        </div>

        {/* ---------- DESKTOP / TABLET (split view) ---------- */}
        <div className="hidden md:flex flex-row h-full max-h-[90vh] overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-1/3 p-4 bg-white/40 rounded-lg shadow-md max-h-[500px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-black mb-4 text-center">
              📚 Lectures
            </h3>
            <div className="space-y-3">
              {lectures.map((lecture) => (
                <button
                  key={lecture.lectureNumber}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium shadow-sm ${
                    selectedLecture?.lectureNumber === lecture.lectureNumber
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "bg-white/60 text-gray-800 hover:bg-indigo-100"
                  }`}
                >
                  🎓 Lecture {lecture.lectureNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="w-2/3 p-4 text-gray-900 overflow-y-auto max-h-[500px]">
            {selectedLecture ? (
              <div>
                <p className="text-xl font-bold break-words">
                  {selectedLecture.title}
                </p>
                <p className="mt-3 text-lg text-gray-700">
                  {selectedLecture.content}
                </p>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-indigo-600">
                    Key Topics:
                  </h3>
                  <div className="mt-3">
                    <div
                      className="[&>h1]:text-[34px] [&>h1]:font-semibold
                        [&>h2]:text-[30px] [&>h2]:font-medium
                        [&>h3]:text-[24px] [&>h3]:font-medium
                        [&>a]:cursor-pointer
                        [&>p]:mt-5 
                        [&>ul]:list-disc [&>ul]:pl-6
                        [&>ol]:list-decimal [&>ol]:pl-6
                        [&>ul>li]:mt-2
                        [&>ol>li]:mt-2"
                      dangerouslySetInnerHTML={{
                        __html: selectedLecture.topics,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-lg text-center">
                Select a lecture to view details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
