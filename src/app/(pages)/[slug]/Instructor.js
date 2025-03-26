import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

const InstructorOverview = ({ Instructor }) => {
  return (
    <div className="p-4 md:p-8 text-gray-100">
      <div className="rounded-2xl shadow-md p-6 md:p-10 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
          OVERVIEW
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side: Instructor Info */}
          <div className="flex flex-col md:w-2/3 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Icon */}
              <div className="flex flex-col items-center">
                {Instructor.photo ? (
                  <Image
                    src={`http://localhost:8080/${Instructor.photo}`}
                    alt="User Avatar"
                    width={112}
                    height={112}
                    className="rounded-full border border-blue-300 object-cover"
                    unoptimized={true}
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border border-blue-300 flex items-center justify-center text-blue-500 text-6xl">
                    <FaUserCircle />
                  </div>
                )}
                <span className="mt-2 font-semibold text-black">
                  Instructor
                </span>
              </div>

              {/* Text */}
              <div className="text-gray-800 text-sm md:text-base leading-relaxed text-justify max-w-5xl">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {Instructor.name}
                </h3>
                <p>{Instructor.other_info}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Lottie Animation */}
          <div className="md:w-1/3 flex justify-center items-center">
            <DotLottieReact
              src="https://lottie.host/a340c48e-0eff-4906-b028-f2821544d19f/S2nAteSLtR.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOverview;
