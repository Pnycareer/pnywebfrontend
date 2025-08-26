"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useTypewriter } from "@/hooks/useTypewriter"; // ✅ import the hook

export default function HeaderSection({
  pagetitle,
  shortdescription,
  image,
  children,
  icon = <SparklesIcon className="w-8 h-8 text-teal-300" />,
}) {
  const title = pagetitle?.charAt(0).toUpperCase() + pagetitle?.slice(1);
  const typedTitle = useTypewriter(title, 45); // ⏱️ 45ms speed per character

  return (
    <section className="relative flex flex-col items-center justify-center h-auto pb-12 bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f] text-white">
      <div className="w-11/12 max-w-screen-lg mx-auto flex flex-col items-center justify-center px-4 md:px-10 pt-8">
        {/* Optional image */}
        {image && (
          <div className="relative w-full h-60 mb-6 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={image}
              alt="Header Image"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Icon */}
        {icon && <div className="mb-3">{icon}</div>}

        {/* Typewriter Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight drop-shadow-sm min-h-[3rem] capitalize">
          {typedTitle}
        </h1>

        {/* Glowing animated underline */}
        <motion.div
          className="h-1 w-24 mt-3 rounded-full bg-gradient-to-r from-teal-400 via-white/50 to-purple-400 shadow-md"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Description */}
        <p className="text-sm md:text-lg text-gray-100 mt-5 max-w-3xl text-center leading-relaxed">
          {shortdescription}
        </p>

        {/* Injected content */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
