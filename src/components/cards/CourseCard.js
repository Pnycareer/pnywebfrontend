"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const CourseCard = ({ name, image, urlslug }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    if (urlslug) {
      router.push(`/${urlslug}`);
    }
  };

  return (
    <motion.div
      onClick={handleDetailsClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-2xl shadow-lg overflow-hidden w-72 h-96 flex flex-col cursor-pointer transition-transform transform hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized={true}
          priority={true} // Faster initial load
          className="rounded-t-2xl object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-gray-800/50 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-6 flex-grow">
        <h3
          className={`${poppins.className} text-xl font-bold text-center text-gray-900 truncate`}
          title={name}
        >
          {name}
        </h3>

        <button
          type="button"
          className="group relative overflow-hidden px-6 py-3 mt-6 border border-blue-300 rounded-lg text-blue-500 transition-all duration-500 mx-auto"
        >
          <span
            className={`${poppins.className} relative z-10 text-black text-sm`}
          >
            Details
          </span>
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-blue-300 transition-all duration-500 group-hover:w-full"></span>
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
