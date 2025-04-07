"use client";
import React, { lazy } from "react";
import Image from "next/image";

const CeoMessage = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-8 md:px-16 lg:px-24 bg-gray-200 text-black">
      {/* Header */}
      <h2 className="text-3xl md:text-3xl font-bold text-center leading-snug mb-12">
        Wahab Yunus, as the CEO of PNY Trainings, is <br />
        unlocking the potential in youth to be victorious.
      </h2>

      {/* Content Box */}
      <div className="max-w-7xl mx-auto bg-slate-900 text-white/90 rounded-2xl shadow-xl grid md:grid-cols-2 gap-8 p-6 md:p-12 items-center relative overflow-hidden">
        {/* Text Section */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            CEO Message
          </h3>
          <p className="text-sm md:text-base leading-relaxed">
            Diversity and inclusion of thought, skill, knowledge, and culture
            make PNY Trainings more competitive, more resilient, and better.
            Diversity strengthens us by promoting unique viewpoints and
            challenging each of us, every day, to think beyond our traditional
            frames of reference. We are committed to building a talented and
            diverse workforce, and to creating an environment in which every
            STUDENT has the opportunity to excel based on his or her
            performance. We believe the best way to learn is by putting your
            skills to use. I warmly welcome you to visit by contacting us, and
            discover firsthand what makes PNY Trainings special.
          </p>
          <p className="font-semibold text-white mt-4">
            Wahab Yunus (CEO PNY Trainings)
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-80 md:h-[400px]">
          <Image
            unoptimized={true}
            src="https://www.pnytrainings.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FWahab-Yunuspng.eed67ec8.png&w=1200&q=75" // Move your image to the public folder
            alt="CEO Wahab Yunus"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
