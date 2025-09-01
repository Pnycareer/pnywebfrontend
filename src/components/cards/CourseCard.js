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

const CourseCard = ({ name, image, urlslug, shortdescription }) => {
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
        "relative group overflow-hidden min-h-[480px] flex flex-col cursor-pointer outline-none",
        "rounded-2xl border border-white/30 bg-white/30 backdrop-blur-md",
        "shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]",
      ].join(" ")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleDetailsClick(e);
      }}
      aria-label={`Open details for ${name}`}
    >
      {/* Image Section */}
      <div className="relative w-full shrink-0">
        <Image
          src={fullImage}
          alt={name || "Course image"}
          width={1200} // or your actual image width
          height={600} // or your actual image height
          layout="responsive"
          priority
          unoptimized
          className="rounded-t-2xl object-contain"
        />
        <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-6 flex-grow">
        <h3
          className={`${poppins.className} text-xl font-bold text-center text-slate-800`}
          title={name}
        >
          {name}
        </h3>

        <p className="line-clamp-3 mt-2 text-center text-slate-700 text-sm">
          {shortdescription}
        </p>

        {/* Button pinned to bottom */}
        <button
          type="button"
          onClick={handleDetailsClick}
          className="mt-auto group relative overflow-hidden px-6 py-3 border border-indigo-300 rounded-lg text-indigo-600 transition-all duration-500 mx-auto w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          aria-label={`View details of ${name}`}
        >
          <span
            className={`${poppins.className} relative z-10 text-sm font-semibold`}
          >
            Details
          </span>
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-100 to-indigo-300 transition-all duration-500 group-hover:w-full rounded-lg" />
        </button>
      </div>
    </motion.article>
  );
};

export default CourseCard;
