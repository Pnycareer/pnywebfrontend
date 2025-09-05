// app/scroll-to-top.jsx
"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopEffect() {
  const pathname = usePathname();

  useEffect(() => {
    // if navigating to a hash on the same page, let the browser handle it
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
