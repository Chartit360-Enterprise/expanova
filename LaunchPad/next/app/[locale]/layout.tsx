import React from 'react'

import { Metadata } from 'next';
import { Oswald, Allerta_Stencil } from 'next/font/google';
import { cn } from '@/lib/utils';

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

// Default Global SEO for pages without them
export async function generateMetadata({
    params,
}: {
    params: { locale: string; slug: string };
}): Promise<Metadata> {
    return {
        title: 'Expanova Group',
        description: 'Expanding what\'s possible through innovation infrastructure.',
    };
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={locale}>
            <body
                className={cn(
                    oswald.variable,
                    oswald.className,
                    allertaStencil.variable,
                    "bg-charcoal antialiased h-full w-full"
                )}
            >
                {children}
            </body>
        </html>
    );
}
