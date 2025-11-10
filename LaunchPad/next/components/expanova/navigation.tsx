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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2a1a1a]/90 backdrop-blur-xl border-b border-[#4a2828]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl font-bold tracking-wide text-white hover:text-white/80 transition-colors">
            EXPANOVA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="#ventures"
              className="text-sm xl:text-base font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Angel Investments
            </a>
            <a
              href="#products"
              className="text-sm xl:text-base font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Digital Products
            </a>
            <a
              href="#agency"
              className="text-sm xl:text-base font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Digital Agency
            </a>
            <a
              href="#contact"
              className="px-5 xl:px-6 py-2 xl:py-2.5 bg-[#6a2a2a] text-white text-sm font-medium rounded-lg hover:bg-[#4a1a1a] transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </div>

          {/* Tablet/Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            className="fixed top-16 sm:top-20 left-0 right-0 bg-[#2a1a1a]/95 border-b border-[#4a2828]/50 lg:hidden z-40 shadow-sm backdrop-blur-xl"
          >
            <div className="px-4 sm:px-6 py-4 space-y-2">
              <a
                href="#ventures"
                className="block py-3 text-base font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Angel Investments
              </a>
              <a
                href="#products"
                className="block py-3 text-base font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Digital Products
              </a>
              <a
                href="#agency"
                className="block py-3 text-base font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Digital Agency
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 -mx-4 sm:mx-0 bg-[#6a2a2a] text-white text-base font-medium rounded-lg hover:bg-[#4a1a1a] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
