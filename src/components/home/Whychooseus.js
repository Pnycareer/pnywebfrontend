"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

const benefits = [
  "Money Making Skills",
  "Hands on Experience during Training",
  "Internship & Job Opportunities",
  "On-campus & Online Classes with Recorded Lectures",
  "Highly Experienced Instructors",
  "Professional Learning Environment",
  "Learning Management System",
];

const images = [
  "/whychooseus/1.png",
  "/whychooseus/2.png",
  "/whychooseus/3.png",
  "/whychooseus/4.png",
  "/whychooseus/5.png",
  "/whychooseus/6.png",
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Benefits List */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 relative inline-block">
            Why Choose <span className="text-blue-600">US</span>?
            <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start bg-white shadow-md rounded-lg p-4 gap-3 transition hover:shadow-lg"
              >
                <Check className="text-green-600 mt-1" size={22} />
                <span className="text-base font-medium text-gray-800">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Hexagon Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 relative ${
                index % 2 !== 0 ? "mt-6" : ""
              }`}
            >
              <div className="w-full h-full clip-hexagon overflow-hidden bg-blue-600">
                <Image
                  src={image}
                  alt={`Why Choose Us ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
