import type { Metadata } from 'next';
import { profile } from '@/data/profile';
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jawad-iqbal-engineering.safelyqdev.chatgpt.site'
).replace(/\/$/, '');
export function pageMetadata(title: string, description: string, path = '/'): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: profile.name,
      images: [
        {
          url: '/images/engineering-banner.webp',
          width: 1600,
          height: 600,
          alt: 'Full-stack .NET and React engineering — SaaS, APIs, AI integrations, AWS',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/engineering-banner.webp'],
    },
  };
}
