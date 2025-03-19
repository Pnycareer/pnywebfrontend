import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const CourseCard = ({ name, image, urlslug }) => {
  console.log(urlslug)
  const router = useRouter();

  const handleDetailsClick = () => {
    if (urlslug) {
      router.push(`/${urlslug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group bg-white rounded-xl shadow-lg overflow-hidden w-64 h-80 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-40">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-gray-800/50 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <h3 className="text-lg font-bold text-center mt-6">{name}</h3>

        <button
          className="group relative overflow-hidden px-4 py-2 border border-blue-300 rounded-lg text-blue-500 transition-all duration-500 mx-auto"
          onClick={handleDetailsClick}
        >
          <span className={`${poppins.className} relative z-10 text-black text-sm`}>
            Details
          </span>
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-blue-300 transition-all duration-500 group-hover:w-full"></span>
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
