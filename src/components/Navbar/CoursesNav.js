"use client";
import { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import CoursesDropdown from "@/components/Dropdown/CoursesDropdown";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import pnylogo from "@/assets/logo/Pnylogo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

const CoursesNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Close search bar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Fetch courses for search
  useEffect(() => {
    if (!searchOpen) return;
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`
        );
        const result = await res.json();
        const allCourses = result.data.flatMap((cat) => cat.courses || []);
        setCourses(allCourses);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchCourses();
  }, [searchOpen]);

  const filteredCourses = courses.filter((course) =>
    course.course_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (slug) => {
    setIsLoading(true);
    setSearchOpen(false);
    setTimeout(() => {
      window.location.href = slug;
    }, 800);
  };

  return (
    <header className="w-full bg-gray-100 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={pnylogo}
              alt="PNY Trainings"
              width={80}
              height={80}
              unoptimized
            />
          </Link>
          <CoursesDropdown />
          <button
            className="text-xl md:block hidden text-gray-600 hover:text-yellow-400"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <AiOutlineSearch />
          </button>
        </div>

        {/* Right (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.li
                whileHover={{ scale: 1.1, color: "#facc15" }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                {link.label}
              </motion.li>
            </Link>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/30 shadow-xl p-4 flex justify-center items-center z-40"
          >
            <div className="relative w-11/12 md:w-3/5">
              <input
                type="text"
                placeholder="Search the skills you want to learn"
                className="w-full px-6 py-3 rounded-lg bg-white/40 text-black backdrop-blur-md border border-white/30 shadow-md outline-none placeholder-gray-700"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(e.target.value.length > 0);
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-3 text-xl text-gray-700 hover:text-red-500"
              >
                <IoClose />
              </button>
            </div>

            {searchQuery && filteredCourses.length > 0 && (
              <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                <ul className="space-y-2 p-4">
                  {filteredCourses.map((course) => (
                    <li
                      key={course._id}
                      className="cursor-pointer hover:bg-yellow-200 p-2 rounded-md"
                      onClick={() => handleCourseClick(course.url_Slug)}
                    >
                      {course.course_Name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {/* Mobile Menu with Fold Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, opacity: 1, transformOrigin: "top" }}
            exit={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-gray-900/90 backdrop-blur-md text-white py-4 space-y-4 px-6 absolute top-full left-0 w-full z-40 origin-top"
          >
            {/* Mobile Search Input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search the skills you want to learn"
                className="px-4 py-2 w-full border rounded-md outline-none text-white bg-gray-700"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(e.target.value.length > 0);
                }}
              />

              {/* Filtered Course Dropdown */}
              {searchQuery && filteredCourses.length > 0 && (
                <div className="mt-2 max-h-60 overflow-y-auto bg-white text-black border rounded-lg shadow-lg z-10">
                  <ul className="space-y-2 p-4">
                    {filteredCourses.map((course) => (
                      <li
                        key={course._id}
                        className="cursor-pointer hover:bg-yellow-200 p-2 rounded-md"
                        onClick={() => handleCourseClick(course.url_Slug)}
                      >
                        {course.course_Name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col space-y-3 text-sm font-medium pt-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <li className="hover:text-yellow-400 cursor-pointer">
                    {link.label}
                  </li>
                </Link>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CoursesNav;
