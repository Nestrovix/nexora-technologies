import type { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';
import Accordion from '@/components/Accordion';
import CTASection from '@/components/CTASection';
import { SpecLabel } from '@/components/Section';
import { faqs } from '@/data/company';
import { services } from '@/data/services';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about working with Nexora Technologies — development process, timelines, maintenance, cloud services, integrations, security and pricing.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const serviceFaqs = services.flatMap((s) => s.faqs.slice(0, 1).map((f) => ({ ...f, q: `${s.title}: ${f.q}` })));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...faqs, ...serviceFaqs].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title={
          <>
            Frequently asked
            <br />
            <span className="text-accent">questions</span>
          </>
        }
        lead="Scoping, pricing, delivery and support — the questions that come up before most engagements."
        image="/assets/images/pages/faq-hero.webp"
        imageAlt="Consultant reviewing project details on a laptop"
        breadcrumbs={[{ label: 'FAQ' }]}
        meta={[
          { k: 'General', v: `${faqs.length} questions` },
          { k: 'By service', v: `${services.length} practice answers` },
          { k: 'Still stuck?', v: 'Ask us directly — no obligation' },
          { k: 'Pricing', v: 'Fixed scope or dedicated team' },
        ]}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="02" className="reveal">General</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Working with Nexora
            </h2>
            <p className="reveal reveal-d2 mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
              Process, timelines, ownership and pricing — the ground rules of an engagement.
            </p>
          </div>
          <div className="reveal reveal-d2">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-band">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SpecLabel index="03" className="reveal">By Service</SpecLabel>
            <h2 className="reveal reveal-d1 mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Service-specific questions
            </h2>
            <p className="reveal reveal-d2 mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
              One common question from each {site.name} practice.
            </p>
          </div>
          <div className="reveal reveal-d2">
            <Accordion items={serviceFaqs} defaultOpen={null} />
          </div>
        </div>
      </section>

      <CTASection title="Still have a question?" text="Ask us directly — we answer scoping questions before any commitment." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
