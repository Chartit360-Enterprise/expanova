"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2a1a1a]/90 border-b border-[#4a2828]/50 backdrop-blur-xl">
        <div className="w-full mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] text-white hover:text-white/80 transition-colors" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
            
          </Link>

          {/* Desktop Navigation - 3 Rectangle Tabs */}
          <div className="hidden md:flex items-center gap-0 ml-auto" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
            <a
              href="#ventures"
              className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex items-center text-sm sm:text-base md:text-lg font-semibold tracking-wider text-white/70 hover:text-white transition-all group bg-white/5 border-r border-white/15"
            >
              <span className="relative z-10">Angel Investments</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#products"
              className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex items-center text-sm sm:text-base md:text-lg font-semibold tracking-wider text-white/70 hover:text-white transition-all group bg-white/5 border-r border-white/15"
            >
              <span className="relative z-10">Digital Products</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex items-center text-sm sm:text-base md:text-lg font-semibold tracking-wider text-white/70 hover:text-white transition-all group bg-white/5 border-r border-white/15"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#agency"
              className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex items-center text-sm sm:text-base md:text-lg font-semibold tracking-wider text-white/70 hover:text-white transition-all group bg-white/5"
            >
              <span className="relative z-10">Digital Agency</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 right-0 bg-[#2a1a1a]/95 border-b border-[#4a2828]/50 md:hidden z-40 backdrop-blur-xl"
          >
            <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-2 sm:space-y-3">
              <a
                href="#ventures"
                className="block py-2 sm:py-3 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Angel Investments
              </a>
              <a
                href="#products"
                className="block py-2 sm:py-3 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Digital Products
              </a>
              <a
                href="#contact"
                className="block py-2 sm:py-3 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="#agency"
                className="block py-2 sm:py-3 text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Digital Agency
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
