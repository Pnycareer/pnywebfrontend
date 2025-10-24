"use client";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import RichTextRenderer from "@/components/RichTextRenderer/RichTextRenderer"; // shared rich text renderer

const CourseAccordion = ({ faqs = [], title = "Frequently Asked Questions", emptyText = "No FAQs available." }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const isValidFaqs = Array.isArray(faqs) && faqs.length > 0;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 px-4 py-10 shadow-xl shadow-slate-200/60">
      <div
        className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] -z-10 opacity-60 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,165,233,0.28), rgba(56,189,248,0.22), rgba(45,212,191,0.18), rgba(16,185,129,0.12), transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-40 h-[600px] w-[600px] -z-10 opacity-50 blur-3xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(125,211,252,0.26), rgba(56,189,248,0.18), rgba(34,197,94,0.14), rgba(74,222,128,0.1), transparent)",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            FAQ
          </span>
          <h3 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h3>
        </div>

        {!isValidFaqs ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 p-6 text-center text-sm text-slate-500">
            {emptyText}
          </div>
        ) : (
          faqs.map((faq, i) => (
            <div
              key={faq._id || i}
              className="relative mb-3 overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 transition-colors duration-300 hover:bg-sky-50/80"
              >
                <span className="flex-1">{faq.question}</span>
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 transition-transform duration-300 ${
                    openIndex === i ? "rotate-90" : ""
                  }`}
                >
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
                    {/* render answer markup without extra wrapper spacing */}
                    <div className="bg-slate-50/80 px-6 py-5 text-sm text-slate-700">
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
