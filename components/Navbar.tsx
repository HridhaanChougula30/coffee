"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
            RAW
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-orange-400 transition-colors">Products</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Process</a>
          <a href="#" className="hover:text-orange-400 transition-colors">About</a>
        </div>

        <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          Order Now
        </button>
      </div>
    </motion.nav>
  );
}
