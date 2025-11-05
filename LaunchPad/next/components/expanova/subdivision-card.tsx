"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubdivisionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  badge?: string;
  index: number;
}

export const SubdivisionCard: React.FC<SubdivisionCardProps> = ({
  title,
  description,
  icon,
  href,
  badge,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group h-full"
    >
      <Link href={href}>
        <Card className="h-full hover:border-expanova-primary/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-expanova-glow cursor-pointer relative overflow-hidden group">
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-expanova-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {badge && (
            <div className="absolute top-5 right-5 z-10">
              <Badge className="bg-gradient-button text-white border-0 shadow-lg">
                {badge}
              </Badge>
            </div>
          )}

          <CardHeader className="pb-4">
            <motion.div
              className="text-5xl mb-6 relative"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
            >
              {icon}
            </motion.div>
            <CardTitle className="text-2xl font-bold gradient-text mb-4 group-hover:scale-105 transition-transform duration-300">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <CardDescription className="text-body text-white/60 mb-6 line-clamp-3 leading-relaxed">
              {description}
            </CardDescription>
            <div className="flex items-center gap-2 text-expanova-primary font-medium group-hover:gap-3 transition-all relative">
              <span className="relative">
                Explore {title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-expanova-primary group-hover:w-full transition-all duration-300"></span>
              </span>
              <motion.svg
                width="16"
                height="16"
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
  );
};
