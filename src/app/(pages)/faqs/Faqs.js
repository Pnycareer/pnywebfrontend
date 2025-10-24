"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import HeaderSection from "@/components/HeaderSection/Headersection";
import CourseAccordion from "@/components/CoursesAccordian/CoursesAccordion";


export default function Faqs({ data = [] }) {
  const safeData = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  const [activeCategory, setActiveCategory] = useState(safeData[0] || null);
  const faqRef = useRef(null);

  useEffect(() => {
    if (!activeCategory && safeData.length) setActiveCategory(safeData[0]);
  }, [safeData, activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // smooth jump to accordion
    setTimeout(() => {
      faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      <HeaderSection pagetitle="FAQs" shortdescription="Frequently Asked Questions" />

      {/* CATEGORY GRID */}
      <section className="mb-10 px-2 py-2">
        <div className="mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {safeData.map((category) => {
              const isActive = activeCategory?._id === category._id;
              const imgSrc = `${process.env.NEXT_PUBLIC_API_URL}/${category?.category?.category_image || ""}`;
              const title = category?.category?.name || "Category";

              return (
                <motion.button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={[
                    "group relative isolate overflow-hidden rounded-2xl border bg-white transition-all",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                    isActive
                      ? "ring-2 ring-blue-500 border-blue-500 shadow-md"
                      : "hover:shadow-md border-neutral-200",
                    // keep card COMPACT
                    "w-full max-w-[300px] mx-auto"
                  ].join(" ")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* image box with fixed aspect so every card is same height */}
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-neutral-50 to-neutral-100">
                    <Image
                      src={imgSrc}
                      alt={title}
                      fill
                      unoptimized
                      className="object-contain p-4"
                      sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    />
                    {/* subtle hover shine */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -left-20 top-0 h-full w-1/2 rotate-12 bg-white/20 blur-2xl"></div>
                    </div>
                  </div>

                  {/* title bar */}
                  <div
                    className={[
                      "w-full text-center px-3 py-3 text-sm sm:text-base font-semibold",
                      isActive ? "text-blue-700" : "text-blue-600 group-hover:text-blue-700"
                    ].join(" ")}
                  >
                    {title}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION TITLE (optional) */}
      <h2
        ref={faqRef}
        className="sr-only"
      >
        {activeCategory?.category?.name || "FAQs"}
      </h2>

      {/* FAQ LIST */}
      <section className="px-4 pb-14">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory?._id || "none"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <CourseAccordion
                faqs={activeCategory?.faqs || []}
                title={activeCategory?.category?.name || "FAQs"}
                emptyText={`No FAQs available for ${
                  activeCategory?.category?.name || "this category"
                }.`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
