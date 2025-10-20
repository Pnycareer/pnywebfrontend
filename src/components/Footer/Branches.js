"use client";

import React from "react";
import { MapPin, Building2, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const accentStyles = {
  blue: {
    gradient: "from-blue-500 via-sky-500 to-indigo-500",
    shadow: "shadow-blue-500/30",
    text: "text-blue-600",
  },
  green: {
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    shadow: "shadow-emerald-500/30",
    text: "text-emerald-600",
  },
  red: {
    gradient: "from-rose-500 via-red-500 to-orange-500",
    shadow: "shadow-rose-500/30",
    text: "text-rose-600",
  },
  yellow: {
    gradient: "from-amber-500 via-orange-500 to-amber-600",
    shadow: "shadow-amber-500/30",
    text: "text-amber-600",
  },
  purple: {
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    shadow: "shadow-violet-500/30",
    text: "text-violet-600",
  },
  pink: {
    gradient: "from-pink-500 via-rose-500 to-fuchsia-500",
    shadow: "shadow-pink-500/30",
    text: "text-pink-600",
  },
  orange: {
    gradient: "from-orange-500 via-amber-500 to-orange-600",
    shadow: "shadow-orange-500/30",
    text: "text-orange-600",
  },
  slate: {
    gradient: "from-slate-600 via-slate-500 to-gray-500",
    shadow: "shadow-slate-500/30",
    text: "text-slate-600",
  },
};

const branches = [
  {
    title: "Arfa Tower (Head Office)",
    icon: Landmark,
    accent: "blue",
    address:
      "Office No.1, Level 14, Arfa Software Technology Park, Ferozepur Road, Lahore",
    mapUrl: "https://maps.app.goo.gl/s2JFw8SW6PoPit886",
  },
  {
    title: "Iqbal Town",
    icon: MapPin,
    accent: "green",
    address: "743 B Kashmir Block Allama Iqbal Town, Lahore",
    mapUrl: "https://maps.app.goo.gl/3zLszUrmdcpKwLdY9",
  },
  {
    title: "Johar Town",
    icon: MapPin,
    accent: "red",
    address:
      "1st Floor 256 / A, Block R2 Near Shaukat Khanam Hospital, next to Standard Chartered, Lahore",
    mapUrl: "https://maps.app.goo.gl/H1YK13wqErhXiNoM8",
  },
  {
    title: "Shahdara Branch",
    icon: MapPin,
    accent: "yellow",
    address:
      "Office#1, Floor#2, Al-Habib Bank, Phool Mandi, Al Saeed Chowk Saggian, Bypass Lahore-Jaranwala Rd, Lahore, Pakistan",
    mapUrl: "https://maps.app.goo.gl/o53M84MhjcZacqbDA",
  },
  {
    title: "Rawalpindi",
    icon: MapPin,
    accent: "purple",
    address:
      "Office # 102, Floor #1 Talha Heights Plot # 21-D, 6th Road Satellite Town, Rawalpindi",
    mapUrl: "https://maps.app.goo.gl/Hu2rFkEfNLbRXkLR8",
  },
  {
    title: "Multan",
    icon: MapPin,
    accent: "pink",
    address: "237-B, Model Town, Main Boulevard, Multan",
    mapUrl: "https://maps.app.goo.gl/1sBngNYqxAsfwiRw6",
  },
  {
    title: "Sargodha Branch",
    icon: MapPin,
    accent: "orange",
    address:
      "Mawk Tech Space, 2nd Floor Ahsan Cash & Carry, near Zafar Ullah Chowk, Sargodha",
    mapUrl: "https://maps.app.goo.gl/993aKGE9n2Dgieqq6",
  },
  {
    title: "Saudi Arabia",
    icon: Building2,
    accent: "slate",
    address:
      "Office No. 7, 1st Floor, ALJMAZ Building Prince Sultan Bin Abdulaziz Rd, Above Dunkin Donuts Al Olaya, Riyadh 12221",
    // no map link here
  },
];

export default function Branches() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-6">
      <div className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-4rem] right-[-3rem] h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="max-w-4xl mx-auto text-center mb-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600 shadow-sm">
          Global Presence
        </span>
        <h3 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
          Our Branches
        </h3>
        <p className="mt-4 text-base text-slate-600">
          Visit the nearest PNY location or connect with us internationally. Each branch
          is designed to support your learning journey with expert mentors and modern
          facilities.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch, index) => {
          const MotionWrapper = branch.mapUrl ? motion.a : motion.div;
          const accent = accentStyles[branch.accent] ?? accentStyles.blue;
          const Icon = branch.icon;

          const props = branch.mapUrl
            ? {
                href: branch.mapUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <MotionWrapper
              key={branch.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              whileHover={branch.mapUrl ? { y: -10, scale: 1.01 } : undefined}
              className={`group relative block overflow-hidden rounded-2xl border border-white/60 bg-white/75 p-7 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-all duration-300 ${
                branch.mapUrl
                  ? "hover:-translate-y-2 hover:border-white hover:shadow-[0_28px_60px_-30px_rgba(37,99,235,0.35)] cursor-pointer"
                  : "cursor-default"
              }`}
              {...props}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/0 via-white/40 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent.gradient} ${accent.shadow} text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {branch.title}
                  </h3>
                  <p className={`mt-2 text-xs font-semibold uppercase tracking-wider ${accent.text}`}>
                    {branch.mapUrl ? "On-Campus" : "International Desk"}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 group-hover:text-slate-700">
                {branch.address}
              </p>
              {branch.mapUrl && (
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-indigo-600">
                  Open in Maps
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
              )}
            </MotionWrapper>
          );
        })}
      </div>
    </section>
  );
}
