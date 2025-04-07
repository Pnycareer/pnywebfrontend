"use client";
import React, { lazy } from "react";
import Image from "next/image";

const OurWorth = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-8 md:px-16 lg:px-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-white backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl">
        {/* Left - Circular Image */}
        <div className="relative flex justify-center items-center">
          <div className="rounded-full border-4 border-blue-400 p-2 relative w-72 h-72 bg-slate-800">
            <Image
              unoptimized={true}
              src="https://www.pnytrainings.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fladymobile.7382ad0a.png&w=640&q=75" // Make sure this file is in /public
              alt="Achievement"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-4 w-5 h-5 bg-red-600 rounded-full animate-ping" />
        </div>

        {/* Right - Text and Stats */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500">
            Our Worth Our Achievements!
          </h2>
          <p className="text-lg text-white/90">
            We’re only just getting started on our journey
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold">100k</h3>
              <p className="text-sm">Alumni</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-sm">Professional Programs</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold">300+</h3>
              <p className="text-sm">Instructor</p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-sm">Mou’s Sign</p>
            </div>
          </div>

          <div>
            <button className="mt-4 w-full bg-blue-500 text-white text-sm py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all">
              Multiple Branches in Pakistan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWorth;
