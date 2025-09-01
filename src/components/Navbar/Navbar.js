"use client";
import { useState, useEffect } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "Digital Services",
    href: "http://www.pnyadvertising.com/",
    external: true,
  },
  {
    label: "Gaming Courses",
    href: "https://www.eraflip.com/",
    external: true,
  },
  { label: "Kids Courses", href: "https://www.pnygenius.com/", external: true },
  {
    label: "Female Courses",
    href: "https://www.joinpnypink.com/",
    external: true,
  },
  { label: "E-Flyers", href: "/flyers", external: false },
  { label: "Training Schedule", href: "/training-schedule", external: false },
  {
    label: "Fee Structure",
    href: "/pny-training-fee-structure",
    external: false,
  },
];

const contactInfo = [
  { icon: <FiPhone />, text: "UAN +92 304-1111774" },
  { icon: <FiMail />, text: "info@pnytrainings.com" },
  { icon: <FaWhatsapp />, text: "+92 309-7779401" },
];

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

  const renderLinks = (isMobile = false) => (
    <ul className={`flex ${isMobile ? "flex-col space-y-3" : "space-x-6"}`}>
      {navLinks.map((link, idx) =>
        link.external ? (
          <li key={idx}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ) : (
          <li key={idx}>
            <Link
              href={link.href}
              className="hover:text-yellow-400 cursor-pointer"
            >
              {link.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );

  return (
    <nav className="left-0 w-full" style={{ zIndex: 1000 }}>
      {/* Top Section */}
      <div
        className={`transition-all duration-300 px-6 lg:px-12 py-3 text-white text-sm font-medium ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="hidden md:flex">{renderLinks()}</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-r from-gray-900/50 via-gray-800 to-gray-900/50 backdrop-blur-md px-6 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white text-sm">
          {/* Left: Bootcamp Button */}
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
            {contactInfo.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                {item.icon} <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Right: Enroll Button */}
          <a
            href="https://lms.pnytraining.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
          >
            Enroll Now
          </a>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white text-2xl ml-4"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1, opacity: 1, transformOrigin: "top" }}
            exit={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-gray-900/90 backdrop-blur-md text-white py-4 space-y-4 px-6 relative top-full left-0 w-full z-50 origin-top"
          >
            {renderLinks(true)}
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="https://pnyc.pk/"
                target="_blank"
                className="block bg-green-600 w-full py-2 rounded-md text-center hover:bg-green-700"
              >
                PNY Conference
              </a>
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  {item.icon} <span>{item.text}</span>
                </div>
              ))}
              <a
                href="https://lms.pnytraining.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-red-600 w-full py-2 text-white text-center rounded-md hover:bg-red-700"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
