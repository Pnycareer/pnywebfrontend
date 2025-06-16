"use client";
import { useState, useEffect, memo } from "react";
import Branches from "./Branches";
import CityCourses from "./Citycourses";
import Copyrights from "./Copyrights";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/Pnylogo.png";
import axios from "@/utils/axiosInstance"; // Make sure this points to your setup

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [randomCourses, setRandomCourses] = useState([]);



useEffect(() => {
  // Fetching categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/v1/categories");

      const visibleCategories = res.data.filter(
        (category) => category.viewonweb
      );
      setCategories(visibleCategories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Fetching random courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("/courses/get-course");

      const courseData = res.data;
      if (courseData?.success && courseData.data.length > 0) {
        const allCourses = courseData.data.flatMap((category) =>
          category.courses.filter((course) => course.View_On_Web)
        );

        setRandomCourses(
          allCourses.sort(() => 0.5 - Math.random()).slice(0, 5)
        );
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  fetchCategories();
  fetchCourses();
}, []);



  return (
    <footer className="bg-grey-200 text-black py-10 px-5 md:px-20 min-h-[400px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Head Office */}
        <div>
          <Image
            src={logo}
            width={100}
            height={56}
            alt="Next cms Logo"
            className="mb-4 object-contain"
            priority={true}
          />
          <h3 className="text-lg font-bold">Head Office</h3>
          <address className="text-sm not-italic">
            Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur
            Road, Lahore, Pakistan
          </address>
          <p className="text-sm mt-2">
            Phone: <a href="tel:+923041111774">03041111774</a> <br />
            Whatsapp: <a href="https://wa.me/923097779401">0309-7779401</a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "FAQs", link: "/faqs" },
              { name: "News", link: "/news" },
              {
                name: "Admission",
                link: "https://lms.pnytraining.com/",
                external: true,
              },
              { name: "Gallery", link: "/gallery" },
              { name: "Terms & Conditions", link: "/terms-conditions" },
              { name: "Privacy Policy", link: "/privacy-policy" },
              {
                name: "Best Institute in Lahore",
                link: "/best-online-it-institute-in-lahore",
              },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  prefetch={!item.external}
                  target={item.external ? "_blank" : "_self"}
                  className="hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses Offered */}
        <div>
          <h3 className="text-lg font-bold mb-4">Courses Offered</h3>
          <ul className="space-y-2 text-sm">
            {randomCourses.length > 0 ? (
              randomCourses.map((course) => (
                <li key={course._id}>
                  <Link
                    href={`/${course.url_Slug}`}
                    prefetch={false}
                    className="hover:underline"
                  >
                    {course.course_Name}
                  </Link>
                </li>
              ))
            ) : (
              <li>Loading courses...</li>
            )}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-bold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/courses/${category.url_Slug}`}
                    prefetch={false}
                    className="hover:underline"
                  >
                    {category.Category_Name}
                  </Link>
                </li>
              ))
            ) : (
              <li>Loading categories...</li>
            )}
          </ul>
        </div>

        {/* Short Courses */}
        <div>
          <h3 className="text-lg font-bold mb-4">Short Courses</h3>
          <ul className="space-y-2 text-sm">
            {[
              "lahore",
              "rawalpindi",
              "karachi",
              "faisalabad",
              "gujranwala",
              "multan",
              "sialkot",
              "azad-kashmir",
            ].map((city) => (
              <li key={city}>
                <Link
                  href={`/short-courses-in-${city}`}
                  prefetch={false}
                  className="hover:underline"
                >
                  Short courses in{" "}
                  {city
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Branches />
      <CityCourses />
      <Copyrights />
    </footer>
  );
};

export default memo(Footer);
