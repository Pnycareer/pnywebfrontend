"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fetchCategories } from "@/hooks/api";
import { motion, AnimatePresence } from "framer-motion";
import { CgMenuGridO } from "react-icons/cg";

const CoursesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();

      const filteredAndSorted = data
        .filter((cat) => cat.viewonweb) // Only show those marked true
        .sort((a, b) => parseInt(a.position) - parseInt(b.position)); // Sort by position

      setCategories(filteredAndSorted);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 md:px-6 rounded-xl flex items-center space-x-2 hover:from-blue-600 hover:to-indigo-700 transition duration-200 shadow-lg backdrop-blur-md"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="font-semibold">Courses</span>
        <motion.div
          animate={{ rotate: dropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CgMenuGridO size={18} />
        </motion.div>
      </button>

      {/* Full-width animated dropdown */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-20 left-0 w-full px-4 md:px-10"
          >
            <div className="backdrop-blur-xl bg-white border border-white/20 shadow-2xl rounded-3xl p-6 max-h-[70vh] overflow-y-auto mx-auto w-full md:w-[80%]">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Browse Courses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/courses/${category.url_Slug}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 bg-white/40 text-gray-900 p-4 rounded-xl hover:bg-white/60 hover:text-blue-700 transition duration-300 shadow-sm"
                    >
                      <i className={`${category.Icon} text-lg`}></i>
                      <span>{category.Category_Name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600">Loading categories...</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesDropdown;
