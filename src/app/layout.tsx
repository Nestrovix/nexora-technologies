import type { Metadata, Viewport } from 'next';
import { Azeret_Mono, Red_Hat_Display, Urbanist } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import Reveal from '@/components/Reveal';
import { site } from '@/data/site';

/**
 * Urbanist carries body copy and UI. Measured against the Public Sans it
 * replaces (per 100px em): cap 70 vs 73, x-height 51 vs 52, lowercase advance
 * 50.1 vs 53.0 — so it sets ~5% narrower at the same size while reading almost
 * exactly as large. Body sizes therefore stay put; the tracked uppercase labels
 * open up slightly (see globals.css) because Urbanist's caps are ~7% narrower.
 *
 * One caveat drives a decision below: Urbanist ships NO tabular figures — its
 * `1` is less than half the width of its `0`, and `font-variant-numeric` has no
 * effect. Anywhere a column of figures has to line up, the numerals are set in
 * Red Hat Display, which does carry real `tnum`.
 */
const body = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

/**
 * Red Hat Display carries headings. Cap 70 vs Manrope's 72 and a ~3% narrower
 * lowercase, so the large headline steps are nudged up ~4% and the tracking is
 * pulled a touch tighter — Red Hat Display sets looser than Manrope by default.
 */
const display = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

/**
 * Azeret Mono carries every code, terminal, diagram and metric surface.
 * Its advance is 0.65em against Fira Code's 0.60em — 8.3% wider — while its
 * x-height is 4% larger. Mono sizes therefore come down roughly one notch
 * (13px → 12.5px, 12.5px → 12px, 11px → 10.5px), which lands the x-height on
 * the old value and holds the width growth to about 4%.
 */
const mono = Azeret_Mono({
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
