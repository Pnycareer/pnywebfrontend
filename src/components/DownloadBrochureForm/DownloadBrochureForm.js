"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";

const DownloadBrochureForm = ({ brochureUrl , courseName  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    courseName: courseName || "", // prefill course name
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    // Optionally trigger download
    window.open(brochureUrl, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-orange-500/30 transition duration-200 hover:-translate-y-[1px] hover:shadow-orange-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
      >
        <FiDownload className="text-slate-900" />
        Download Course Outline
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white text-black rounded-2xl p-8 w-full max-w-md space-y-5 shadow-2xl shadow-slate-900/15"
            >
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-4 shadow-inner">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-indigo-600 shadow-sm">
                    <FiDownload className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                      Limited offer
                    </p>
                    <h2 className="text-2xl font-bold leading-tight text-slate-900">
                      Fill the form & get 30% OFF - limited seats!
                    </h2>
                    <p className="text-sm text-slate-600">
                      Share your details to instantly receive the full course outline.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                  >
                    Submit & Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadBrochureForm;
