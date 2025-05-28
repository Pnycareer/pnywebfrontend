"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Globe,
  Award,
  Building,
  GraduationCap,
  Users,
  BookOpen,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: <Globe size={40} className="text-blue-500" />,
    title: "International Collaborations",
  },
  {
    icon: <Award size={40} className="text-blue-500" />,
    title: "Awarded by USA Education 2.0",
  },
  {
    icon: <Building size={40} className="text-blue-500" />,
    title: "Multiple Branches in Pakistan",
  },
  {
    icon: <GraduationCap size={40} className="text-blue-500" />,
    title: "Affiliated with Govt. (PSDA & PBTE)",
  },
  { icon: <Users size={40} className="text-blue-500" />, title: "100K Alumni" },
  {
    icon: <BookOpen size={40} className="text-blue-500" />,
    title: "100+ Professional Programs",
  },
  {
    icon: <Users size={40} className="text-blue-500" />,
    title: "300+ Instructors",
  },
  {
    icon: <Handshake size={40} className="text-blue-500" />,
    title: "100+ MoU's Sign",
  },
];

const CareerSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="w-full bg-gray-50 text-black py-16 px-6">
      <div className="max-w-6xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-4">
          We Develop Your Inspiring Career with Standard
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Next cms Pakistan is the leading IT training institute, offering 100+
          courses through online and physical classes. We provide internship
          opportunities and have a dedicated job cell to help you jumpstart your
          career.
        </p>
      </div>

      {/* Grid Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all"
            data-aos="zoom-in"
          >
            {feature.icon}
            <h3 className="text-lg font-semibold mt-3">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerSection;
