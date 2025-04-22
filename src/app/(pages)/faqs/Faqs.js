"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Faqs = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(data[0]);

  return (
    <>
      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {data.map((category) => (
          <div key={category._id} className="flex flex-col items-center">
            <div
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer bg-white border hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden w-full p-2 ${
                activeCategory._id === category._id
                  ? "shadow-lg border-blue-500"
                  : ""
              }`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${category.category.category_image}`}
                alt={category.category.name}
                width={400}
                height={250}
                unoptimized
                className="w-full h-56 object-cover"
              />
            </div>
            <h3 className="text-blue-600 font-semibold text-lg mt-2 text-center">
              {category.category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        {activeCategory.category.name}
      </h2>

      {/* FAQ List */}
      <div className="space-y-4">
        {activeCategory.faqs.map((faq) => (
          <FaqItem key={faq._id} faq={faq} />
        ))}
      </div>
    </>
  );
};

const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left"
      >
        <span className="text-lg font-medium text-gray-800">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t"
          >
            <div className="p-4 text-gray-700">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Faqs;
