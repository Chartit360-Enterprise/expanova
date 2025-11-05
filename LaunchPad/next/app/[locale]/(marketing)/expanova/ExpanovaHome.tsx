"use client";
import React from "react";
import { motion } from "framer-motion";
import { Navigation } from "../../../../components/expanova/navigation";

export const ExpanovaHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f1410] relative overflow-hidden">
      {/* Beautiful muted green/red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40" />

      {/* Radial gradient accents */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#4a6b57]/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#6b4a4a]/10 to-transparent blur-3xl" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <Navigation />

      <main className="relative pt-48 px-8">
        <div className="max-w-5xl mx-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-8xl font-bold tracking-[0.15em] text-white mb-8 leading-[0.95]" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              EXPANOVA
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-[#7a9d8a]/60 via-[#8a6a6a]/40 to-transparent mb-8" />
            <p className="text-2xl md:text-3xl font-normal text-white/70 leading-relaxed tracking-wide" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Fund, studio, and products for startups
            </p>
          </motion.div>
        </div>
      </main>

      {/* Starfield - Bottom Right */}
      <div className="fixed bottom-0 right-0 w-[1200px] h-[1200px] pointer-events-none overflow-visible">
        {/* Random twinkling stars scattered across the area */}
        {Array.from({ length: 200 }).map((_, i) => {
          const x = Math.random() * 1200;
          const y = Math.random() * 1200;
          const size = Math.random() * 3 + 1;
          const delay = Math.random() * 5;
          const duration = Math.random() * 3 + 2;

          return (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: i % 5 === 0
                    ? '#ff6b6b'
                    : i % 5 === 1
                    ? '#7a9d8a'
                    : i % 5 === 2
                    ? '#ee5a52'
                    : i % 5 === 3
                    ? '#ffffff'
                    : '#ffe0e0',
                  boxShadow: `0 0 ${size * 3}px currentColor`,
                  filter: 'brightness(1.5)'
                }}
              />
            </motion.div>
          );
        })}

        {/* Larger prominent stars with cross flare */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = Math.random() * 1000 + 100;
          const y = Math.random() * 1000 + 100;
          const delay = Math.random() * 3;

          return (
            <motion.div
              key={`bigstar-${i}`}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
              }}
            >
              {/* Star center */}
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#ff8888' : '#a8d4c0',
                  boxShadow: `0 0 20px ${i % 2 === 0 ? '#ff6b6b' : '#7a9d8a'}`,
                  filter: 'brightness(1.8)'
                }}
              />
              {/* Vertical flare */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{
                  scaleY: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="w-0.5 h-16 -translate-y-8"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? '#ff6b6b' : '#7a9d8a'}, transparent)`,
                    boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff6b6b' : '#7a9d8a'}`
                  }}
                />
              </motion.div>
              {/* Horizontal flare */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                animate={{
                  scaleX: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: delay + 0.5,
                  ease: "easeInOut"
                }}
              >
                <div
                  className="h-0.5 w-16 -translate-x-8"
                  style={{
                    background: `linear-gradient(to right, transparent, ${i % 2 === 0 ? '#ff6b6b' : '#7a9d8a'}, transparent)`,
                    boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff6b6b' : '#7a9d8a'}`
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Constellation connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.line
            x1="800" y1="300" x2="950" y2="450"
            stroke="#7a9d8a"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="950" y1="450" x2="900" y2="650"
            stroke="#7a9d8a"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.line
            x1="900" y1="650" x2="1050" y2="800"
            stroke="#ff6b6b"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 2 }}
          />
        </svg>
      </div>
    </div>
  );
};
