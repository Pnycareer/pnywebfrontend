import { useRouter } from "next/navigation"; // Correct import for Next.js 15
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "700"], // Choose weights
  subsets: ["latin"],
});

const CourseCard = ({ name, image, description, urlslug }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    if (urlslug) {
      router.push(`/${urlslug}`); // Navigate to the dynamic course page
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative group bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl w-full"
    >
      {/* Image with Overlay */}
      <div className="relative w-full h-52">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`}
          alt={name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-gray-800/50 to-transparent"></div>
      </div>

      {/* Content inside the Card */}
      <div className="p-4 text-center text-black flex flex-col gap-6">
        <h3 className="text-xl font-bold drop-shadow-lg">{name}</h3>

        {/* Modern Button with Animated Arrow */}
        <button
          className="group relative overflow-hidden px-4 py-2 border-1 border-blue-300 rounded-lg text-blue-500 transition-all duration-500"
          onClick={handleDetailsClick}
        >
          <span
            className={`${poppins.className} relative z-10 text-black text-sm md:text-sm leading-none tracking-tighter drop-shadow-2xl`}
          >
            Details
          </span>

          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-blue-300 transition-all duration-500 group-hover:w-full font-poppins"></span>
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
