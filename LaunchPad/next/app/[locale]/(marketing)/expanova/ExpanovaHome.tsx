"use client";
import React from "react";
import { Hero } from "../../../../components/dynamic-zone/hero";
import { Features } from "../../../../components/dynamic-zone/features/index";
import { TaskDashboard } from "../../../../components/expanova/task-dashboard";
import { BuroChatWidget } from "../../../../components/expanova/buro-chat";
import { motion } from "framer-motion";

export const ExpanovaHome: React.FC = () => {
  const heroData = {
    heading: "Making Spanish Bureaucracy Bearable",
    sub_heading:
      "Your AI-powered assistant for navigating Valencia's administrative processes. Get personalized roadmaps, automated form filling, and expert guidance.",
    CTAs: [
      {
        id: 1,
        text: "Get Started",
        URL: "/dashboard",
        variant: "primary",
      },
      {
        id: 2,
        text: "Learn More",
        URL: "#features",
        variant: "secondary",
      },
    ],
  };

  const featuresData = [
    {
      title: "Smart Document Processing",
      description:
        "Upload documents and let AI extract data to pre-fill Spanish forms automatically.",
      icon: "📄",
    },
    {
      title: "Appointment Monitoring",
      description:
        "Automatically watch official portals for available appointment slots and get notified instantly.",
      icon: "🎯",
    },
    {
      title: "Personalized Roadmaps",
      description:
        "Get custom task lists based on your nationality, visa type, and family situation.",
      icon: "🗺️",
    },
    {
      title: "AI Chat Assistant",
      description:
        "24/7 support for all your Spanish bureaucracy questions, trained on official procedures.",
      icon: "🤖",
    },
    {
      title: "Progress Tracking",
      description:
        "Beautiful dashboard showing completion status and next steps for all your tasks.",
      icon: "📊",
    },
    {
      title: "Official Portal Integration",
      description:
        "Direct links and guidance for Policía, DGT, Ayuntamiento, and GVA services.",
      icon: "🔗",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        heading={heroData.heading}
        sub_heading={heroData.sub_heading}
        CTAs={heroData.CTAs}
        locale="en"
      />

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-cursor-bg to-cursor-sidebar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cursor-text mb-4">
              Everything You Need for Spanish Bureaucracy
            </h2>
            <p className="text-xl text-cursor-text-dim max-w-3xl mx-auto">
              Expanova automates the most painful parts of Spanish
              administration, so you can focus on enjoying life in Valencia.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cursor-panel rounded-lg p-6 hover:bg-cursor-selection border border-cursor-border transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-cursor-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-cursor-text-dim">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-cursor-panel to-cursor-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cursor-text mb-4">
              How Expanova Works
            </h2>
            <p className="text-xl text-cursor-text-dim max-w-3xl mx-auto">
              From arrival to full residency, we guide you through every step
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-cursor-accent text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-cursor-text mb-3">
                Tell Us About You
              </h3>
              <p className="text-cursor-text-dim">
                Answer a few questions about your nationality, visa type, and
                situation in Valencia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-cursor-warning text-cursor-bg rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-cursor-text mb-3">
                Get Your Roadmap
              </h3>
              <p className="text-cursor-text-dim">
                Receive a personalized task list with priorities, deadlines, and
                step-by-step guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-cursor-success text-cursor-bg rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-cursor-text mb-3">
                Let AI Do the Work
              </h3>
              <p className="text-cursor-text-dim">
                Upload documents, get forms auto-filled, monitor appointments,
                and chat with our AI assistant.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-cursor-sidebar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-cursor-accent mb-2">10+</div>
              <div className="text-cursor-text-dim">Automated Processes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-cursor-warning mb-2">4</div>
              <div className="text-cursor-text-dim">Official Portals Monitored</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-cursor-success mb-2">75%</div>
              <div className="text-cursor-text-dim">Time Saved on Paperwork</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-cursor-text mb-2">
                24/7
              </div>
              <div className="text-cursor-text-dim">AI Assistant Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <BuroChatWidget />
    </div>
  );
};
