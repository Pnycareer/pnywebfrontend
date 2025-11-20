"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const whatsappGreen = "#25D366";
const whatsappGreenDark = "#128C7E";

export default function Whatsapp() {
  const iconColor = "#ffffff";

  const navigateToWhatsApp = () => {
    const whatsappUrl = "https://wa.me/+923101111774";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      onClick={navigateToWhatsApp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with us on WhatsApp"
      style={{
        background: `linear-gradient(135deg, ${whatsappGreen}, ${whatsappGreenDark})`,
      }}
      className="
        fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center
        rounded-full shadow-xl ring-2 ring-[#1ebe5d]
        hover:ring-[#0c7b61] hover:shadow-2xl transition-all duration-300
        group
      "
    >
      <FaWhatsapp className="h-8 w-8 drop-shadow-sm" color={iconColor} />
      {/* tooltip */}
      <span
        className="
          absolute -left-40 mr-3 px-3 py-1.5 rounded-md bg-slate-900 text-white
          text-sm font-medium opacity-0 group-hover:opacity-100 transition
          pointer-events-none
        "
      >
        Chat with us
      </span>
    </motion.button>
  );
}
