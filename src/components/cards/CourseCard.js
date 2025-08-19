"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const CourseCard = ({ name, image, urlslug, shortdescription }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    if (urlslug) {
      router.push(`/${urlslug}`);
    }
  };

  // Handle missing or relative image
  const fullImage = image?.startsWith("http")
    ? image
    : `${process.env.NEXT_PUBLIC_API_URL}/${image || "fallback.jpg"}`;

  return (
    <motion.div
      onClick={handleDetailsClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-2xl shadow-lg overflow-hidden w-72 min-h-[420px] flex flex-col cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 shrink-0">
        <Image
          src={fullImage}
          alt={name}
          fill
          unoptimized
          priority
          className="rounded-t-2xl object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-gray-800/50 to-transparent rounded-t-2xl" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-6 flex-grow justify-start">
        <h3
          className={`${poppins.className} text-xl font-bold text-center text-gray-900`}
          title={name}
        >
          {name}
        </h3>

        <p className="line-clamp-3 mt-2 text-center text-gray-700">
          {shortdescription}
        </p>

        <button
          type="button"
          className="mt-2 group relative overflow-hidden px-6 py-3 border border-blue-300 rounded-lg text-blue-500 transition-all duration-500 mx-auto w-full"
        >
          <span className={`${poppins.className} relative z-10 text-black text-sm`}>
            Details
          </span>
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-blue-300 transition-all duration-500 group-hover:w-full" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
