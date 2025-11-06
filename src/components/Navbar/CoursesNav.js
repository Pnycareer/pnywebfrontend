"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import CoursesDropdown from "@/components/Dropdown/CoursesDropdown";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import pnylogo from "@/assets/logo/Pnylogo.png";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter, usePathname } from "next/navigation"; // ðŸ‘ˆ add usePathname
import { Button } from "@headlessui/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
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
  const router = useRouter();
  const pathname = usePathname(); // ðŸ‘ˆ current route

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Close mobile menu on route change (App Router way)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Fetch courses when search opens
  useEffect(() => {
    if (!searchOpen) return;
    const controller = new AbortController();
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/courses/get-course", {
          signal: controller.signal,
        });
        const list = (res?.data?.data ?? []).flatMap((cat) => cat.courses || []);
        setCourses(list);
      } catch (err) {
        if (err.name !== "CanceledError" && err.message !== "canceled") {
          console.error("Failed to fetch courses:", err);
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
    return courses.filter((c) => (c?.course_Name || "").toLowerCase().includes(q));
  }, [searchQuery, courses]);

  // ðŸ‘‡ handle clicks so same-route clicks also scroll to top
  const handleNavClick = (href) => (e) => {
    if (pathname === href) {
      // same page â€” prevent a no-op push and just scroll
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setMenuOpen(false);
      setSearchOpen(false);
    }
    // else: let Next.js navigate; it auto-scrolls to top by default
  };

  return (
    <header className="w-full bg-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
        {/* Left: Logo & Courses */}
        <div className="flex items-center gap-4">
          <Link href="/" onClick={handleNavClick("/")} scroll>
            <Image
              src={pnylogo}
              alt="PNY Logo"
              width={80}
              height={80}
              unoptimized
              priority
            />
          </Link>

          <CoursesDropdown />

          <Link
            href='/corporate'
            onClick={handleNavClick("/corporate")}
            scroll
            className="hidden md:inline-flex"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 md:px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg backdrop-blur-md transition duration-200 hover:from-blue-600 hover:to-indigo-700"
            >
              Corporate Trainings
            </motion.span>
          </Link>
          <Link
            href='/academia'
            onClick={handleNavClick("/academia")}
            scroll
            className="hidden md:inline-flex"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 md:px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg backdrop-blur-md transition duration-200 hover:from-blue-600 hover:to-indigo-700"
            >
              PNY Academia
            </motion.span>
          </Link>

          <button
            className="text-xl text-gray-600 hover:text-yellow-400"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            <AiOutlineSearch />
          </button>
        </div>

        {/* Right: Nav Links (desktop) */}
        <ul className="hidden md:flex gap-6 text-black font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick(link.href)} // ðŸ‘ˆ here
              scroll
            >
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col bg-white px-6 py-4 space-y-4 shadow-md"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick(link.href)} // ðŸ‘ˆ same fix on mobile
                scroll
              >
                <motion.li
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-900 hover:text-yellow-400 text-base font-medium"
                >
                  {link.label}
                </motion.li>
              </Link>
            ))}

            <Link
              href="/academia"
              onClick={handleNavClick("/academia")}
              scroll
            >
              <motion.li
                whileTap={{ scale: 0.95 }}
                className="text-white text-center text-base font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl py-3 shadow-lg backdrop-blur-md hover:from-blue-600 hover:to-indigo-700 transition duration-200"
              >
                PNY Academia
              </motion.li>
            </Link>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/80 shadow-xl p-4 flex justify-center items-center z-60"
          >
            <div className="relative w-11/12 md:w-3/5">
              <input
                type="text"
                placeholder="Search the skills you want to learn"
                className="w-full px-6 py-3 rounded-lg bg-white text-black border border-gray-300 shadow-md outline-none placeholder-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {searchQuery && (
                <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                  {isLoading ? (
                    <div className="p-4 text-sm text-gray-500">Loadingâ€¦</div>
                  ) : filteredCourses.length > 0 ? (
                    <ul className="space-y-2 p-4">
                      {filteredCourses.map((course) => (
                        <Link
                          key={course._id}
                          href={`/${course.url_Slug}`}
                          onClick={() => setSearchOpen(false)}
                          scroll
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

