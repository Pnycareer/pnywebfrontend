"use client";
import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null; // no UI needed
};

export default ScrollToTop;
