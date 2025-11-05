"use client";
import React from "react";
import { motion } from "framer-motion";

interface CustomerLogo {
  name: string;
  logo?: string; // For now using text, can be replaced with actual logos
}

interface CustomerLogosProps {
  title?: string;
  logos: CustomerLogo[];
}

export const CustomerLogos: React.FC<CustomerLogosProps> = ({
  title = "Trusted by leading innovators",
  logos,
}) => {
  return (
    <section className="py-16 bg-expanova-surface/30 border-y border-expanova-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-white/50 uppercase tracking-widest font-medium mb-8">
            {title}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-white/40 hover:text-white/70 transition-colors duration-300 text-lg font-medium"
              >
                {logo.logo ? (
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="h-8 opacity-60 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="font-semibold">{logo.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

