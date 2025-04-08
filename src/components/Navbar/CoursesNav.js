"use client";
import { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import CoursesDropdown from "@/components/Dropdown/CoursesDropdown";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import pnylogo from "@/assets/logo/Pnylogo.png";

const CoursesNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const searchRef = useRef(null);

  // Close search when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  // Fetch the courses data when the search bar is open
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/get-course`
      );
      const data = await response.json();
      setCourses(data);
    };

    if (searchOpen) {
      fetchCourses();
    }
  }, [searchOpen]);

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.course_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle course click
  const handleCourseClick = (slug) => {
    setIsLoading(true); // Show the loader
    setSearchOpen(false); // Close the search dropdown

    // Add a small delay before redirecting to the course page
    setTimeout(() => {
      window.location.href = slug; // Redirect to the course URL
    }, 1000); // Wait 1 second before redirecting to simulate loader
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchOpen(e.target.value.length > 0); // Show dropdown if search query is not empty
  };

  return (
    <header
      className="w-full bg-gray-100 backdrop-blur-md sticky top-[104px]"
      style={{ zIndex: 1000 }}
    >
      <div className="mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
        {/* Left: Logo, Courses Dropdown, Search Icon */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={pnylogo}
              alt="PNY Trainings"
              width={80}
              height={80}
              unoptimized={true}
            />
          </Link>

          <CoursesDropdown />

          {/* Search Icon */}
          <button
            className="text-xl md:block hidden text-gray-600 hover:text-yellow-400"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <AiOutlineSearch />
          </button>
        </div>

        {/* Right: Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-black font-medium">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <Link href="/about">
            <motion.li
              whileHover={{ scale: 1.1, color: "#facc15" }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              About
            </motion.li>
          </Link>
          <Link href="/blog" className="hover:text-yellow-400 cursor-pointer">Blog</Link>
          <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Search Bar (Dropdown from top) */}
      {searchOpen && (
        <motion.div
          ref={searchRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/30 shadow-xl p-4 flex justify-center items-center"
        >
          <div className="relative w-11/12 md:w-3/5">
            <input
              type="text"
              placeholder="Search the skills you want to learn"
              className="w-full px-6 py-3 rounded-lg bg-white/40 text-black backdrop-blur-md border border-white/30 shadow-md outline-none placeholder-gray-700"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-3 top-3 text-xl text-gray-700 hover:text-red-500"
            >
              <IoClose />
            </button>
          </div>

          {/* Dropdown showing filtered courses */}
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

      {/* Loader when course is clicked */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="text-white text-2xl">Loading...</div>{" "}
          {/* You can replace this with a spinner */}
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md text-white py-4 space-y-4 px-6 absolute top-full left-0 w-full">
          <input
            type="text"
            placeholder="Search the skills you want to learn"
            className="px-4 py-2 w-full border rounded-md outline-none text-white bg-gray-700"
          />
          <ul className="flex flex-col space-y-3 text-sm font-medium">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
            <li className="hover:text-yellow-400 cursor-pointer">Blog</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default CoursesNav;
