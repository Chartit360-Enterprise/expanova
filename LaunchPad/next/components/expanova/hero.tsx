"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroProps {
  heading: string;
  subHeading: string;
  CTAs: Array<{
    id: number;
    text: string;
    URL: string;
    variant: "primary" | "secondary";
  }>;
}

export const Hero: React.FC<HeroProps> = ({ heading, subHeading, CTAs }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-expanova-bg">
      {/* Refined Background Layers */}
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.08] animate-gradient-shift bg-[length:200%_200%]"></div>
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="absolute inset-0 texture-overlay"></div>
      
      {/* Subtle Radial Gradients for Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-expanova-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-expanova-accent/10 rounded-full blur-3xl"></div>
      
      {/* Subtle Particle Effect - More Refined */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-expanova-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32 text-center">
        {/* Announcement Badge - Scale/Rippling style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-expanova-primary/10 border border-expanova-primary/20 mb-8 group hover:border-expanova-primary/40 transition-all cursor-pointer"
        >
          <span className="text-xs font-semibold text-expanova-primary uppercase tracking-wider">
            Introducing Criterion AI
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-expanova-primary group-hover:translate-x-1 transition-transform"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </motion.svg>
        </motion.div>

        <motion.h1
          className="text-hero font-bold gradient-text mb-8 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {heading}
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/75 max-w-4xl mx-auto mb-12 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subHeading}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {CTAs.map((cta) => (
            <Button
              key={cta.id}
              variant={cta.variant === "primary" ? "default" : "outline"}
              size="lg"
              asChild
              className="text-base px-8 py-6"
            >
              <a href={cta.URL} target={cta.URL.startsWith("http") ? "_blank" : undefined} rel={cta.URL.startsWith("http") ? "noopener noreferrer" : undefined}>
                {cta.text}
                {cta.variant === "primary" && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </a>
            </Button>
          ))}
        </motion.div>

        {/* Trust Indicators - Scale style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest mb-6 font-medium">
            Powering innovation for AI labs, startups, and enterprises
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/60"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </section>
  );
};
