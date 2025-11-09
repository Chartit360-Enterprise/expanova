"use client";
import React from "react";
import { motion } from "framer-motion";
import { Navigation } from "../../../../components/expanova/navigation";

export const ExpanovaHome: React.FC = () => {
  return (
    <div className="bg-[#0f1410] relative snap-y snap-mandatory h-screen overflow-y-scroll">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="h-screen snap-start flex items-center px-4 sm:px-6 md:px-8 pt-20 relative">
        {/* Hero Background - Muted Green/Red */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#4a6b57]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#6b4a4a]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.15em] text-white mb-6 sm:mb-8 leading-[0.95]" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              EXPANOVA
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-[#7a9d8a]/60 via-[#8a6a6a]/40 to-transparent mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-white/70 leading-relaxed tracking-wide" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Fund, studio, and products for startups
            </p>
          </motion.div>
        </div>
      </section>

      {/* Angel Investments Section */}
      <section id="ventures" className="h-screen snap-start flex items-center px-4 sm:px-6 md:px-8 relative">
        {/* Ventures Background - Darker with Blue Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2530]/40 via-[#0f1410]/60 to-[#2a1a2a]/40" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#3a5a6a]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#4a3a5a]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32 relative z-10">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-4 sm:mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Angel Investments
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              We fund and sponsor promising ventures that align with our vision for innovation.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                    Chartit360
                  </h3>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-[#ff6b6b]/15 text-[#ff8888] text-xs font-medium tracking-wide border border-[#ff6b6b]/20">
                    PORTFOLIO COMPANY
                  </span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-white/60 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                Enterprise-grade data analytics platform. Advanced AI-driven financial insights, forecasts, and real-time dashboards.
              </p>
              <a
                href="https://marketing.chartit360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ fontFamily: "'Spline Sans', sans-serif" }}
              >
                Visit Website
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="products" className="h-screen snap-start flex items-center px-4 sm:px-6 md:px-8 relative">
        {/* Products Background - Warmer with Purple/Amber Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2a1a]/40 via-[#1a1520]/60 to-[#2a2535]/40" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#6a4a3a]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#5a3a6a]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32 relative z-10">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-4 sm:mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Digital Products
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-4 sm:mb-6" />
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                  Criterion
                </h3>
              </div>
              <p className="text-base sm:text-lg text-white/60 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                Startup idea evaluator with 85%+ prediction accuracy. Get evaluations in 5-10 minutes with complete audit trail transparency.
              </p>
              <a
                href="https://criterion.expanova.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ fontFamily: "'Spline Sans', sans-serif" }}
              >
                Try Criterion
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                    Chartit360
                  </h3>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-[#7a9d8a]/15 text-[#7a9d8a] text-xs font-medium tracking-wide border border-[#7a9d8a]/20">
                    BUILT & SPONSORED
                  </span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-white/60 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                Enterprise-grade data analytics platform. Advanced AI-driven financial insights, forecasts, and real-time dashboards.
              </p>
              <a
                href="https://marketing.chartit360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ fontFamily: "'Spline Sans', sans-serif" }}
              >
                Visit Website
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Agency Section */}
      <section id="agency" className="h-screen snap-start flex items-center px-4 sm:px-6 md:px-8 relative">
        {/* Agency Background - Deep Red/Burgundy Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a1a]/50 via-[#1a1015]/60 to-[#3a2020]/40" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#5a3a3a]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#6a2a2a]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-24 md:py-32 relative z-10">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-4 sm:mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Digital Agency
            </h2>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-4 sm:mb-6" />
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                  BlackBox Dev
                </h3>
              </div>
              <p className="text-base sm:text-lg text-white/60 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                Fast, reliable websites, SaaS platforms, and AI tools for startups, creators, and small businesses. Delivered in days, not weeks.
              </p>
              <a
                href="https://www.blackbox-dev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ fontFamily: "'Spline Sans', sans-serif" }}
              >
                Visit Website
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Starfield - Bottom Right */}
      <div className="fixed bottom-0 right-0 w-full max-w-[1200px] h-[1200px] pointer-events-none overflow-hidden">
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
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet">
          <motion.line
            x1="66.67%" y1="25%" x2="79.17%" y2="37.5%"
            stroke="#7a9d8a"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.line
            x1="79.17%" y1="37.5%" x2="75%" y2="54.17%"
            stroke="#7a9d8a"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.line
            x1="75%" y1="54.17%" x2="87.5%" y2="66.67%"
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
