"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// tailwind sizing/hover stays the same
const iconStyle = "w-12 h-12 transition-transform duration-300 hover:scale-110";

// 👉 Put your images in /public/assets and update the filenames if needed
const badges = [
  { src: "/assets/trainerslogo/adobe.png", label: "adobe" },
  { src: "/assets/trainerslogo/autodesk.png", label: "autodesk" },
  { src: "/assets/trainerslogo/google.png", label: "google" },
  { src: "/assets/trainerslogo/nbc.png", label: "nbc" },
];

const TrainerCertification = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleContent = () => setShowMore(!showMore);

  return (
    <section className="w-full bg-gray-100 py-16 px-6">
      <div className="w-full mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Trainers Are Certified From
        </motion.h2>

        {/* Badges Row (images from /public/assets) */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {badges.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-20">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  priority={idx < 3}
                  className="object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              <span className="mt-2 text-sm text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Summary Text */}
        <p className="text-lg text-gray-700  mx-auto  leading-relaxed text-left text-balance">
          {`Pny trainings is the leading IT training hub in Lahore that offers
          various programs helping young career seekers grasp essential IT skills
          and confidently enter the job market.`}
        </p>

        <p className="text-lg text-gray-700 mx-auto mt-4 leading-relaxed text-left text-balance">
          {`With a strong focus on practical expertise, our trainers are
          internationally certified and committed to shaping the future of tech
          talent in Pakistan.`}
        </p>

        {/* Show More Section */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              className="text-lg mt-6 text-gray-700 text-left  mx-auto space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                {`Stand out from the crowd by joining hands with a certified and
                recognized institute. Our short courses at Arfa Tower and other
                branches across Lahore, Rawalpindi, Karachi, Multan, and beyond
                bring cutting-edge skills within your reach.`}
              </p>
              <p>
                {`Whether it's Web Development, Graphic Design, SEO, or Digital
                Marketing — we teach what the industry demands. Our mission is to
                upskill individuals through hands-on training, flexible schedules,
                and expert mentorship.`}
              </p>
              <p>
                {`Take advantage of our online and in-person batches. With flexible
                weekend sessions and online portals, working professionals and
                students can learn at their convenience.`}
              </p>
              <p>
                {`Each course is built around your success. From content quality to
                real-world application — you get everything you need to start
                earning or excel in your job role.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={toggleContent}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default TrainerCertification;
