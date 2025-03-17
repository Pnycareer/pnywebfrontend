"use client";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Image from "next/image";
import girl from "@/assets/Illustration/Girl.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import DrizzleEffect from "@/components/effects/Drizzleeffect"; // Importing the drizzle effect

const HeroSection = () => {
  return (
    <section className="w-full">
      {/* Header Section with Motion Drop Effect */}
      <div className="bg-gray-50 text-center py-8 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="text-red-600">PNY</span> Trainings
        </motion.h1>

        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold mt-2"
        >
          Pakistan&apos;s <span className="text-red-600">No.1</span> IT Training
          Institute
        </motion.h2>

        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="mt-2 text-gray-600 max-w-3xl mx-auto"
        >
          Certified Courses with Money Making Skills! Empower Yourself with
          Practical Skills that Open Doors to Lucrative Opportunities.
        </motion.p>
      </div>

      {/* Admissions Section with Drizzle Effect */}
      <div className="relative py-12 px-6 flex flex-col md:flex-row items-center text-center md:text-left bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 overflow-hidden">
        {/* Drizzling Effect */}
        <DrizzleEffect height={400} />

        <div className="md:w-1/2 flex justify-center">
          <Image src={girl} alt="Girl Illustration" unoptimized={true}/>
        </div>
        <div className="md:w-5/6">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
            Admissions are open for the <br className="hidden md:block" /> fresh
            batch. Let’s grow together!
          </h2>
          <div className="flex justify-center">
            <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-gray-100 transition-all">
              Join us now!
            </button>
          </div>
        </div>
        <div className="md:w-2/5">
          <DotLottieReact
            src="https://lottie.host/e953babb-361f-47ea-9b5a-9f2d801ccae6/DSuOSFabak.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
