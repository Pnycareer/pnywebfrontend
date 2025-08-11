"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import CoursesDropdown from "@/components/Dropdown/CoursesDropdown";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import pnylogo from "@/assets/logo/Pnylogo.png";
import axiosInstance from "@/utils/axiosInstance"; // ← use your custom instance

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

  // Fetch courses for search (axios + cancellation)
  useEffect(() => {
    if (!searchOpen) return;

    const controller = new AbortController();

    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/courses/get-course", {
          signal: controller.signal,
        });

        // shape: { success, data: [{ courses: [...] }, ...] }
        const payload = res?.data;
        const list = (payload?.data ?? []).flatMap((cat) => cat.courses || []);
        setCourses(list);
      } catch (err) {
        if (err.name !== "CanceledError" && err.message !== "canceled") {
          console.error("Fetch failed:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
    return () => controller.abort();
  }, [searchOpen]);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) =>
      (c?.course_Name || "").toLowerCase().includes(q)
    );
  }, [searchQuery, courses]);

  return (
    <header className="w-full bg-gray-100 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src={pnylogo}
              alt="Next cms"
              width={80}
              height={80}
              unoptimized
            />
          </Link>
          <CoursesDropdown />
          <button
            className="text-xl md:block hidden text-gray-600 hover:text-yellow-400"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
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
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Results */}
              {searchQuery && (
                <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                  {isLoading ? (
                    <div className="p-4 text-sm text-gray-500">Loading…</div>
                  ) : filteredCourses.length > 0 ? (
                    <ul className="space-y-2 p-4">
                      {filteredCourses.map((course) => (
                        <Link
                          key={course._id}
                          href={`/${course.url_Slug}`}
                          onClick={() => setSearchOpen(false)}
                        >
                          <li className="cursor-pointer hover:bg-yellow-200 p-2 rounded-md">
                            {course.course_Name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-sm text-gray-500">
                      No matches. Try another keyword.
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CoursesNav;
