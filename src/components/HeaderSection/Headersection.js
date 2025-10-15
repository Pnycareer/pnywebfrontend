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
  icon = <SparklesIcon className="w-8 h-8 text-blue-400" />,
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
    <section className="relative overflow-hidden py-16 text-slate-800 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl rounded-full bg-blue-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl"
      />

      <div className="relative mx-auto flex w-11/12 max-w-5xl flex-col items-center px-4 text-center sm:px-10">
        {icon && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 rounded-full border border-blue-200/70 bg-white/80 px-5 py-2 shadow-md shadow-blue-100/40 backdrop-blur"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
              {icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-700">
              Featured
            </span>
          </motion.div>
        )}

        <motion.h1
          key={typedTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 min-h-[3rem] text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl"
        >
          {typedTitle}
        </motion.h1>

        <motion.div
          className="mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 shadow shadow-blue-200"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {shortdescription && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg"
          >
            {shortdescription}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="mt-10 w-full"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
