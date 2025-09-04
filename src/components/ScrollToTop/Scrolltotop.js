"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop({
  showAfter = 200, // px scrolled before showing
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const scrollTop = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, []);

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-20 right-7 z-50 inline-flex items-center justify-center
        h-12 w-12 rounded-full bg-slate-900 text-white shadow-xl ring-1 ring-black/10
        transition-all duration-300 hover:bg-slate-800 active:scale-95
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
      `}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
