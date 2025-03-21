"use client";
import { motion } from "framer-motion";
import BenefitsSection from "./Benefits";
import React from "react";

const CourseSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br from-black via-blue-500 to-black text-white py-16 px-6 md:px-12 lg:px-20 -z-50">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-xl"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 z-10"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Certified Full Stack Web Development with{" "}
              <span className="text-blue-300">Advanced AI</span> (6 months)
            </h2>
            <p className="text-white/80 text-lg">
              Elevate your web development career with our Full-Stack Web
              Developer Master’s Program. Gain expertise in JavaScript front-end
              & back-end technologies with the powerful MEAN Stack.
            </p>

            <div className="text-white font-medium space-y-2">
              <p>
                <span className="font-bold">Course Fee:</span> Rs 85000
              </p>
              <p>
                <span className="font-bold">Skill Level:</span> Advanced
              </p>
              <p>
                <span className="font-bold">Duration:</span> 6 Months
              </p>
            </div>

            <p className="text-blue-400 underline cursor-pointer hover:text-blue-300 transition">
              View Schedule | Click here
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white/20 transition"
              >
                Download Course Brochure
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 px-6 py-3 rounded-lg shadow-lg hover:bg-red-400 transition"
              >
                Enroll Now
              </motion.button>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-56 md:h-64 lg:h-80"
          >
            <iframe
              className="w-full h-full rounded-xl shadow-lg border-4 border-white/20"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>
      <BenefitsSection/>
    </>
  );
};

export default CourseSection;
