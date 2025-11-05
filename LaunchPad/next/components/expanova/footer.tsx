"use client";
import React from "react";
import Link from "next/link";

const footerLinks = {
  products: [
    { label: "Criterion", href: "/products/criterion" },
  ],
  ventures: [
    { label: "Expanova Capital", href: "/ventures/capital" },
    { label: "Expanova Foundry", href: "/ventures/foundry" },
    { label: "Expanova Signal", href: "/ventures/signal" },
  ],
  agency: [
    { label: "BlackBox Dev", href: "/agency/blackbox-dev" },
    { label: "Contact", href: "/agency/blackbox-dev/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-expanova-bg border-t border-expanova-border/50 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Expanova Group */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative">
                <span className="text-xl font-bold gradient-text tracking-tight">Expanova</span>
                <span className="absolute -inset-1 bg-expanova-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
              <span className="text-sm text-white/50 font-medium tracking-wide">Group</span>
            </Link>
            <p className="text-sm text-white/55 mb-6 leading-relaxed">
              Expanding what's possible
            </p>
            <div className="flex gap-3">
              {/* Social links placeholder */}
              <a href="#" className="text-white/50 hover:text-expanova-primary transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform hover:scale-110">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-white/50 hover:text-expanova-primary transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="transition-transform hover:scale-110">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-base font-bold gradient-text mb-5 tracking-tight">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-expanova-primary transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-expanova-primary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ventures */}
          <div>
            <h3 className="text-base font-bold gradient-text mb-5 tracking-tight">Ventures</h3>
            <ul className="space-y-3">
              {footerLinks.ventures.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-expanova-accent transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-expanova-accent group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency */}
          <div>
            <h3 className="text-base font-bold gradient-text-alt mb-5 tracking-tight">Agency</h3>
            <ul className="space-y-3">
              {footerLinks.agency.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-expanova-secondary transition-colors relative group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-expanova-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-semibold text-white/70 mb-5 tracking-tight">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-expanova-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/35 font-medium">
            © 2025 Expanova Group. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/35 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

