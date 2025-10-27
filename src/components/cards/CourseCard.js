"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useCallback } from "react";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const CourseCard = ({ name, alt, image, urlslug, shortdescription }) => {
  const router = useRouter();
  const handleDetailsClick = useCallback(
    (e) => {
      e?.stopPropagation();
      if (urlslug) router.push(`/${urlslug}`);
    },
    [router, urlslug]
  );

  const fullImage = image?.startsWith("http")
    ? image
    : `${process.env.NEXT_PUBLIC_API_URL}/${image}`;

  return (
    <motion.article
      onClick={handleDetailsClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={[
        "group relative flex h-full cursor-pointer flex-col overflow-hidden outline-none",
        "rounded-3xl border border-blue-200/40 bg-white/60 p-1 backdrop-blur-xl",
        "shadow-[0_25px_60px_-25px_rgba(37,99,235,0.28)] transition-transform duration-300",
        "hover:-translate-y-1 hover:shadow-[0_35px_80px_-30px_rgba(59,130,246,0.35)]",
        "focus-within:-translate-y-1 focus-within:shadow-[0_35px_80px_-30px_rgba(59,130,246,0.35)]",
      ].join(" ")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleDetailsClick(e);
      }}
      aria-label={`Open details for ${name}`}
    >
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />

      <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-4px)] bg-white/90">
        {/* Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={fullImage}
            alt={alt || "Course spotlight image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            className="object-top transition duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Course spotlight
            <span className="h-1 w-1 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-4 px-6 py-7">
          <div className="space-y-2 text-center">
            <h3
              className={`${poppins.className} text-lg font-semibold leading-tight text-slate-900 sm:text-xl`}
              title={name}
            >
              {name}
            </h3>

            <p className="text-sm leading-relaxed text-slate-600 line-clamp-4">
              {shortdescription}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-blue-600/80">
              <span className="h-1 w-1 rounded-full bg-blue-500/70" />
              Ready to explore
            </div>

            <button
              type="button"
              onClick={handleDetailsClick}
              className={[
                "group/button relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-blue-400/50 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700",
                "transition-all duration-300 hover:border-blue-400 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300/60 focus:ring-offset-2 focus:ring-offset-white",
              ].join(" ")}
              aria-label={`View details of ${name}`}
            >
              <span
                className={`${poppins.className} relative z-10 tracking-wide`}
              >
                View course details
              </span>
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-300/30 to-blue-200/40 transition-all duration-300 group-hover/button:w-full" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default CourseCard;
