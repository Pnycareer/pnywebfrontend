import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const InstructorCard = ({ name, photo, info }) => {

  console.log(photo)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group w-64 p-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      {/* Card Content */}
      <div className="relative flex flex-col items-center text-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
          alt={name}
          width={100}
          height={100}
          style={{objectFit:"cover"}}
          unoptimized={true}
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-900 mt-4">
          {name}
        </h3>
        {/* <p className="text-gray-600 text-sm mt-2">
          {info}
        </p> */}
      </div>
    </motion.div>
  );
};

const InstructorSection = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div className="relative inline-block px-6 py-3 bg-black text-white text-xl font-semibold shadow-lg">
        Meet Your Instructors
      </div>
    </div>
  );
};

export default InstructorCard;
export { InstructorSection };
