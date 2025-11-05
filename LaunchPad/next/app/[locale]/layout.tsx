import React from 'react'

import { Metadata } from 'next';

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
        <>
            {children}
        </>
    );
}
