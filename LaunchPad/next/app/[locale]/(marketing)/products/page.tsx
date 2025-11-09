"use client";
import React from "react";
import { Navigation } from "../../../../components/expanova/navigation";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0f1410] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40" />

      <Navigation />

      <main className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-4 sm:mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Digital Products
            </h1>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-4 sm:mb-6" />
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Criterion */}
            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                  Criterion
                </h2>
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

            {/* Chartit360 */}
            <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12 hover:bg-white/5 transition-all">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                    Chartit360
                  </h2>
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
      </main>
    </div>
  );
}
