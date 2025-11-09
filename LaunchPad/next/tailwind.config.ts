import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import svgToDataUri from "mini-svg-data-uri";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#08090A",
        lightblack: "#1C1C1C",
        secondary: "#E6E6E6",
        muted: "var(--neutral-200)",
        // Expanova Design System - Premium Palette
        'expanova-bg': '#0D0D0F',
        'expanova-surface': '#16161A',
        'expanova-surface-elevated': '#1E1E24',
        'expanova-border': '#2A2A30',
        'expanova-border-focus': '#3A3A45',
        // Accent Colors - Unique, Premium
        'expanova-primary': '#14B8A6', // Sophisticated teal/emerald
        'expanova-primary-light': '#2DD4BF',
        'expanova-primary-dark': '#0D9488',
        'expanova-secondary': '#F59E0B', // Rich amber/gold
        'expanova-secondary-light': '#FBBF24',
        'expanova-secondary-dark': '#D97706',
        'expanova-accent': '#8B5CF6', // Deep purple/violet
        'expanova-accent-light': '#A78BFA',
        'expanova-accent-dark': '#7C3AED',
        'expanova-success': '#10B981', // Emerald green
        'expanova-warning': '#F59E0B', // Amber
        'expanova-error': '#EF4444', // Refined red
        // Legacy Cursor colors (for compatibility)
        'cursor-bg': '#0D0D0F',
        'cursor-sidebar': '#16161A',
        'cursor-panel': '#1E1E24',
        'cursor-border': '#2A2A30',
        'cursor-text': '#FAFAFA',
        'cursor-text-dim': 'rgba(250, 250, 250, 0.55)',
        'cursor-accent': '#14B8A6',
        'cursor-warning': '#F59E0B',
        'cursor-success': '#10B981',
        'cursor-error': '#EF4444',
        'cursor-selection': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-oswald)', 'Oswald', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'Oswald', 'system-ui', 'sans-serif'],
        heading: ['var(--font-allerta-stencil)', 'Allerta Stencil', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(4.5rem, 12vw, 9rem)', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.03em' }],
        'h1': ['clamp(4rem, 10vw, 7rem)', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h2': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h3': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h4': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h5': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],
        'h6': ['clamp(1.5rem, 3.5vw, 2rem)', { lineHeight: '1.35', fontWeight: '600', letterSpacing: '0' }],
        'body-lg': ['1.25rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'small': ['0.875rem', { lineHeight: '1.6' }],
        'tiny': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        derek: `0px 0px 0px 1px rgb(0 0 0 / 0.06),
        0px 1px 1px -0.5px rgb(0 0 0 / 0.06),
        0px 3px 3px -1.5px rgb(0 0 0 / 0.06), 
        0px 6px 6px -3px rgb(0 0 0 / 0.06),
        0px 12px 12px -6px rgb(0 0 0 / 0.06),
        0px 24px 24px -12px rgb(0 0 0 / 0.06)`,
        aceternity: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
        'expanova-1': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'expanova-2': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'expanova-3': '0 12px 40px rgba(0, 0, 0, 0.3)',
        'expanova-glow': '0 0 32px rgba(106, 42, 42, 0.25)',
        'expanova-glow-hover': '0 8px 32px rgba(106, 42, 42, 0.35)',
        'expanova-glow-amber': '0 0 32px rgba(245, 158, 11, 0.15)',
        'expanova-glow-purple': '0 0 32px rgba(139, 92, 246, 0.15)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #14B8A6 0%, #8B5CF6 50%, #F59E0B 100%)",
        "gradient-text": "linear-gradient(135deg, #FAFAFA 0%, #14B8A6 50%, #8B5CF6 100%)",
        "gradient-text-alt": "linear-gradient(135deg, #FAFAFA 0%, #F59E0B 100%)",
        "gradient-button": "linear-gradient(135deg, #6a2a2a 0%, #3a2020 100%)",
        "gradient-button-secondary": "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
        "gradient-accent": "linear-gradient(135deg, #14B8A6 0%, #8B5CF6 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
      },
      animation: {
        move: "move 5s linear infinite",
        "spin-circle": "spin-circle 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 1s ease-in-out infinite",
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(200px)" },
        },
        "spin-circle": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );

      matchUtilities(
        {
          highlight: (value: any) => ({
            boxShadow: `inset 0 1px 0 0 ${value}`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
