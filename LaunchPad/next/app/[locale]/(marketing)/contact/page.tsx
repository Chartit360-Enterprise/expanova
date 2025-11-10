"use client";
import React from "react";
import { Navigation } from "../../../../components/expanova/navigation";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f1410] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/30 via-[#1a2520]/50 to-[#3a2828]/40" />

      <Navigation />

      <main className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-white mb-4 sm:mb-6" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Contact Us
            </h1>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-[#7a9d8a]/60 to-transparent mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl" style={{ fontFamily: "'Spline Sans', sans-serif" }}>
              Have a question or want to get in touch? Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white/3 border border-white/10 p-6 sm:p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}

