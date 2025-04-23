"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 p-2 sm:p-3 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 z-50 h-10 w-10 sm:h-12 sm:w-12 ${
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16 pointer-events-none"
      }`}
      size="icon"
      aria-label="Back to top"
      variant="default"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
      <span className="sr-only">Back to top</span>
    </Button>
  );
}
