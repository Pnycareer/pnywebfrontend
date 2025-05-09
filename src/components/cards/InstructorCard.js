"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const InstructorCard = ({ name, photo, otherInfo }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div 
            className="relative group w-64 p-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl" 
            onMouseEnter={() => setModalOpen(true)} 
            onMouseLeave={() => setModalOpen(false)}
        >
            {/* Card Content */}
            <div className="relative flex flex-col items-center text-center">
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

            {/* Modal for Other Info */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white flex items-center justify-center p-4 rounded-lg overflow-y-auto"
                    >
                        <p className="text-center text-sm md:text-base leading-relaxed max-h-full overflow-y-auto">
                            {otherInfo || "No additional information available."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InstructorCard;