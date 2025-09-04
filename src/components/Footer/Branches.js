"use client";

import React from "react";
import { MapPin, Building2, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const branches = [
  {
    title: "Arfa Tower (Head Office)",
    icon: <Landmark className="text-blue-500 w-6 h-6" />,
    address:
      "Office No.1, Level 14, Arfa Software Technology Park, Ferozepur Road, Lahore",
    mapUrl: "https://maps.app.goo.gl/s2JFw8SW6PoPit886",
  },
  {
    title: "Iqbal Town",
    icon: <MapPin className="text-green-500 w-6 h-6" />,
    address: "743 B Kashmir Block Allama Iqbal Town, Lahore",
    mapUrl: "https://maps.app.goo.gl/3zLszUrmdcpKwLdY9",
  },
  {
    title: "Johar Town",
    icon: <MapPin className="text-red-500 w-6 h-6" />,
    address:
      "1st Floor 256 / A, Block R2 Near Shaukat Khanam Hospital, next to Standard Chartered, Lahore",
    mapUrl: "https://maps.app.goo.gl/H1YK13wqErhXiNoM8",
  },
  {
    title: "Shahdara Branch",
    icon: <MapPin className="text-yellow-500 w-6 h-6" />,
    address:
      "Office#1, Floor#2, Al-Habib Bank, Phool Mandi, Al Saeed Chowk Saggian, Bypass Lahore-Jaranwala Rd, Lahore, Pakistan",
    mapUrl: "https://maps.app.goo.gl/o53M84MhjcZacqbDA",
  },
  {
    title: "Rawalpindi",
    icon: <MapPin className="text-purple-500 w-6 h-6" />,
    address:
      "Office # 102, Floor #1 Talha Heights Plot # 21-D, 6th Road Satellite Town, Rawalpindi",
    mapUrl: "https://maps.app.goo.gl/Hu2rFkEfNLbRXkLR8",
  },
  {
    title: "Multan",
    icon: <MapPin className="text-pink-500 w-6 h-6" />,
    address: "237-B, Model Town, Main Boulevard, Multan",
    mapUrl: "https://maps.app.goo.gl/1sBngNYqxAsfwiRw6",
  },
  {
    title: "Sargodha Branch",
    icon: <MapPin className="text-orange-500 w-6 h-6" />,
    address:
      "Mawk Tech Space, 2nd Floor Ahsan Cash & Carry, near Zafar Ullah Chowk, Sargodha",
    mapUrl: "https://maps.app.goo.gl/993aKGE9n2Dgieqq6",
  },
  {
    title: "Saudi Arabia",
    icon: <Building2 className="text-gray-700 w-6 h-6" />,
    address:
      "Office No. 7, 1st Floor, ALJMAZ Building Prince Sultan Bin Abdulaziz Rd, Above Dunkin Donuts Al Olaya, Riyadh 12221",
    // no map link here
  },
];

export default function Branches() {
  return (
    <section className="py-5 px-6 bg-gray-100">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Our Branches
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {branches.map((branch, index) => {
          const MotionWrapper = branch.mapUrl ? motion.a : motion.div;
          const props = branch.mapUrl
            ? {
                href: branch.mapUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <MotionWrapper
              key={index}
              whileHover={{ scale: branch.mapUrl ? 1.02 : 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`block bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-all ${
                branch.mapUrl ? "hover:shadow-lg cursor-pointer" : "cursor-default"
              }`}
              {...props}
            >
              <div className="flex items-center gap-3 mb-4">
                {branch.icon}
                <h3 className="text-lg font-semibold text-gray-800">
                  {branch.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {branch.address}
              </p>
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
