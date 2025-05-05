"use client";
import { useState, useEffect } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="left-0 w-full" style={{ zIndex: 1000 }}>
      {/* Top Section (Navigation Links) */}
      <div
        className={`transition-all duration-300 px-6 lg:px-12 py-3 text-white text-sm font-medium
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 backdrop-blur-md"
        }
      `}
      >
        <div className="max-w-7xl mx-auto flex justify-center space-x-6">
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="http://www.pnyadvertising.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Digital Services
              </a>
            </li>
            <li>
              <a
                href="https://www.eraflip.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Amazon Services
              </a>
            </li>
            <li>
              <a
                href="https://www.pnygenius.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Kids Courses
              </a>
            </li>
            <li>
              <a
                href="https://www.joinpnypink.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Female Courses
              </a>
            </li>
            <li>
              <Link
                href="/flyers"
                className="hover:text-yellow-400 cursor-pointer"
              >
                E-Flyers
              </Link>
            </li>
            <li>
              <Link
                href="/training-schedule"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Training Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/pny-training-fee-structure"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Fee Structure
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section (Contact & Buttons) */}
      <div className="bg-gradient-to-r from-gray-900/50 via-gray-800 to-gray-900/50 backdrop-blur-md px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white text-sm">
          {/* Left: "Pro Bootcamps 2025" */}
          <Link
            href="/fast-track-pro-bootcamps"
            className="text-yellow-500 font-bold text-sm bg-yellow-900 px-3 py-1 rounded-md"
          >
            Pro Bootcamps 2025
          </Link>

          {/* Center: Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="https://pnyc.pk/"
              target="_blank"
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              PNY Conference
            </a>
            <div className="flex items-center space-x-2">
              <FiPhone /> <span>UAN - 03041111774</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiMail /> <span>info@pnytrainings.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaWhatsapp /> <span>0309-7779401</span>
            </div>
          </div>

          {/* Right: Enroll Now Button */}
          <a
            href="https://lms.pnytraining.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
          >
            Enroll Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {navOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md text-white py-4 space-y-4 px-6 absolute top-full left-0 w-full">
          <ul className="flex flex-col space-y-3 text-sm font-medium">
            <li className="hover:text-yellow-400 cursor-pointer">
              Digital Services
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Amazon Services
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Kids Courses
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Female Courses
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">E-Flyers</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Training Schedule
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Fee Structure
            </li>
          </ul>
          <div className="mt-4 space-y-3 text-sm">
            <button className="bg-green-600 w-full py-2 rounded-md hover:bg-green-700">
              PNY Conference
            </button>
            <div className="flex items-center space-x-2">
              <FiPhone /> <span>UAN - 03041111774</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiMail /> <span>info@pnytrainings.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaWhatsapp /> <span>0309-7779401</span>
            </div>
            <button className="bg-red-600 w-full py-2 text-white rounded-md hover:bg-red-700">
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
