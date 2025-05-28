"use client";
import React, { lazy } from "react";
import Image from "next/image";

const VisionMission = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Vision + Mission */}
        <div className="flex flex-col gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-sm md:text-base">
              Our vision is to build a world where every young individual has
              the skills and knowledge to thrive in the digital age. We aim to
              be a catalyst for global innovation and socio-economic
              development.
            </p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-sm md:text-base">
              Our mission is to empower youth through accessible, high-quality
              digital training and courses. We strive to foster lifelong
              learning, inspire innovation, and create opportunities for
              personal and professional growth.
            </p>
          </div>
        </div>

        {/* Right Side: Image with text */}
        <div className="relative">
          <div className="relative w-full h-[450px]">
            <Image
              unoptimized={true}
              src="https://www.pnytrainings.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnoun-pakistan-264183%201.dea9c651.jpg&w=3840&q=75" // Make sure to move this image to your /public folder
              alt="Digital Pakistan"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-6 space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
              Next cms Empowers{" "}
              <span className="bg-red-500 text-white px-2 py-1 rounded-md">
                100K+
              </span>
            </h2>
            <p className="text-lg font-medium text-slate-700">
              Students Nationwide with Tech Education
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-4">
              OUR Mission Digital Pakistan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
