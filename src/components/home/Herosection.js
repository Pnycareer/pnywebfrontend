"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import girl from "@/assets/Illustration/Girl.png";

const HeroSection = () => {
  return (
    <section className="w-full">
      {/* Header Section */}
      <div className="bg-gray-50 text-center py-8 px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold"
        >
          <span className="text-green-700">NEXT</span> Trainings
        </motion.h1>

        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold mt-2"
        >
          Celebrating <span className="text-green-700">Independence Day</span>{" "}
          🇵🇰
        </motion.h2>

        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="mt-2 text-gray-700 max-w-3xl mx-auto"
        >
          Learn, earn, and make your country proud — certified IT courses that
          unlock your future.
        </motion.p>
      </div>

      {/* Admissions Section */}
      <div className="relative py-12 px-6 flex flex-col md:flex-row items-center text-center md:text-left bg-gradient-to-r from-green-900 via-green-700 to-white overflow-hidden">
        {/* 🎥 Waving Flag Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
        >
          <source src="/videos/flag.mp4" type="video/mp4" />
        </video>  

        {/* Content Overlay */}
        <div className="relative z-10 md:w-1/2 flex justify-center">
          <Image src={girl} alt="Girl Illustration" unoptimized />
        </div>

        <div className="relative z-10 md:w-5/6">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
            Independence Day Admissions <br className="hidden md:block" />
            are now open! 🇵🇰
          </h2>
          <div className="flex justify-center">
            <button className="mt-6 bg-white text-green-700 px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-gray-100 transition-all">
              Join us now!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
