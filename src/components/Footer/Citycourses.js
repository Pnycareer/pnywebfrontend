"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const cities = [
  "lahore",
  "rawalpindi",
  "karachi",
  "multan",
  "sialkot",
  "faisalabad",
  "gujranwala",
  "azad-kashmir",
  "islamabad",
  "sargodha",
];

export default function CityCourses() {
  const router = useRouter();

  const redirectToCity = (city) => {
    router.push(`/city/${city}`);
  };

  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        <span className="inline-flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          Explore Courses by City
        </span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {cities.map((city, i) => (
          <motion.div
            key={city}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, type: "spring" }}
            onClick={() => redirectToCity(city)}
            className="cursor-pointer group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-5 flex flex-col items-center justify-center text-center"
          >
            <MapPin className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 capitalize">
              {city.replace("-", " ")}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
