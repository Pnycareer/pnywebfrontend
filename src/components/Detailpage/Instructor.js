"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

const InstructorOverview = ({ Instructor, className = "" }) => {
  // If the instructor is not supposed to be viewed, return null
  if (!Instructor?.in_View) return null;

  return (
    <div className={`p-4 md:p-8 ${className}`}>
      <div className="rounded-2xl shadow-md p-6 md:p-10 transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
          OVERVIEW
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side: Instructor Info */}
          <div className="flex flex-col md:w-2/3 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile */}
              <div className="flex flex-col items-center">
                {Instructor.photo ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${Instructor.photo}`}
                    alt="Instructor Photo"
                    width={112}
                    height={112}
                    className="rounded-full border border-blue-300 object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border border-blue-300 flex items-center justify-center text-blue-500 text-6xl">
                    <FaUserCircle />
                  </div>
                )}
                <span className="mt-2 font-semibold text-gray-900">
                  Instructor
                </span>
              </div>

              {/* Bio */}
              <div className="text-gray-800 text-sm md:text-base leading-relaxed text-justify max-w-5xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {Instructor.name}
                </h3>
                <p className="text-gray-700">{Instructor.other_info}</p>
              </div>
            </div>
          </div>

          {/* Right: Animation (use a lightweight gif/png or keep iframe) */}
          <div className="md:w-1/3 flex justify-center items-center">
            <iframe
              className="h-52 w-full max-w-[300px] rounded-xl border border-gray-200"
              src="https://lottie.host/embed/a340c48e-0eff-4906-b028-f2821544d19f/S2nAteSLtR.lottie"
              title="Instructor Animation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOverview;
