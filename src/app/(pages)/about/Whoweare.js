"use client";
import React, { lazy } from "react";
import Image from "next/image";

const Whoweare = () => {
  return (
    <section className="relative w-full px-4 py-16 sm:px-8 md:px-16 lg:px-24 bg-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center glassmorphic shadow-xl rounded-3xl p-8 md:p-12 bg-white/10 backdrop-blur-sm border border-white/20">
        {/* Text Content */}
        <div className="text-black space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Who we are?
          </h2>
          <h3 className="text-2xl text-red-500 font-semibold">
            PNY Trainings: A renowned IT Training institute in Pakistan since
            2014
          </h3>
          <p className="text-lg leading-relaxed text-black">
            Offering professional IT diplomas and short courses for students and
            professionals seeking career growth. As pioneers in comprehensive
            training, we have helped thousands of students secure lucrative jobs
            in the expanding IT industry. With top-level industry experienced
            instructors and multiple branches nationwide, we are committed to
            empowering individuals in their IT journey. Join us today and unlock
            your potential in the world of technology.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-80 md:h-[400px] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
          <Image
            unoptimized={true}
            src="https://www.pnytrainings.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fresponsive.d59cdc6d.png&w=1920&q=75" // Make sure this file is in your /public folder
            alt="PNY Training Award"
            fill
            className="object-cover rounded-xl hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default Whoweare;
