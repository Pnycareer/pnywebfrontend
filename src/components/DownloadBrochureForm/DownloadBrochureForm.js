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
        className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white/20 transition flex items-center gap-2"
      >
        <FiDownload />
        Download Brochure
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
              className="bg-white text-black rounded-xl p-8 w-full max-w-md space-y-4 shadow-xl"
            >
              <h2 className="text-2xl font-bold">Download Brochure</h2>
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
