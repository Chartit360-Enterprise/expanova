"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { Navigation } from "../../../../components/expanova/navigation";
import { ContactForm } from "@/components/contact-form";

export const ExpanovaHome: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to check scroll position after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = container.querySelectorAll('section');
        const scrollTop = container.scrollTop;
        const viewportHeight = container.clientHeight;
        const scrollPosition = scrollTop + viewportHeight / 2;

        let closestSection: Element | null = null;
        let closestDistance = Infinity;

        sections.forEach((section) => {
          const sectionElement = section as HTMLElement;
          const sectionTop = sectionElement.offsetTop;
          const sectionBottom = sectionTop + sectionElement.offsetHeight;
          const sectionCenter = sectionTop + sectionElement.offsetHeight / 2;
          
          // Check if we're within this section's bounds
          const isWithinBounds = scrollPosition >= sectionTop && scrollPosition <= sectionBottom;
          
          // Calculate distance to section center
          const distance = Math.abs(scrollPosition - sectionCenter);

          // If we're not perfectly aligned with a section, snap to the closest one
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = sectionElement;
          }
        });

        // Only snap if we're not already aligned (within 50px threshold)
        if (closestSection && closestDistance > 50) {
          isScrollingRef.current = true;
          const targetTop = (closestSection as HTMLElement).offsetTop;
          
          container.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });

          // Reset scrolling flag after animation completes
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600);
        }
      }, 200); // Wait 200ms after scroll stops
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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
    <div ref={containerRef} className="bg-[#0f1410] min-h-screen overflow-y-scroll snap-y snap-mandatory texture-overlay">
      <Navigation />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40 pointer-events-none" />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 snap-start snap-always">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
                {"Let's build what's next".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
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
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-16 sm:mt-20">
            <SpotlightCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 text-white p-8 sm:p-10 md:p-12 rounded-2xl cursor-pointer hover:border-white/25 transition-all duration-300"
              onClick={() => setExpandedCard(expandedCard === 'capital' ? null : 'capital')}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Capital</h3>
                  <motion.svg
                    className="w-5 h-5 text-white/60 flex-shrink-0"
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
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-2">
                  Strategic investments in promising startups aligned with our vision for innovation and growth.
                </p>
                <p className="text-sm text-white/50">Click to learn more</p>
              </div>
            </SpotlightCard>

            <SpotlightCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 text-white p-8 sm:p-10 md:p-12 rounded-2xl cursor-pointer hover:border-white/25 transition-all duration-300"
              onClick={() => setExpandedCard(expandedCard === 'building' ? null : 'building')}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Building</h3>
                  <motion.svg
                    className="w-5 h-5 text-white/60 flex-shrink-0"
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
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-2">
                  Rapid development of digital products, platforms, and tools that solve real problems.
                </p>
                <p className="text-sm text-white/50">Click to learn more</p>
              </div>
            </SpotlightCard>
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
      <section id="ventures" className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 border-t border-white/5 snap-start snap-always">
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

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 sm:p-10 hover:border-white/25 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  Chartit360
                </h3>
                <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-full whitespace-nowrap self-start border border-white/20">
                  PORTFOLIO COMPANY
                </span>
              </div>
              <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
                Enterprise-grade data analytics platform. Advanced AI-driven financial insights, forecasts, and real-time dashboards.
              </p>
              <a
                href="https://marketing.chartit360.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
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
      <section id="products" className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 border-t border-white/5 snap-start snap-always">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Digital Products
            </h2>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 sm:p-10 hover:border-white/25 transition-all duration-300"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Criterion
              </h3>
              <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
                Startup idea evaluator with 85%+ prediction accuracy. Get evaluations in 5-10 minutes with complete audit trail transparency.
              </p>
              <a
                href="https://criterion.expanova.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
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
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 sm:p-10 hover:border-white/25 transition-all duration-300"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                China GDP AI
              </h3>
              <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
                AI-powered economic forecasting tool. Predicts China&apos;s quarterly GDP growth by analyzing real-time news and economic data through multi-model AI in under 2 minutes.
              </p>
              <a
                href="https://china.ml.expanova.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
              >
                Try China GDP AI
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agency Section */}
      <section id="agency" className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 border-t border-white/5 snap-start snap-always">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Digital Agency
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 sm:p-10 hover:border-white/25 transition-all duration-300"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              BlackBox Dev
            </h3>
            <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
              Fast, reliable websites, SaaS platforms, and AI tools for startups, creators, and small businesses. Delivered in days, not weeks.
            </p>
            <a
              href="https://www.blackbox-dev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group"
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
      <section id="contact" className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 border-t border-white/5 snap-start snap-always">
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
                Have a question or want to get in touch? Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 sm:p-10"
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

// Spotlight Card Component - Adds luxurious mouse-following glow effect
function SpotlightCard({ 
  children, 
  className = "", 
  onClick,
  ...props 
}: { 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.div>
  );
}
