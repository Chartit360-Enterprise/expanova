import { draftMode } from "next/headers";
import qs from "qs";
/**
 * Fetches data for a specified Strapi content type.
 *
 * @param {string} contentType - The type of content to fetch from Strapi.
 * @param {string} params - Query parameters to append to the API request.
 * @return {Promise<object>} The fetched data.
 */

interface StrapiData {
  id: number;
  [key: string]: any; // Allow for any additional fields
}

interface StrapiResponse {
  data: StrapiData | StrapiData[];
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null
}

export default async function fetchContentType(
  contentType: string,
  params: Record<string, any> = {},
  spreadData?: boolean,
): Promise<any> {
  // Mock data for Expanova demo
  const mockData: Record<string, any> = {
    global: {
      navbar: {
        logo: {
          image: {
            url: '/next.svg',
            alt: 'Expanova'
          }
        },
        left_navbar_items: [
          { text: 'Home', URL: '/expanova' },
          { text: 'Dashboard', URL: '/dashboard' },
          { text: 'Features', URL: '/expanova#features' }
        ],
        right_navbar_items: [
          { text: 'Login', URL: '/sign-up' },
          { text: 'Get Started', URL: '/dashboard' }
        ]
      },
      footer: {
        description: 'Making Spanish bureaucracy bearable, one automated task at a time.',
        copyright: '© 2024 Expanova. Built for Valencia expats.',
        internal_links: [
          { text: 'About', URL: '/about' },
          { text: 'Features', URL: '/features' },
          { text: 'Pricing', URL: '/pricing' }
        ],
        policy_links: [
          { text: 'Privacy Policy', URL: '/privacy' },
          { text: 'Terms of Service', URL: '/terms' },
          { text: 'GDPR', URL: '/gdpr' }
        ],
        social_media_links: [
          { text: 'Twitter', URL: 'https://twitter.com/expanova' },
          { text: 'Discord', URL: 'https://discord.gg/expanova' },
          { text: 'GitHub', URL: 'https://github.com/expanova' }
        ]
      }
    },
    pages: {
      id: 1,
      title: 'Expanova',
      description: 'Navigate Spanish bureaucracy with AI-powered automation',
      slug: params?.filters?.slug || 'homepage',
      locale: params?.filters?.locale || 'en',
      seo: {
        metaTitle: 'Expanova for Valencia',
        metaDescription: 'Navigate Spanish bureaucracy with ease using AI-powered automation',
        metaImage: {
          url: '/next.svg'
        }
      },
      localizations: []
    },
    page: {
      id: 1,
      title: 'Expanova',
      description: 'Navigate Spanish bureaucracy with AI-powered automation',
      slug: params?.filters?.slug || 'homepage',
      locale: params?.filters?.locale || 'en',
      seo: {
        metaTitle: 'Expanova for Valencia',
        metaDescription: 'Navigate Spanish bureaucracy with ease using AI-powered automation',
        metaImage: {
          url: '/next.svg'
        }
      },
      localizations: []
    }
  };

  const data = mockData[contentType];
  
  if (!data) {
    return null;
  }

  // Return in Strapi format
  const strapiResponse: StrapiResponse = {
    data: data
  };

  return spreadData ? spreadStrapiData(strapiResponse) : data;
}
