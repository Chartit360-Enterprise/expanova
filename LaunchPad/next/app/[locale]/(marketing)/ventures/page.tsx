"use client";
import React from "react";
import { Navigation } from "../../../../components/expanova/navigation";

export default function VenturesPage() {
  return (
    <div className="min-h-screen bg-[#0f1410] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40" />

      <Navigation />

      <main className="relative pt-40 pb-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-white mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Angel Investments
            </h1>
            <div className="h-px w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-6" />
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              We fund and sponsor promising ventures that align with our vision for innovation.
            </p>
          </div>

          <div className="space-y-8">
            {/* Chartit360 */}
            <div className="bg-white/3 border border-white/10 p-12 hover:bg-white/5 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
                    Chartit360
                  </h2>
                  <span className="inline-block px-3 py-1 bg-[#ff6b6b]/15 text-[#ff8888] text-xs font-medium tracking-wide border border-[#ff6b6b]/20">
                    PORTFOLIO COMPANY
                  </span>
                </div>
              </div>
              <p className="text-lg text-white/60 mb-8 leading-relaxed" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
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
