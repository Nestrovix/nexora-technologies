import type { Metadata, Viewport } from 'next';
import { Fira_Code, Manrope, Public_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

const body = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const display = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

/** Fira Code carries every code, terminal, diagram and metric block. */
const mono = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | IT Services & Software Development Company in India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'IT company India',
    'software development company',
    'web development company',
    'mobile app development',
    'cloud solutions',
    'cybersecurity services',
    'AI development',
    'IT consulting',
    'digital transformation',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | IT Services & Software Development Company in India`,
    description: site.description,
    images: [
      {
        url: '/assets/images/hero/hero-engineering-floor.webp',
        width: 1920,
        height: 1080,
        alt: 'Nexora Technologies — engineers at work on production systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | IT Services & Software Development`,
    description: site.description,
    images: ['/assets/images/hero/hero-engineering-floor.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  category: 'technology',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  foundingDate: site.founded,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.contact.addressLines[0],
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    postalCode: site.contact.postalCode,
    addressCountry: site.contact.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneHref,
      contactType: 'sales',
      email: site.contact.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
  sameAs: [site.social.linkedin, site.social.x, site.social.github, site.social.youtube],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <head>
        {/* Without JS the scroll-reveal classes would keep content hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:border focus:border-ink-900 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingContact />
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
      </body>
    </html>
  );
}
