"use client";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import HeaderSection from "@/components/HeaderSection/Headersection";
import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";

const Faqs = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState(data[0]);
  const faqRef = useRef(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setTimeout(() => {
      faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <HeaderSection
        pagetitle="FAQs"
        shortdescription="Frequently asked question"
      />

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 p-4">
        {data.map((category) => (
          <div key={category._id} className="flex flex-col items-center">
            <div
              onClick={() => handleCategoryClick(category)}
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
      <h2
        ref={faqRef}
        className="text-3xl font-bold text-center mb-6 scroll-mt-28"
      ></h2>

      {/* ✅ Use your CourseAccordion design for the FAQ list */}
      <CourseAccordion
        faqs={activeCategory.faqs || []}
        title={activeCategory?.category?.name || "FAQs"}
        emptyText={`No FAQs available for ${
          activeCategory?.category?.name || "this category"
        }.`}
      />
    </>
  );
};

export default Faqs;
