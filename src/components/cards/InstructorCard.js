"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const InstructorCard = ({ name, photo, otherInfo }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="relative group w-64 p-6 bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setModalOpen(true)}
      onMouseLeave={() => setModalOpen(false)}
    >
      {/* Card Content */}
      <div className="relative flex flex-col items-center text-center z-10">
        <Image
          src={photo}
          alt={name}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          unoptimized={true}
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-900 mt-4">
          {name}
        </h3>
      </div>

      {/* Hover Modal Glass UI */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 bg-white/30 backdrop-blur-md text-gray-900 rounded-2xl shadow-xl ring-1 ring-white/40 z-20"
          >
            <p className="text-sm md:text-sm leading-relaxed max-h-full overflow-y-auto">
              {otherInfo || "No additional information available."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructorCard;
