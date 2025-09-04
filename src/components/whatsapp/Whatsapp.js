"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react"; // clean Lucide WhatsApp-like icon
import { motion } from "framer-motion";

export default function Whatsapp() {
  const [iconColor, setIconColor] = useState("green");

  useEffect(() => {
    // auto-switch if you ever add bg themes in the future
    setIconColor("green");
  }, []);

  const navigateToWhatsApp = () => {
    const whatsappUrl = "https://wa.me/+923101111774"; // replace with your number
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
      className="
        fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center 
        rounded-full bg-white shadow-xl ring-1 ring-slate-200 
        hover:ring-green-500 hover:shadow-2xl transition-all duration-300
      "
    >
      <MessageCircle className="h-7 w-7" color={iconColor} />
      {/* tooltip */}
      <span className="
        absolute -left-40 mr-3 px-3 py-1.5 rounded-md bg-slate-900 text-white 
        text-sm font-medium opacity-0 group-hover:opacity-100 transition
        pointer-events-none
      ">
        Chat with us
      </span>
    </motion.button>
  );
}
