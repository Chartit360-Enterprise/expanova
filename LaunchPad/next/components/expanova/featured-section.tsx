"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  image?: string;
}

interface FeaturedSectionProps {
  title?: string;
  subtitle?: string;
  items: FeaturedItem[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title = "What's new at Expanova",
  subtitle,
  items,
}) => {
  return (
    <section className="py-24 bg-expanova-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 font-bold gradient-text mb-4 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link href={item.href}>
                <Card className="h-full hover:border-expanova-primary/30 transition-all duration-300 hover:scale-[1.02] group cursor-pointer overflow-hidden">
                  {item.image && (
                    <div className="aspect-video bg-gradient-to-br from-expanova-primary/20 to-expanova-accent/20 relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-expanova-primary uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-expanova-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-expanova-primary text-sm font-medium">
                      <span>Read more</span>
                      <motion.svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </motion.svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

