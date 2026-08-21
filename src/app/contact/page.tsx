import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import PageIntro from '@/components/PageIntro';
import EnquiryForm from '@/components/EnquiryForm';
import Accordion from '@/components/Accordion';
import { Note, SectionHeading } from '@/components/Section';
import { faqs } from '@/data/company';
import { site, whatsappHref } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Nexora Technologies — Talk to an Expert',
  description:
    'Contact Nexora Technologies to discuss software development, cloud, cybersecurity, AI or data projects. Send a project enquiry, call, email or message us on WhatsApp.',
  alternates: { canonical: '/contact' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  image: `${site.url}/assets/images/hero/hero-global-technology-network.webp`,
  url: `${site.url}/contact`,
  telephone: site.contact.phoneHref,
  email: site.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.contact.addressLines[0],
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    postalCode: site.contact.postalCode,
    addressCountry: site.contact.country,
  },
  areaServed: 'India',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '14:00' },
  ],
};

export default function ContactPage() {
  const channels = [
    { icon: 'phone', label: 'Call us', value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}` },
    { icon: 'mail', label: 'Email us', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: 'whatsapp', label: 'WhatsApp', value: 'Message our team', href: whatsappHref, external: true },
    { icon: 'users', label: 'Careers', value: site.contact.careersEmail, href: `mailto:${site.contact.careersEmail}` },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Talk to an expert
            <br />
            about <span className="text-accent">your project</span>
          </>
        }
        lead="Tell us what you are trying to build or fix. We will come back with questions, a suggested approach and an indicative range."
        image="/assets/images/pages/contact-hero.webp"
        imageAlt="Nexora Technologies meeting room"
        breadcrumbs={[{ label: 'Contact' }]}
        meta={[
          { k: 'Response', v: 'Within one working day' },
          { k: 'First step', v: 'A 30-minute discovery call' },
          { k: 'You get', v: 'Questions, approach, indicative range' },
          { k: 'No obligation', v: 'Scoping questions answered free' },
        ]}
      />

      <section className="section pt-0">
        <div className="container">
          <ul className="grid gap-x-14 border-t border-line sm:grid-cols-2">
            {channels.map((c, i) => (
              <li key={c.label} className={`reveal reveal-d${i} border-b border-line`}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-5 py-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-band text-accent transition group-hover:border-accent">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block spec-key text-ink-500">
                      {c.label}
                    </span>
                    <span className="mt-1 block break-words text-[15px] text-ink-900">{c.value}</span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-ink-500 transition group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div id="enquiry" className="reveal scroll-mt-28">
              <EnquiryForm />
            </div>

            <div className="space-y-5">
              <div className="reveal reveal-d1 border-t border-line pt-6">
                <h2 className="text-lg font-semibold">Office</h2>
                <address className="mt-3 not-italic text-sm leading-relaxed text-ink-600">
                  {site.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <h3 className="mt-6 text-sm font-semibold text-ink-900">Business hours</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink-600">
                  {site.contact.hours.map((h) => (
                    <li key={h.days}>
                      <span className="text-ink-700">{h.days}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal reveal-d2 overflow-hidden rounded-2xl border border-line">
                <h2 className="px-6 pt-6 text-lg font-semibold">Find us</h2>
                <p className="px-6 pb-4 pt-1 text-xs text-ink-500">
                  Demo location — this build carries no real office address.
                </p>
                <div className="relative h-72 w-full bg-band">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent">
                      <Icon name="pin" className="h-5 w-5" />
                    </span>
                    <p className="text-sm text-ink-700">{site.contact.addressLines.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
                  <p className="text-xs text-ink-500">Bengaluru, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>

          <Note>
            <strong className="font-semibold">Placeholder contact details:</strong> the phone number, email addresses,
            postal address above are demo values. Replace them in{' '}
            <code className="font-mono">src/data/site.ts</code> with verified company information before publishing.
          </Note>
        </div>
      </section>

      <section className="section border-t border-line bg-band">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Before You Ask" index="02" title="Questions we hear most often" />
          <div className="reveal reveal-d2">
            <Accordion items={faqs.slice(0, 6)} />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}
