"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import CoursesDropdown from "@/components/Dropdown/CoursesDropdown";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import pnylogo from '@/assets/logo/Pnylogo.png'

const CoursesNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full bg-gradient-to-r from-gray-900/50 via-gray-800 to-gray-900 backdrop-blur-md">
      <div className="mx-auto flex justify-between items-center px-6 lg:px-12 py-4">
        {/* Left: Logo, Courses Dropdown, Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={pnylogo}
              alt="PNY Trainings"
              width={80}
              height={80}
              unoptimized={true}
            />
          </Link>

          {/* Courses Dropdown */}
          <CoursesDropdown />

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search the skills you want to learn"
            className="px-4 py-2 w-80 border rounded-md outline-none text-white hidden md:block"
          />
        </div>

        {/* Right: Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <Link href="/about">
            <motion.li
              whileHover={{ scale: 1.1, color: "#facc15" }} // Smooth hover effect
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              About
            </motion.li>
          </Link>
          <li className="hover:text-yellow-400 cursor-pointer">Blog</li>
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md text-white py-4 space-y-4 px-6 absolute top-full left-0 w-full">
          {/* Search Bar (Visible in Mobile) */}
          <input
            type="text"
            placeholder="Search the skills you want to learn"
            className="px-4 py-2 w-full border rounded-md outline-none text-white"
          />

          {/* Navigation Links */}
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
