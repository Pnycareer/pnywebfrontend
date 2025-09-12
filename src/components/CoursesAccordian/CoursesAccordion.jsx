"use client";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import RichTextRenderer from "@/components/RichTextRenderer/RichTextRenderer"; // 👈 use your renderer

const CourseAccordion = ({ faqs = [], title = "Frequently Asked Questions", emptyText = "No FAQs available." }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const isValidFaqs = Array.isArray(faqs) && faqs.length > 0;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-5 px-4">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-5">{title}</h3>

        {!isValidFaqs ? (
          <div className="text-center text-gray-500 text-sm">{emptyText}</div>
        ) : (
          faqs.map((faq, i) => (
            <div
              key={faq._id || i}
              className="bg-white border border-blue-300 mb-1 rounded-xl overflow-hidden shadow-md transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-6 py-4 font-semibold text-blue-800 text-left hover:bg-blue-50 transition-colors duration-300"
              >
                <span>{faq.question}</span>
                <span className="text-lg transition-transform">
                  {openIndex === i ? <FaTimes /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* 👇 your styled HTML renderer (no extra padding to avoid double spacing) */}
                    <div className="px-6 py-4 bg-blue-50">
                      <RichTextRenderer html={faq.answer || ""} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CourseAccordion;
