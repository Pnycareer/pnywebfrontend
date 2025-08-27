"use client";

import { useState, useEffect, useMemo } from "react";
import Particle from "@/components/effects/Particles";

export default function CourseFeature({ Modules, className = "" }) {
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Memoize lectures to prevent recreating them every render
  const lectures = useMemo(() => {
    return Modules?.lectures?.length > 0
      ? [...Modules.lectures].sort((a, b) => a.lectureNumber - b.lectureNumber)
      : [];
  }, [Modules]);

  // Update selected lecture when lectures change
  useEffect(() => {
    if (lectures.length > 0) {
      setSelectedLecture(lectures[0]);
    }
  }, [lectures]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen overflow-hidden p-4 ${className}`}
    >
      {/* Optional soft seam fade at the very top to blend with previous section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 inset-x-0 h-8"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          background:
            "linear-gradient(to bottom, rgba(99,102,241,0.18), rgba(99,102,241,0))",
        }}
      />

      {/* Decorative Radial Spots (very light, no solid page bg) */}
      <div
        className="absolute -top-32 -left-24 h-96 w-96 -z-10 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.25), rgba(99,102,241,0.15), transparent)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-80 w-80 -z-10 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.15), rgba(16,185,129,0.1), transparent)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Heading and Description */}
      <div className="absolute top-10 text-center z-20">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
         Certified Digital Media Marketing Skills with Ai Enhanced Course
        </h3>
        <p className="max-w-3xl mx-auto text-sm md:text-xl text-gray-600 px-4">
          Our course modules offer a well-rounded curriculum, combining
          theoretical foundations with hands-on training, ensuring students
          acquire industry-relevant skills and knowledge for future endeavors.
        </p>
      </div>

      {/* Background Effect */}
      <Particle />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-5 border border-gray-200 z-10 mt-52 md:mt-48">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-hidden gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-4 bg-white/40 rounded-lg shadow-md max-h-[300px] md:max-h-[500px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
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

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-4 text-gray-900 overflow-y-auto max-h-[calc(90vh-2rem)] md:max-h-[500px]">
            {selectedLecture ? (
              <div>
                <p className="md:text-xl font-bold break-words">
                  {selectedLecture.title}
                </p>
                <p className="mt-3 md:text-lg text-gray-700">
                  {selectedLecture.content}
                </p>
                <div className="mt-5">
                  <h3 className="md:text-xl font-semibold text-indigo-600">
                    Key Topics:
                  </h3>
                  <div className="mt-3 text-gray-700 prose max-w-none">
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
              <p className="text-gray-500 text-lg text-center">
                Select a lecture to view details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
