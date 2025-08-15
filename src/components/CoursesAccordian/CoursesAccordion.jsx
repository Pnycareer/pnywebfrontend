import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const CourseAccordion = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isValidFaqs = Array.isArray(faqs) && faqs.length > 0;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Frequently Asked Questions
        </h2>

        {!isValidFaqs ? (
          <div className="text-center text-gray-500 text-sm">
            No FAQs available for this course.
          </div>
        ) : (
          faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-blue-300 mb-4 rounded-xl overflow-hidden shadow-md transition-all"
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
                    <div className="px-6 py-4 text-gray-700 text-sm bg-blue-50 leading-relaxed">
                      {faq.answer}
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
