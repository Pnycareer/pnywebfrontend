"use client";

import { useEffect, useCallback } from "react";
import { MessageCircle } from "lucide-react"; // lucide icon
import { motion } from "framer-motion";       // for smooth hover/tap

export default function TawkToChatbot() {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.onLoad = function () {
      try {
        window.Tawk_API.hideWidget?.();
        window.Tawk_API.minimize?.();
      } catch {}
    };

    window.Tawk_API.onStatusChange = function () {
      try {
        window.Tawk_API.hideWidget?.();
      } catch {}
    };

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://embed.tawk.to/5ac33b2bd7591465c709239e/default";
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);

    const style = document.createElement("style");
    style.innerHTML = `
      #tawkchat-minified-wrapper,
      #tawkchat-minified,
      .tawk-button,
      .tawk-min-container {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const openChat = useCallback(() => {
    try {
      window.Tawk_API?.showWidget?.();
      window.Tawk_API?.maximize?.();
    } catch {}
  }, []);

  return (
    <motion.button
      onClick={openChat}
      aria-label="Open chat"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed left-0 top-1/2 -translate-y-1/2 z-[1000]
        flex items-center justify-center gap-2
        bg-gradient-to-b from-blue-600 to-blue-700
        text-white font-medium tracking-wide
        px-3 py-3 rounded-tr-xl rounded-br-xl shadow-2xl
        hover:from-blue-700 hover:to-blue-800
        transition-all duration-300
      "
      style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
      }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm">Chat with us</span>
    </motion.button>
  );
}
