import type { Viewport } from "next";
import { Locale, i18n } from '@/i18n.config'
import { Oswald, Allerta_Stencil } from 'next/font/google';
import { cn } from '@/lib/utils';

import "./globals.css";

import { SlugProvider } from "./context/SlugContext";

const oswald = Oswald({
    subsets: ["latin"],
    display: "swap",
    weight: ["200", "300", "400", "500", "600", "700"],
    variable: "--font-oswald",
});

const allertaStencil = Allerta_Stencil({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
    variable: "--font-allerta-stencil",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(
        oswald.variable,
        oswald.className,
        allertaStencil.variable,
        "bg-charcoal antialiased h-full w-full"
      )}>
        <SlugProvider>
          {children}
        </SlugProvider>
      </body>
    </html>
  );
}
