import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const InstructorOverview = () => {
  return (
    <div className="p-4 md:p-8 text-gray-100">
      <div className="bg-gradient-to-r bg-blue-100 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-6 md:p-10 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
          OVERVIEW
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side: Instructor Info */}
          <div className="flex flex-col md:w-2/3 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Icon */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full border border-blue-300 flex items-center justify-center text-blue-500  text-6xl">
                  <FaUserCircle />
                </div>
                <span className="mt-2 font-semibold text-black">
                  Instructor
                </span>
              </div>

              {/* Text */}
              <div className="text-gray-800 text-sm md:text-base leading-relaxed text-justify max-w-5xl">
                <h3 className="text-xl font-semibold text-black mb-2">
                  Muhammad Nabeel
                </h3>
                <p>
                  Mr. Muhammad Nabeel is a full-stack web developer and has two
                  years of experience in full-stack web development at
                  Pakistan's top-rated software company. In web development, his
                  specialty is HTML, CSS, JS, AJAX, JQuery, AXIES, Bootstrap,
                  React, and SASS. In backend MERN and MEAN Stack development,
                  JS Full Stack (Express.js), Core PHP/Laravel 9.0 development,
                  and many emerging technologies regarding web development. He
                  is also an API developer for Build Restful and works with
                  third-party APIs. His style of teaching is very professional
                  and authentic, and he also motivates his students to be better
                  people in society and future experts in their fields.
                </p>
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
