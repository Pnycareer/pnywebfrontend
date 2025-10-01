"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DownloadBrochureForm from "@/components/DownloadBrochureForm/DownloadBrochureForm";
import { MessageCircle } from "lucide-react"; // lucide-react WhatsApp-ish icon

export default function CourseHero({ course, brochurePath }) {
  if (!course) return null;

  const videoId = course.video_Id;

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-500/85 to-black text-white py-16 px-6 md:px-12 lg:px-20">
      {/* overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-xl z-0 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            {course.course_Name}
          </h1>

          {course.Short_Description && (
            <div
              className="text-white/80 md:text-lg"
              dangerouslySetInnerHTML={{ __html: course.Short_Description }}
            />
          )}

          <div className="text-white font-medium space-y-2 flex gap-4 flex-wrap">
            {course.Monthly_Fee && (
              <p>
                <span className="font-bold">Course Fee:</span> Rs{" "}
                {course.Monthly_Fee.toLocaleString("en-IN")}
              </p>
            )}
            {course.Skill_Level && (
              <p>
                <span className="font-bold">Skill Level:</span>{" "}
                {course.Skill_Level}
              </p>
            )}
            {course.Duration_Months && (
              <p>
                <span className="font-bold">Duration:</span>{" "}
                {course.Duration_Months} Months
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {course.Brochure && (
              <DownloadBrochureForm
                brochureUrl={brochurePath}
                courseName={course.course_Name}
              />
            )}

            {course.category === "academia" ? (
              <a
                href="https://wa.me/+923101111774"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-lg shadow-lg hover:bg-green-400 transition text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </motion.button>
              </a>
            ) : (
              <a
                href="https://lms.pnytraining.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 px-6 py-3 rounded-lg shadow-lg hover:bg-red-400 transition text-white"
                >
                  Enroll Now!
                </motion.button>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Side: YouTube Video OR Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {videoId ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white/20">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="relative w-full">
              <Image
                unoptimized
                src={`${
                  process.env.NEXT_PUBLIC_API_URL
                }/${course.course_Image.replace(/\\/g, "/")}`}
                alt={course.course_Name}
                width={1200}
                height={600}
                layout="responsive"
                className="object-contain rounded-xl shadow-lg border-4 border-white/20"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
