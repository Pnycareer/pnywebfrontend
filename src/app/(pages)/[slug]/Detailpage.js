"use client";
import { motion } from "framer-motion";
import React from "react";
import useCourseDetail from "@/hooks/useCourseDetail"; // adjust path as needed
import CourseFeature from "@/components/Detailpage/Module";
import Coursedescription from "@/components/Detailpage/Coursedescription";
import InstructorOverview from "@/components/Detailpage/Instructor";
import BenefitsSection from "@/components/Detailpage/Benefits";
import AdmissionSection from "@/components/Detailpage/Admission";

const CourseSection = ({ params }) => {
  const slug = params.slug;
  const { course, loading, error } = useCourseDetail(slug);

  if (error) return <p className="text-red-500 p-10">{error}</p>;
  if (!course) return null;

  const brochurePath = course.Brochure
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.Brochure.replace("\\", "/")}`
    : "";

  return (
    <>
      <section className="relative bg-gradient-to-br from-black via-blue-500/85 to-black text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-xl z-0 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              {course.course_Name}{" "}
              {course.duration && (
                <span className="text-blue-300">({course.duration})</span>
              )}
            </h1>
            <p className="text-white/80 md:text-lg">
              {course.Short_Description}
            </p>

            <div className="text-white font-medium space-y-2 flex gap-4">
              <p>
                <span className="font-bold">Course Fee:</span> Rs{" "}
                {course.Monthly_Fee}
              </p>
              <p>
                <span className="font-bold">Skill Level:</span>{" "}
                {course.Skill_Level}
              </p>
              <p>
                <span className="font-bold">Duration:</span>{" "}
                {course.Duration_Months} - Months
              </p>
            </div>
            {/* 
            <p className="text-white underline cursor-pointer hover:text-blue-300 transition">
              View Schedule | Click here
            </p> */}

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                aria-label="Download the Course Brochure"
                href={brochurePath}
                download // <-- ADD THIS
                target="_blank" // still opens in new tab if browser doesn't auto-download
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white/20 transition flex items-center justify-center"
              >
                Download Course Brochure
              </a>

              <a
                href="https://lms.pnytraining.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 px-6 py-3 rounded-lg shadow-lg hover:bg-red-400 transition text-white max-sm:w-36 max-sm:h-10 cursor-pointer"
                >
                  Enroll Now!
                </motion.button>
              </a>
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
              loading="lazy"
              className="w-full h-full rounded-xl shadow-lg border-4 border-white/20"
              src={
                `https://www.youtube.com/embed/${course?.video_Id}` ||
                "https://www.youtube.com/embed/YOUR_VIDEO_ID"
              }
              title="Course Introduction Video" // <-- good for SEO
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Other Sections */}
      <CourseFeature Modules={course.courseModule} />
      <BenefitsSection />
      <InstructorOverview Instructor={course.Instructor} />
      <Coursedescription coursedesc={course} />
      <AdmissionSection />
    </>
  );
};

export default CourseSection;
