"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function HeaderSection({
  pagetitle,
  shortdescription,
  image,
  children,
  icon = <SparklesIcon className="w-8 h-8 text-teal-300" />,
  fullScreen = false, // set true to cover viewport
}) {
  const validTitle = typeof pagetitle === "string" ? pagetitle : "";
  const title = validTitle.charAt(0).toUpperCase() + validTitle.slice(1);
  const typedTitle = useTypewriter(title, 45);

  // ✅ IMAGE-ONLY MODE (no gradient, no padding, no other content)
  if (image) {
    return (
      <section
        className={
          fullScreen
            ? "relative w-full h-screen overflow-hidden"         // fullscreen hero
            : "relative w-full overflow-hidden"                   // responsive banner (height = image aspect)
        }
      >
        {fullScreen ? (
          // fullscreen: use fill + object-cover to cover viewport
          <Image
            src={image}
            alt="Header Image"
            fill
            className="object-cover"
            priority
            unoptimized
            sizes="100vw"
          />
        ) : (
          // full-width, natural height: no bg shows, no fixed height required
          <Image
            src={image}
            alt="Header Image"
            width={2400}   // any large width; height keeps ratio
            height={800}
            className="w-full h-auto block"
            priority
            unoptimized
            sizes="100vw"
          />
        )}
      </section>
    );
  }

  // ✅ TEXT MODE (only when no image)
  return (
    <section className="relative flex flex-col items-center justify-center h-auto pb-12 bg-gradient-to-r from-[#1B263B] via-[#475e5e] to-[#006d5f] text-white">
      <div className="w-11/12 max-w-screen-lg mx-auto flex flex-col items-center justify-center px-4 md:px-10 pt-8">
        {icon && <div className="mb-3">{icon}</div>}

        <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight drop-shadow-sm min-h-[3rem] capitalize">
          {typedTitle}
        </h1>

        <motion.div
          className="h-1 w-24 mt-3 rounded-full bg-gradient-to-r from-teal-400 via-white/50 to-purple-400 shadow-md"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {shortdescription && (
          <p className="text-sm md:text-lg text-gray-100 mt-5 max-w-3xl text-center leading-relaxed">
            {shortdescription}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
