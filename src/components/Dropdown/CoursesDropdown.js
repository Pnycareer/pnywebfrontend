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

  // Fetch categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // Close dropdown when clicking outside
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
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 md:px-10 rounded-md flex items-center space-x-2 hover:from-blue-600 hover:to-indigo-700 transition duration-200"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="font-semibold">Courses</span>
        <motion.div
          animate={{ rotate: dropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CgMenuGridO />
        </motion.div>
      </button>

      {/* Dropdown Menu with Animation */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full -left-8 mt-7 w-56 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-50"
          >
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/courses/${category.url_Slug}`}
                  className="block px-4 py-3 text-gray-800 hover:bg-blue-100 transition duration-200"
                  onClick={() => setDropdownOpen(false)} // Close dropdown when clicked
                >
                  {category.Category_Name}
                </Link>
              ))
            ) : (
              <p className="px-4 py-3 text-gray-600">Loading categories...</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesDropdown;
