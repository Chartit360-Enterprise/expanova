"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface StatsBarProps {
  stats: Stat[];
}

const AnimatedCounter: React.FC<{ value: string; delay?: number }> = ({
  value,
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Extract number from value (handles "85%+", "100x", etc.)
    const numMatch = value.match(/(\d+)/);
    if (!numMatch) {
      setCount(parseFloat(value) || 0);
      return;
    }

    const target = parseInt(numMatch[1]);
    const hasPlus = value.includes("+");
    const hasX = value.includes("x");
    const isRange = value.includes("-");

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, value]);

  const formatValue = () => {
    if (value.includes("%")) {
      return `${count}%${value.includes("+") ? "+" : ""}`;
    }
    if (value.includes("x")) {
      return `${count}x`;
    }
    if (value.includes("-")) {
      return value; // Return as-is for ranges
    }
    if (value.includes(":")) {
      return value; // Return as-is for time formats
    }
    return `${count}${value.replace(/\d+/, "")}`;
  };

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold gradient-text tracking-tight">
      {isInView ? formatValue() : "0"}
    </div>
  );
};

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group"
          >
            {stat.icon && (
              <div className="text-4xl mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                {stat.icon}
              </div>
            )}
            <AnimatedCounter value={stat.value} delay={index * 100} />
            <div className="text-xs text-white/50 uppercase tracking-widest mt-3 font-medium">
              {stat.label}
            </div>
            {/* Subtle divider line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-expanova-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
