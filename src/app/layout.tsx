import localFont from 'next/font/local';
import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { profile } from '@/data/profile';
import { siteUrl, pageMetadata } from '@/data/seo';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata('M. Jawad Iqbal — Lead Software Engineer', profile.summary),
  title: { default: 'M. Jawad Iqbal — Lead Software Engineer', template: '%s | M. Jawad Iqbal' },
  authors: [{ name: profile.name }],
  robots: { index: true, follow: true },
};
const inter = localFont({
  src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});
export const viewport: Viewport = { themeColor: '#101419', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    image: `${siteUrl}/images/jawad-iqbal.webp`,
    sameAs: profile.socials.map((s) => s.href),
    knowsAbout: ['ASP.NET Core', 'React', 'Cloud computing', 'API integration', 'SaaS'],
    address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
  };
  return (
    <html lang="en" className={inter.variable}>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
