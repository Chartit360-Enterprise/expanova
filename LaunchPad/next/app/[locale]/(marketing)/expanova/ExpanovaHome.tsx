"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "../../../../components/expanova/navigation";
import { ContactForm } from "@/components/contact-form";

export const ExpanovaHome: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const capitalDetails = {
    title: "Capital",
    description: "We invest in early-stage startups and provide the expertise needed to scale.",
    details: [
      "Early-stage angel investments in innovative technology companies",
      "Executive talent placement: CTO, COO, and Senior Developer roles",
      "Hands-on support from experienced operators and technologists",
      "Strategic guidance across product, operations, and growth",
      "Combined capital and expertise to accelerate your journey"
    ],
    stats: [
      { label: "Investment Focus", value: "Early Stage" },
      { label: "Support Roles", value: "CTO, COO, Dev" },
      { label: "Investment Type", value: "Angel" }
    ]
  };

  const buildingDetails = {
    title: "Building",
    description: "Cutting-edge product development powered by world-class talent and enterprise expertise.",
    details: [
      "VP of AI and senior engineers driving continuous innovation",
      "Senior advisor with deep business expertise from top-tier consultancies",
      "Full-stack development across web, SaaS, and AI-powered platforms",
      "Modern tech stacks built for scale, performance, and reliability",
      "End-to-end delivery from concept to production with enterprise-grade quality"
    ],
    stats: [
      { label: "VP of AI", value: "Leading" },
      { label: "Senior SDE", value: "Full-Time" },
      { label: "Senior Advisor", value: "Strategic" }
    ]
  };

  return (
    <div className="bg-[#0f1410] min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40 pointer-events-none" />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
                Let's build what's next
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
                We fund, build, and scale innovative startups through our venture builder model. 
                Combining capital, expertise, and rapid development to bring ambitious ideas to life.
              </p>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#222222] text-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl relative overflow-hidden min-h-[280px] sm:min-h-[320px] cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setExpandedCard(expandedCard === 'capital' ? null : 'capital')}
            >
              {/* Money flowing animation - full size */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Large dollar sign in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 opacity-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                
                {/* Flowing dollar signs - full card */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/40"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 30}%`,
                    }}
                    animate={{
                      y: [-30, 30, -30],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6 + i * 0.8,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    $
                  </motion.div>
                ))}
                
                {/* Coins flowing - full card */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`coin-${i}`}
                    className="absolute rounded-full bg-white/30"
                    style={{
                      width: 'clamp(12px, 2vw, 20px)',
                      height: 'clamp(12px, 2vw, 20px)',
                      left: `${5 + (i % 6) * 16}%`,
                      top: `${10 + Math.floor(i / 6) * 40}%`,
                    }}
                    animate={{
                      y: [0, -60, 0],
                      x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                      opacity: [0.1, 0.5, 0.1],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Money streams */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`stream-${i}`}
                    className="absolute w-0.5 bg-white/20"
                    style={{
                      left: `${15 + i * 25}%`,
                      height: '60%',
                    }}
                    animate={{
                      y: ['-100%', '100%'],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Capital</h3>
                  <motion.svg
                    className="w-5 h-5 text-white/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: expandedCard === 'capital' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M19 9l-7 7-7-7"/>
                  </motion.svg>
                </div>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Strategic investments in promising startups aligned with our vision for innovation and growth.
                </p>
                <p className="text-xs sm:text-sm text-white/50 mt-3">Click to learn more</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#6a2a2a] text-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl relative overflow-hidden min-h-[280px] sm:min-h-[320px] cursor-pointer hover:scale-[1.02] transition-transform"
              onClick={() => setExpandedCard(expandedCard === 'building' ? null : 'building')}
            >
              {/* Building animation - full size */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Large building structure in background */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <svg className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 opacity-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="12" width="16" height="8" stroke="currentColor" fill="none"/>
                    <rect x="6" y="8" width="12" height="4" stroke="currentColor" fill="none"/>
                    <rect x="8" y="4" width="8" height="4" stroke="currentColor" fill="none"/>
                  </svg>
                </div>
                
                {/* Building blocks appearing - full card */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {[
                    // Bottom row
                    { x: 15, y: 75, delay: 0 },
                    { x: 30, y: 75, delay: 0.2 },
                    { x: 45, y: 75, delay: 0.4 },
                    { x: 60, y: 75, delay: 0.6 },
                    { x: 75, y: 75, delay: 0.8 },
                    // Middle row
                    { x: 20, y: 60, delay: 1.0 },
                    { x: 35, y: 60, delay: 1.2 },
                    { x: 50, y: 60, delay: 1.4 },
                    { x: 65, y: 60, delay: 1.6 },
                    // Top row
                    { x: 30, y: 45, delay: 1.8 },
                    { x: 45, y: 45, delay: 2.0 },
                    { x: 60, y: 45, delay: 2.2 },
                    // Peak
                    { x: 42.5, y: 30, delay: 2.4 },
                  ].map((block, i) => (
                    <motion.rect
                      key={i}
                      x={block.x}
                      y={block.y}
                      width="8"
                      height="8"
                      fill="currentColor"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.4, 0.4, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        delay: block.delay,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </svg>
                
                {/* Construction particles - full card */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      left: `${10 + (i % 5) * 20}%`,
                      top: `${20 + Math.floor(i / 5) * 25}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, (i % 2 === 0 ? 1 : -1) * 15, 0],
                      opacity: [0, 0.7, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Construction lines/grid */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`line-${i}`}
                    className="absolute bg-white/10"
                    style={{
                      width: i % 2 === 0 ? '2px' : '60%',
                      height: i % 2 === 0 ? '60%' : '2px',
                      left: i % 2 === 0 ? `${20 + (i / 2) * 20}%` : '20%',
                      top: i % 2 === 0 ? '20%' : `${30 + ((i - 1) / 2) * 20}%`,
                    }}
                    animate={{
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Building</h3>
                  <motion.svg
                    className="w-5 h-5 text-white/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: expandedCard === 'building' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M19 9l-7 7-7-7"/>
                  </motion.svg>
                </div>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Rapid development of digital products, platforms, and tools that solve real problems.
                </p>
                <p className="text-xs sm:text-sm text-white/50 mt-3">Click to learn more</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expandedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setExpandedCard(null)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 md:p-12 ${
                expandedCard === 'capital' ? 'bg-[#222222]' : 'bg-[#6a2a2a]'
              } border border-white/10 shadow-2xl`}>
                {/* Close button */}
                <button
                  onClick={() => setExpandedCard(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>

                {expandedCard === 'capital' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                      {capitalDetails.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 leading-relaxed">
                      {capitalDetails.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                      {capitalDetails.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center"
                        >
                          <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">What We Offer</h3>
                      {capitalDetails.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                          <p className="text-base sm:text-lg text-white/80 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {expandedCard === 'building' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                      {buildingDetails.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 leading-relaxed">
                      {buildingDetails.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                      {buildingDetails.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 text-center"
                        >
                          <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-sm sm:text-base text-white/70">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Our Capabilities</h3>
                      {buildingDetails.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                          <p className="text-base sm:text-lg text-white/80 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ventures Section */}
      <section id="ventures" className="min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              We back founders building the future internet
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed mb-8 sm:mb-10 md:mb-12">
              We invest in and support innovative startups working in metaverse technologies, Web3, 
              AI, and other cutting-edge areas. Our portfolio includes successful exits and growing companies 
              that are shaping the future of technology.
            </p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/3 border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Chartit360
                </h3>
                <span className="px-3 py-1 bg-[#6a2a2a]/20 text-[#ff8888] text-xs font-medium rounded-full whitespace-nowrap self-start border border-[#ff6b6b]/20">
                  PORTFOLIO COMPANY
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                Enterprise-grade data analytics platform. Advanced AI-driven financial insights, forecasts, and real-time dashboards.
              </p>
              <a
                href="https://marketing.chartit360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6a2a2a] hover:text-[#8a3a3a] font-medium transition-colors group"
              >
                Visit Website
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              Digital Products
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/3 border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                Criterion
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                Startup idea evaluator with 85%+ prediction accuracy. Get evaluations in 5-10 minutes with complete audit trail transparency.
              </p>
              <a
                href="https://criterion.expanova.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6a2a2a] hover:text-[#8a3a3a] font-medium transition-colors group"
              >
                Try Criterion
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/3 border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Chartit360
                </h3>
                <span className="px-3 py-1 bg-expanova-accent/10 text-expanova-accent text-xs font-medium rounded-full whitespace-nowrap self-start">
                  BUILT & SPONSORED
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                Enterprise-grade data analytics platform. Advanced AI-driven financial insights, forecasts, and real-time dashboards.
              </p>
              <a
                href="https://marketing.chartit360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6a2a2a] hover:text-[#8a3a3a] font-medium transition-colors group"
              >
                Visit Website
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agency Section */}
      <section id="agency" className="min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
              Digital Agency
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/3 border border-white/10 rounded-xl p-6 sm:p-8 md:p-10 hover:bg-white/5 transition-colors"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              BlackBox Dev
            </h3>
            <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
              Fast, reliable websites, SaaS platforms, and AI tools for startups, creators, and small businesses. Delivered in days, not weeks.
            </p>
            <a
              href="https://www.blackbox-dev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-[#6a2a2a] hover:text-[#8a3a3a] font-medium transition-colors group"
            >
              Visit Website
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                Contact Us
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/3 border border-white/10 rounded-xl p-4 sm:p-6 md:p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Starfield - Bottom Right */}
      <div className="fixed bottom-0 right-0 w-full max-w-[1200px] h-[1200px] pointer-events-none overflow-hidden z-0">
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
